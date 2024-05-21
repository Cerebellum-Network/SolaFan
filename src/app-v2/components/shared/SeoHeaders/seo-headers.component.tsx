import {DEFAULT_LANGUAGE, webAppUrl} from 'config/common';
import {Helmet} from 'react-helmet';

interface ISeoHeadersParams {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  localizations: {
    link: string;
    locale?: string;
  }[];
}

export const AppMetaTags = ({title, description, canonical, image, localizations = []}: ISeoHeadersParams) => {
  const canonicalLink = canonical || window.location.href;
  const defaultLocalization = localizations?.find(({locale}) => locale === DEFAULT_LANGUAGE);
  const {origin} = window.location;

  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      <meta name="robots" content="follow, index" />
      <link rel="canonical" href={canonicalLink} />
      <meta property="og:type" content="website" />
      {title && <meta property="og:title" content={title} />}
      <meta property="og:description" content={description} />
      <meta property="og:url" content={webAppUrl()} />
      {image && <meta property="og:image" content={image} />}
      {image && <meta property="og:image:width" content="1200" />}
      {image && <meta property="og:image:height" content="630" />}

      <meta name="twitter:card" content="summary_large_image" />
      {title && <meta name="twitter:title" content={title} />}
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content="@onDavinciNFT" />
      <meta name="twitter:creator" content="@onDavinciNFT" />
      {image && <meta name="twitter:image" content={image} />}

      {localizations?.map((localization) => (
        <link
          key={localization.locale}
          rel="alternate"
          hrefLang={localization.locale}
          href={`${origin}${localization.link}`}
        />
      ))}

      {defaultLocalization && (
        <link rel="alternate" hrefLang="x-default" href={`${origin}${defaultLocalization.link}`} />
      )}
    </Helmet>
  );
};
