import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { mindPainPoints } from "../../copy/home";
import { EditorialText } from "../EditorialText";
import { easeOut } from "./_motion";
import styles from "./MindPainPoints.module.css";

export function MindPainPoints() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} id="problemi" className={styles.section} aria-labelledby="problemi-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>
            <span className={styles.dash} aria-hidden />
            {mindPainPoints.eyebrow}
          </p>
          <motion.h2
            id="problemi-heading"
            className={styles.title}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.8, ease: easeOut }}
          >
            <EditorialText lines={mindPainPoints.title} boldClassName={styles.titleStrong} />
          </motion.h2>
        </header>

        <div className={styles.grid}>
          {mindPainPoints.items.map((item, index) => (
            <motion.article
              key={item.title}
              className={styles.card}
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
              transition={{ duration: 0.65, delay: 0.1 + index * 0.08, ease: easeOut }}
            >
              <p className={styles.index}>{`0${index + 1}`}</p>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardBody}>{item.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
