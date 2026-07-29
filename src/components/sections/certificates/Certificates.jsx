import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import SectionHeading from "../../common/SectionHeading";
import CertificateCard from "./CertificateCard";

import certificateService from "../../../services/certificateService";
import ErrorState from "../../common/ErrorState";

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await certificateService.getCertificates();

      setCertificates(res.certificates || []);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="certificates" className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading title="My Certificates" subtitle="CONTINUOUS LEARNING" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-40 animate-pulse rounded-2xl bg-zinc-800"
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
            title="Couldn't load certificates"
            message="Please try again."
            onRetry={fetchCertificates}
          />
        );
      }
      if (!certificates.length) {
        return (
          <section id="certificates" className="py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-6">
              <SectionHeading title="My Certificates" subtitle="CONTINUOUS LEARNING" />
    
              <div className="py-20 text-center">
                <h3 className="text-2xl font-semibold text-white">
                  No Certificates Found
                </h3>
    
                <p className="mt-4 text-zinc-400">
                  Certificates will appear here soon.
                </p>
              </div>
            </div>
          </section>
        );
      }

  return (
    <section
      id="certificates"
      className="py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">

        <SectionHeading
          title="Certificates"
          subtitle="CONTINUOUS LEARNING"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3"
        >
          {certificates.map((certificate) => (
            <CertificateCard
              key={certificate._id}
              certificate={certificate}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Certificates;