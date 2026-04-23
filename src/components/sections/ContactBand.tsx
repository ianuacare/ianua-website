import type { FormEvent } from "react";
import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { contact } from "../../copy/home";
import { EditorialText } from "../EditorialText";
import { easeOut } from "./_motion";
import styles from "./ContactBand.module.css";

type SubmitStatus = "idle" | "loading" | "success" | "error";

const contactEndpoint =
  import.meta.env.VITE_CONTACT_API_URL?.trim() || "/api/send-contact";

export function ContactBand() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const [email, setEmail] = useState("");
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;

    setSubmitStatus("loading");
    try {
      const res = await fetch(contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      let apiError = "";
      try {
        const data = (await res.json()) as { error?: string };
        if (typeof data?.error === "string") apiError = data.error;
      } catch {
        /* risposta non JSON */
      }

      if (!res.ok) {
        throw new Error(apiError || `HTTP ${res.status}`);
      }

      setSubmitStatus("success");
      setEmail("");
    } catch {
      setSubmitStatus("error");
    }
  };

  const hint =
    submitStatus === "loading"
      ? "Invio in corso…"
      : submitStatus === "success"
        ? "Grazie. Abbiamo registrato la richiesta di contatto dal sito e ti ricontatteremo presto."
        : submitStatus === "error"
          ? "Non siamo riusciti a inviare la richiesta. Riprova tra poco oppure scrivici direttamente a info@ianua.it."
          : contact.hint;

  return (
    <section
      ref={ref}
      id="contatti"
      className={styles.section}
      aria-labelledby="contact-heading"
    >
      <div className={styles.aurora} aria-hidden />
      <div className={styles.inner}>
        <div className={styles.left}>
          <p className={styles.eyebrow}>
            <span className={styles.dash} aria-hidden />
            {contact.eyebrow}
          </p>
          <motion.h2
            id="contact-heading"
            className={styles.title}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.95, ease: easeOut }}
          >
            <EditorialText
              lines={contact.title}
              italicClassName={styles.italic}
              boldClassName={styles.titleStrong}
              lineClassName={styles.titleLine}
            />
          </motion.h2>
          <p className={styles.body}>
            <EditorialText
              lines={[contact.bodySegments]}
              boldClassName={styles.bodyStrong}
            />
          </p>
        </div>

        <motion.div
          className={styles.right}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.85, delay: 0.15, ease: easeOut }}
        >
          <a className={styles.directEmail} href={`mailto:${contact.email}`}>
            <span className={styles.directLabel}>scrivici</span>
            <span className={styles.directValue}>{contact.email}</span>
          </a>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <label className={styles.label} htmlFor="contact-email">
              oppure lasciaci la tua email
            </label>
            <div className={styles.inputRow}>
              <input
                id="contact-email"
                className={styles.input}
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder={contact.formPlaceholder}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (submitStatus === "error") setSubmitStatus("idle");
                }}
                disabled={submitStatus === "loading"}
                required
              />
              <button
                type="submit"
                className={styles.submit}
                disabled={submitStatus === "loading"}
              >
                <span>{contact.formCta}</span>
                <span aria-hidden>→</span>
              </button>
            </div>
            <p className={styles.hint} role="status" aria-live="polite">
              {hint}
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
