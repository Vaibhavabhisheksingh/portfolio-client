import { motion } from "framer-motion";

const AnimatedBackground = () => {
    return (
        <div className="fixed inset-0 -z-50 overflow-hidden bg-[#09090B]">

            {/* Top Left Glow */}

            <motion.div
                animate={{
                    x: [0, 120, 0],
                    y: [0, 80, 0],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: "mirror",
                }}
                className="absolute top-[-180px] left-[-180px] h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[150px]"
            />

            {/* Bottom Right Glow */}

            <motion.div
                animate={{
                    x: [0, -120, 0],
                    y: [0, -80, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    repeatType: "mirror",
                }}
                className="absolute bottom-[-180px] right-[-180px] h-[500px] w-[500px] rounded-full bg-violet-500/20 blur-[150px]"
            />

            {/* Center Glow */}

            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.15, 0.25, 0.15],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                }}
                className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[160px]"
            />

        </div>
    );
};

export default AnimatedBackground;