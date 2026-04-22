import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import logoIanuaSfum from "../../assets/branding/Ianua_sfum.svg";
import { footer } from "../../copy/home";
import styles from "./SiteFooter.module.css";

const marqueeWords = Array.from({ length: 6 }, () => "Ianua");

export function SiteFooter() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["8%", "-32%"]);

  const isExternalRoute = (href: string) => href === "/" || href.startsWith("mailto");

  return (
    <footer ref={ref} className={styles.footer}>
      <motion.div
        className={styles.marquee}
        aria-hidden
        style={reduce ? undefined : { x }}
      >
        {marqueeWords.map((w, i) => (
          <span key={i} className={styles.marqueeWord}>
            {w}
            <span className={styles.marqueeDot}>·</span>
          </span>
        ))}
      </motion.div>

      <div className={styles.inner}>
        <div className={styles.brandCol}>
          <img
            src={logoIanuaSfum}
            alt=""
            aria-hidden
            className={styles.logo}
            width={176}
            height={62}
            decoding="async"
          />
          <p className={styles.tagline}>{footer.brandLine}</p>
        </div>

        <nav className={styles.cols} aria-label="Mappa del sito">
          {footer.columns.map((col) => (
            <div key={col.title} className={styles.col}>
              <h3 className={styles.colTitle}>{col.title}</h3>
              <ul className={styles.colList}>
                {col.links.map((link) =>
                  isExternalRoute(link.href) && link.href === "/" ? (
                    <li key={link.label}>
                      <Link to="/" className={styles.colLink}>
                        {link.label}
                      </Link>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <a href={link.href} className={styles.colLink}>
                        {link.label}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copy}>
          © {new Date().getFullYear()} Ianua. Tutti i diritti riservati.
        </p>
        <p className={styles.locale}>Italia · IT</p>
      </div>
    </footer>
  );
}
