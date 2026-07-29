import { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { navigation } from "../../constants/navigation";
import Button from "../common/Button";

import settingService from "../../services/settingService";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await settingService.getSettings();
        setSettings(res.settings || res);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSettings();
  }, []);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-black/60 border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto h-20 px-6 flex justify-between items-center">
          {/* Logo */}
          <ScrollLink
            to="home"
            smooth
            duration={700}
            offset={-80}
            aria-label="Go to home section"
          >
            <motion.h1
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-white cursor-pointer"
            >
              Vaibhav<span className="text-blue-500">.</span>
            </motion.h1>
          </ScrollLink>
          {/* Desktop Navigation */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-8"
          >
            {navigation.map((item) => (
              <ScrollLink
                key={item.id}
                to={item.id}
                spy
                smooth
                offset={-80}
                duration={700}
                activeClass="text-blue-500"
                className="cursor-pointer text-zinc-300 hover:text-white transition focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-blue-500
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-black"
              >
                {item.title}
              </ScrollLink>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex gap-3">
            <a
              href={settings?.resume?.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary">Resume</Button>
            </a>

            <ScrollLink to="contact" smooth offset={-80} duration={700}>
              <Button>Hire Me</Button>
            </ScrollLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={
              isOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="lg:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X size={30} aria-hidden="true" />
            ) : (
              <Menu size={30} aria-hidden="true" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navigation.map((item) => (
                <ScrollLink
                  key={item.id}
                  to={item.id}
                  smooth
                  duration={700}
                  offset={-80}
                  onClick={() => setIsOpen(false)}
                  className="text-3xl text-white cursor-pointer focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-blue-500
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-black"
                >
                  {item.title}
                </ScrollLink>
              ))}

              <ScrollLink
                to="contact"
                smooth
                duration={700}
                offset={-80}
                onClick={() => setIsOpen(false)}
              >
                <Button className="mt-6">Hire Me</Button>
              </ScrollLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
