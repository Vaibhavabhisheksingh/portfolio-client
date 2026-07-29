import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";

import settingService from "../../services/settingService";
import socialService from "../../services/socialService";

const StructuredData = () => {
  const [settings, setSettings] = useState(null);
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [settingRes, socialRes] = await Promise.all([
        settingService.getSettings(),
        socialService.getSocials(),
      ]);

      setSettings(settingRes.settings);
      setSocials(socialRes.socials || []);
    } catch (err) {
      console.error(err);
    }
  };

  const sameAs = socials
    .map((social) => social.url)
    .filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: settings?.fullName,
    jobTitle: settings?.profession,
    description: settings?.tagline,
    email: settings?.email,
    telephone: settings?.phone,
    image: settings?.profileImage?.url,
    url: window.location.origin,
    sameAs,
    address: {
      "@type": "PostalAddress",
      addressLocality: settings?.location,
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
};

export default StructuredData;