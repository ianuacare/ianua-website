import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { IanuaLogo } from "../IanuaLogo";
import { brandBackdropVars } from "../../styles/brandBackdrop";
import { EditorialText } from "../EditorialText";
import { hero, navItems } from "../../copy/home";
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
      <header className={styles.topNav}>
        <a href="#top" className={styles.brandLink} aria-label="Vai all'inizio">
          <IanuaLogo tone="paper" interactive={false} className={styles.navWordmark} />
        </a>
        <nav className={styles.nav} aria-label="Navigazione principale">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          ))}
        </nav>
        <a href={hero.primaryCta.href} className={styles.navCta}>
          {hero.primaryCta.label}
        </a>
      </header>
      <div className={styles.content}>
        <div className={styles.copyCol}>
          <p className={styles.eyebrow}>{hero.eyebrow}</p>
          <h1 className={styles.title}>
            <EditorialText lines={hero.title} boldClassName={styles.titleStrong} />
          </h1>
          <p className={styles.body}>
            <EditorialText lines={[hero.body]} boldClassName={styles.bodyStrong} />
          </p>
          <div className={styles.ctaRow}>
            <a href={hero.primaryCta.href} className={styles.primaryCta}>
              {hero.primaryCta.label}
            </a>
            <a href={hero.secondaryCta.href} className={styles.secondaryCta}>
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>
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
      </div>
    </section>
  );
}
