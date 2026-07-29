import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/footer/Footer";
import AnimatedBackground from "../components/common/AnimatedBackground";

const MainLayout = ({ children }) => {
    return (
        <>
            <AnimatedBackground />

            <Navbar />

            <main>

                {children}

            </main>

            <Footer />
        </>
    );
};

export default MainLayout;