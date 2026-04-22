import { Hero } from "../components/sections/Hero";
import { ProofBar } from "../components/sections/ProofBar";
import { ProductsEcosystem } from "../components/sections/ProductsEcosystem";
import { IanuacareCard } from "../components/sections/IanuacareCard";
import { Approach } from "../components/sections/Approach";
import { Audiences } from "../components/sections/Audiences";
import { InsightsTeaser } from "../components/sections/InsightsTeaser";
import { ContactBand } from "../components/sections/ContactBand";
import { SiteFooter } from "../components/sections/SiteFooter";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <a href="#main-content" className={styles.skipLink}>
        Vai al contenuto
      </a>
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <ProofBar />
        <ProductsEcosystem />
        <IanuacareCard />
        <Approach />
        <Audiences />
        <InsightsTeaser />
        <ContactBand />
        <SiteFooter />
      </main>
    </div>
  );
}
