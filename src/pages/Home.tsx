import { Hero } from "../components/sections/Hero";
import { ProofBar } from "../components/sections/ProofBar";
import { MindPainPoints } from "../components/sections/MindPainPoints";
import { HowItWorks } from "../components/sections/HowItWorks";
import { MindFeatureStack } from "../components/sections/MindFeatureStack";
import { ProductsEcosystem } from "../components/sections/ProductsEcosystem";
import { Approach } from "../components/sections/Approach";
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
        <MindPainPoints />
        <HowItWorks />
        <MindFeatureStack />
        <ProductsEcosystem />
        <Approach />
        <ContactBand />
        <SiteFooter />
      </main>
    </div>
  );
}
