import logoBianco from "../assets/branding/Ianuamind_bianco.svg";
import logoViola from "../assets/branding/IanuaMind_viola.svg";
import styles from "./IanuaMindWordmark.module.css";

type IanuaMindWordmarkProps = {
  className?: string;
  /** Viola su sfondo chiaro; bianco su sfondo scuro/viola. */
  tone?: "purple" | "light";
};

/**
 * Wordmark Ianua Mind per la landing prodotto.
 */
export function IanuaMindWordmark({
  className,
  tone = "purple",
}: IanuaMindWordmarkProps) {
  const logo = tone === "light" ? logoBianco : logoViola;
  const wrapClass = [styles.wrap, className].filter(Boolean).join(" ");

  return (
    <div className={wrapClass}>
      <img
        src={logo}
        alt="Ianua Mind"
        className={styles.logo}
        width={155}
        height={55}
      />
    </div>
  );
}
