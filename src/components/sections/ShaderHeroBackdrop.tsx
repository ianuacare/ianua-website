import { useEffect, useRef } from "react";

type ShaderHeroBackdropProps = {
  className?: string;
};

type GL = WebGLRenderingContext | WebGL2RenderingContext;

const vertexSource = `
attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fragmentSource = `
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = uv - 0.5;
  p.x *= u_resolution.x / u_resolution.y;
  float t = u_time * 2.9;

  float waveA = sin((uv.x * 7.8) + (t * 2.15));
  float waveB = sin((uv.y * 6.9) - (t * 1.85));
  float waveC = sin(((uv.x + uv.y) * 6.4) + (t * 1.7));
  float waveD = sin(((uv.x - uv.y) * 8.6) - (t * 2.25));
  float flow = (waveA * 0.36 + waveB * 0.24 + waveC * 0.2 + waveD * 0.2);

  float band1 = uv.y + flow * 0.35;
  float band2 = uv.x - waveA * 0.24 + waveB * 0.14;
  float band3 = (uv.x * 0.55 + uv.y * 0.45) + waveC * 0.22 + waveD * 0.18;

  vec3 deep = vec3(0.03, 0.10, 0.25);
  vec3 mid = vec3(0.08, 0.22, 0.46);
  vec3 glow = vec3(0.16, 0.42, 0.76);
  vec3 highlight = vec3(0.48, 0.78, 0.96);

  vec3 layer1 = mix(deep, glow, smoothstep(-0.35, 1.25, band1));
  vec3 layer2 = mix(mid, highlight, smoothstep(-0.35, 1.25, band2));
  vec3 layer3 = mix(deep, highlight, smoothstep(-0.4, 1.3, band3));

  vec3 color = layer1 * 0.42 + layer2 * 0.33 + layer3 * 0.25;

  float centerGlow = smoothstep(1.25, 0.04, length(p));
  float pulse = sin(t * 0.9) * 0.5 + 0.5;
  color = mix(color, glow, centerGlow * (0.26 + pulse * 0.14));

  gl_FragColor = vec4(color, 1.0);
}
`;

export function ShaderHeroBackdrop({ className }: ShaderHeroBackdropProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const gl =
      (canvas.getContext("webgl2", { alpha: true }) as GL | null) ??
      (canvas.getContext("webgl", { alpha: true }) as GL | null);
    if (!gl) {
      canvas.style.display = "none";
      return;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduceMotion = media.matches;
    let rafId = 0;
    let stopped = false;

    const program = createProgram(gl, vertexSource, fragmentSource);
    if (!program) {
      canvas.style.display = "none";
      return;
    }
    gl.useProgram(program);

    const positionLoc = gl.getAttribLocation(program, "a_position");
    if (positionLoc < 0) {
      canvas.style.display = "none";
      return;
    }
    const resolutionLoc = gl.getUniformLocation(program, "u_resolution");
    const timeLoc = gl.getUniformLocation(program, "u_time");

    const buffer = gl.createBuffer();
    if (!buffer) {
      canvas.style.display = "none";
      return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
        1, -1,
        -1, 1,
        -1, 1,
        1, -1,
        1, 1,
      ]),
      gl.STATIC_DRAW,
    );
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const draw = (time: number) => {
      if (stopped) {
        return;
      }
      resizeCanvas(canvas, gl);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      if (resolutionLoc) {
        gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
      }
      if (timeLoc) {
        gl.uniform1f(timeLoc, time * 0.001);
      }
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      rafId = window.requestAnimationFrame(draw);
    };

    const onMotionPrefChange = (event: MediaQueryListEvent) => {
      reduceMotion = event.matches;
      if (reduceMotion) {
        // Keep motion reduced but still visible as requested.
        return;
      }
    };

    const onResize = () => draw(performance.now());

    rafId = window.requestAnimationFrame(draw);

    media.addEventListener("change", onMotionPrefChange);
    window.addEventListener("resize", onResize);

    return () => {
      stopped = true;
      window.cancelAnimationFrame(rafId);
      media.removeEventListener("change", onMotionPrefChange);
      window.removeEventListener("resize", onResize);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}

function resizeCanvas(canvas: HTMLCanvasElement, gl: GL) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
  const height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, width, height);
  }
}

function createProgram(gl: GL, vertex: string, fragment: string) {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertex);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragment);
  if (!vertexShader || !fragmentShader) {
    return null;
  }

  const program = gl.createProgram();
  if (!program) {
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    return null;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

function compileShader(gl: GL, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) {
    return null;
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}
