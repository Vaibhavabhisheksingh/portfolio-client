import FormField from "../../ui/FormField";
import TextAreaField from "../../ui/TextAreaField";
import SelectField from "../../ui/SelectField";
import ToggleSwitch from "../../ui/ToggleSwitch";
import TagInput from "../../ui/TagInput";
import ImageUploader from "../../ui/ImageUploader";
import PrimaryButton from "../../ui/PrimaryButton";

const categories = [
  { value: "Other", label: "Other" },
  { value: "Full Stack", label: "Full Stack" },
  { value: "Frontend", label: "Frontend" },
  { value: "Backend", label: "Backend" },
  { value: "MERN", label: "MERN" },
  { value: "AI/ML", label: "AI / ML" },
  { value: "Java", label: "Java" },
  { value: "Python", label: "Python" },
];

const statusOptions = [
  {
    value: "Completed",
    label: "Completed",
  },
  {
    value: "In Progress",
    label: "In Progress",
  },
];

const ProjectForm = ({
  formData,
  setFormData,
  preview,
  loading,
  onSubmit,
  onImageChange,
  onImageRemove,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "title" && {
        slug: value.toLowerCase().trim().replace(/\s+/g, "-"),
      }),
    }));
  };

  // const handleImage = (e) => {
  //   console.log("FORM SUBMITTED");
  //   const file = e.target.files?.[0];

  //   if (!file) return;

  //   setFormData((prev) => ({
  //     ...prev,
  //     image: file,
  //   }));
  // };

  // const removeImage = () => {
  //   console.log("REMOVE IMAGE CLICKED");
  //   setFormData((prev) => ({
  //     ...prev,
  //     image: null,
  //   }));
  // };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <FormField
            label="Project Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <FormField
            label="Slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
          />

          <TextAreaField
            label="Short Description"
            name="shortDescription"
            rows={3}
            value={formData.shortDescription}
            onChange={handleChange}
          />

          <TextAreaField
            label="Description"
            name="description"
            rows={7}
            value={formData.description}
            onChange={handleChange}
          />

          <TagInput
            label="Tech Stack"
            tags={formData.techStack}
            setTags={(tags) => {
              setFormData((prev) => ({
                ...prev,
                techStack: tags,
              }))
            }}
          />
        </div>

        <div className="space-y-6">
          <SelectField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={categories}
          />

          <SelectField
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={statusOptions}
          />

          <FormField
            label="GitHub URL"
            name="githubLink"
            value={formData.githubLink}
            onChange={handleChange}
          />

          <FormField
            label="Live Demo"
            name="liveDemo"
            value={formData.liveDemo}
            onChange={handleChange}
          />

          <FormField
            label="Display Order"
            type="number"
            name="order"
            value={formData.order}
            onChange={handleChange}
          />

          <ToggleSwitch
            label="Featured"
            checked={formData.featured}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                featured: value,
              }))
            }
          />

          {/* <ImageUploader
            preview={preview}
            image={formData.image}
            onChange={handleImage}
            onRemove={removeImage}
          /> */}
          <ImageUploader
            preview={preview}
            onChange={onImageChange}
            onRemove={onImageRemove}
          />
        </div>
      </div>

      <div className="flex justify-end border-t border-zinc-800 pt-6">
        <PrimaryButton type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Project"}
        </PrimaryButton>
      </div>
    </form>
  );
};

export default ProjectForm;
