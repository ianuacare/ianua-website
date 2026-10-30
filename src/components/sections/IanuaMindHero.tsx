import { useEffect, useRef, useState } from "react";
import psychologist from "../../assets/images/mind-psychologist.jpg";
import { IanuaMindWordmark } from "../IanuaMindWordmark";
import { ianuaMindHero, ianuaMindNavItems } from "../../copy/ianuaMindLanding";
import styles from "./IanuaMindHero.module.css";

/**
 * Navigazione e apertura della landing Ianua Mind.
 * La foto è illustrativa e non ritrae pazienti o collaboratori Ianua.
 */
export function IanuaMindHero() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const media = window.matchMedia("(min-width: 901px)");
    const onResize = () => {
      if (media.matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    media.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      media.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <>
      <header className={styles.header}>
        <a href="#top" className={styles.brand} aria-label="Ianua Mind, torna all'inizio">
          <IanuaMindWordmark />
        </a>
        <nav
          id="mind-nav"
          className={open ? styles.navOpen : styles.nav}
          aria-label="Navigazione Ianua Mind"
        >
          {ianuaMindNavItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className={styles.navCta} href={ianuaMindHero.primaryCta.href}>
          {ianuaMindHero.primaryCta.label}
        </a>
        <button
          ref={toggle}
          type="button"
          className={styles.menu}
          aria-expanded={open}
          aria-controls="mind-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Chiudi −" : "Menu +"}
        </button>
      </header>

      <section id="top" className={styles.hero} aria-labelledby="mind-hero-title">
        <div className={styles.copy}>
          <h1 id="mind-hero-title" className={styles.title}>
            {ianuaMindHero.title}
          </h1>
          <p className={styles.subtitle}>{ianuaMindHero.subtitle}</p>
          <a className={styles.cta} href={ianuaMindHero.primaryCta.href}>
            {ianuaMindHero.primaryCta.label}
          </a>
          <p className={styles.trust}>{ianuaMindHero.trustBadge}</p>
        </div>
        <div className={styles.stage}>
          <img
            className={styles.photo}
            src={psychologist}
            alt="Psicologa in colloquio in uno studio luminoso"
            width={1800}
            height={1200}
          />
        </div>
      </section>
    </>
  );
}
