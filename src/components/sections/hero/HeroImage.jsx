import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import settingService from "../../../services/settingService";
import profile from "../../../assets/images/profile.jpeg";

const HeroImage = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await settingService.getSettings();
      setSettings(data);
    } catch (error) {
      console.error("Failed to load profile image:", error);
    }
  };

  const profileImage = settings?.profileImage?.url || profile;

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          h-[270px]
          w-[270px]
          rounded-full
          border
          border-blue-500/30

          sm:h-[320px]
          sm:w-[320px]

          lg:h-[350px]
          lg:w-[350px]
        "
      />

      {/* Inner Ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          h-[240px]
          w-[240px]
          rounded-full
          border
          border-violet-500/30

          sm:h-[290px]
          sm:w-[290px]

          lg:h-[310px]
          lg:w-[310px]
        "
      />

      {/* Glow */}
      <div
        className="
          absolute
          h-[250px]
          w-[250px]
          rounded-full
          bg-blue-500/20
          blur-3xl

          sm:h-[300px]
          sm:w-[300px]

          lg:h-[330px]
          lg:w-[330px]
        "
      />

      {/* Image */}
      <motion.div
        animate={{
          y: [0, -12, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="relative z-10"
      >
        <img
          src={profileImage}
          alt={settings?.fullName || "Profile"}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="
            h-56
            w-56
            rounded-full
            border-4
            border-zinc-800
            object-cover
            shadow-2xl

            sm:h-72
            sm:w-72

            lg:h-80
            lg:w-80
          "
        />
      </motion.div>
    </div>
  );
};

export default HeroImage;
