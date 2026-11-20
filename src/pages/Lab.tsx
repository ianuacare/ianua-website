import { useEffect } from "react";
import { Link } from "react-router-dom";
import { HomeHeader } from "../components/home/HomeHeader";
import { IanuaLogo } from "../components/IanuaLogo";
import { PageMeta } from "../components/seo/PageMeta";
import { labProjects } from "../copy/lab";
import home from "./Home.module.css";
import s from "./Lab.module.css";

/** Pagina istituzionale dei proof of concept healthcare e dei relativi materiali. */
export default function Lab() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className={`${home.page} ${s.page}`}>
      <PageMeta
        title="Lab — Ricerca e proof of concept healthcare | IANUA"
        description="Sei progetti sperimentali tra imaging medico, dati clinici e organizzazione ospedaliera. Esplora approcci, risultati e materiali di ricerca del Lab IANUA."
        canonicalPath="/lab"
      />
      <a href="#main-content" className={home.skipLink}>Vai al contenuto</a>
      <HomeHeader />
      <main id="main-content" tabIndex={-1}>
        <section id="top" className={s.intro} aria-labelledby="lab-title">
          <h1 id="lab-title">Lab</h1>
          <p>
            Il Lab raccoglie sei proof of concept (POC), progetti sperimentali che
            servono a verificare la fattibilità di un’idea prima di svilupparla
            per l’uso sul campo. Le schede raccontano il problema, il metodo e i
            risultati ottenuti su immagini mediche, documenti clinici e
            organizzazione ospedaliera.
          </p>
        </section>

        <section id="progetti" className={s.projects} aria-label="Progetti di ricerca">
          <div className={s.projectList}>
            {labProjects.map((project) => (
              <article key={project.id} id={project.id} className={s.card} aria-labelledby={`${project.id}-title`}>
                <div className={s.visual}>
                  <img src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" />
                </div>
                <div>
                  <h2 id={`${project.id}-title`}>{project.title}</h2>
                  {project.paragraphs.map((paragraph) => <p key={paragraph} className={s.description}>{paragraph}</p>)}
                  <div>
                    {project.pdf ? (
                      <a
                        className={s.textLink}
                        href={`${import.meta.env.BASE_URL}lab/${project.pdf}`}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.resource}: ${project.title} (PDF, nuova scheda)`}
                      >
                        {project.resource} (PDF)
                      </a>
                    ) : (
                      <a className={s.textLink} href="/#contatti">Parliamo di questo progetto</a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className={s.context}>
            I risultati si riferiscono alle condizioni sperimentali descritte nei
            materiali. Le immagini hanno finalità illustrative.
          </p>
        </section>

        <section className={s.collaboration} aria-labelledby="collaboration-title">
          <h2 id="collaboration-title">Proponi una collaborazione</h2>
          <p>Se lavori in una struttura sanitaria o in un centro di ricerca, raccontaci il problema che vuoi studiare.</p>
          <a className={s.textLink} href="/#contatti">Contattaci</a>
        </section>
      </main>
      <footer className={home.footer}>
        <div className={home.footerTop}>
          <Link to="/" aria-label="IANUA — torna alla home"><IanuaLogo interactive={false} className={home.footerLogo} /></Link>
          <nav aria-label="Mappa del sito">
            <a href="/#ecosistema">I nostri prodotti</a>
            <Link to="/lab" aria-current="page">Lab</Link>
            <a href="/#contatti">Contatti</a>
            <a href="#top">Torna su ↑</a>
          </nav>
        </div>
        <div className={home.footerBottom}>
          <span>© {new Date().getFullYear()} IANUA</span>
          <span>Healthcare technology, human at heart.</span>
          <details>
            <summary>Crediti fotografici</summary>
            <p>Fotografie illustrative da Pexels.</p>
            <ul className={s.credits}>
              {labProjects.map((project) => project.photoId && (
                <li key={project.id}>
                  <a href={`https://www.pexels.com/photo/${project.photoId}/`} target="_blank" rel="noreferrer">{project.title}</a>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </footer>
    </div>
  );
}
