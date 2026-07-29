import { useEffect, useState } from "react";

import Modal from "../../ui/Modal";
import CertificateForm from "../form/CertificateForm";

import certificateService from "../../../services/certificateService";

const emptyCertificate = {
  title: "",
  issuer: "",
  issueDate: "",
  expiryDate: "",
  credentialId: "",
  credentialURL: "",
  skills: [],
  featured: false,
  order: 0,
  image: null,
};

const CertificateModal = ({
  open,
  onClose,
 refresh,
  certificate,
}) => {
  const [formData, setFormData] =
    useState(emptyCertificate);

  const [preview, setPreview] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (!open) return;

    if (certificate) {
      setFormData({
        title: certificate.title || "",
        issuer: certificate.issuer || "",

        issueDate: certificate.issueDate
          ? certificate.issueDate.slice(0, 10)
          : "",

        expiryDate: certificate.expiryDate
          ? certificate.expiryDate.slice(0, 10)
          : "",

        credentialId:
          certificate.credentialId || "",

        credentialURL:
          certificate.credentialURL || "",

        skills: certificate.skills || [],

        featured:
          certificate.featured || false,

        order: certificate.order || 0,

        image: null,
      });

      setPreview(
        certificate.image?.url || ""
      );
    } else {
      setFormData(emptyCertificate);
      setPreview("");
    }
  }, [certificate, open]);

  useEffect(() => {
    if (!formData.image) return;

    const objectUrl = URL.createObjectURL(
      formData.image
    );

    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [formData.image]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "skills") {
          data.append(
            key,
            JSON.stringify(formData.skills)
          );
        } else if (key !== "image") {
          data.append(key, formData[key]);
        }
      });

      if (formData.image) {
        data.append(
          "image",
          formData.image
        );
      }

      if (certificate) {
        await certificateService.updateCertificate(
          certificate._id,
          data
        );
      } else {
        await certificateService.createCertificate(
          data
        );
      }

      await refresh();

      handleClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData(emptyCertificate);
    setPreview("");
    onClose();
  };

  if (!open) return null;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={
        certificate
          ? "Edit Certificate"
          : "Add Certificate"
      }
    >
      <CertificateForm
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

export default CertificateModal;