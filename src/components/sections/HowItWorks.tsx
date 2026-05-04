import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { howItWorks } from "../../copy/home";
import { EditorialText } from "../EditorialText";
import { easeOut } from "./_motion";
import styles from "./HowItWorks.module.css";

export function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      id="come-funziona"
      className={styles.section}
      aria-labelledby="come-funziona-heading"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>
            <span className={styles.dash} aria-hidden />
            {howItWorks.eyebrow}
          </p>
          <motion.h2
            id="come-funziona-heading"
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: easeOut }}
          >
            <EditorialText lines={howItWorks.title} boldClassName={styles.titleStrong} />
          </motion.h2>
        </header>

        <ol className={styles.steps}>
          {howItWorks.steps.map((step, index) => (
            <motion.li
              key={step.title}
              className={styles.step}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.65, delay: 0.08 + index * 0.1, ease: easeOut }}
            >
              <p className={styles.index}>{`0${index + 1}`}</p>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepBody}>{step.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
