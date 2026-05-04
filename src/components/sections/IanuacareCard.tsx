import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ianuacare } from "../../copy/home";
import { EditorialText } from "../EditorialText";
import careWordmark from "../../assets/branding/Ianuacare_bianco.svg";
import careSectionBg from "../../../brand_ianua/Sfondo_sito_webSVG/ianua_ianuacare.svg";
import { easeOut } from "./_motion";
import styles from "./IanuacareCard.module.css";

export function IanuacareCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="ianuacare" className={styles.section} aria-labelledby="ianuacare-heading">
      <motion.div
        ref={ref}
        className={styles.card}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.85, ease: easeOut }}
      >
        <div className={styles.left}>
          <p className={styles.eyebrow}>
            <span className={styles.dash} aria-hidden />
            {ianuacare.eyebrow}
            <span className={styles.statusBadge}>{ianuacare.status}</span>
          </p>

          <h2 id="ianuacare-heading" className={styles.title}>
            <EditorialText
              lines={ianuacare.titleLines}
              italicClassName={styles.italic}
              boldClassName={styles.titleStrong}
              lineClassName={styles.titleLine}
            />
          </h2>

          <p className={styles.body}>
            <EditorialText lines={[ianuacare.bodySegments]} boldClassName={styles.bodyStrong} />
          </p>

          <a href={ianuacare.cta.href} className={styles.cta}>
            <span>{ianuacare.cta.label}</span>
            <span aria-hidden className={styles.ctaArrow}>
              →
            </span>
          </a>
        </div>

        <div
          className={styles.right}
          style={{ ["--ianuacare-inner-bg" as string]: `url(${careSectionBg})` }}
          aria-hidden
        >
          <div className={styles.wordmarkBlock}>
            <img src={careWordmark} alt="" aria-hidden className={styles.wordmark} />
            <p className={styles.tagSmall}>(progetto editoriale di Ianua)</p>
          </div>
          <div className={styles.glyphFrame}>
            <span className={styles.glyph}>“</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
