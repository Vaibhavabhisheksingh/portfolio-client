import { motion } from "framer-motion";

import AboutContent from "./AboutContent";
import AboutImage from "./AboutImage";
import AboutCards from "./AboutCards";
import SectionHeading from "../../common/SectionHeading";

const About = () => {
  return (
    <section
      id="about"
      className="relative py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6">

        <SectionHeading
          title="About Me"
          subtitle="WHO AM I"
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Image */}

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <AboutImage />
          </motion.div>

          {/* Content */}

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <AboutContent />

            <AboutCards />
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default About;