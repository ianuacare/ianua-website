import { useId, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { mindFaq } from "../../copy/ianuaMindLanding";
import { easeOut } from "./_motion";
import styles from "./MindFaq.module.css";

/**
 * Sezione FAQ con accordion per la landing Ianua Mind.
 */
export function MindFaq() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduceMotion = useReducedMotion();
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(mindFaq.items[0]?.id ?? null);

  return (
    <section
      ref={ref}
      id="faq"
      className={styles.section}
      aria-labelledby="mind-faq-heading"
    >
      <div className={styles.inner}>
        <motion.div
          className={styles.left}
          initial={reduceMotion ? false : { opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
          transition={{ duration: 0.55, ease: easeOut }}
        >
          <p className={styles.eyebrow}>{mindFaq.eyebrow}</p>
          <h2 id="mind-faq-heading" className={styles.title}>
            {mindFaq.title}
          </h2>
          <a href={mindFaq.cta.href} className={styles.ctaLink}>
            {mindFaq.cta.label} →
          </a>
        </motion.div>

        <motion.div
          className={styles.right}
          initial={reduceMotion ? false : { opacity: 0, x: 16 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
          transition={{ duration: 0.55, delay: reduceMotion ? 0 : 0.1, ease: easeOut }}
        >
          <dl className={styles.list}>
            {mindFaq.items.map((item) => {
              const isOpen = openId === item.id;
              const panelId = `${baseId}-${item.id}`;

              return (
                <div key={item.id} className={styles.item}>
                  <dt>
                    <button
                      type="button"
                      className={styles.question}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                    >
                      <span>{item.question}</span>
                      <span className={styles.icon} aria-hidden>
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                  </dt>
                  <dd
                    id={panelId}
                    className={styles.answer}
                    hidden={!isOpen}
                  >
                    {item.answer}
                  </dd>
                </div>
              );
            })}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
