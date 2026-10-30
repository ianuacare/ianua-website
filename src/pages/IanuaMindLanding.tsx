import { IanuaMindHero } from "../components/sections/IanuaMindHero";
import { MindComingSoon } from "../components/sections/MindComingSoon";
import { MindContact } from "../components/sections/MindContact";
import { MindFaq } from "../components/sections/MindFaq";
import { MindFeatures } from "../components/sections/MindFeatures";
import { MindFlow } from "../components/sections/MindFlow";
import { MindFooter } from "../components/sections/MindFooter";
import { MindTrust } from "../components/sections/MindTrust";
import { JsonLdOrganization } from "../components/seo/JsonLdOrganization";
import { PageMeta } from "../components/seo/PageMeta";
import { seoIanuaMindLanding } from "../seo/copy";
import styles from "./IanuaMindLanding.module.css";

/**
 * Landing prodotto Ianua Mind: apertura, funzionalità animate, percorso, sicurezza, FAQ e contatti.
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
        <MindFeatures />
        <MindFlow />
        <MindComingSoon />
        <MindTrust />
        <MindFaq />
        <MindContact />
        <MindFooter />
      </main>
    </div>
  );
}
