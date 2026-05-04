import { IanuaLogo } from "../components/IanuaLogo";
import { PageMeta } from "../components/seo/PageMeta";
import { seoComingSoon } from "../seo/copy";
import { brandBackdropVars } from "../styles/brandBackdrop";
import styles from "../App.module.css";

export default function ComingSoon() {
  return (
    <main className={styles.shell}>
      <PageMeta
        title={seoComingSoon.title}
        description={seoComingSoon.description}
        canonicalPath="/coming-soon"
      />
      <div className={styles.bg} style={brandBackdropVars} aria-hidden />
      <div className={styles.inner}>
        <IanuaLogo tone="paper" />
        <p className={styles.tagline}>coming soon</p>
      </div>
    </main>
  );
}
