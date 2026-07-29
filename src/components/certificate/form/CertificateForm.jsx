import FormField from "../../ui/FormField";
import TagInput from "../../ui/TagInput";
import ToggleSwitch from "../../ui/ToggleSwitch";
import ImageUploader from "../../ui/ImageUploader";
import PrimaryButton from "../../ui/PrimaryButton";

const CertificateForm = ({
  formData,
  setFormData,
  setPreview,
  preview,
  loading,
  onSubmit,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
    setPreview("");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* LEFT */}

        <div className="space-y-6">
          <FormField
            label="Certificate Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <FormField
            label="Issuer"
            name="issuer"
            value={formData.issuer}
            onChange={handleChange}
            required
          />

          <FormField
            type="date"
            label="Issue Date"
            name="issueDate"
            value={formData.issueDate}
            onChange={handleChange}
            required
          />

          <FormField
            type="date"
            label="Expiry Date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
          />

          <FormField
            label="Credential ID"
            name="credentialId"
            value={formData.credentialId}
            onChange={handleChange}
          />
        </div>

        {/* RIGHT */}

        <div className="space-y-6">
          {/* <FormField
            label="Credential URL"
            name="credentialURL"
            value={formData.credentialURL}
            onChange={handleChange}
          /> */}

          <FormField
            type="number"
            label="Display Order"
            name="order"
            value={formData.order}
            onChange={handleChange}
          />

          <TagInput
            label="Skills"
            tags={formData.skills}
            setTags={(skills) =>
              setFormData((prev) => ({
                ...prev,
                skills,
              }))
            }
          />

          <ToggleSwitch
            label="Featured Certificate"
            checked={formData.featured}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                featured: value,
              }))
            }
          />

          <ImageUploader
            image={formData.image}
            preview={preview}
            onChange={handleImage}
            onRemove={removeImage}
            label="Certificate Image"
          />
        </div>
      </div>

      <div className="flex justify-end border-t border-zinc-800 pt-6">
        <PrimaryButton type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Certificate"}
        </PrimaryButton>
      </div>
    </form>
  );
};

export default CertificateForm;
