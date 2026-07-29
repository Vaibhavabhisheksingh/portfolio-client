import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-zinc-950">

      {/* Background Glow 1 */}
      <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-blue-600/20 blur-[140px]" />

      {/* Background Glow 2 */}
      <div className="absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-cyan-500/20 blur-[140px]" />

      {/* Grid Pattern */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.04]
          [background-image:linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(to_right,#ffffff_1px,transparent_1px)]
          [background-size:50px_50px]
        "
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-16">

        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden max-w-xl lg:block"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm text-blue-300">

            <ShieldCheck size={18} />

            Protected Admin Panel

          </div>

          <h1 className="mt-8 text-6xl font-extrabold leading-tight text-white">

            Welcome
            <br />

            Back.

          </h1>

          <p className="mt-8 text-lg leading-9 text-zinc-400">

            Access your premium dashboard to manage projects,
            skills, certificates, messages and every part
            of your portfolio from one place.

          </p>

          <div className="mt-12 flex gap-8">

            <div>

              <h2 className="text-4xl font-bold text-white">
                100%
              </h2>

              <p className="mt-2 text-zinc-500">
                Secure Access
              </p>

            </div>

            <div>

              <h2 className="text-4xl font-bold text-white">
                MERN
              </h2>

              <p className="mt-2 text-zinc-500">
                Powered
              </p>

            </div>

            <div>

              <h2 className="text-4xl font-bold text-white">
                Fast
              </h2>

              <p className="mt-2 text-zinc-500">
                Experience
              </p>

            </div>

          </div>

        </motion.div>

        {/* Right Side */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mx-auto w-full max-w-md"
        >
          <LoginForm />
        </motion.div>

      </div>

    </div>
  );
};

export default Login;