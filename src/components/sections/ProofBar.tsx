import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { proofBar } from "../../copy/home";
import { useCountUp } from "../../hooks/useCountUp";
import { easeOut } from "./_motion";
import styles from "./ProofBar.module.css";

function MetricValue({ display, inView }: { display: string; inView: boolean }) {
  const numeric = display.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!numeric) {
    return <span className={styles.value}>{display}</span>;
  }
  const target = parseFloat(numeric[1]);
  const suffix = numeric[2] ?? "";
  return <AnimatedNumber value={target} suffix={suffix} enabled={inView} />;
}

function AnimatedNumber({
  value,
  suffix,
  enabled,
}: {
  value: number;
  suffix: string;
  enabled: boolean;
}) {
  const reduce = useReducedMotion();
  const decimals = value % 1 === 0 ? 0 : 1;
  const current = useCountUp(value, {
    duration: 1600,
    decimals,
    enabled: enabled && !reduce,
  });
  return (
    <span className={styles.value}>
      {reduce ? value : current}
      <span className={styles.suffix}>{suffix}</span>
    </span>
  );
}

export function ProofBar() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section ref={ref} className={styles.proof} aria-label="Numeri Ianua">
      <div className={styles.inner}>
        {proofBar.metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            className={styles.metric}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, delay: 0.05 + i * 0.08, ease: easeOut }}
          >
            <MetricValue display={metric.value} inView={inView} />
            <p className={styles.label}>{metric.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
