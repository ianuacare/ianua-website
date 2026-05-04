import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { IanuaLogo } from "../IanuaLogo";
import { EditorialText } from "../EditorialText";
import {
  ianuaMindHero,
  ianuaMindNavItems,
} from "../../copy/ianuaMindLanding";
import { brandBackdropVars } from "../../styles/brandBackdrop";
import { ShaderHeroBackdrop } from "./ShaderHeroBackdrop";
import styles from "./IanuaMindHero.module.css";

export function IanuaMindHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const motionSafe = reduceMotion !== true;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], motionSafe ? [1, 0.82] : [1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 1], motionSafe ? [1, 0.88, 0.22] : [1, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], motionSafe ? [0, 72] : [0, 0]);

  return (
    <section id="top" ref={sectionRef} className={styles.hero} style={brandBackdropVars}>
      <div className={styles.brandBackdrop} aria-hidden />
      <ShaderHeroBackdrop className={styles.shaderLayer} />
      <header className={styles.topNav}>
        <a href="#top" className={styles.brandLink} aria-label="Vai all'inizio">
          <IanuaLogo tone="paper" interactive={false} className={styles.navWordmark} />
        </a>
        <nav className={styles.nav} aria-label="Navigazione landing Ianua Mind">
          {ianuaMindNavItems.map((item) => (
            <a key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          ))}
        </nav>
        <a href={ianuaMindHero.primaryCta.href} className={styles.navCta}>
          {ianuaMindHero.primaryCta.label}
        </a>
      </header>
      <div className={styles.content}>
        <div className={styles.copyCol}>
          <p className={styles.eyebrow}>{ianuaMindHero.eyebrow}</p>
          <h1 className={styles.title}>
            <EditorialText lines={ianuaMindHero.title} boldClassName={styles.titleStrong} />
          </h1>
          <p className={styles.body}>
            <EditorialText lines={[ianuaMindHero.body]} boldClassName={styles.bodyStrong} />
          </p>
          <div className={styles.ctaRow}>
            <a href={ianuaMindHero.primaryCta.href} className={styles.primaryCta}>
              {ianuaMindHero.primaryCta.label}
            </a>
            <a href={ianuaMindHero.secondaryCta.href} className={styles.secondaryCta}>
              {ianuaMindHero.secondaryCta.label}
            </a>
          </div>
        </div>
        <motion.div
          className={styles.logoStage}
          style={{ scale, opacity, y }}
        >
          <div className={styles.logoInner}>
            <IanuaLogo tone="paper" interactive={false} className={styles.logoWordmark} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
