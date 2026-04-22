import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useInView } from "motion/react";
import { approach } from "../../copy/home";
import { EditorialText } from "../EditorialText";
import { easeOut } from "./_motion";
import styles from "./Approach.module.css";

const icons: Record<string, ReactNode> = {
  "Privacy by design": (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M16 4 L26 8 V16 C26 22 21 27 16 28 C11 27 6 22 6 16 V8 Z" />
      <path d="M12 16 L15 19 L20 13" />
    </svg>
  ),
  "Insight strutturati": (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M5 26 L5 6 L27 6 L27 26 Z" />
      <path d="M9 22 L9 14" />
      <path d="M14 22 L14 10" />
      <path d="M19 22 L19 16" />
      <path d="M24 22 L24 12" />
    </svg>
  ),
  "Workflow integrati": (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="8" cy="8" r="3" />
      <circle cx="24" cy="8" r="3" />
      <circle cx="8" cy="24" r="3" />
      <circle cx="24" cy="24" r="3" />
      <path d="M11 8 L21 8" />
      <path d="M8 11 L8 21" />
      <path d="M24 11 L24 21" />
      <path d="M11 24 L21 24" />
    </svg>
  ),
  "Human-centred": (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="16" cy="11" r="4" />
      <path d="M6 27 C6 21 10 18 16 18 C22 18 26 21 26 27" />
    </svg>
  ),
};

export function Approach() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      id="approccio"
      className={styles.section}
      aria-labelledby="approccio-heading"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>
            <span className={styles.dash} aria-hidden />
            {approach.eyebrow}
          </p>
          <motion.h2
            id="approccio-heading"
            className={styles.title}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.85, ease: easeOut }}
          >
            <EditorialText
              lines={approach.title}
              italicClassName={styles.italic}
              boldClassName={styles.titleStrong}
              lineClassName={styles.titleLine}
            />
          </motion.h2>
        </header>

        <ul className={styles.grid}>
          {approach.features.map((f, i) => (
            <motion.li
              key={f.title}
              className={styles.feature}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, delay: 0.05 + i * 0.08, ease: easeOut }}
            >
              <div className={styles.iconWrap}>{icons[f.title]}</div>
              <div className={styles.featureBody}>
                <p className={styles.featureNumber}>{`0${i + 1} / 04`}</p>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureText}>
                  <EditorialText
                    lines={[f.text]}
                    boldClassName={styles.featureStrong}
                  />
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
