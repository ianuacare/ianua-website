import { Helmet } from "react-helmet-async";
import { absoluteUrl } from "../../seo/site";

type PageMetaProps = {
  title: string;
  description: string;
  canonicalPath: string;
};

export function PageMeta({ title, description, canonicalPath }: PageMetaProps) {
  const canonical = absoluteUrl(canonicalPath);
  const ogImage = absoluteUrl("/og-image.png");

  return (
    <Helmet>
      <html lang="it" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="it_IT" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
