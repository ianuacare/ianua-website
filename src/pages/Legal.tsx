import { Link } from "react-router-dom";
import { PageMeta } from "../components/seo/PageMeta";
import type { LegalDocument } from "../copy/legal";
import styles from "./Legal.module.css";

/** Pagina di un testo legale (informativa privacy, termini). */
export default function Legal({ doc }: { doc: LegalDocument }) {
  return (
    <main className={styles.page}>
      <PageMeta title={`${doc.title} — Ianua Mind`} description={doc.description} canonicalPath={doc.path} />
      <article className={styles.article}>
        <Link to="/ianua-mind" className={styles.back}>
          ← Torna a Ianua Mind
        </Link>
        <h1 className={styles.title}>{doc.title}</h1>
        <p className={styles.meta}>
          Ultimo aggiornamento: {doc.updatedAt} · versione {doc.version}
        </p>
        {doc.sections.map((section) => (
          <section key={section.title} className={styles.section}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            {section.paragraphs.map((p) => (
              <p key={p} className={styles.paragraph}>
                {p}
              </p>
            ))}
          </section>
        ))}
      </article>
    </main>
  );
}
