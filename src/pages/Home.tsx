import { Hero } from "../components/sections/Hero";
import { ProofBar } from "../components/sections/ProofBar";
import { ProductsEcosystem } from "../components/sections/ProductsEcosystem";
import { IanuacareCard } from "../components/sections/IanuacareCard";
import { Approach } from "../components/sections/Approach";
import { Audiences } from "../components/sections/Audiences";
import { ContactBand } from "../components/sections/ContactBand";
import { SiteFooter } from "../components/sections/SiteFooter";
import { JsonLdOrganization } from "../components/seo/JsonLdOrganization";
import { PageMeta } from "../components/seo/PageMeta";
import { seoHome } from "../seo/copy";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <PageMeta
        title={seoHome.title}
        description={seoHome.description}
        canonicalPath="/"
      />
      <JsonLdOrganization />
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
        <ContactBand />
        <SiteFooter />
      </main>
    </div>
  );
}
