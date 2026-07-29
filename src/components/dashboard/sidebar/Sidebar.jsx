import {
  LayoutDashboard,
  FolderKanban,
  Brain,
  Briefcase,
  GraduationCap,
  Award,
  MessageSquare,
  Settings,
  LogOut,
  Share2,
  Mail
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import SidebarItem from "./SidebarItem";
import { useAuth } from "../../../context/AuthContext";

const Sidebar = () => {
  const { admin, logout } = useAuth();

  const menu = [
    {
      label: "Dashboard",
      to: "/admin",
      icon: LayoutDashboard,
    },
    {
      label: "Projects",
      to: "/admin/projects",
      icon: FolderKanban,
    },
    {
      label: "Skills",
      to: "/admin/skills",
      icon: Brain,
    },
    // {
    //   label: "Experience",
    //   to: "/admin/experience",
    //   icon: Briefcase,
    // },
    {
      label: "Experience",
      to: "/admin/experience",
      icon: Briefcase,
      
    },
    {
      label: "Education",
      to: "/admin/education",
      icon: GraduationCap,
    },
    {
      label: "Certificates",
      to: "/admin/certificates",
      icon: Award,
    },
    {
    label: "Social",
    to: "/admin/socials",
    icon: Share2,
},
    {
      label: "Settings",
      to: "/admin/settings",
      icon: Settings,
    },
    {
      label: "Contact",
      to: "/admin/contact",
      icon: Mail,
    },
  ];
  const navigate = useNavigate();
  return (
    <aside
      className="
        flex
        h-screen
        w-72
        flex-col
        border-r
        border-zinc-800
        bg-zinc-950/80
        backdrop-blur-xl
      "
    >
      {/* Logo */}
      <div className="border-b border-zinc-800 p-8">
        <h1 className="text-2xl font-bold text-white">VAIBHAV</h1>

        <p className="mt-2 text-sm text-zinc-500">Portfolio CMS</p>
      </div>

      {/* Menu */}

      <div className="flex-1 space-y-3 p-5">
        {menu.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
      </div>

      {/* Footer */}

      <div className="border-t border-zinc-800 p-5">
        <div className="mb-5">
          <h3 className="font-semibold text-white">{admin?.name}</h3>

          <p className="text-sm text-zinc-500">{admin?.email}</p>
        </div>

        <button
          onClick={() => {
            logout();
            navigate("/login", { replace: true });
          }}
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            border
            border-zinc-800
            px-4
            py-3
            text-zinc-400
            transition
            hover:border-red-500
            hover:text-red-400
          "
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
