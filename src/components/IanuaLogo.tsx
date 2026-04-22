import styles from "./IanuaLogo.module.css";

/**
 * Logo vettoriale Ianua bianco (ianua_bianco.svg). Animazione hover via CSS.
 */
type IanuaLogoProps = {
  className?: string;
};

export function IanuaLogo({ className }: IanuaLogoProps) {
  return (
    <div
      className={[styles.wrap, className].filter(Boolean).join(" ")}
      tabIndex={0}
    >
      <svg
        className={styles.svg}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 170.73 58.96"
        role="img"
        aria-label="Ianua"
      >
        <title>Ianua</title>
        <g>
          <path className={styles.fill} d="M0,.96h11.11v36.59H0V.96Z" />
          <path
            className={styles.fill}
            d="M18.44,19.7C18.44,7.93,26.59,0,38.22,0s19.48,7.63,19.48,19.63v17.93h-10.22v-6.07c-1.93,4.52-6.07,7.04-11.33,7.04-8.15,0-17.7-6.07-17.7-18.81ZM46.59,19.26c0-5.26-3.41-8.89-8.44-8.89s-8.44,3.63-8.44,8.89,3.41,8.89,8.44,8.89,8.44-3.63,8.44-8.89Z"
          />
          <path
            className={styles.fill}
            d="M126.51,21.4v18.97c0,12.29-7.26,18.58-18.07,18.58s-18.07-6.22-18.07-18.58v-21.78c0-5.78-2.81-8.22-6.95-8.22s-6.96,2.44-6.96,8.22v18.96h-11.11v-18.96C65.33,6.29,72.58,0,83.4,0s18.06,6.22,18.06,18.59v21.78c0,5.77,2.82,8.21,6.96,8.21s6.96-2.44,6.96-8.21v-18.97h11.11Z"
          />
          <path
            className={styles.fill}
            d="M131.48,19.7c0-11.78,8.15-19.7,19.78-19.7s19.48,7.63,19.48,19.63v17.93h-10.22v-6.07c-1.93,4.52-6.07,7.04-11.33,7.04-8.15,0-17.7-6.07-17.7-18.81ZM159.62,19.26c0-5.26-3.41-8.89-8.44-8.89s-8.44,3.63-8.44,8.89,3.41,8.89,8.44,8.89,8.44-3.63,8.44-8.89Z"
          />
        </g>
      </svg>
    </div>
  );
}
