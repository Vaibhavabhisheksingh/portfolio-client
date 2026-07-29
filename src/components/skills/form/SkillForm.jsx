import FormField from "../../ui/FormField";
import SelectField from "../../ui/SelectField";
import ToggleSwitch from "../../ui/ToggleSwitch";
import PrimaryButton from "../../ui/PrimaryButton";

const categories = [
  { value: "Frontend", label: "Frontend" },
  { value: "Backend", label: "Backend" },
  { value: "Database", label: "Database" },
  {
    value: "Programming Language",
    label: "Programming Language",
  },
  { value: "Tools", label: "Tools" },
  { value: "DevOps", label: "DevOps" },
  { value: "Cloud", label: "Cloud" },
  {
    value: "Version Control",
    label: "Version Control",
  },
  { value: "Other", label: "Other" },
];

const SkillForm = ({
  formData,
  setFormData,
  loading,
  onSubmit,
}) => {
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? Number(value)
          : value,
    }));
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-8"
    >
      <div className="grid gap-8 lg:grid-cols-2">

        {/* Left */}

        <div className="space-y-6">

          <FormField
            label="Skill Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <SelectField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={categories}
          />

          <FormField
            label="Icon"
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            placeholder="react"
          />

          <FormField
            label="Color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            placeholder="#61DAFB"
          />

        </div>

        {/* Right */}

        <div className="space-y-6">

          {/* Proficiency */}

          <div>

            <label className="mb-3 block text-sm font-medium text-zinc-300">
              Proficiency
            </label>

            <input
              type="range"
              min="0"
              max="100"
              name="proficiency"
              value={formData.proficiency}
              onChange={handleChange}
              className="w-full accent-blue-500"
            />

            <div className="mt-3 flex justify-between text-sm">
              <span className="text-zinc-500">
                Beginner
              </span>

              <span className="font-semibold text-white">
                {formData.proficiency}%
              </span>

              <span className="text-zinc-500">
                Expert
              </span>
            </div>

            {/* Live Progress */}

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800">

              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-300"
                style={{
                  width: `${formData.proficiency}%`,
                }}
              />

            </div>

          </div>

          <FormField
            label="Display Order"
            type="number"
            name="order"
            value={formData.order}
            onChange={handleChange}
          />

          <ToggleSwitch
            label="Featured Skill"
            checked={formData.featured}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                featured: value,
              }))
            }
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
            : "Save Skill"}
        </PrimaryButton>

      </div>

    </form>
  );
};

export default SkillForm;