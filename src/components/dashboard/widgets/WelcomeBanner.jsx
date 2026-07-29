import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";

const WelcomeBanner = ({ admin }) => {

    const hour = new Date().getHours();

    const greeting =
        hour < 12
            ? "Good Morning"
            : hour < 17
            ? "Good Afternoon"
            : "Good Evening";

    return (

        <motion.div

            initial={{ opacity: 0, y: 20 }}

            animate={{ opacity: 1, y: 0 }}

            className="
            rounded-3xl
            border
            border-zinc-800
            bg-zinc-900/60
            backdrop-blur-xl
            p-8
            shadow-xl
        "

        >

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-4xl font-bold text-white">

                        {greeting},

                        <span className="text-blue-500">

                            {" "}
                            {admin?.name}

                        </span>

                        👋

                    </h1>

                    <p className="mt-3 text-zinc-400">

                        Welcome back to your portfolio dashboard.

                    </p>

                </div>

                <div className="hidden md:flex items-center gap-2 text-zinc-400">

                    <CalendarDays size={20} />

                    {new Date().toDateString()}

                </div>

            </div>

        </motion.div>

    );

};

export default WelcomeBanner;