import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { IanuaLogo } from "../IanuaLogo";
import { brandBackdropVars } from "../../styles/brandBackdrop";
import styles from "./Hero.module.css";
import { ShaderHeroBackdrop } from "./ShaderHeroBackdrop";

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
    <section id="top" ref={sectionRef} className={styles.hero} style={brandBackdropVars}>
      <div className={styles.brandBackdrop} aria-hidden />
      <ShaderHeroBackdrop className={styles.shaderLayer} />
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
          <IanuaLogo tone="paper" interactive={false} className={styles.logoWordmark} />
        </div>
      </motion.div>
    </section>
  );
}
