import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { resumeData } from '../../../data/resume';
import { useTheme } from '../../../context/ThemeContext';
import './Navbar.css';

const navLinks = [
    { name: 'About', to: 'hero', index: '01' },
    { name: 'Skills', to: 'skills', index: '02' },
    { name: 'Experience', to: 'experience', index: '03' },
    { name: 'Projects', to: 'projects', index: '04' },
    { name: 'Contact', to: 'contact', index: '05' },
];

export const Navbar = () => {
    const { personalInfo } = resumeData;
    const { toggleTheme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.header
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`dark-navbar ${isScrolled ? 'scrolled' : ''}`}
            >
                <div className="dark-navbar-inner">
                    {/* Logo */}
                    <Link
                        to="hero"
                        smooth={true}
                        duration={500}
                        offset={-80}
                        className="dark-logo"
                    >
                        <div className="dark-logo-avatar-frame">
                            <img src="/bot icon.png" alt="Avatar" className="dark-logo-avatar" />
                        </div>
                        <div className="dark-logo-text">
                            <span className="dark-logo-name">Vivek Anand</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav className="dark-nav-links" aria-label="Main Navigation">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.to}
                                spy={true}
                                smooth={true}
                                offset={-90}
                                duration={500}
                                className="dark-nav-link"
                                activeClass="active"
                            >
                                <span className="dark-nav-prefix">{link.index}.</span>
                                <span className="dark-nav-label">{link.name}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Actions: Resume + Theme Toggle */}
                    <div className="dark-nav-actions">
                        <a
                            href={personalInfo.resumeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="dark-resume-btn"
                        >
                            <span>Resume</span>
                            <ArrowUpRight size={13} className="dark-resume-arrow" />
                        </a>

                        {/* Chessboard Switcher */}
                        <button
                            onClick={toggleTheme}
                            className="dark-chess-toggle"
                            aria-label="Switch to Grandmaster Chess Theme"
                            title="Switch to Grandmaster Chess Theme"
                        >
                            <span className="dark-board-grid" aria-hidden="true">
                                <span className="dark-cell white"></span>
                                <span className="dark-cell black"></span>
                                <span className="dark-cell black"></span>
                                <span className="dark-cell white"></span>
                            </span>
                        </button>

                        {/* Mobile Toggle */}
                        <button
                            className="dark-mobile-toggle"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="dark-mobile-menu"
                    >
                        <div className="dark-mobile-header">
                            <span className="dark-mobile-title">System Navigation</span>
                            <button
                                className="dark-mobile-close"
                                onClick={() => setIsMobileMenuOpen(false)}
                                aria-label="Close menu"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="dark-mobile-nav-list">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.to}
                                    smooth={true}
                                    offset={-60}
                                    duration={500}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="dark-mobile-link"
                                >
                                    <span className="dark-mobile-idx">{link.index} //</span>
                                    <span className="dark-mobile-name">{link.name}</span>
                                </Link>
                            ))}
                            <a
                                href={personalInfo.resumeLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="dark-mobile-resume-btn"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Download Resume
                                <ArrowUpRight size={15} />
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
