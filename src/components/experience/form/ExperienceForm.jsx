import FormField from "../../ui/FormField";
import SelectField from "../../ui/SelectField";
import ToggleSwitch from "../../ui/ToggleSwitch";
import TagInput from "../../ui/TagInput";
import ImageUploader from "../../ui/ImageUploader";
import PrimaryButton from "../../ui/PrimaryButton";

const employmentOptions = [
  { value: "Full-time", label: "Full-time" },
  { value: "Part-time", label: "Part-time" },
  { value: "Internship", label: "Internship" },
  { value: "Freelance", label: "Freelance" },
  { value: "Contract", label: "Contract" },
  { value: "Self-Employed", label: "Self Employed" },
];

const workModeOptions = [
  { value: "Remote", label: "Remote" },
  { value: "Hybrid", label: "Hybrid" },
  { value: "On-site", label: "On-site" },
];

const ExperienceForm = ({
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
      companyLogo: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const removeLogo = () => {
    setFormData((prev) => ({
      ...prev,
      companyLogo: null,
    }));

    setPreview("");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* LEFT */}

        <div className="space-y-6">
          <FormField
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />

          <FormField
            label="Job Title"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
          />

          <FormField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />

          <SelectField
            label="Employment Type"
            name="employmentType"
            value={formData.employmentType}
            onChange={handleChange}
            options={employmentOptions}
          />

          <SelectField
            label="Work Mode"
            name="workMode"
            value={formData.workMode}
            onChange={handleChange}
            options={workModeOptions}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Start Date"
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />

            {!formData.currentlyWorking && (
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
            label="Currently Working"
            checked={formData.currentlyWorking}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                currentlyWorking: value,
                endDate: value ? "" : prev.endDate,
              }))
            }
          />
        </div>

        {/* RIGHT */}

        <div className="space-y-6">
          <TagInput
            label="Technologies"
            tags={formData.technologies}
            setTags={(tags) =>
              setFormData((prev) => ({
                ...prev,
                technologies: tags,
              }))
            }
          />

          <TagInput
            label="Responsibilities / Achievements"
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
            label="Company Logo"
            image={formData.companyLogo}
            preview={preview}
            onChange={handleLogo}
            onRemove={removeLogo}
          />
        </div>
      </div>

      <div className="flex justify-end border-t border-zinc-800 pt-6">
        <PrimaryButton type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Experience"}
        </PrimaryButton>
      </div>
    </form>
  );
};

export default ExperienceForm;
