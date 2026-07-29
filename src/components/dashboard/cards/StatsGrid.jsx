import {
  FolderKanban,
  Brain,
  Award,
  Mail,
} from "lucide-react";

import StatCard from "./StatCard";

const StatsGrid = ({ stats }) => {
  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Projects"
        value={stats?.totalProjects || 0}
        icon={FolderKanban}
        color="blue"
      />

      <StatCard
        title="Skills"
        value={stats?.totalSkills || 0}
        icon={Brain}
        color="emerald"
      />

      <StatCard
        title="Certificates"
        value={stats?.totalCertificates || 0}
        icon={Award}
        color="violet"
      />

      <StatCard
        title="Messages"
        value={stats?.totalMessages || 0}
        icon={Mail}
        color="amber"
      />

    </div>
  );
};

export default StatsGrid;