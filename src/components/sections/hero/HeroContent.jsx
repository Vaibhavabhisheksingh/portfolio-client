import { useEffect, useState } from "react";
import { motion } from "framer-motion";
// import heroData from "../../../data/heroData";
import { TypeAnimation } from "react-type-animation";

import settingService from "../../../services/settingService";

import HeroButtons from "./HeroButtons";
import SocialLinks from "./SocialLinks";

const HeroContent = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await settingService.getSettings();
      setSettings(data);
    } catch (error) {
      console.error("Failed to load settings:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-6 w-40 animate-pulse rounded bg-zinc-800" />
        <div className="h-16 w-80 animate-pulse rounded bg-zinc-800" />
        <div className="h-8 w-64 animate-pulse rounded bg-zinc-800" />
        <div className="h-24 w-full max-w-xl animate-pulse rounded bg-zinc-800" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-8"
    >
      <p className="text-lg text-blue-400">{settings?.greeting || "Hello, I'm"}</p>

      {/* <h1
        className="
    text-5xl
    sm:text-6xl
    lg:text-7xl
    font-black
    leading-tight
    bg-gradient-to-r
    from-blue-400
    via-cyan-300
    to-violet-500
    bg-clip-text
    text-transparent
    animate-gradient
  "
      >
        {heroData.name}
      </h1> */}

      <motion.h1
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage:
            "linear-gradient(90deg, #60A5FA, #22D3EE, #8B5CF6, #60A5FA)",
          backgroundSize: "300% 100%",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
        className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight"
      >
        {settings?.fullName || "Vaibhav Singh"}
      </motion.h1>

      {/* Typewriter comes here later */}

      {/* <h2 className="text-2xl font-semibold text-zinc-300">
        {heroData.roles[0]}
      </h2> */}

      <TypeAnimation
        sequence={[
          settings?.profession || "Developer",
          2500,
        ]}
        wrapper="h2"
        speed={50}
        repeat={Infinity}
        className="text-2xl lg:text-3xl font-semibold text-blue-400"
      />

      <p className="max-w-xl text-lg leading-8 text-zinc-400">
        {settings?.heroSubtitle ||
          settings?.about ||
          "Welcome to my portfolio."}
      </p>

      <HeroButtons settings={settings} />

      <SocialLinks />
    </motion.div>
  );
};

export default HeroContent;
