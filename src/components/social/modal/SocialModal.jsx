import { useEffect, useState } from "react";

import Modal from "../../ui/Modal";
import SocialForm from "../form/SocialForm";

import socialService from "../../../services/socialService";

const emptySocial = {
  platform: "GitHub",
  username: "",
  url: "",
  icon: "",
  featured: true,
  order: 0,
};

const SocialModal = ({
  open,
  onClose,
  refresh,
  social,
}) => {
  const [formData, setFormData] =
    useState(emptySocial);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (!open) return;

    if (social) {
      setFormData({
        platform: social.platform || "GitHub",
        username: social.username || "",
        url: social.url || "",
        icon: social.icon || "",
        featured: social.featured ?? true,
        order: social.order || 0,
      });
    } else {
      setFormData(emptySocial);
    }
  }, [social, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (social) {
        await socialService.updateSocial(
          social._id,
          formData
        );
      } else {
        await socialService.createSocial(
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
        social
          ? "Edit Social"
          : "Add Social"
      }
    >
      <SocialForm
        formData={formData}
        setFormData={setFormData}
        loading={loading}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};

export default SocialModal;