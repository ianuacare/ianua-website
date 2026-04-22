import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { audiences } from "../../copy/home";
import { EditorialText } from "../EditorialText";
import styles from "./Audiences.module.css";

export function Audiences() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-22%"]);

  return (
    <section
      ref={ref}
      id="per-chi"
      className={styles.section}
      aria-labelledby="audiences-heading"
    >
      <div className={styles.head}>
        <p className={styles.eyebrow}>
          <span className={styles.dash} aria-hidden />
          {audiences.eyebrow}
        </p>
        <h2 id="audiences-heading" className={styles.title}>
          <EditorialText
            lines={audiences.titleLines}
            italicClassName={styles.italic}
            boldClassName={styles.titleStrong}
            lineClassName={styles.titleLine}
          />
        </h2>
      </div>

      <div className={styles.trackWrap}>
        <motion.ul
          className={styles.track}
          style={reduce ? undefined : { x }}
          aria-label="Settori e professionisti"
        >
          {[...audiences.items, ...audiences.items].map((item, i) => (
            <li key={`${item}-${i}`} className={styles.item}>
              <span className={styles.itemMark} aria-hidden>
                ✦
              </span>
              <span>{item}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
