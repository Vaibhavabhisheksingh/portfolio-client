import { Download, Mail } from "lucide-react";
import Button from "../../common/Button";



const HeroButtons = ({ settings }) => {
  const handleResumeDownload = () => {
    if (!settings?.resume?.url) {
      alert("Resume is not available yet.");
      return;
    }

    window.open(settings.resume.url, "_blank");
  };

  const handleContact = () => {
    const section = document.getElementById("contact");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };


  return (
    <div className="flex flex-wrap gap-4">

      <Button onClick={handleResumeDownload}>
        <div className="flex items-center gap-2">
          <Download size={18} />
          Download Resume
        </div>
      </Button>

      <Button variant="secondary" onClick={handleContact}>
        <div className="flex items-center gap-2">
          <Mail size={18} />
          Contact Me
        </div>
      </Button>

    </div>
  );
};

export default HeroButtons;