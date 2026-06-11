import styles from "./IanuaMindWordmark.module.css";

type IanuaMindWordmarkProps = {
  className?: string;
};

/**
 * Wordmark ψ ianua-mind per la landing prodotto (fondo chiaro, viola pieno).
 */
export function IanuaMindWordmark({ className }: IanuaMindWordmarkProps) {
  const wrapClass = [styles.wrap, className].filter(Boolean).join(" ");

  return (
    <div className={wrapClass}>
      <svg
        className={styles.symbol}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 61.18 58.96"
        aria-hidden
      >
        <path d="M61.18,21.4v18.97c0,12.29-7.26,18.58-18.07,18.58s-18.07-6.22-18.07-18.58v-21.78c0-5.78-2.81-8.22-6.95-8.22s-6.96,2.44-6.96,8.22v18.96H0v-18.96C0,6.29,7.25,0,18.07,0s18.06,6.22,18.06,18.59v21.78c0,5.77,2.82,8.21,6.96,8.21s6.96-2.44,6.96-8.21v-18.97h11.11Z" />
      </svg>
      <span className={styles.text}>
        ianua<span className={styles.suffix}>-mind</span>
      </span>
    </div>
  );
}
