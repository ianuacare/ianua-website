import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { mindFeatureStack } from "../../copy/ianuaMindLanding";
import { EditorialText } from "../EditorialText";
import { easeOut } from "./_motion";
import styles from "./MindFeatureStack.module.css";

export function MindFeatureStack() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section
      ref={ref}
      id="feature-mind"
      className={styles.section}
      aria-labelledby="feature-mind-heading"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>
            <span className={styles.dash} aria-hidden />
            {mindFeatureStack.eyebrow}
          </p>
          <motion.h2
            id="feature-mind-heading"
            className={styles.title}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.85, ease: easeOut }}
          >
            <EditorialText lines={mindFeatureStack.title} boldClassName={styles.titleStrong} />
          </motion.h2>
        </header>

        <ul className={styles.grid}>
          {mindFeatureStack.features.map((feature, index) => (
            <motion.li
              key={feature.title}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.65, delay: 0.1 + index * 0.08, ease: easeOut }}
            >
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardBody}>{feature.body}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
