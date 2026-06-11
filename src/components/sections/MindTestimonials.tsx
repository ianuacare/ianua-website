import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { mindTestimonials } from "../../copy/ianuaMindLanding";
import { easeOut } from "./_motion";
import styles from "./MindTestimonials.module.css";

/**
 * Recensioni dei professionisti per la landing Ianua Mind.
 */
export function MindTestimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      id="recensioni"
      className={styles.section}
      aria-labelledby="mind-testimonials-heading"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{mindTestimonials.eyebrow}</p>
          <h2 id="mind-testimonials-heading" className={styles.title}>
            {mindTestimonials.title}
          </h2>
        </header>

        <ul className={styles.grid}>
          {mindTestimonials.items.map((item, index) => (
            <motion.li
              key={item.id}
              className={styles.card}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.08, ease: easeOut }}
            >
              <div className={styles.stars} aria-label="Valutazione 5 su 5">
                {"★★★★★"}
              </div>
              <blockquote className={styles.quote}>
                <p>{item.quote}</p>
              </blockquote>
              <footer className={styles.author}>
                <span className={styles.avatar} aria-hidden>
                  {item.initials}
                </span>
                <div>
                  <cite className={styles.name}>{item.name}</cite>
                  <p className={styles.meta}>
                    {item.role}, {item.location}
                  </p>
                </div>
              </footer>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
