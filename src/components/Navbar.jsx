import { useState, useEffect } from 'react';
import { Link } from 'react-scroll'; // We need to install this or use window.scrollTo
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2 } from 'lucide-react';
import { resumeData } from '../data/resume';
import { useTheme } from '../context/ThemeContext';
import { ChessNavbar } from './chess/ChessNavbar';
import { ThemeToggle } from './ThemeToggle';
import './Navbar.css';

const navLinks = [
    { name: 'About', to: 'hero' },
    { name: 'Skills', to: 'skills' },
    { name: 'Experience', to: 'experience' },
    { name: 'Projects', to: 'projects' },
    { name: 'Contact', to: 'contact' },
];

export const Navbar = () => {
    const { personalInfo } = resumeData;
    const { theme, toggleTheme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (theme === 'chess') {
        return <ChessNavbar />;
    }

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`navbar ${isScrolled ? 'scrolled' : ''}`}
            >
                <div className="container navbar-content flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        to="hero"
                        smooth={true}
                        duration={500}
                        className="logo"
                    >
                        <Code2 className="logo-icon" />
                        <span>Vivek<span className="text-primary">.jsx</span></span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="nav-links">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.to}
                                spy={true}
                                smooth={true}
                                offset={-100}
                                duration={500}
                                className="nav-link"
                                activeClass="active"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <a
                            href={personalInfo.resumeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline"
                        >
                            Resume
                        </a>

                        <button
                            onClick={toggleTheme}
                            className="chess-theme-toggle"
                            aria-label="Toggle Theme"
                            title="Switch Theme"
                        >
                            <div className="board-square white"></div>
                            <div className="board-square black"></div>
                            <div className="board-square black"></div>
                            <div className="board-square white"></div>
                        </button>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="mobile-toggle"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mobile-menu"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.to}
                                smooth={true}
                                offset={-50}
                                duration={500}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="mobile-link"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
