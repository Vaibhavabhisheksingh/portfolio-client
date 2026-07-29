import { useEffect, useState } from "react";

import settingService from "../../../services/settingService";

import profile from "../../../assets/images/profile.jpeg";

const AboutImage = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await settingService.getSettings();
        setSettings(data);
      } catch (error) {
        console.error("Failed to load profile image:", error);
      }
    };

    fetchSettings();
  }, []);

  const profileImage = settings?.profileImage?.url || profile;

  return (
    <div className="flex justify-center">
      <div
        className="
          relative

          h-72
          w-72

          overflow-hidden

          rounded-3xl

          border
          border-zinc-700

          sm:h-80
          sm:w-80

          lg:h-96
          lg:w-96
        "
      >
        <img
          src={profileImage}
          alt={settings?.fullName || "Profile"}
          loading="lazy"
          decoding="async"
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-500
            hover:scale-105
          "
        />
      </div>
    </div>
  );
};

export default AboutImage;
