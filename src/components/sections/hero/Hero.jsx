import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
import ScrollIndicator from "./ScrollIndicator";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-24 pb-10">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left */}
          <div className="order-2 lg:order-1">
            <HeroContent />
          </div>
{/* right */}
          <div className="order-1 lg:order-2">
            <HeroImage />
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
};

export default Hero;
