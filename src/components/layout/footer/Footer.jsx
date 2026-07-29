import { useEffect, useState } from "react";
import { ArrowUp, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

import settingService from "../../../services/settingService";
import socialService from "../../../services/socialService";

const Github = FaGithub;
const Linkedin = FaLinkedin;

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => {
  const [settings, setSettings] = useState(null);
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await settingService.getSettings();

        // Handles both response formats:
        // {settings: {...}} or {...}
        setSettings(res.settings || res);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchSocials = async () => {
      try {
        const res = await socialService.getSocials();
        setSocials(res.socials || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSettings();
    fetchSocials();
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const github = socials.find(
    (item) => item.platform?.toLowerCase() === "github",
  );

  const linkedin = socials.find(
    (item) => item.platform?.toLowerCase() === "linkedin",
  );

  return (
    <footer className="border-t border-zinc-800 py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">
            {settings?.name || "Vaibhav Singh"}
          </h2>

          <p className="mt-3 text-zinc-400">
            {settings?.heroTitle || "Full Stack MERN Developer"}
          </p>

          <p className="mt-2 text-zinc-500">
            {settings?.tagline ||
              "Building scalable and modern web applications."}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-zinc-400 transition hover:text-blue-500"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="mt-10 flex justify-center gap-5">
          {github && (
            <a href={github.url}>
              <Github className="w-5 h-5 text-zinc-300 hover:text-blue-500" />
            </a>
          )}

          {linkedin && (
            <a href={linkedin.url}>
              <Linkedin className="w-5 h-5 text-zinc-300 hover:text-blue-500" />
            </a>
          )}

          {settings?.email && (
            <a href={`mailto:${settings.email}`}>
              <Mail className="w-5 h-5 text-zinc-300 hover:text-blue-500" />
            </a>
          )}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={scrollTop}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-5 py-2 text-zinc-300 transition hover:border-blue-500 hover:text-blue-400"
          >
            <ArrowUp size={18} />
            Back to Top
          </button>
        </div>

        <p className="mt-10 text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} {settings?.name || "Vaibhav Singh"}. All
          Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
