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

        <motion.div
          className={styles.comingSoon}
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.5, ease: easeOut }}
        >
          <p>{mindTestimonials.comingSoon}</p>
        </motion.div>
      </div>
    </section>
  );
}
