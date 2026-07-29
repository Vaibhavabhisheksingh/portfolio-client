import { useEffect, useState } from "react";
import SectionHeading from "../../common/SectionHeading";
import ProjectCard from "./ProjectCard";
import projectService from "../../../services/projectService";
import ErrorState from "../../common/ErrorState";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await projectService.getProjects();

      const data = Array.isArray(response.projects) ? response.projects : [];

      setProjects(data.sort((a, b) => a.order - b.order));
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="projects" className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading title="Featured Projects" subtitle="MY WORK" />

          <div className="space-y-10">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="h-96 animate-pulse rounded-3xl bg-zinc-800"
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
        title="Couldn't load projects"
        message="Please try again."
        onRetry={fetchProjects}
      />
    );
  }
  if (!projects.length) {
    return (
      <section id="projects" className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading title="Featured Projects" subtitle="MY WORK" />

          <div className="py-20 text-center">
            <h3 className="text-2xl font-semibold text-white">
              No Projects Found
            </h3>

            <p className="mt-4 text-zinc-400">
              Projects will appear here soon.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading title="Featured Projects" subtitle="MY WORK" />

        <div className="space-y-12">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
