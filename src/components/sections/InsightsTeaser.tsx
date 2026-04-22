import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { insights } from "../../copy/home";
import { EditorialText } from "../EditorialText";
import { easeOut } from "./_motion";
import styles from "./InsightsTeaser.module.css";

export function InsightsTeaser() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      id="editoriale"
      className={styles.section}
      aria-labelledby="insights-heading"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>
            <span className={styles.dash} aria-hidden />
            {insights.eyebrow}
            <span className={styles.statusBadge}>{insights.status}</span>
          </p>
          <motion.h2
            id="insights-heading"
            className={styles.title}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.85, ease: easeOut }}
          >
            <EditorialText
              lines={insights.title}
              italicClassName={styles.italic}
              boldClassName={styles.titleStrong}
              lineClassName={styles.titleLine}
            />
          </motion.h2>
        </header>

        <ol className={styles.list}>
          {insights.items.map((item, i) => (
            <motion.li
              key={item.title}
              className={styles.article}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: easeOut }}
            >
              <div className={styles.articleHead}>
                <span className={styles.category}>{item.category}</span>
                <span className={styles.date}>{item.date}</span>
              </div>
              <h3 className={styles.articleTitle}>{item.title}</h3>
              <span className={styles.articleHint} aria-hidden>
                presto disponibile →
              </span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
