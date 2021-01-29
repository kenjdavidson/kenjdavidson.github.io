import React, { FunctionComponent } from "react";
import { Helmet } from "react-helmet";
import useSiteMetadata from "../hooks/useSiteMetadata";

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const Seo: FunctionComponent<SEOProps> = ({
  title,
  description,
  image,
  url,
  type
}) => {
  const meta = useSiteMetadata();

  const seo = {
    title: title || meta.title,
    description: description || meta.description,
    image:
      (image && image.indexOf("http") === -1 && `${meta.siteUrl}${image}`) ||
      meta.image,
    url: `${meta.siteUrl}${url || "/"}`,
    type: type || "website"
  };

  return (
    <Helmet>
      <title>{seo.title}</title>

      <meta name="description" content={seo.description} />
      {seo.image && <meta name="image" content={seo.image} />}

      <meta property="og:title" content={seo.title} />
      <meta property="og:type" content={seo.type} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:site_name" content={seo.title} />
      {seo.url && <meta property="og:url" content={seo.url} />}
      {seo.image && <meta property="og:image" content={seo.image} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      {meta.twitterUsername && (
        <meta name="twitter:creator" content={meta.twitterUsername} />
      )}
      {seo.image && <meta name="twitter:image" content={seo.image} />}
    </Helmet>
  );
};
