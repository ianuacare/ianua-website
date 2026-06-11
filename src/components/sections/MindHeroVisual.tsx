import heroPhoto from "../../assets/ianua-mind/hero-psicologa.png";
import styles from "./MindHeroVisual.module.css";

/**
 * Foto della psicologa che utilizza ianua-mind nell'hero della landing.
 */
export function MindHeroVisual() {
  return (
    <div className={styles.wrap}>
      <img
        src={heroPhoto}
        alt="Psicologa che utilizza la dashboard clinica ianua-mind al computer"
        className={styles.photo}
        width={700}
        height={525}
        decoding="async"
        fetchPriority="high"
      />
    </div>
  );
}
