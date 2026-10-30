import type { MindScene } from "../../copy/ianuaMindLanding";
import styles from "./MindScenes.module.css";

type MindScenesProps = {
  scene: MindScene;
};

const WAVE = [0.4, 0.7, 1, 0.55, 0.85, 0.45, 0.95, 0.6, 0.75, 0.5, 0.88, 0.42];

/**
 * Grafica animata della funzionalità selezionata. Decorativa: la spiegazione
 * è nel testo accanto.
 */
export function MindScenes({ scene }: MindScenesProps) {
  return (
    <div className={styles.frame} data-scene={scene}>
      {scene === "session" ? <Session /> : null}
      {scene === "summary" ? <Summary /> : null}
      {scene === "markers" ? <Markers /> : null}
      {scene === "path" ? <Path /> : null}
      {scene === "forms" ? <Forms /> : null}
      {scene === "chat" ? <Chat /> : null}
      {scene === "history" ? <History /> : null}
      {scene === "geno" ? <Geno /> : null}
    </div>
  );
}

function Session() {
  return (
    <>
      <div className={styles.wave}>
        {WAVE.map((height, index) => (
          <span
            key={index}
            className={styles.bar}
            style={{ ["--h" as string]: String(height), ["--i" as string]: String(index) }}
          />
        ))}
      </div>
      <div className={styles.stack}>
        <span className={styles.rule} style={{ width: "100%", ["--i" as string]: "0" }} />
        <span className={styles.rule} style={{ width: "86%", ["--i" as string]: "1" }} />
        <span className={styles.rule} style={{ width: "93%", ["--i" as string]: "2" }} />
        <span className={styles.rule} style={{ width: "54%", ["--i" as string]: "3" }} />
      </div>
    </>
  );
}

function Summary() {
  return (
    <>
      <div className={styles.ghost}>
        <span className={styles.rule} style={{ width: "100%" }} />
        <span className={styles.rule} style={{ width: "92%" }} />
        <span className={styles.rule} style={{ width: "80%" }} />
        <span className={styles.rule} style={{ width: "88%" }} />
      </div>
      <div className={styles.card}>
        <p className={styles.cardTitle}>Sintesi</p>
        <span className={styles.ruleLight} style={{ width: "100%" }} />
        <span className={styles.ruleLight} style={{ width: "78%" }} />
        <span className={styles.ruleLight} style={{ width: "46%" }} />
      </div>
    </>
  );
}

function Markers() {
  const rows = [
    [true, false, true],
    [false, true, false],
    [true, true, false],
    [false, false, true],
  ];

  return (
    <div className={styles.markerList}>
      {rows.map((pips, row) => (
        <div key={row} className={styles.markerRow} style={{ ["--i" as string]: String(row) }}>
          <span className={styles.rule} style={{ width: `${58 + row * 8}%` }} />
          <span className={styles.pips}>
            {pips.map((on, index) => (
              <i key={index} className={on ? styles.pipOn : styles.pip} />
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}

function Path() {
  const heights = [34, 48, 42, 63, 58, 76, 70, 92];
  return (
    <div className={styles.columns}>
      {heights.map((height, index) => (
        <span
          key={height}
          className={index === heights.length - 1 ? styles.columnOn : styles.column}
          style={{ ["--h" as string]: `${height}%`, ["--i" as string]: String(index) }}
        />
      ))}
    </div>
  );
}

function Forms() {
  const items = ["Umore", "Sonno", "Energia", "Relazioni"];
  return (
    <div className={styles.checks}>
      {items.map((item, index) => (
        <div key={item} className={styles.check} style={{ ["--i" as string]: String(index) }}>
          <span className={styles.box}>
            <i />
          </span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

function Chat() {
  return (
    <div className={styles.chat}>
      <div className={styles.bubbleIn} style={{ ["--i" as string]: "0" }}>
        <span className={styles.rule} style={{ width: "100%" }} />
        <span className={styles.rule} style={{ width: "70%" }} />
      </div>
      <div className={styles.bubbleOut} style={{ ["--i" as string]: "1" }}>
        <span className={styles.ruleLight} style={{ width: "100%" }} />
      </div>
      <div className={styles.bubbleIn} style={{ ["--i" as string]: "2" }}>
        <span className={styles.rule} style={{ width: "84%" }} />
      </div>
    </div>
  );
}

function History() {
  const fields = [
    ["Motivo", "78%"],
    ["Storia", "64%"],
    ["Contesto", "86%"],
    ["Osservazioni", "52%"],
  ] as const;

  return (
    <div className={styles.fields}>
      {fields.map(([label, width], index) => (
        <div key={label} className={styles.field} style={{ ["--i" as string]: String(index) }}>
          <span className={styles.fieldLabel}>{label}</span>
          <span className={styles.fill} style={{ ["--w" as string]: width }} />
        </div>
      ))}
    </div>
  );
}

function Geno() {
  return (
    <div className={styles.geno}>
      <div className={styles.parents}>
        <span className={styles.node} style={{ ["--i" as string]: "0" }} />
        <span className={styles.node} style={{ ["--i" as string]: "1" }} />
        <span className={styles.nodeFill} style={{ ["--i" as string]: "2" }} />
      </div>
      <span className={styles.bridge} />
      <span className={styles.stem} />
      <span className={styles.nodeFill} style={{ ["--i" as string]: "3" }} />
    </div>
  );
}
