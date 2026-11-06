import { useRef, useState, type FormEvent } from "react";
import { mindComingSoon } from "../../copy/ianuaMindLanding";
import { sendContactEmail } from "../../lib/emailjsContact";
import styles from "./MindComingSoon.module.css";

// No release dates are asserted: these entries describe current product availability.
const available = [
  { id: "meeting", title: "Colloqui online direttamente in piattaforma", body: "Organizza e avvia i meeting con i tuoi pazienti direttamente da Ianua Mind, senza passare ad altre applicazioni." },
  { id: "fatturazione", title: "Fatturazione con invio al Sistema Tessera Sanitaria", body: "Crea e gestisci le fatture del tuo studio e invia i dati delle spese sanitarie al Sistema Tessera Sanitaria, tutto da Ianua Mind." },
  { id: "agente-letteratura", title: "Un agente AI per la ricerca nella letteratura scientifica", body: "Approfondisci i tuoi quesiti clinici con un agente che ricerca nella letteratura scientifica e ti aiuta a esplorare le evidenze rilevanti per il tuo lavoro." },
  { id: "sedute", title: "Dalla seduta alla sintesi", body: "Registrazione e trascrizione delle sedute, riassunti automatici, marcatori emotivi e temi ricorrenti." },
  { id: "percorso", title: "Il percorso in un unico spazio", body: "Evoluzione del percorso terapeutico, questionari, second opinion, anamnesi e genogramma." },
];

export function MindComingSoon() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const sending = useRef(false);
  const [validation, setValidation] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!message) {
      setValidation("Descrivi la funzionalità che vorresti proporre.");
      form.querySelector<HTMLTextAreaElement>("textarea")?.focus();
      return;
    }
    sending.current = true;
    setValidation("");
    setStatus("loading");
    try {
      await sendContactEmail({ email, message, source: "ianua-mind-feature-request" });
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      sending.current = false;
    }
  }

  return (
    <section id="novita" className={styles.section} aria-labelledby="mind-news-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="mind-news-heading" className={styles.title}>{mindComingSoon.title}</h2>
          <p className={styles.subtitle}>{mindComingSoon.subtitle}</p>
        </header>
        <div className={styles.layout}>
          <ol className={styles.timeline} aria-label="Evoluzione delle funzionalità">
            <li className={`${styles.stage} ${styles.available}`}>
              <p className={styles.badge}>Già disponibile</p>
              <h3 className={styles.stageTitle}>Gli strumenti di oggi</h3>
              <ul className={styles.entries}>
                {available.map(item => <li key={item.id}>
                  <h4 className={styles.itemTitle}>{item.title}</h4>
                  <p className={styles.itemBody}>{item.body}</p>
                </li>)}
              </ul>
            </li>
            <li className={styles.stage}>
              <p className={styles.badge}>{mindComingSoon.badge}</p>
              <h3 className={styles.stageTitle}>I prossimi passi</h3>
              <ul className={styles.entries}>
                {mindComingSoon.items.map(item => <li key={item.id}>
                  <h4 className={styles.itemTitle}>{item.title}</h4>
                  <p className={styles.itemBody}>{item.body}</p>
                </li>)}
              </ul>
              <p className={styles.note}>Le funzionalità in sviluppo non sono ancora disponibili. Le date di rilascio saranno comunicate qui.</p>
            </li>
          </ol>
          <aside id="proponi-funzionalita" className={styles.suggestion} aria-labelledby="mind-suggestion-heading">
            <h3 id="mind-suggestion-heading" className={styles.formTitle}>Cosa ti sarebbe utile?</h3>
            <p className={styles.itemBody}>Raccontaci quale funzionalità migliorerebbe il tuo lavoro quotidiano.</p>
            <form className={styles.form} onSubmit={submit} aria-busy={status === "loading"}>
              <label htmlFor="mind-suggestion-email">La tua email</label>
              <input id="mind-suggestion-email" name="email" type="email" autoComplete="email" placeholder="nome@studio.it" maxLength={254} required disabled={status === "loading"} />
              <label htmlFor="mind-suggestion-message">La tua proposta</label>
              <textarea id="mind-suggestion-message" name="message" rows={5} placeholder="Mi sarebbe utile poter…" maxLength={3000} required disabled={status === "loading"} aria-describedby="mind-suggestion-hint" onChange={() => { setValidation(""); if (status !== "loading") setStatus("idle"); }} />
              <p id="mind-suggestion-hint" className={styles.note}>Descrivi l’idea senza inserire dati di pazienti o informazioni cliniche personali.</p>
              <button type="submit" disabled={status === "loading"}>{status === "loading" ? "Invio in corso…" : "Invia proposta"}</button>
              <p className={styles.feedback} role="status" aria-live="polite">
                {validation || (status === "success" ? "Grazie! La tua proposta è stata inviata al team Ianua Mind." : status === "error" ? <>Invio non riuscito. Riprova oppure scrivici a <a href="mailto:ianuacare@gmail.com">ianuacare@gmail.com</a>.</> : "Leggiamo ogni proposta per orientare i prossimi sviluppi.")}
              </p>
            </form>
          </aside>
        </div>
      </div>
    </section>
  );
}
