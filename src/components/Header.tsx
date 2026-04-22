import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import logoIanuaSfum from "../assets/branding/Ianua_sfum.svg";
import { navItems } from "../copy/home";
import styles from "./Header.module.css";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  /** Su viewport stretti non applichiamo backdrop-filter all'header: altrimenti la nav fixed è "intrappolata" nel contenitore filtrato e il drawer non copre il viewport. */
  const [wideLayout, setWideLayout] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 880px)").matches,
  );
  const reduce = useReducedMotion();
  const location = useLocation();
  const onHomeRoute =
    location.pathname === "/home" || location.pathname === "/home/";

  const { scrollY } = useScroll();
  const blur = useTransform(scrollY, [0, 120], [0, 14]);
  const bgOpacity = useTransform(scrollY, [0, 120], [0, 0.78]);
  const borderOpacity = useTransform(scrollY, [0, 120], [0, 1]);
  const blurFilter = useTransform(blur, (v) => `blur(${v}px)`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 880px)");
    const syncLayout = () => {
      setWideLayout(mq.matches);
      if (mq.matches) setMenuOpen(false);
    };
    syncLayout();
    mq.addEventListener("change", syncLayout);
    return () => mq.removeEventListener("change", syncLayout);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!onHomeRoute) return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      {menuOpen ? (
        <button
          type="button"
          className={styles.backdrop}
          aria-label="Chiudi menu"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}

      <motion.header
        className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${menuOpen ? styles.menuOpen : ""}`}
        style={
          reduce || !wideLayout
            ? undefined
            : {
                backdropFilter: blurFilter,
                WebkitBackdropFilter: blurFilter,
                ["--header-bg-opacity" as string]: bgOpacity,
                ["--header-border-opacity" as string]: borderOpacity,
              }
        }
      >
        <div className={styles.inner}>
          <Link
            to="/home"
            className={styles.logoLink}
            aria-label="Ianua — torna all'inizio"
            onClick={handleLogoClick}
          >
            <img
              src={logoIanuaSfum}
              alt=""
              aria-hidden
              className={styles.logo}
              width={176}
              height={62}
              decoding="async"
            />
          </Link>

          <nav
            id="primary-nav"
            className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}
            aria-label="Principale"
          >
            {navItems.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={styles.navLink}
                onClick={() => setMenuOpen(false)}
              >
                <span className={styles.navLinkText}>{label}</span>
              </a>
            ))}
            <a
              href="#contatti"
              className={styles.navCta}
              onClick={() => setMenuOpen(false)}
            >
              parla con noi
            </a>
          </nav>

          <button
            type="button"
            className={`${styles.toggle} ${menuOpen ? styles.toggleOpen : ""}`}
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className={styles.srOnly}>
              {menuOpen ? "Chiudi menu" : "Apri menu"}
            </span>
            <span className={styles.toggleBar} aria-hidden />
            <span className={styles.toggleBar} aria-hidden />
          </button>
        </div>
      </motion.header>
    </>
  );
}
