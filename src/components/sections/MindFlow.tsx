import { useEffect } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { mindFlow } from "../../copy/ianuaMindLanding";
import styles from "./MindFlow.module.css";

const waveWidth = 1200;
const curveHeight = 80;
/** Margine sopra e sotto, così il bagliore del punto non viene tagliato. */
const padY = 40;
const waveHeight = curveHeight + padY * 2;
/** Un ciclo e mezzo: i tre estremi cadono sopra il centro delle tre card. */
const cycles = 1.5;

function waveY(progress: number) {
  return padY + curveHeight / 2 + Math.sin(progress * Math.PI * 2 * cycles) * curveHeight * 0.32;
}

function sinePath() {
  const steps = 96;
  let path = "";
  for (let index = 0; index <= steps; index += 1) {
    const t = index / steps;
    const x = t * waveWidth;
    path += `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${waveY(t).toFixed(1)}`;
  }
  return path;
}

const wave = sinePath();

function waveTop(progress: number) {
  return `${(waveY(progress) / waveHeight) * 100}%`;
}

function Light({ still }: { still: boolean }) {
  const progress = useMotionValue(still ? 1 / 6 : 0);
  const left = useTransform(progress, (value) => `${value * 100}%`);
  const top = useTransform(progress, waveTop);
  const opacity = useTransform(progress, [0, 0.06, 0.94, 1], [0, 1, 1, 0]);

  useEffect(() => {
    if (still) {
      progress.set(1 / 6);
      return;
    }
    const controls = animate(progress, [0, 1], {
      duration: 7,
      ease: "linear",
      repeat: Infinity,
    });
    return () => controls.stop();
  }, [progress, still]);

  return (
    <motion.span
      className={styles.light}
      style={still ? { left, top, opacity: 1 } : { left, top, opacity }}
    />
  );
}

/**
 * I tre passaggi del lavoro clinico con Ianua Mind.
 * La sinusoide resta ferma sopra le card; un punto di luce la percorre.
 */
export function MindFlow() {
  const still = useReducedMotion() ?? false;

  return (
    <section id="percorso" className={styles.section} aria-labelledby="mind-flow-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="mind-flow-heading" className={styles.title}>
            {mindFlow.title}
          </h2>
          <p className={styles.lead}>{mindFlow.lead}</p>
        </header>
        <div className={styles.waveSlot} aria-hidden="true">
          <svg className={styles.wave} viewBox={`0 0 ${waveWidth} ${waveHeight}`} preserveAspectRatio="none">
            <path d={wave} fill="none" stroke="currentColor" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
          </svg>
          <Light still={still} />
        </div>
        <ol className={styles.steps}>
          {mindFlow.steps.map((step, index) => (
            <li key={step.id} className={styles.step}>
              <span className={styles.index}>{index + 1}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepBody}>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
