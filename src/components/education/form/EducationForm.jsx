import FormField from "../../ui/FormField";
import TagInput from "../../ui/TagInput";
import ToggleSwitch from "../../ui/ToggleSwitch";
import ImageUploader from "../../ui/ImageUploader";
import PrimaryButton from "../../ui/PrimaryButton";

const EducationForm = ({
  formData,
  setFormData,
  preview,
  setPreview,
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

  const handleLogo = (e) => {

    const file = e.target.files?.[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      institutionLogo: file,
    }));

    setPreview(URL.createObjectURL(file));

  };

  const removeLogo = () => {

    setFormData((prev) => ({
      ...prev,
      institutionLogo: null,
    }));
    setPreview("");

  };

  return (

    <form
      onSubmit={onSubmit}
      className="space-y-8"
    >

      <div className="grid gap-8 lg:grid-cols-2">

        {/* LEFT */}

        <div className="space-y-6">

          <FormField
            label="Institution"
            name="institution"
            value={formData.institution}
            onChange={handleChange}
            required
          />

          <FormField
            label="Degree"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            required
          />

          <FormField
            label="Field Of Study"
            name="fieldOfStudy"
            value={formData.fieldOfStudy}
            onChange={handleChange}
            required
          />

          <FormField
            label="Grade / CGPA"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
          />

          <div className="grid grid-cols-2 gap-4">

            <FormField
              label="Start Date"
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />

            {!formData.currentlyStudying && (

              <FormField
                label="End Date"
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />

            )}

          </div>

          <ToggleSwitch
            label="Currently Studying"
            checked={
              formData.currentlyStudying
            }
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                currentlyStudying: value,
                endDate: value
                  ? ""
                  : prev.endDate,
              }))
            }
          />

        </div>

        {/* RIGHT */}

        <div className="space-y-6">

          <TagInput
            label="Description"
            tags={formData.description}
            setTags={(tags) =>
              setFormData((prev) => ({
                ...prev,
                description: tags,
              }))
            }
          />

          <FormField
            label="Display Order"
            type="number"
            name="order"
            value={formData.order}
            onChange={handleChange}
          />

          <ImageUploader
            label="Institution Logo"
            image={formData.institutionLogo}
            preview={preview}
            onChange={handleLogo}
            onRemove={removeLogo}
          />

        </div>

      </div>

      <div className="flex justify-end border-t border-zinc-800 pt-6">

        <PrimaryButton
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : "Save Education"}
        </PrimaryButton>

      </div>

    </form>

  );

};

export default EducationForm;