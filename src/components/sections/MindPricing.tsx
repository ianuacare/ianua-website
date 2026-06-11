import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { mindPricing, mindPricingSharedFeatures } from "../../copy/ianuaMindLanding";
import { easeOut } from "./_motion";
import styles from "./MindPricing.module.css";

function formatEuro(value: number): string {
  return value.toLocaleString("it-IT", {
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Sezione prezzi con cicli mensile, trimestrale e annuale.
 */
export function MindPricing() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      id="prezzi"
      className={styles.section}
      aria-labelledby="mind-pricing-heading"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{mindPricing.eyebrow}</p>
          <h2 id="mind-pricing-heading" className={styles.title}>
            {mindPricing.title}
          </h2>
          <p className={styles.subtitle}>{mindPricing.subtitle}</p>
        </header>

        <ul className={styles.grid}>
          {mindPricing.plans.map((plan, index) => (
            <motion.li
              key={plan.id}
              className={[styles.card, plan.highlighted ? styles.highlighted : ""]
                .filter(Boolean)
                .join(" ")}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.55, delay: reduceMotion ? 0 : index * 0.08, ease: easeOut }}
            >
              {plan.badge ? (
                <span className={styles.badge}>{plan.badge}</span>
              ) : null}
              <h3 className={styles.planName}>{plan.name}</h3>
              <p className={styles.price}>
                <span className={styles.amount}>€{formatEuro(plan.price)}</span>
              </p>
              <p className={styles.billing}>{plan.billingCycle}</p>

              {plan.monthlyEquivalent < mindPricing.monthlyReference ? (
                <p className={styles.equivalent}>
                  ≈ <strong>€{formatEuro(plan.monthlyEquivalent)}</strong>/mese
                </p>
              ) : (
                <p className={styles.equivalent}>
                  <strong>€{formatEuro(plan.monthlyEquivalent)}</strong>/mese
                </p>
              )}

              {plan.savingsEuro && plan.savingsPercent ? (
                <p className={styles.savings}>
                  Risparmi <strong>€{formatEuro(plan.savingsEuro)}</strong> (
                  {plan.savingsPercent}%)
                  {plan.id === "trimestrale" ? " ogni trimestre" : " all'anno"}
                  {" "}rispetto al mensile
                </p>
              ) : (
                <p className={styles.savingsMuted}>Nessun vincolo di durata</p>
              )}

              <a
                href={plan.cta.href}
                className={plan.highlighted ? styles.ctaPrimary : styles.ctaSecondary}
              >
                {plan.cta.label}
              </a>
            </motion.li>
          ))}
        </ul>

        <motion.div
          className={styles.featuresBlock}
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.55, delay: reduceMotion ? 0 : 0.25, ease: easeOut }}
        >
          <h3 className={styles.featuresTitle}>{mindPricing.featuresTitle}</h3>
          <ul className={styles.features}>
            {mindPricingSharedFeatures.map((feature) => (
              <li key={feature} className={styles.feature}>
                <span className={styles.check} aria-hidden>
                  ✓
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
