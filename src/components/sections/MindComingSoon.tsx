import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { mindComingSoon } from "../../copy/ianuaMindLanding";
import { easeOut } from "./_motion";
import styles from "./MindComingSoon.module.css";

/**
 * Sezione roadmap: funzionalità annunciate ma non ancora disponibili.
 */
export function MindComingSoon() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      id="novita"
      className={styles.section}
      aria-labelledby="mind-coming-soon-heading"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{mindComingSoon.eyebrow}</p>
          <h2 id="mind-coming-soon-heading" className={styles.title}>
            {mindComingSoon.title}
          </h2>
          <p className={styles.subtitle}>{mindComingSoon.subtitle}</p>
        </header>

        <ul className={styles.list}>
          {mindComingSoon.items.map((item, index) => (
            <motion.li
              key={item.id}
              className={styles.item}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{
                duration: 0.5,
                delay: reduceMotion ? 0 : index * 0.08,
                ease: easeOut,
              }}
            >
              <span className={styles.badge}>{mindComingSoon.badge}</span>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemBody}>{item.body}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
