import { useTheme } from '../context/ThemeContext';
import { Navbar as DarkNavbar } from './theme/navbar/Navbar';
import { ChessNavbar as LightNavbar } from './light/navbar/ChessNavbar';
import { motion, useScroll, useSpring } from 'framer-motion';
import './Layout.css';

export const Layout = ({ children }) => {
    const { theme } = useTheme();
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

            {theme === 'chess' ? <LightNavbar /> : <DarkNavbar />}

            <main className="main-content">
                {children}
            </main>

            {/* Background Gradients/Blobs */}
            <div className="bg-effects">
                <div className="blob blob-1" />
                <div className="blob blob-2" />
            </div>
        </div>
    );
};

