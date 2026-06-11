import { Link } from "react-router-dom";
import { IanuaMindWordmark } from "../IanuaMindWordmark";
import { mindFooter } from "../../copy/ianuaMindLanding";
import styles from "./MindFooter.module.css";

function FooterNavLink({ href, label }: { href: string; label: string }) {
  const className = styles.colLink;
  if (href.startsWith("/") && !href.startsWith("//")) {
    return (
      <Link to={href} className={className}>
        {label}
      </Link>
    );
  }
  return (
    <a href={href} className={className}>
      {label}
    </a>
  );
}

/**
 * Footer dedicato alla landing prodotto Ianua Mind.
 */
export function MindFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandCol}>
          <IanuaMindWordmark className={styles.wordmark} />
          <p className={styles.tagline}>{mindFooter.tagline}</p>
        </div>

        <nav className={styles.cols} aria-label="Mappa del sito Ianua Mind">
          {mindFooter.columns.map((col) => (
            <div key={col.title} className={styles.col}>
              <h3 className={styles.colTitle}>{col.title}</h3>
              <ul className={styles.colList}>
                {col.links.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
                    <FooterNavLink href={link.href} label={link.label} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copy}>
          © {new Date().getFullYear()} Ianua Mind. Tutti i diritti riservati.
        </p>
        <div className={styles.social}>
          {mindFooter.social.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
