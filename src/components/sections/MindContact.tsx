import type { FormEvent } from "react";
import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { mindContact } from "../../copy/ianuaMindLanding";
import { easeOut } from "./_motion";
import styles from "./MindContact.module.css";

type SubmitStatus = "idle" | "loading" | "success" | "error";

const contactEndpoint =
  import.meta.env.VITE_CONTACT_API_URL?.trim() || "/api/send-contact";

/**
 * Sezione contatti con modulo per la landing Ianua Mind.
 */
export function MindContact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduceMotion = useReducedMotion();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return;

    setSubmitStatus("loading");
    try {
      const res = await fetch(contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          name: name.trim(),
          message: message.trim(),
          source: "ianua-mind-landing",
        }),
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
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setSubmitStatus("error");
    }
  };

  const hint =
    submitStatus === "loading"
      ? mindContact.form.loading
      : submitStatus === "success"
        ? mindContact.form.success
        : submitStatus === "error"
          ? mindContact.form.error
          : mindContact.form.hint;

  return (
    <section
      ref={ref}
      id="contatti"
      className={styles.section}
      aria-labelledby="mind-contact-heading"
    >
      <div className={styles.inner}>
        <motion.div
          className={styles.left}
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.55, ease: easeOut }}
        >
          <p className={styles.eyebrow}>{mindContact.eyebrow}</p>
          <h2 id="mind-contact-heading" className={styles.title}>
            {mindContact.title}
          </h2>
          <p className={styles.body}>{mindContact.body}</p>

          <div className={styles.details}>
            <a href={`mailto:${mindContact.email}`} className={styles.detailLink}>
              <span className={styles.detailLabel}>Email</span>
              <span className={styles.detailValue}>{mindContact.email}</span>
            </a>
            <a href={`tel:${mindContact.phone.replace(/\s/g, "")}`} className={styles.detailLink}>
              <span className={styles.detailLabel}>Telefono</span>
              <span className={styles.detailValue}>{mindContact.phone}</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          className={styles.right}
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.55, delay: reduceMotion ? 0 : 0.1, ease: easeOut }}
        >
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="mind-contact-name">
                {mindContact.form.nameLabel}
              </label>
              <input
                id="mind-contact-name"
                className={styles.input}
                type="text"
                autoComplete="name"
                placeholder={mindContact.form.namePlaceholder}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (submitStatus === "error") setSubmitStatus("idle");
                }}
                disabled={submitStatus === "loading"}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="mind-contact-email">
                {mindContact.form.emailLabel}
              </label>
              <input
                id="mind-contact-email"
                className={styles.input}
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder={mindContact.form.emailPlaceholder}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (submitStatus === "error") setSubmitStatus("idle");
                }}
                disabled={submitStatus === "loading"}
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="mind-contact-message">
                {mindContact.form.messageLabel}
              </label>
              <textarea
                id="mind-contact-message"
                className={styles.textarea}
                rows={4}
                placeholder={mindContact.form.messagePlaceholder}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (submitStatus === "error") setSubmitStatus("idle");
                }}
                disabled={submitStatus === "loading"}
              />
            </div>

            <button
              type="submit"
              className={styles.submit}
              disabled={submitStatus === "loading"}
            >
              {mindContact.form.submit}
            </button>

            <p className={styles.hint} role="status" aria-live="polite">
              {hint}
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
