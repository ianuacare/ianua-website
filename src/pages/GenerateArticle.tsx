import { useCallback, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { PageMeta } from "../components/seo/PageMeta";
import { seoGenerateArticle } from "../seo/copy";
import styles from "./GenerateArticle.module.css";

type ApiOk = {
  article: string;
};

type ApiErr = {
  error: string;
};

const API_PATH = "/api/generate-article";

export default function GenerateArticle() {
  const [prompt, setPrompt] = useState("");
  const [article, setArticle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setError(null);
      setArticle("");
      setLoading(true);

      try {
        const res = await fetch(API_PATH, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });

        const data = (await res.json()) as ApiOk & ApiErr;

        if (!res.ok) {
          setError(
            typeof data.error === "string"
              ? data.error
              : `Errore HTTP ${res.status}`,
          );
          return;
        }

        if (typeof data.article !== "string") {
          setError("Risposta API inattesa.");
          return;
        }

        setArticle(data.article);
      } catch {
        setError(
          "Impossibile contattare l’API. In produzione verifica il deploy e la variabile AI_GATEWAY_API_KEY. In locale usa `vercel dev` (non basta `npm run dev`).",
        );
      } finally {
        setLoading(false);
      }
    },
    [prompt],
  );

  return (
    <div className={styles.page}>
      <PageMeta
        title={seoGenerateArticle.title}
        description={seoGenerateArticle.description}
        canonicalPath="/generate-article"
        noIndex
      />

      <header className={styles.header}>
        <Link to="/" className={styles.back}>
          ← Torna alla home
        </Link>
        <h1 className={styles.title}>Genera articolo magazine</h1>
        <p className={styles.lead}>
          Descrivi tema, pubblico e angolo editoriale; il modello produce una
          bozza in Markdown pronta per revisione umana.
        </p>
      </header>

      <form className={styles.form} onSubmit={onSubmit}>
        <label className={styles.label} htmlFor="mag-prompt">
          Brief / prompt
        </label>
        <textarea
          id="mag-prompt"
          className={styles.textarea}
          rows={10}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Es. Articolo sul ruolo dell’IA nella documentazione clinica in ambito ambulatoriale, tono divulgativo, 800 parole circa…"
          required
          disabled={loading}
          spellCheck
        />

        <div className={styles.actions}>
          <button type="submit" className={styles.submit} disabled={loading}>
            {loading ? "Generazione…" : "Genera bozza"}
          </button>
        </div>
      </form>

      {error ? (
        <div className={styles.error} role="alert">
          {error}
        </div>
      ) : null}

      {article ? (
        <section className={styles.output} aria-label="Articolo generato">
          <h2 className={styles.outputTitle}>Output (Markdown)</h2>
          <pre className={styles.pre}>{article}</pre>
        </section>
      ) : null}
    </div>
  );
}
