import styles from "./MindDesk.module.css";

const WAVE = [0.35, 0.55, 0.82, 0.46, 0.96, 0.62, 0.4, 0.74, 0.52, 0.88, 0.44, 0.7, 0.36, 0.58];

const PATIENTS = [
  { name: "A. Rossi", meta: "Seduta 12", active: true },
  { name: "M. Bianchi", meta: "Seduta 4", active: false },
  { name: "L. Conti", meta: "Seduta 9", active: false },
];

/**
 * Illustrazione della dashboard: cartella, sintesi e andamento del percorso.
 * È decorativa: il testo vero sta nel titolo della hero.
 */
export function MindDesk() {
  return (
    <div className={styles.composition} aria-hidden="true">
      <div className={styles.desk}>
        <div className={styles.top}>
          <span>Cartella</span>
          <span className={styles.today}>Oggi</span>
        </div>

        <ul className={styles.patients}>
          {PATIENTS.map((patient) => (
            <li
              key={patient.name}
              className={patient.active ? styles.patientActive : styles.patient}
            >
              <span className={styles.avatar}>{patient.name.slice(0, 1)}</span>
              <span className={styles.patientName}>{patient.name}</span>
              <span className={styles.patientMeta}>{patient.meta}</span>
            </li>
          ))}
        </ul>

        <div className={styles.summary}>
          <p className={styles.summaryTitle}>Sintesi della seduta</p>
          <span className={styles.line} style={{ width: "92%" }} />
          <span className={styles.line} style={{ width: "74%" }} />
          <span className={styles.lineShort} />
        </div>

        <div className={styles.wave} aria-hidden="true">
          {WAVE.map((height, index) => (
            <span
              key={index}
              className={styles.bar}
              style={{ ["--h" as string]: String(height), ["--i" as string]: String(index) }}
            />
          ))}
        </div>
      </div>

      <aside className={styles.float}>
        <p className={styles.floatTitle}>Evoluzione</p>
        <div className={styles.mini}>
          {[42, 58, 50, 74, 92].map((height, index) => (
            <span
              key={height}
              className={index === 4 ? styles.miniOn : styles.miniBar}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </aside>
    </div>
  );
}
