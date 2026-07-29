import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

import settingService from "../../services/settingService";

const SEO = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetchSEO();
  }, []);

  const fetchSEO = async () => {
    try {
      const data = await settingService.getSettings();
      setSettings(data);
    } catch (error) {
      console.error(error);
    }
  };

  const title = settings?.seoTitle?.trim()
    ? settings.seoTitle
    : `${settings?.fullName || "Portfolio"} | ${
        settings?.profession || "Developer"
      }`;

  const description = settings?.seoDescription?.trim()
    ? settings.seoDescription
    : "Portfolio website showcasing projects, skills and experience.";

  const keywords = settings?.seoKeywords?.length
    ? settings.seoKeywords.join(", ")
    : "Portfolio, MERN Developer";

  const image = settings?.profileImage?.url || "/favicon.ico";

  const url = window.location.href;

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title}</title>

      <meta name="description" content={description} />

      <meta name="keywords" content={keywords} />

      <meta name="author" content={settings?.fullName || "Portfolio"} />

      <meta name="robots" content="index, follow" />

      {/* Canonical */}
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />

      <meta property="og:title" content={title} />

      <meta property="og:description" content={description} />

      <meta property="og:image" content={image} />

      <meta property="og:url" content={url} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />

      <meta name="twitter:title" content={title} />

      <meta name="twitter:description" content={description} />

      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",

          name: settings?.fullName,

          jobTitle: settings?.profession,

          description: description,

          email: settings?.email,

          image: image,

          url: url,

          address: {
            "@type": "PostalAddress",
            addressLocality: settings?.location,
          },
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
