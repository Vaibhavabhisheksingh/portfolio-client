import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import PageHeader from "../../components/dashboard/PageHeader";
import SettingForm from "../../components/settings/SettingForm";
 
import settingService from "../../services/settingService";

const initialData = {
  fullName: "", 
  profession: "",
  tagline: "",
  about: "",
  email: "",
  phone: "",
  location: "",

  heroTitle: "",
  heroSubtitle: "",

  seoTitle: "",
  seoDescription: "",
  seoKeywords: [],

  theme: "dark",

  portfolioStatus: true,

  profileImage: null,
  resume: null,
};

const Settings = () => {
  const [formData, setFormData] =
    useState(initialData);

  const [loading, setLoading] =
    useState(false);

  const [fetching, setFetching] =
    useState(true);

  const [imagePreview, setImagePreview] =
    useState("");

  const [resumeName, setResumeName] =
    useState("");

  // ===================================
  // Fetch Settings
  // ===================================

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const settings =
        await settingService.getSettings();

      setFormData({
        fullName: settings.fullName || "",
        profession: settings.profession || "",
        tagline: settings.tagline || "",
        about: settings.about || "",

        email: settings.email || "",
        phone: settings.phone || "",
        location: settings.location || "",

        heroTitle: settings.heroTitle || "",
        heroSubtitle:
          settings.heroSubtitle || "",

        seoTitle: settings.seoTitle || "",
        seoDescription:
          settings.seoDescription || "",

        seoKeywords:
          settings.seoKeywords || [],

        theme: settings.theme || "dark",

        portfolioStatus:
          settings.portfolioStatus,

        profileImage: null,
        resume: null,
      });

      setImagePreview(
        settings.profileImage?.url || ""
      );

      setResumeName(
        settings.resume?.originalName || ""
      );
    } catch (error) {
      console.error(error);
    } finally {
      setFetching(false);
    }
  };

  // ===================================
  // Save
  // ===================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      Object.keys(formData).forEach(
        (key) => {
          if (key === "seoKeywords") {
            data.append(
              key,
              JSON.stringify(
                formData[key]
              )
            );
          } else if (
            key !== "profileImage" &&
            key !== "resume"
          ) {
            data.append(
              key,
              formData[key]
            );
          }
        }
      );

      if (formData.profileImage) {
        data.append(
          "profileImage",
          formData.profileImage
        );
      }

      if (formData.resume) {
        data.append(
          "resume",
          formData.resume
        );
      }

      await settingService.updateSettings(
        data
      );

      toast.success(
        "Settings updated successfully."
      );

      fetchSettings();
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-zinc-400">
        Loading Settings...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Portfolio Settings"
        subtitle="Manage your portfolio information."
      />

      <SettingForm
        formData={formData}
        setFormData={setFormData}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
        resumeName={resumeName}
        setResumeName={setResumeName}
        loading={loading}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Settings;