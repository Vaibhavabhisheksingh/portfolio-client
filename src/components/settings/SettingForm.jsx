import { motion } from "framer-motion";

import FormField from "../ui/FormField";
import TextAreaField from "../ui/TextAreaField";
import TagInput from "../ui/TagInput";
import SelectField from "../ui/SelectField";
import ToggleSwitch from "../ui/ToggleSwitch";
import ImageUploader from "../ui/ImageUploader";
import ResumeUploader from "./ResumeUploader";
import PrimaryButton from "../ui/PrimaryButton";

const themeOptions = [
  {
    value: "dark",
    label: "Dark",
  },
  {
    value: "light",
    label: "Light",
  },
  {
    value: "system",
    label: "System",
  },
];

const SettingForm = ({
  formData,
  setFormData,

  imagePreview,
  setImagePreview,

  resumeName,
  setResumeName,

  loading,
  onSubmit,
}) => {
  // ============================================
  // Handle Normal Inputs
  // ============================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ============================================
  // Profile Image
  // ============================================

  const handleProfileImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      profileImage: file,
    }));

    setImagePreview(URL.createObjectURL(file));
  };

  const removeProfileImage = () => {
    setFormData((prev) => ({
      ...prev,
      profileImage: null,
    }));

    setImagePreview("");
  };

  // ============================================
  // Resume
  // ============================================

  const handleResume = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      resume: file,
    }));

    setResumeName(file.name);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      {/* ========================= */}
      {/* Personal Information */}
      {/* ========================= */}

      <motion.section
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          rounded-3xl
          border
          border-zinc-800
          bg-zinc-900/40
          p-6
          backdrop-blur-xl
        "
      >
        <h2
          className="
            mb-6
            text-xl
            font-semibold
            text-white
          "
        >
          Personal Information
        </h2>

        <div
          className="
            grid
            gap-6

            md:grid-cols-2
          "
        >
          <ImageUploader
            label="Profile Image"
            image={formData.profileImage}
            preview={imagePreview}
            onChange={handleProfileImage}
            onRemove={removeProfileImage}
          />

          <div
            className="
              space-y-5
            "
          >
            <FormField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            <FormField
              label="Profession"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              required
            />

            <FormField
              label="Tagline"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
            />

            <FormField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <FormField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <FormField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mt-6">
          <TextAreaField
            label="About"
            rows={6}
            name="about"
            value={formData.about}
            onChange={handleChange}
          />
        </div>
      </motion.section>

      {/* ========================= */}
      {/* Hero Section */}
      {/* ========================= */}

      <motion.section
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          rounded-3xl
          border
          border-zinc-800
          bg-zinc-900/40
          p-6
        "
      >
        <h2
          className="
            mb-6
            text-xl
            font-semibold
            text-white
          "
        >
          Hero Section
        </h2>

        <div
          className="
            grid
            gap-6

            md:grid-cols-2
          "
        >
          <FormField
            label="Hero Title"
            name="heroTitle"
            value={formData.heroTitle}
            onChange={handleChange}
          />

          <FormField
            label="Hero Subtitle"
            name="heroSubtitle"
            value={formData.heroSubtitle}
            onChange={handleChange}
          />
        </div>
      </motion.section>
      {/* ========================= */}
      {/* SEO */}
      {/* ========================= */}

      <motion.section
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          rounded-3xl
          border
          border-zinc-800
          bg-zinc-900/40
          p-6
        "
      >
        <h2
          className="
            mb-6
            text-xl
            font-semibold
            text-white
          "
        >
          SEO Settings
        </h2>

        <div
          className="
            grid
            gap-6

            md:grid-cols-2
          "
        >
          <FormField
            label="SEO Title"
            name="seoTitle"
            value={formData.seoTitle}
            onChange={handleChange}
          />

          <SelectField
            label="Theme"
            name="theme"
            value={formData.theme}
            onChange={handleChange}
            options={themeOptions}
          />
        </div>

        <div className="mt-6">
          <TextAreaField
            label="SEO Description"
            rows={4}
            name="seoDescription"
            value={formData.seoDescription}
            onChange={handleChange}
          />
        </div>

        <div className="mt-6">
          <TagInput
            label="SEO Keywords"
            tags={formData.seoKeywords}
            setTags={(tags) =>
              setFormData((prev) => ({
                ...prev,
                seoKeywords: tags,
              }))
            }
          />
        </div>
      </motion.section>

      {/* ========================= */}
      {/* Resume */}
      {/* ========================= */}

      <motion.section
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          rounded-3xl
          border
          border-zinc-800
          bg-zinc-900/40
          p-6
        "
      >
        <h2
          className="
            mb-6
            text-xl
            font-semibold
            text-white
          "
        >
          Resume
        </h2>

        <ResumeUploader
          resumeName={resumeName}
          onChange={handleResume}
          onRemove={() => {
            setFormData((prev) => ({
              ...prev,
              resume: null,
            }));

            setResumeName("");
          }}
        />
      </motion.section>

      {/* ========================= */}
      {/* Portfolio */}
      {/* ========================= */}

      <motion.section
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          rounded-3xl
          border
          border-zinc-800
          bg-zinc-900/40
          p-6
        "
      >
        <div
          className="
            flex
            flex-col
            gap-6

            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <div>
            <h2
              className="
                text-xl
                font-semibold
                text-white
              "
            >
              Portfolio Status
            </h2>

            <p
              className="
                mt-2
                text-sm
                text-zinc-400
              "
            >
              Disable this if you don't want your portfolio to be publicly
              visible.
            </p>
          </div>

          <ToggleSwitch
            checked={formData.portfolioStatus}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                portfolioStatus: value,
              }))
            }
          />
        </div>
      </motion.section>

      {/* ========================= */}
      {/* Save */}
      {/* ========================= */}

      <div
        className="
          flex
          justify-end
          border-t
          border-zinc-800
          pt-6
        "
      >
        <PrimaryButton type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Settings"}
        </PrimaryButton>
      </div>
    </form>
  );
};

export default SettingForm;
