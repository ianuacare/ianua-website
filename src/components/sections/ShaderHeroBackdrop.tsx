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

float wave(vec2 uv, float t) {
  float a = sin((uv.x * 9.2) + (t * 1.05));
  float b = sin((uv.y * 11.8) - (t * 0.92));
  float c = sin(((uv.x + uv.y) * 10.6) + (t * 0.88));
  return (a + b + c) / 3.0;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 centered = uv - 0.5;
  centered.x *= u_resolution.x / u_resolution.y;

  float radial = smoothstep(1.05, 0.03, length(centered));
  float motion = wave(uv, u_time);
  float streakA = sin((uv.x * 30.0) + (u_time * 1.35)) * 0.12;
  float streakB = sin((uv.y * 24.0) - (u_time * 1.18)) * 0.1;
  float pulse = sin(u_time * 0.85) * 0.08;
  float intensity = (motion * 0.5 + 0.5) * radial + streakA + streakB + pulse;

  vec3 deep = vec3(0.03, 0.10, 0.25);
  vec3 glow = vec3(0.12, 0.34, 0.62);
  vec3 highlight = vec3(0.48, 0.78, 0.96);

  float clamped = clamp(intensity, 0.0, 1.0);
  vec3 color = mix(deep, glow, clamped);
  color = mix(color, highlight, pow(clamped, 2.1) * 0.68);

  gl_FragColor = vec4(color, 0.95);
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

      if (!reduceMotion) {
        rafId = window.requestAnimationFrame(draw);
      }
    };

    const onMotionPrefChange = (event: MediaQueryListEvent) => {
      reduceMotion = event.matches;
      window.cancelAnimationFrame(rafId);
      rafId = 0;
      draw(performance.now());
    };

    const onResize = () => draw(performance.now());

    if (!reduceMotion) {
      rafId = window.requestAnimationFrame(draw);
    } else {
      draw(0);
    }

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
