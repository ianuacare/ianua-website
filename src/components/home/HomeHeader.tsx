import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IanuaLogo } from "../IanuaLogo";
import s from "../../pages/Home.module.css";

/** Navigazione condivisa tra la home istituzionale e il Lab. */
export function HomeHeader() {
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const homeAnchor = (hash: string) => onHome ? hash : `/${hash}`;
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const media = matchMedia("(min-width: 801px)");
    const resize = () => {
      if (media.matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    media.addEventListener("change", resize);
    return () => {
      window.removeEventListener("keydown", onKey);
      media.removeEventListener("change", resize);
    };
  }, [open]);
  return (
    <header className={s.header}>
      <a href={homeAnchor("#top")} aria-label="IANUA — torna all’inizio">
        <IanuaLogo interactive={false} className={s.navLogo} />
      </a>
      <button
        className={s.menuToggle}
        ref={toggle}
        aria-expanded={open}
        aria-controls="home-nav"
        onClick={() => setOpen(!open)}
      >
        {open ? "Chiudi −" : "Menu +"}
      </button>
      <nav
        id="home-nav"
        className={`${s.nav} ${open ? s.navOpen : ""}`}
        aria-label="Navigazione principale"
      >
        <a href={homeAnchor("#visione")} onClick={() => setOpen(false)}>
          Perché IANUA
        </a>
        <a href={homeAnchor("#ecosistema")} onClick={() => setOpen(false)}>
          I nostri prodotti
        </a>
        <a href={homeAnchor("#approccio")} onClick={() => setOpen(false)}>
          Come lavoriamo
        </a>
        <Link to="/lab" aria-current={pathname === "/lab" ? "page" : undefined} onClick={() => setOpen(false)}>
          Lab
        </Link>
        <a
          className={s.navContact}
          href={homeAnchor("#contatti")}
          onClick={() => setOpen(false)}
        >
          Parliamone <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
