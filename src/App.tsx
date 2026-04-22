import type { CSSProperties } from "react";
import bgDesktop from "./assets/images/bg-desktop.png";
import bgMobile from "./assets/images/bg-mobile.png";
import { IanuaLogo } from "./components/IanuaLogo";
import styles from "./App.module.css";

const bgVars = {
  "--bg-desktop": `url(${bgDesktop})`,
  "--bg-mobile": `url(${bgMobile})`,
} as CSSProperties;

export default function App() {
  return (
    <main className={styles.shell}>
      <div className={styles.bg} style={bgVars} aria-hidden />
      <div className={styles.inner}>
        <IanuaLogo />
        <p className={styles.tagline}>coming soon</p>
      </div>
    </main>
  );
}
