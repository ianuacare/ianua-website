import { IanuaMindWordmark } from "../IanuaMindWordmark";
import {
  ianuaMindHero,
  ianuaMindNavItems,
} from "../../copy/ianuaMindLanding";
import { MindHeroVisual } from "./MindHeroVisual";
import styles from "./IanuaMindHero.module.css";

/**
 * Hero della landing Ianua Mind: copy a sinistra, mockup a destra, nav flat viola.
 */
export function IanuaMindHero() {
  return (
    <section id="top" className={styles.hero}>
      <header className={styles.topNav}>
        <a href="#top" className={styles.brandLink} aria-label="Vai all'inizio">
          <IanuaMindWordmark />
        </a>
        <nav className={styles.nav} aria-label="Navigazione Ianua Mind">
          {ianuaMindNavItems.map((item) => (
            <a key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <div className={styles.content}>
        <div className={styles.copyCol}>
          <h1 className={styles.title}>{ianuaMindHero.title}</h1>
          <p className={styles.subtitle}>{ianuaMindHero.subtitle}</p>

          <div className={styles.ctaRow}>
            <a href={ianuaMindHero.primaryCta.href} className={styles.primaryCta}>
              {ianuaMindHero.primaryCta.label}
            </a>
          </div>

          <p className={styles.socialProof}>{ianuaMindHero.socialProof.text}</p>

          <p className={styles.trustBadge}>
            <span className={styles.shield} aria-hidden>
              ✓
            </span>
            {ianuaMindHero.trustBadge}
          </p>
        </div>

        <MindHeroVisual />
      </div>
    </section>
  );
}
