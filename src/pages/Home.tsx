import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { IanuaLogo } from "../components/IanuaLogo";
import { HomeContact } from "../components/home/HomeContact";
import { products, audiences } from "../copy/home";
import { PageMeta } from "../components/seo/PageMeta";
import { JsonLdOrganization } from "../components/seo/JsonLdOrganization";
import { seoHome } from "../seo/copy";
import human from "../assets/images/home-human.jpg";
import research from "../assets/images/home-research.jpg";
import editorial from "../assets/images/home-editorial.jpg";
import mindLogo from "../assets/branding/Ianuamind_bianco.svg";
import studioLogo from "../assets/branding/Ianuastudio_bianco.svg";
import s from "./Home.module.css";

const principles = [
  [
    "La relazione viene prima.",
    "L’intelligenza artificiale affianca il professionista. Il giudizio clinico e la relazione di cura restano al centro.",
  ],
  [
    "La fiducia si costruisce.",
    "Privacy by design: archiviazione sicura, accesso riservato al professionista e attenzione ai requisiti del settore sanitario fin dalla progettazione.",
  ],
  [
    "La complessità può diventare leggibile.",
    "Trasformiamo testi, sedute e documenti in insight strutturati: riassunti, marcatori, pattern e correlazioni.",
  ],
  [
    "Si parte dal lavoro reale.",
    "Strumenti pensati per inserirsi nelle routine cliniche esistenti, nei contesti e nel lavoro quotidiano di chi cura.",
  ],
];

function Reveal({
  children,
  className,
  still,
}: {
  children: ReactNode;
  className?: string;
  still: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={still ? false : { opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Header() {
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
      <a href="#top" aria-label="IANUA — torna all’inizio">
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
        <a href="#visione" onClick={() => setOpen(false)}>
          Perché IANUA
        </a>
        <a href="#ecosistema" onClick={() => setOpen(false)}>
          I nostri prodotti
        </a>
        <a href="#approccio" onClick={() => setOpen(false)}>
          Come lavoriamo
        </a>
        <a
          className={s.navContact}
          href="#contatti"
          onClick={() => setOpen(false)}
        >
          Parliamone <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}

function Hero({
  still,
  onToggle,
  paused,
}: {
  still: boolean;
  onToggle: () => void;
  paused: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);
  return (
    <section ref={ref} id="top" className={s.hero} aria-labelledby="hero-title">
      <motion.div
        className={s.heroPhoto}
        style={still ? undefined : { y }}
        initial={still ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={human}
          alt="Mani intrecciate in un gesto di vicinanza."
          width="1920"
          height="1280"
          fetchPriority="high"
        />
      </motion.div>
      <div className={s.heroColor} aria-hidden="true" />
      <motion.div
        className={s.heroCopy}
        style={still ? undefined : { opacity }}
      >
        <h1 id="hero-title">
          <motion.span
            initial={still ? false : { opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
          >
            La ricerca
            <br />
            cambia tutto.
          </motion.span>
          <motion.span
            className={s.heroSecond}
            initial={still ? false : { opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Quando arriva
            <br />
            alle persone.
          </motion.span>
        </h1>
        <motion.div
          className={s.heroBottom}
          initial={still ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p>
            Connettiamo scienza, tecnologia e cura.
            <br />
            Per portare le possibilità della ricerca
            <br />
            nella vita di ogni giorno.
          </p>
          <a href="#visione" className={s.explore}>
            Scopri IANUA <span aria-hidden="true">↓</span>
          </a>
        </motion.div>
      </motion.div>
      <button
        onClick={onToggle}
        className={s.motionToggle}
        aria-pressed={paused}
      >
        {paused ? "Attiva movimento" : "Riduci movimento"}
      </button>
    </section>
  );
}

function Story({ still }: { still: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const left = useTransform(scrollYProgress, [0, 0.8], ["-15%", "0%"]);
  const right = useTransform(scrollYProgress, [0, 0.8], ["15%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.82, 1]);
  const titleY = useTransform(scrollYProgress, [0, 1], [35, -25]);
  return (
    <section
      id="visione"
      ref={ref}
      className={`${s.story} ${still ? s.storyStill : ""}`}
      aria-labelledby="story-title"
    >
      <div className={s.storyStage}>
        <div className={s.storyPhotos} aria-hidden="true">
          <motion.div
            className={s.researchPhoto}
            style={still ? undefined : { x: left, scale }}
          >
            <img
              src={research}
              alt=""
              width="1600"
              height="1067"
              loading="lazy"
            />
          </motion.div>
          <motion.div
            className={s.lifePhoto}
            style={still ? undefined : { x: right, scale }}
          >
            <img src={human} alt="" width="1920" height="1280" loading="lazy" />
          </motion.div>
        </div>
        <div className={s.storyShade} />
        <motion.div
          className={s.storyWords}
          style={still ? undefined : { y: titleY }}
        >
          <h2 id="story-title">
            Tra una scoperta
            <br />e una vita che cambia,
            <br />
            <span>ci siamo noi.</span>
          </h2>
          <p>
            La conoscenza, da sola, non basta.
            <br />
            Deve incontrare chi può trasformarla in cura.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const still = Boolean(reduced) || paused;
  return (
    <div className={s.page} data-still={still}>
      <PageMeta
        title={seoHome.title}
        description={seoHome.description}
        canonicalPath="/"
      />
      <JsonLdOrganization />
      <a href="#main-content" className={s.skipLink}>
        Vai al contenuto
      </a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero
          still={still}
          paused={paused}
          onToggle={() => setPaused(!paused)}
        />
        <Story still={still} />
        <section className={s.mission}>
          <Reveal still={still}>
            <h2>
              Il futuro della salute
              <br />
              non si costruisce da soli.
            </h2>
          </Reveal>
          <Reveal still={still} className={s.missionText}>
            <p>
              Ogni giorno, università, ricercatori e imprese aprono nuove
              possibilità. Troppe restano lontane dalla vita delle persone.
            </p>
            <p>
              IANUA nasce per contribuire a colmare questa distanza. Mettiamo in
              connessione ricerca scientifica, tecnologia, industria e sistema
              sanitario, per trasformare il potenziale in soluzioni applicabili
              e accessibili.
            </p>
            <a href="#ecosistema" className={s.textLink}>
              Come prende forma <span aria-hidden="true">↓</span>
            </a>
          </Reveal>
        </section>
        <section
          id="ecosistema"
          className={s.ecosystem}
          aria-labelledby="products-title"
        >
          <Reveal still={still} className={s.productIntro}>
            <h2 id="products-title">
              Dalla stessa visione.
              <br />
              Al fianco di chi cura.
            </h2>
            <p>
              Ianua Mind e Ianua Studio.
              <br />
              Due strumenti per rendere la conoscenza
              <br />
              più utile al lavoro dei professionisti.
            </p>
          </Reveal>
          <div className={s.productsTogether}>
            {products.map((p, i) => (
              <motion.div key={p.key} className={s.productWrap}
                initial={still ? false : { opacity: 0, y: 65 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8, delay: still ? 0 : i * 0.14, ease: [0.16, 1, 0.3, 1] }}
              >
                <article
                  id={`ianua-${p.key}`}
                  onPointerMove={(event) => {
                    if (still || event.pointerType !== "mouse") return;
                    const card = event.currentTarget;
                    const bounds = card.getBoundingClientRect();
                    card.style.setProperty("--light-x", `${event.clientX - bounds.left}px`);
                    card.style.setProperty("--light-y", `${event.clientY - bounds.top}px`);
                  }}
                  className={`${s.product} ${i === 1 ? s.productStudio : ""}`}
                  aria-labelledby={`title-${p.key}`}
                >
                  <h3 id={`title-${p.key}`}>
                    <img className={s.productLogo} src={i === 0 ? mindLogo : studioLogo} alt={p.name} />
                  </h3>
                  <p className={s.productPromise}>{i === 0 ? "Più spazio all’ascolto." : "Più valore in ogni informazione."}</p>
                  <p className={s.productAudience}>{p.eyebrow}</p>
                  <p className={s.productBody}>
                    {p.bodySegments.map((segment) => segment.text).join("")}
                  </p>
                  <details className={s.productDetails}>
                    <summary>Tutte le funzionalità <span aria-hidden="true">+</span></summary>
                    <ul>{p.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                  </details>
                  {i === 0 ? (
                    <Link
                      to="/ianua-mind"
                      className={s.productLink}
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "instant" })
                      }
                    >
                      Scopri Ianua Mind <span aria-hidden="true">↗</span>
                    </Link>
                  ) : (
                    <a href="#contatti" className={s.productLink}>
                      Parliamo di Ianua Studio <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </article>
              </motion.div>
            ))}
          </div>
        </section>
        <section
          id="approccio"
          className={s.approach}
          aria-labelledby="approach-title"
        >
          <Reveal still={still} className={s.approachHeading}>
            <h2 id="approach-title">
              La tecnologia avanza.
              <br />
              La persona resta al centro.
            </h2>
            <p>È da qui che comincia ogni nostra scelta.</p>
          </Reveal>
          <div className={s.principles}>
            {principles.map(([title, body], i) => (
              <details key={title} open={i === 0 ? true : undefined}>
                <summary>
                  <h3>{title}</h3>
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{body}</p>
              </details>
            ))}
          </div>
        </section>
        <section
          id="ianuacare"
          className={s.editorial}
          aria-labelledby="editorial-title"
        >
          <div className={s.editorialPhoto}>
            <img
              src={editorial}
              alt="Tre persone si confrontano su libri e appunti attorno a un tavolo in biblioteca."
              width="1400"
              height="2100"
              loading="lazy"
            />
          </div>
          <Reveal still={still} className={s.editorialCopy}>
            <h2 id="editorial-title">
              Le idee hanno bisogno
              <br />
              di incontrarsi.
            </h2>
            <p>
              Ianuacare è il nostro progetto editoriale: uno spazio per
              raccontare come la tecnologia può potenziare, senza sostituire, la
              dimensione umana della medicina.
            </p>
            <p>Stiamo preparando questo spazio.</p>
            <a href="#contatti" className={s.textLink}>
              Entra nella conversazione <span aria-hidden="true">↗</span>
            </a>
          </Reveal>
        </section>
        <section id="per-chi" className={s.audiences}>
          <h2>Insieme a chi si prende cura.</h2>
          <ul>
            {audiences.items.map((a, i) => (
              <motion.li key={a}
                initial={still ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: still ? 0 : 0.55, delay: still ? 0 : i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              ><span>{a}</span></motion.li>
            ))}
          </ul>
        </section>
        <HomeContact />
      </main>
      <footer className={s.footer}>
        <div className={s.footerTop}>
          <a href="#top" aria-label="IANUA — torna all’inizio">
            <IanuaLogo interactive={false} className={s.footerLogo} />
          </a>
          <nav aria-label="Mappa del sito">
            <a href="#ecosistema">I nostri prodotti</a>
            <a href="#ianuacare">Ianuacare</a>
            <a href="#contatti">Contatti</a>
            <a href="#top">Torna su ↑</a>
          </nav>
        </div>
        <div className={s.footerBottom}>
          <span>© {new Date().getFullYear()} IANUA</span>
          <span>Healthcare technology, human at heart.</span>
          <details>
            <summary>Crediti fotografici</summary>
            <p>
              Fotografie illustrative di Magda Ehlers, Edward Jenner e Tima Miroshnichenko su{" "}
              <a
                href="https://www.pexels.com/license/"
                target="_blank"
                rel="noreferrer"
              >
                Pexels
              </a>
              . I soggetti non rappresentano pazienti o collaboratori IANUA.
            </p>
          </details>
        </div>
      </footer>
    </div>
  );
}
