import { useEffect, useState } from "react";

import Modal from "../../ui/Modal";
import ExperienceForm from "../form/ExperienceForm";

import experienceService from "../../../services/experienceService";

const emptyExperience = {
  company: "",
  jobTitle: "",
  employmentType: "Internship",
  location: "",
  workMode: "Remote",
  startDate: "",
  endDate: "",
  currentlyWorking: false,
  description: [],
  technologies: [],
  companyLogo: null,
  order: 0,
};

const ExperienceModal = ({
  open,
  onClose,
  refresh,
  experience,
}) => {
  const [formData, setFormData] =
    useState(emptyExperience);

  const [preview, setPreview] =
    useState("");

  const [loading, setLoading] = 
    useState(false);

  useEffect(() => {
    if (!open) return;

    if (experience) {
      setFormData({
        company: experience.company || "",
        jobTitle: experience.jobTitle || "",
        employmentType:
          experience.employmentType ||
          "Internship",
        location:
          experience.location || "",
        workMode:
          experience.workMode ||
          "Remote",
        startDate: experience.startDate
          ? experience.startDate.substring(
              0,
              10
            )
          : "",
        endDate: experience.endDate
          ? experience.endDate.substring(
              0,
              10
            )
          : "",
        currentlyWorking:
          experience.currentlyWorking ||
          false,
        description:
          experience.description || [],
        technologies:
          experience.technologies || [],
        companyLogo: null,
        order: experience.order || 0,
      });

      setPreview(
        experience.companyLogo?.url || ""
      );
    } else {
      setFormData(emptyExperience);
      setPreview("");
    }
  }, [experience, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      Object.keys(formData).forEach(
        (key) => {
          if (
            key === "description" ||
            key === "technologies"
          ) {
            data.append(
              key,
              JSON.stringify(formData[key])
            );
          } else if (
            key !== "companyLogo"
          ) {
            data.append(
              key,
              formData[key]
            );
          }
        }
      );

      if (formData.companyLogo) {
        data.append(
          "companyLogo",
          formData.companyLogo
        );
      }

      if (experience) {
        await experienceService.updateExperience(
          experience._id,
          data
        );
      } else {
        await experienceService.createExperience(
          data
        );
      }

      await refresh();

      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        experience
          ? "Edit Experience"
          : "Add Experience"
      }
    >
      <ExperienceForm
        formData={formData}
        setFormData={setFormData}
        preview={preview} 
        setPreview={setPreview}
        loading={loading}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};

export default ExperienceModal;