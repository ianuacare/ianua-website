import gdprMark from "../../assets/images/gdpr-mark.png";
import { mindTrust } from "../../copy/ianuaMindLanding";
import styles from "./MindTrust.module.css";

/**
 * Garanzie su dati, archivio e prova del prodotto.
 */
export function MindTrust() {
  return (
    <section id="sicurezza" className={styles.section} aria-labelledby="mind-trust-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <div>
            <h2 id="mind-trust-heading" className={styles.title}>
              {mindTrust.title}
            </h2>
            <p className={styles.lead}>{mindTrust.lead}</p>
          </div>
          <img
            className={styles.gdpr}
            src={gdprMark}
            alt="GDPR, General Data Protection Regulation"
            width={640}
            height={240}
          />
        </header>
        <ul className={styles.list}>
          {mindTrust.items.map((item) => (
            <li key={item.id} className={styles.item}>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemBody}>{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
