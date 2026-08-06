import SkillCard from "./SkillCard";

const SkillCategory = ({ category }) => {
  return (
    <div className="mb-16">

      <h2 className="text-3xl font-bold text-white mb-8">
        {category.category}
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">

        {category.skills.map((skill, index) => (
          <SkillCard
            key={skill.name}
            skill={skill}
            index={index}
          />
        ))}

      </div>

    </div>
  );
};

export default SkillCategory;