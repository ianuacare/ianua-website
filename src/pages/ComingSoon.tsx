import type { CSSProperties } from "react";
import bgDesktop from "../assets/images/bg-desktop.png";
import bgMobile from "../assets/images/bg-mobile.png";
import { IanuaLogo } from "../components/IanuaLogo";
import { PageMeta } from "../components/seo/PageMeta";
import { seoComingSoon } from "../seo/copy";
import styles from "../App.module.css";

const bgVars = {
  "--bg-desktop": `url(${bgDesktop})`,
  "--bg-mobile": `url(${bgMobile})`,
} as CSSProperties;

export default function ComingSoon() {
  return (
    <main className={styles.shell}>
      <PageMeta
        title={seoComingSoon.title}
        description={seoComingSoon.description}
        canonicalPath="/coming-soon"
      />
      <div className={styles.bg} style={bgVars} aria-hidden />
      <div className={styles.inner}>
        <IanuaLogo tone="paper" />
        <p className={styles.tagline}>coming soon</p>
      </div>
    </main>
  );
}
