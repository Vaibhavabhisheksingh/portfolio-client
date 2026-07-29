import { useEffect, useState } from "react";

import Modal from "../../ui/Modal";
import EducationForm from "../form/EducationForm";

import educationService from "../../../services/educationService";

const emptyEducation = {
  institution: "",
  degree: "",
  fieldOfStudy: "",
  startDate: "",
  endDate: "",
  currentlyStudying: false,
  grade: "",
  description: [],
  order: 0,
  institutionLogo: null,
};

const formatDate = (date) => {
  if (!date) return "";

  return new Date(date)
    .toISOString()
    .split("T")[0];
};

const EducationModal = ({
  open,
  onClose,
  refresh,
  education,
}) => {
  const [formData, setFormData] =
    useState(emptyEducation);

  const [preview, setPreview] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (!open) return;

    if (education) {
      setFormData({
        institution:
          education.institution || "",

        degree:
          education.degree || "",

        fieldOfStudy:
          education.fieldOfStudy || "",

        startDate: formatDate(
          education.startDate
        ),

        endDate: formatDate(
          education.endDate
        ),

        currentlyStudying:
          education.currentlyStudying ||
          false,

        grade:
          education.grade || "",

        description:
          education.description || [],

        order:
          education.order || 0,

        institutionLogo: null,
      });

      setPreview(
        education.institutionLogo?.url ||
          ""
      );
    } else {
      setFormData(emptyEducation);

      setPreview("");
    }
  }, [education, open]);

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data =
        new FormData();

      Object.keys(formData).forEach(
        (key) => {
          if (
            key === "description"
          ) {
            data.append(
              key,
              JSON.stringify(
                formData[key]
              )
            );
          } else if (
            key !==
            "institutionLogo"
          ) {
            data.append(
              key,
              formData[key]
            );
          }
        }
      );

      if (
        formData.institutionLogo
      ) {
        data.append(
          "institutionLogo",
          formData.institutionLogo
        );
      }

      if (education) {
        await educationService.updateEducation(
          education._id,
          data
        );
      } else {
        await educationService.createEducation(
          data
        );
      }

      await refresh();

      onClose();
    } catch (err) {
      console.error(err);
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
        education
          ? "Edit Education"
          : "Add Education"
      }
    >
      <EducationForm
        formData={formData}
        setFormData={
          setFormData
        }
        preview={preview}
        setPreview={setPreview}
        loading={loading}
        onSubmit={
          handleSubmit
        }
      />
    </Modal>
  );
};

export default EducationModal;