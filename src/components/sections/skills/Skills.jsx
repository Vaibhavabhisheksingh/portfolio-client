import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import SectionHeading from "../../common/SectionHeading";
import SkillCategory from "./SkillCategory";

import skillService from "../../../services/skillService";
import ErrorState from "../../common/ErrorState";

const Skills = () => {
  const [groupedSkills, setGroupedSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await skillService.getSkills();

      const skills = Array.isArray(response.skills) ? response.skills : [];

      const grouped = {};

      skills
        .sort((a, b) => a.order - b.order)
        .forEach((skill) => {
          if (!grouped[skill.category]) {
            grouped[skill.category] = [];
          }

          grouped[skill.category].push(skill);
        });

      const categories = Object.keys(grouped).map((category) => ({
        category,
        skills: grouped[category],
      }));

      setGroupedSkills(categories);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="skills" className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading title="My Skills" subtitle="TECH STACK" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-40 animate-pulse rounded-2xl bg-zinc-800"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }
  if (error) {
      return (
        <ErrorState
          title="Couldn't load skills"
          message="Please try again."
          onRetry={fetchSkills}
        />
      );
    }
    if (!groupedSkills.length) {
      return (
        <section id="skills" className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeading title="My Skills" subtitle="TECH STACK" />
  
            <div className="py-20 text-center">
              <h3 className="text-2xl font-semibold text-white">
                No Skills Found
              </h3>
  
              <p className="mt-4 text-zinc-400">
                Skills will appear here soon.
              </p>
            </div>
          </div>
        </section>
      );
    }

  return (
    <section id="skills" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading title="My Skills" subtitle="TECH STACK" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {groupedSkills.map((category) => (
            <SkillCategory key={category.category} category={category} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
