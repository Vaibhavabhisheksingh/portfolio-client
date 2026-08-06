// import { motion } from "framer-motion";

// const AnimatedBackground = () => {
//     return (
//         <div className="fixed inset-0 -z-50 overflow-hidden bg-[#09090B]">

//             {/* Top Left Glow */}

//             <motion.div
//                 animate={{
//                     x: [0, 120, 0],
//                     y: [0, 80, 0],
//                     scale: [1, 1.3, 1],
//                 }}
//                 transition={{
//                     duration: 20,
//                     repeat: Infinity,
//                     repeatType: "mirror",
//                 }}
//                 className="absolute top-[-180px] left-[-180px] h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[150px]"
//             />

//             {/* Bottom Right Glow */}

//             <motion.div
//                 animate={{
//                     x: [0, -120, 0],
//                     y: [0, -80, 0],
//                     scale: [1, 1.2, 1],
//                 }}
//                 transition={{
//                     duration: 25,
//                     repeat: Infinity,
//                     repeatType: "mirror",
//                 }}
//                 className="absolute bottom-[-180px] right-[-180px] h-[500px] w-[500px] rounded-full bg-violet-500/20 blur-[150px]"
//             />

//             {/* Center Glow */}

//             <motion.div
//                 animate={{
//                     scale: [1, 1.1, 1],
//                     opacity: [0.15, 0.25, 0.15],
//                 }}
//                 transition={{
//                     duration: 15,
//                     repeat: Infinity,
//                 }}
//                 className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[160px]"
//             />

//         </div>
//     );
// };

// export default AnimatedBackground;
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const AnimatedBackground = () => {
  const [isMobile, setIsMobile] = useState(false);

  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const move = (e) => {
      setMouse({
        x: (e.clientX - window.innerWidth / 2) / 40,
        y: (e.clientY - window.innerHeight / 2) / 40,
      });
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, [isMobile]);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#09090B]">

      {/* Animated Gradient Mesh */}

      <motion.div
        animate={{
          backgroundPosition: [
            "0% 50%",
            "100% 50%",
            "0% 50%",
          ],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundSize: "300% 300%",
        }}
        className={`absolute inset-0 ${
          isMobile ? "opacity-10" : "opacity-20"
        } bg-[linear-gradient(135deg,#2563eb22,#9333ea22,#06b6d422,#2563eb22)]`}
      />

      {/* Animated Grid */}

      <motion.div
        animate={{
          rotate: [0, 1.5, 0],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        className={`absolute inset-[-20%] ${
          isMobile ? "opacity-[0.04]" : "opacity-[0.08]"
        }`}
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(63 63 70 / 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(63 63 70 / 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Noise Texture */}

      <div
        className={`absolute inset-0 pointer-events-none bg-repeat ${
          isMobile ? "opacity-[0.015]" : "opacity-[0.03]"
        }`}
        style={{
          backgroundImage: "url('/noise.png')",
        }}
      />

      {/* Top Left Glow */}

      <motion.div
        animate={{
          x: [
            mouse.x,
            mouse.x + (isMobile ? 40 : 120),
            mouse.x,
          ],
          y: [
            mouse.y,
            mouse.y + (isMobile ? 30 : 80),
            mouse.y,
          ],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className={`absolute top-[-120px] left-[-120px] rounded-full bg-blue-500/20 ${
          isMobile
            ? "h-[260px] w-[260px] blur-[70px]"
            : "h-[520px] w-[520px] blur-[150px]"
        }`}
      />

      {/* Bottom Right Glow */}

      <motion.div
        animate={{
          x: [
            mouse.x,
            mouse.x - (isMobile ? 40 : 120),
            mouse.x,
          ],
          y: [
            mouse.y,
            mouse.y - (isMobile ? 30 : 80),
            mouse.y,
          ],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className={`absolute bottom-[-120px] right-[-120px] rounded-full bg-violet-500/20 ${
          isMobile
            ? "h-[260px] w-[260px] blur-[70px]"
            : "h-[520px] w-[520px] blur-[150px]"
        }`}
      />

      {/* Center Glow */}

      <motion.div
        animate={{
          x: mouse.x / 2,
          y: mouse.y / 2,
          scale: [1, 1.08, 1],
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 ${
          isMobile
            ? "h-[220px] w-[220px] blur-[80px]"
            : "h-[460px] w-[460px] blur-[160px]"
        }`}
      />

      {/* Soft Radial Overlay */}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, rgba(9,9,11,0.15) 55%, rgba(9,9,11,0.65) 100%)",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;