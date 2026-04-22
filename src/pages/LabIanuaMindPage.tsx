import { Link } from "react-router-dom";
import mindWordmark from "../assets/branding/Ianuamind_bianco.svg";
import { IanuaLogo } from "../components/IanuaLogo";
import styles from "./LabIanuaMindPage.module.css";

export default function LabIanuaMindPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link to="/" className={styles.headerLogoLink} aria-label="Ianua — home">
          <IanuaLogo className={styles.headerLogo} />
        </Link>
      </header>

      <main>
        <section className={styles.hero} aria-labelledby="hero-heading">
          <h1 id="hero-heading" className={styles.heroTitle}>
            Noi <em className={styles.em}>realizziamo</em>
            <br />
            e <em className={styles.em}>facciamo evolvere</em>
            <br />
            prodotti per la cura
          </h1>

          <div className={styles.stats} role="list">
            <div className={styles.stat} role="listitem">
              <span className={styles.statValue}>1</span>
              <span className={styles.statLabel}>prodotto flagship</span>
            </div>
            <div className={styles.stat} role="listitem">
              <span className={styles.statValue}>100%</span>
              <span className={styles.statLabel}>focus sulla ricerca applicata</span>
            </div>
            <div className={styles.stat} role="listitem">
              <span className={styles.statValue}>∞</span>
              <span className={styles.statLabel}>miglioramento continuo</span>
            </div>
          </div>

          <p className={styles.lede}>
            Da sempre mettiamo al centro pazienti e operatori sanitari. Le
            trasformazioni che introduciamo sono profonde: accelerare
            l&apos;innovazione, migliorare l&apos;esperienza di cura e rafforzare
            l&apos;impatto clinico.
          </p>
          <p className={styles.ledeSecondary}>
            Qui la gerarchia è leggera e i team sono piccoli, concentrati e
            orientati al risultato. Operiamo con l&apos;urgenza di una startup e
            la responsabilità della ricerca in sanità.
          </p>
        </section>

        <section className={styles.products} aria-labelledby="products-heading">
          <h2 id="products-heading" className={styles.sectionTitle}>
            Prodotti
          </h2>

          <article className={styles.productCard}>
            <div className={styles.productCardInner}>
              <div className={styles.productHeader}>
                <img
                  src={mindWordmark}
                  alt="Ianua Mind"
                  className={styles.productLogo}
                  width={200}
                  height={72}
                />
              </div>
              <a className={styles.productCta} href="#">
                Tutti i miglioramenti
              </a>
              <ul className={styles.productBullets}>
                <li>Piattaforma in evoluzione continua</li>
                <li>Protocolli pensati con clinici e ricercatori</li>
                <li>Esperienza digitale coerente su tutti i dispositivi</li>
              </ul>
            </div>
          </article>
        </section>

        <section className={styles.tech} aria-labelledby="tech-heading">
          <h2 id="tech-heading" className={styles.sectionTitle}>
            Competenze distintive
          </h2>
          <div className={styles.techGrid}>
            <article className={styles.techCard}>
              <div className={styles.techOrb} aria-hidden />
              <h3 className={styles.techCardTitle}>Ricerca clinica</h3>
              <p className={styles.techCardText}>
                Metodologie rigorose per validare protocolli e risultati.
              </p>
            </article>
            <article className={styles.techCard}>
              <div className={`${styles.techOrb} ${styles.techOrbB}`} aria-hidden />
              <h3 className={styles.techCardTitle}>Design della cura</h3>
              <p className={styles.techCardText}>
                Interfacce e percorsi che riducono il carico cognitivo.
              </p>
            </article>
            <article className={styles.techCard}>
              <div className={`${styles.techOrb} ${styles.techOrbC}`} aria-hidden />
              <h3 className={styles.techCardTitle}>Dati e privacy</h3>
              <p className={styles.techCardText}>
                Governance e sicurezza come requisiti di base, non optional.
              </p>
            </article>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerTagline}>
          Ianua Care — <em className={styles.em}>aprire nuove porte</em> alla cura.
        </p>
        <p className={styles.footerLegal}>
          Pagina di anteprima interna. Non collegata dalla home pubblica.
        </p>
      </footer>
    </div>
  );
}
