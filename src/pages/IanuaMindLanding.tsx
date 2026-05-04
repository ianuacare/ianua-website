import { IanuaMindHero } from "../components/sections/IanuaMindHero";
import { MindPainPoints } from "../components/sections/MindPainPoints";
import { HowItWorks } from "../components/sections/HowItWorks";
import { MindFeatureStack } from "../components/sections/MindFeatureStack";
import { ContactBand } from "../components/sections/ContactBand";
import { SiteFooter } from "../components/sections/SiteFooter";
import { JsonLdOrganization } from "../components/seo/JsonLdOrganization";
import { PageMeta } from "../components/seo/PageMeta";
import { seoIanuaMindLanding } from "../seo/copy";
import styles from "./Home.module.css";

export default function IanuaMindLanding() {
  return (
    <div className={styles.page}>
      <PageMeta
        title={seoIanuaMindLanding.title}
        description={seoIanuaMindLanding.description}
        canonicalPath="/ianua-mind"
      />
      <JsonLdOrganization />
      <a href="#main-content" className={styles.skipLink}>
        Vai al contenuto
      </a>
      <main id="main-content" tabIndex={-1}>
        <IanuaMindHero />
        <MindPainPoints />
        <HowItWorks />
        <MindFeatureStack />
        <ContactBand />
        <SiteFooter />
      </main>
    </div>
  );
}
