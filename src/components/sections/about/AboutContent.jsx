// const AboutContent = () => {
//   return (
//     <div>

//       <h3
//         className="
//         text-3xl

//         font-bold

//         text-white

//         mb-6
//       "
//       >
//         MERN Stack Developer
//       </h3>

//       <p
//         className="
//         text-zinc-400

//         leading-8

//         mb-4
//       "
//       >
//         I'm Vaibhav Singh, a passionate MERN Stack Developer
//         who enjoys building modern, scalable, and responsive web
//         applications with clean architecture and intuitive user experiences.
//       </p>

//       <p
//         className="
//         text-zinc-400

//         leading-8
//       "
//       >
//         I continuously improve my skills through Data Structures &
//         Algorithms, full-stack development, and real-world projects while
//         focusing on writing clean and maintainable code.
//       </p>

//     </div>
//   );
// };

// export default AboutContent;

import { useEffect, useState } from "react";
import settingService from "../../../services/settingService";

const AboutContent = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchSettings();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-56 animate-pulse rounded bg-zinc-800" />
        <div className="h-5 w-full animate-pulse rounded bg-zinc-800" />
        <div className="h-5 w-full animate-pulse rounded bg-zinc-800" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-zinc-800" />
      </div>
    );
  }

  return (
    <div>
      <h3
        className="
          mb-6
          text-3xl
          font-bold
          text-white
        "
      >
        {settings?.profession || "MERN Stack Developer"}
      </h3>

      <p
        className="
          mb-4
          leading-8
          text-zinc-400
        "
      >
        {settings?.about ||
          "Passionate developer building modern web applications."}
      </p>

      {settings?.tagline && (
        <p
          className="
            leading-8
            text-zinc-400
          "
        >
          {settings.tagline}
        </p>
      )}
    </div>
  );
};

export default AboutContent;
