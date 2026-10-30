import { useRef, useState, type FormEvent } from "react";
import { sendContactEmail } from "../../lib/emailjsContact";
import { contact } from "../../copy/home";
import s from "../../pages/Home.module.css";

export function HomeContact() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const sending = useRef(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    sending.current = true;
    setStatus("sending");
    try {
      await sendContactEmail({ email: email.trim(), source: "home" });
      setEmail("");
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      sending.current = false;
    }
  }
  return (
    <section
      className={s.contact}
      id="contatti"
      aria-labelledby="contact-title"
    >
      <div className={s.contactGrid}>
        <div>
          <h2 id="contact-title">
            Il futuro della cura
            <br />
            ha bisogno di incontri.
          </h2>
          <p>
            Lavori in una struttura sanitaria, in uno studio privato o in un
            centro di ricerca? Raccontaci il tuo contesto. Esploriamo insieme
            ciò che possiamo rendere possibile.
          </p>
          <a className={s.email} href={`mailto:${contact.email}`}>
            {contact.email}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
        <form
          className={s.contactForm}
          onSubmit={submit}
          aria-busy={status === "sending"}
        >
          <label htmlFor="home-email">Oppure lasciaci la tua email.</label>
          <p>Ti risponderemo personalmente entro pochi giorni lavorativi.</p>
          <input
            id="home-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="La tua email professionale"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status !== "sending") setStatus("idle");
            }}
            disabled={status === "sending"}
            aria-describedby="contact-status"
          />
          <button type="submit" disabled={status === "sending"}>
            {status === "sending"
              ? "Invio in corso…"
              : "Iniziamo una conversazione"}
            <span aria-hidden="true">↗</span>
          </button>
          <p
            className={s.formHint}
            role="status"
            id="contact-status"
            aria-live="polite"
          >
            {status === "success"
              ? "Grazie. La tua richiesta è stata inviata. Ti ricontatteremo presto."
              : status === "error"
                ? "La richiesta non è stata inviata. Riprova oppure scrivici direttamente all’indirizzo email qui sopra."
                : "Solo una conversazione. Nessuna newsletter automatica."}
          </p>
        </form>
      </div>
    </section>
  );
}
