import { lazy, Suspense } from "react";

import SEO from "../components/common/SEO";
import StructuredData from "../components/common/StructuredData";

const Hero = lazy(() => import("../components/sections/hero/Hero"));
const About = lazy(() => import("../components/sections/about/About"));
const Skills = lazy(() => import("../components/sections/skills/Skills"));
const Projects = lazy(() => import("../components/sections/projects/Projects"));
const Journey = lazy(() => import("../components/sections/journey/Journey"));
const Certificates = lazy(
  () => import("../components/sections/certificates/Certificates"),
);
const Contact = lazy(() => import("../components/sections/contact/Contact"));

const Home = () => {
  return (
    <>
      <SEO />
      <StructuredData />

      <Suspense fallback={null}>
        <Hero />
      </Suspense>

      <Suspense fallback={null}>
        <About />
      </Suspense>

      <Suspense fallback={null}>
        <Skills />
      </Suspense>

      <Suspense fallback={null}>
        <Projects />
      </Suspense>

      <Suspense fallback={null}>
        <Journey />
      </Suspense>

      <Suspense fallback={null}>
        <Certificates />
      </Suspense>

      <Suspense fallback={null}>
        <Contact />
      </Suspense>
    </>
  );
};

export default Home;
