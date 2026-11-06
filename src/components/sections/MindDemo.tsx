import { useEffect, useRef, useState, type ChangeEvent, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { mindDemo } from "../../copy/ianuaMindLanding";
import styles from "./MindDemo.module.css";

function formatTime(seconds: number) {
  const total = Math.max(0, Math.floor(seconds));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

/**
 * Dimostrazione del prodotto, subito sotto l'apertura.
 * Entra in pagina con lo scorrimento. Parte senza audio.
 */
export function MindDemo() {
  const reduce = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.92", "start 0.42"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [64, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.82, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.35, 1]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTime = () => setTime(video.currentTime);
    const onDuration = () => {
      if (Number.isFinite(video.duration)) setDuration(video.duration);
    };
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("timeupdate", onTime);
    video.addEventListener("loadedmetadata", onDuration);
    video.addEventListener("durationchange", onDuration);
    onDuration();

    if (reduce) {
      video.pause();
    } else {
      void video.play().catch(() => setPlaying(false));
    }

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("loadedmetadata", onDuration);
      video.removeEventListener("durationchange", onDuration);
    };
  }, [reduce]);

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().catch(() => setPlaying(false));
      return;
    }
    video.pause();
  }

  function toggleMuted() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    if (!video.muted && video.paused) {
      void video.play().catch(() => setPlaying(false));
    }
  }

  function onScrub(event: ChangeEvent<HTMLInputElement>) {
    const video = videoRef.current;
    if (!video) return;
    const next = Number(event.target.value);
    video.currentTime = next;
    setTime(next);
  }

  const progress = duration > 0 ? (time / duration) * 100 : 0;

  return (
    <section ref={sectionRef} className={styles.section} aria-label="Video dimostrativo di Ianua Mind">
      <motion.div className={styles.frame} style={reduce ? undefined : { y, scale, opacity }}>
        <video
          ref={videoRef}
          className={styles.video}
          src="/ianua-mind/videos/demo.mp4"
          muted
          loop
          playsInline
          autoPlay={!reduce}
          preload="metadata"
          onClick={togglePlay}
        />
        <label className={styles.scrub}>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={Math.min(time, duration || 0)}
            onChange={onScrub}
            aria-label={mindDemo.seek}
            style={{ "--progress": `${progress}%` } as CSSProperties}
          />
        </label>
      </motion.div>
      <div className={styles.controls}>
        <button type="button" className={styles.control} onClick={togglePlay} aria-pressed={playing}>
          {playing ? mindDemo.pause : mindDemo.play}
        </button>
        <button type="button" className={styles.control} onClick={toggleMuted} aria-pressed={!muted}>
          {muted ? mindDemo.unmute : mindDemo.mute}
        </button>
        <span className={styles.time} aria-hidden="true">
          {formatTime(time)} / {formatTime(duration)}
        </span>
      </div>
    </section>
  );
}
