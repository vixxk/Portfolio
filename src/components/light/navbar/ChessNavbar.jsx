import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { resumeData } from '../../../data/resume';
import { useTheme } from '../../../context/ThemeContext';
import './ChessNavbar.css';

const chessNavLinks = [
    { name: 'About', to: 'hero', rank: 'f3?' },
    { name: 'Skills', to: 'skills', rank: 'e5' },
    { name: 'Experience', to: 'experience', rank: 'g4??' },
    { name: 'Projects', to: 'projects', rank: 'Qh4#' },
    { name: 'Contact', to: 'contact', rank: '0-1' },
];

export const ChessNavbar = () => {
    const { personalInfo } = resumeData;
    const { toggleTheme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`chess-navbar ${isScrolled ? 'scrolled' : ''}`}
            >
                <div className="chess-navbar-content">
                    {/* Logo - Pawn Icon */}
                    <Link
                        to="hero"
                        smooth={true}
                        duration={500}
                        offset={-100}
                        className="chess-logo"
                    >
                        <img src="/bot icon.png" alt="bot logo" className="chess-logo-img" />
                        <div className="chess-logo-text-wrapper">
                            <span className="logo-text">VIVEK</span>
                            <span className="logo-subtext">.jsx</span>
                        </div>
                    </Link>

                    {/* Desktop Links - File/Rank Style - Centered */}
                    <nav className="chess-nav-links" aria-label="Chess Navigation">
                        {chessNavLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.to}
                                spy={true}
                                smooth={true}
                                offset={-100}
                                duration={500}
                                className="chess-nav-link"
                                activeClass="active"
                            >
                                <span className="chess-notation">{link.rank}</span>
                                <span className="chess-link-text">{link.name}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Actions - Right */}
                    <div className="chess-nav-actions">
                        <a
                            href={personalInfo.resumeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="chess-btn-outline"
                        >
                            Notation (CV)
                        </a>

                        {/* Theme Toggle - Chess Board Style */}
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

                        {/* Mobile Toggle Button */}
                        <button
                            className="chess-mobile-toggle"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                        >
                            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        className="chess-mobile-menu"
                    >
                        <button
                            className="absolute top-6 right-6 text-white"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <X size={32} />
                        </button>

                        <div className="flex flex-col items-center justify-center h-full gap-8">
                            {chessNavLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.to}
                                    smooth={true}
                                    offset={-50}
                                    duration={500}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="chess-mobile-link text-2xl font-bold flex flex-col items-center"
                                >
                                    <span className="text-[var(--chess-accent-purple)] text-sm mb-1">{link.rank}</span>
                                    {link.name}
                                </Link>
                            ))}
                            <a
                                href={personalInfo.resumeLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="chess-btn-outline text-lg px-8 py-3 mt-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Notation (CV)
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
