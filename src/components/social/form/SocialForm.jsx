import FormField from "../../ui/FormField";
import SelectField from "../../ui/SelectField";
import ToggleSwitch from "../../ui/ToggleSwitch";
import PrimaryButton from "../../ui/PrimaryButton";

const platforms = [
  "GitHub",
  "LinkedIn",
  "Portfolio",
  "Twitter",
  "Instagram",
  "Facebook",
  "YouTube",
  "LeetCode",
  "Codeforces",
  "CodeChef",
  "HackerRank",
  "GeeksforGeeks",
  "Medium",
  "Dev.to",
  "Email",
  "Other",
].map((item) => ({
  value: item,
  label: item,
}));

const SocialForm = ({
  formData,
  setFormData,
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

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6"
    >
      <SelectField
        label="Platform"
        name="platform"
        value={formData.platform}
        onChange={handleChange}
        options={platforms}
      />

      <FormField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />

      <FormField
        label="Profile URL"
        name="url"
        value={formData.url}
        onChange={handleChange}
      />

      <FormField
        label="Icon"
        name="icon"
        value={formData.icon}
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

      <div className="flex justify-end border-t border-zinc-800 pt-6">
        <PrimaryButton
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : "Save Social"}
        </PrimaryButton>
      </div>
    </form>
  );
};

export default SocialForm;