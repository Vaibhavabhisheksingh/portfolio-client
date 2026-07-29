// import {
//   FaGithub,
//   FaLinkedin,
//   FaInstagram,
// } from "react-icons/fa";

// const SocialLinks = () => {
//   return (
//     <div className="flex gap-6 text-2xl text-zinc-400">

//       <a href="#">
//         <FaGithub className="transition hover:scale-110 hover:text-white" />
//       </a>

//       <a href="#">
//         <FaLinkedin className="transition hover:scale-110 hover:text-blue-500" />
//       </a>

//       <a href="#">
//         <FaInstagram className="transition hover:scale-110 hover:text-pink-500" />
//       </a>

//     </div>
//   );
// };

// export default SocialLinks;

import { useEffect, useState } from "react";

import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaMedium,
  FaDev,
} from "react-icons/fa";

import {
  SiLeetcode,
  SiCodeforces,
  SiCodechef,
  SiHackerrank,
  SiGeeksforgeeks,
} from "react-icons/si";

import socialService from "../../../services/socialService";

const iconMap = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedin,
  Instagram: FaInstagram,
  Facebook: FaFacebook,
  Twitter: FaTwitter,
  YouTube: FaYoutube,
  Medium: FaMedium,
  "Dev.to": FaDev,
  LeetCode: SiLeetcode,
  Codeforces: SiCodeforces,
  CodeChef: SiCodechef,
  HackerRank: SiHackerrank,
  GeeksforGeeks: SiGeeksforgeeks,
};

const SocialLinks = () => {
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    fetchSocials();
  }, []);

  const fetchSocials = async () => {
    try {
      const response = await socialService.getSocials();

      setSocials((response.socials || []).filter((item) => item.featured));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-wrap gap-5 text-2xl">
      {socials.map((social) => {
        const Icon = iconMap[social.platform];

        if (!Icon) return null;

        return (
          <a
            key={social._id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-zinc-400
              transition-all
              duration-300
              hover:scale-110
              hover:text-blue-400
            "
          >
            <Icon />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
