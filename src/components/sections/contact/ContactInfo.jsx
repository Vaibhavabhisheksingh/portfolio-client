import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Download } from "lucide-react";

import { FaGithub, FaLinkedin, FaInstagram, FaXTwitter } from "react-icons/fa6";

import settingService from "../../../services/settingService";
import socialService from "../../../services/socialService";
import ErrorState from "../../common/ErrorState";

const ContactInfo = () => {
  const [settings, setSettings] = useState([]);
  const [socials, setSocials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(false);

      const [settingsRes, socialRes] = await Promise.all([
        settingService.getSettings(),
        socialService.getSocials(),
      ]);

      setSettings(settingsRes.settings);
      setSocials(socialRes.socials || []);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const getSocialLink = (platform) => {
    const social = socials.find(
      (item) => item.platform?.toLowerCase() === platform.toLowerCase(),
    );

    return social?.url || "#";
  };
  if (loading) {
    return (
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 animate-pulse">
        <div className="h-8 w-48 rounded bg-zinc-800" />

        <div className="mt-6 space-y-3">
          <div className="h-4 rounded bg-zinc-800" />
          <div className="h-4 rounded bg-zinc-800" />
          <div className="h-4 w-3/4 rounded bg-zinc-800" />
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <ErrorState
        title="Couldn't load contact information"
        message="Please try again."
        onRetry={fetchData}
      />
    );
  }

  return (
    <div
      className="
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900/60
        backdrop-blur-xl
        p-8
      "
    >
      <h2 className="text-3xl font-bold text-white">Get in Touch</h2>

      <p className="mt-4 text-zinc-400 leading-8">
        {/* I'm always open to discussing internship opportunities,
        freelance projects, collaborations, or simply connecting
        with fellow developers. */}
        {settings?.about ||
          " I'm always open to discussing internship opportunities, freelance projects, collaborations, or simply connecting with fellow developers."}
      </p>

      <div className="mt-10 space-y-6">
        <div className="flex items-center gap-4">
          <Mail className="text-blue-500" />
          <span className="text-zinc-300">
            {settings?.email || "Not Available"}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Phone className="text-blue-500" />
          <span className="text-zinc-300">
            {settings?.phone || "Not Available"}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <MapPin className="text-blue-500" />
          <span className="text-zinc-300">
            {settings?.location || "Not Available"}
          </span>
        </div>
      </div>

      <div className="mt-10 flex gap-4">
        {getSocialLink("github") !== "#" && (
          <a
            href={getSocialLink("github")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-zinc-700 p-3 transition hover:border-blue-500"
          >
            <FaGithub className="text-white" />
          </a>
        )}

        {getSocialLink("linkedin") !== "#" && (
          <a
            href={getSocialLink("linkedin")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-zinc-700 p-3 transition hover:border-blue-500"
          >
            <FaLinkedin className="text-white" />
          </a>
        )}

        {getSocialLink("twitter") !== "#" && (
          <a
            href={getSocialLink("twitter")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-zinc-700 p-3 transition hover:border-blue-500"
          >
            <FaXTwitter className="text-white" />
          </a>
        )}
        {getSocialLink("instagram") !== "#" && (
          <a
            href={getSocialLink("instagram")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-zinc-700 p-3 transition hover:border-blue-500"
          >
            <FaInstagram className="text-white" />
          </a>
        )}
      </div>

      <a
        href={settings?.resume?.url || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className={`
        mt-10
        inline-flex
        items-center
        gap-3
        rounded-xl
        bg-blue-600
        px-6
        py-3
        text-white
        transition
        hover:bg-blue-700
    ${!settings?.resume?.url ? "pointer-events-none opacity-50" : ""}
  `}
      >
        <Download size={18} />
        Download Resume
      </a>
    </div>
  );
};

export default ContactInfo;
