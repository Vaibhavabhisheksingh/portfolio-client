import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import SectionHeading from "../../common/SectionHeading";
import JourneyCard from "./JourneyCard";

import experienceService from "../../../services/experienceService";
import educationService from "../../../services/educationService";
import ErrorState from "../../common/ErrorState";

const Journey = () => {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchTimeline();
  }, []);

  const fetchTimeline = async () => {
    try {
      setLoading(true);
      setError(false);
      const [experienceRes, educationRes] = await Promise.all([
        experienceService.getExperiences(),
        educationService.getEducations(),
      ]);

      const experiences = (experienceRes.experiences || []).map((item) => ({
        type: "experience",
        ...item,
      }));

      const educations = (educationRes.educations || []).map((item) => ({
        type: "education",
        ...item,
      }));

      const merged = [...experiences, ...educations];

      merged.sort((a, b) => {
        return new Date(b.startDate) - new Date(a.startDate);
      });

      setTimeline(merged);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <section id="journey" className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading title="Featured Journey" subtitle="MY JOURNEY" />

          <div className="space-y-10">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="h-96 animate-pulse rounded-3xl bg-zinc-800"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Couldn't load journey"
        message="Please try again."
        onRetry={fetchTimeline}
      />
    );
  }
  if (!timeline.length) {
    return (
      <section id="journey" className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            title="My Journey"
            subtitle="LEARNING • BUILDING • GROWING"
          />

          <div className="py-20 text-center">
            <h3 className="text-2xl font-semibold text-white">
              No Experience or Education Found
            </h3>

            <p className="mt-4 text-zinc-400">
              Education and Experience journey will appear here soon.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="journey" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          title="My Journey"
          subtitle="LEARNING • BUILDING • GROWING"
        />

        <div className="relative mt-20">
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="
              absolute
              left-6
              top-0
              w-[3px]
              rounded-full
              bg-gradient-to-b
              from-blue-500
              via-cyan-400
              to-violet-500
              lg:left-1/2
              lg:-translate-x-1/2
            "
          />

          <div className="space-y-16">
            {timeline.map((item, index) => (
              <JourneyCard key={item._id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
