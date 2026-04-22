import type { FormEvent } from "react";
import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { contact } from "../../copy/home";
import { EditorialText } from "../EditorialText";
import { easeOut } from "./_motion";
import styles from "./ContactBand.module.css";

export function ContactBand() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    const subject = encodeURIComponent("Richiesta di contatto — sito Ianua");
    const body = encodeURIComponent(`Email del mittente: ${email}`);
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

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
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className={styles.submit}>
                <span>{contact.formCta}</span>
                <span aria-hidden>→</span>
              </button>
            </div>
            <p className={styles.hint}>
              {submitted ? "Apertura del client mail in corso..." : contact.hint}
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
