import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import logoIanuaSfum from "../../assets/branding/Ianua_sfum.svg";
import styles from "./Hero.module.css";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const motionSafe = reduceMotion !== true;

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    motionSafe ? [1, 0.82] : [1, 1],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.35, 1],
    motionSafe ? [1, 0.88, 0.22] : [1, 1, 1],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    motionSafe ? [0, 72] : [0, 0],
  );
  const blurPx = useTransform(
    scrollYProgress,
    [0, 1],
    motionSafe ? [0, 5] : [0, 0],
  );
  const filterBlur = useTransform(blurPx, (v) =>
    v > 0 ? `blur(${v}px)` : "none",
  );

  return (
    <section id="top" ref={sectionRef} className={styles.hero}>
      <h1 className={styles.srOnly}>Ianua</h1>
      <motion.div
        className={styles.logoStage}
        style={{
          scale,
          opacity,
          y,
          filter: filterBlur,
        }}
      >
        <div className={styles.logoInner}>
          <img
            src={logoIanuaSfum}
            alt=""
            className={styles.logoImg}
            width={400}
            height={141}
            decoding="async"
            draggable={false}
          />
        </div>
      </motion.div>
    </section>
  );
}
