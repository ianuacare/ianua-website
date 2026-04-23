import { absoluteUrl, getSiteOrigin } from "../../seo/site";

/** JSON-LD Organization + WebSite coerenti con footer e contenuto home (italiano). */
export function JsonLdOrganization() {
  const origin = getSiteOrigin();
  const logoUrl = absoluteUrl("/logo.svg");

  const json = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${origin}/#organization`,
        name: "Ianua",
        url: `${origin}/`,
        logo: logoUrl,
        email: "info@ianua.it",
        contactPoint: [
          {
            "@type": "ContactPoint",
            email: "info@ianua.it",
            contactType: "customer service",
            areaServed: "IT",
            availableLanguage: ["Italian"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        name: "Ianua",
        url: `${origin}/`,
        inLanguage: "it-IT",
        publisher: { "@id": `${origin}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
