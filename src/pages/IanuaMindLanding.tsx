import { IanuaMindHero } from "../components/sections/IanuaMindHero";
import { MindContact } from "../components/sections/MindContact";
import { MindFaq } from "../components/sections/MindFaq";
import { MindFeatureVideos } from "../components/sections/MindFeatureVideos";
import { MindFooter } from "../components/sections/MindFooter";
import { MindPricing } from "../components/sections/MindPricing";
import { MindTestimonials } from "../components/sections/MindTestimonials";
import { JsonLdOrganization } from "../components/seo/JsonLdOrganization";
import { PageMeta } from "../components/seo/PageMeta";
import { seoIanuaMindLanding } from "../seo/copy";
import styles from "./IanuaMindLanding.module.css";

/**
 * Landing page prodotto Ianua Mind — layout flat viola con hero, funzionalità, prezzi, FAQ, recensioni e contatti.
 */
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
        <MindFeatureVideos />
        <MindPricing />
        <MindFaq />
        <MindTestimonials />
        <MindContact />
        <MindFooter />
      </main>
    </div>
  );
}
