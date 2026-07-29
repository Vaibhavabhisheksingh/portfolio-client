import { useEffect, useState } from "react";

import Modal from "../../ui/Modal";
import SkillForm from "../form/SkillForm";

import skillService from "../../../services/skillService";

const emptySkill = {
  name: "",
  category: "Frontend",
  proficiency: 80,
  icon: "",
  color: "",
  featured: false,
  order: 0,
};

const SkillModal = ({
  open,
  onClose,
  refresh,
  skill,
}) => {
  const [formData, setFormData] =
    useState(emptySkill);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (!open) return;

    if (skill) {
      setFormData({
        name: skill.name || "",
        category: skill.category || "Frontend",
        proficiency: skill.proficiency || 80,
        icon: skill.icon || "",
        color: skill.color || "",
        featured: skill.featured || false,
        order: skill.order || 0,
      });
    } else {
      setFormData(emptySkill);
    }
  }, [skill, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (skill) {
        await skillService.updateSkill(
          skill._id,
          formData
        );
      } else {
        await skillService.createSkill(
          formData
        );
      }

      refresh();

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
        skill
          ? "Edit Skill"
          : "Add Skill"
      }
    >
      <SkillForm
        formData={formData}
        setFormData={setFormData}
        loading={loading}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};

export default SkillModal;