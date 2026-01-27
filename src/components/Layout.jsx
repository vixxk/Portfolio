import { Navbar } from './Navbar';
import { motion, useScroll, useSpring } from 'framer-motion';
import './Layout.css';

export const Layout = ({ children }) => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="layout">
            {/* Scroll Progress Bar */}
            <motion.div
                className="scroll-progress"
                style={{ scaleX }}
            />

            <Navbar />

            <main className="container main-content">
                {children}
            </main>

            {/* Footer Removed */}

            {/* Background Gradients/Blobs */}
            <div className="bg-effects">
                <div className="blob blob-1" />
                <div className="blob blob-2" />
            </div>
        </div>
    );
};
