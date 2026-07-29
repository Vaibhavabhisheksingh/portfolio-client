import { useEffect, useState } from "react";

import Modal from "../../ui/Modal";
import ProjectForm from "../form/ProjectForm";

import projectService from "../../../services/projectService";

const emptyProject = {
  title: "",
  slug: "",
  shortDescription: "",
  description: "",
  techStack: [],
  category: "Other",
  githubLink: "",
  liveDemo: "",
  featured: false,
  status: "Completed",
  order: 0,
  image: null,
};

const ProjectModal = ({ open, onClose, refresh, project }) => {
  const [formData, setFormData] = useState(emptyProject);

  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState("");


  useEffect(() => {
    if (!open) return;

    if (project) {
      setFormData({
        title: project.title || "",
        slug: project.slug || "",
        shortDescription: project.shortDescription || "",
        description: project.description || "",
        techStack: project.techStack || [],
        category: project.category || "Other",
        githubLink: project.githubLink || "",
        liveDemo: project.liveDemo || "",
        featured: project.featured || false,
        status: project.status || "Completed",
        order: project.order || 0,
        image: null,
      });

      setPreview(project.images?.[0]?.url || "");
    } else {
      setFormData(emptyProject);

      setPreview("");
    }
  }, [project, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "techStack") {
          data.append(key, JSON.stringify(formData[key]));
        } else if (key !== "image") {
          data.append(key, formData[key]);
        }
      });

      if (formData.image) {
        data.append("image", formData.image);
      }

      if (project) {
        await projectService.updateProject(project._id, data);
      } else {
        await projectService.createProject(data);
      }

      refresh();

      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const handleImageRemove = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));

    setPreview("");
  };

  if (!open) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={project ? "Edit Project" : "Add Project"}
    >
      <ProjectForm
        formData={formData}
        setFormData={setFormData}
        preview={preview}
        loading={loading}
        onSubmit={handleSubmit}
        onImageChange={handleImageChange}
        onImageRemove={handleImageRemove}
      />
    </Modal>
  );
};

export default ProjectModal;
