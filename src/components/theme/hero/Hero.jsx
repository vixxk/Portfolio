import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resumeData } from '../../../data/resume';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-scroll';
import { InteractiveCanvas } from './InteractiveCanvas';
import { StatusBadge } from './StatusBadge';
import './Hero.css';

const useSequentialPhrases = (phrases, stepDurations = 2500, initialDelay = 600, active = true) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        if (!active) {
            setCurrentIndex(phrases.length - 1);
            setHasStarted(true);
            return;
        }

        const startTimer = setTimeout(() => {
            setHasStarted(true);
        }, initialDelay);

        return () => clearTimeout(startTimer);
    }, [initialDelay, active, phrases.length]);

    useEffect(() => {
        if (!active || !hasStarted) {
            return;
        }

        if (currentIndex < phrases.length - 1) {
            const currentDuration = Array.isArray(stepDurations) 
                ? (stepDurations[currentIndex] ?? 2500)
                : stepDurations;

            const timer = setTimeout(() => {
                setCurrentIndex(prev => prev + 1);
            }, currentDuration);
            return () => clearTimeout(timer);
        }
    }, [currentIndex, phrases.length, stepDurations, active, hasStarted]);

    return {
        currentIndex,
        hasStarted,
        isResolved: currentIndex === phrases.length - 1
    };
};

export const Hero = () => {
    const { personalInfo } = resumeData;
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);
    }, []);

    const phrases = ["Open To Work", "Full Stack GenAI Developer", personalInfo.name];

    const { currentIndex, hasStarted, isResolved } = useSequentialPhrases(
        phrases,
        [2500, 3500],
        600,
        !prefersReducedMotion
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
    };

    return (
        <section id="hero" className="hero-section">
            <InteractiveCanvas isResolved={isResolved} />
            <div className="hero-grid-overlay"></div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="hero-content"
            >
                <StatusBadge variants={itemVariants} />

                <motion.h1 variants={itemVariants} className="hero-title">
                    Hi, I'm <br />
                    {prefersReducedMotion ? (
                        <span className="text-gradient">{personalInfo.name}</span>
                    ) : (
                        <span style={{ display: 'block', position: 'relative', minHeight: '1.2em', verticalAlign: 'bottom' }}>
                            <AnimatePresence mode="wait">
                                {hasStarted && (
                                    <motion.span
                                        key={currentIndex}
                                        className="text-gradient"
                                        initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                        exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                        style={{ 
                                            display: 'block', 
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {phrases[currentIndex]}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </span>
                    )}
                </motion.h1>

                <motion.p variants={itemVariants} className="hero-subtitle">
                    {personalInfo.objective.split('.')[0]}.
                </motion.p>

                <motion.div variants={itemVariants} className="hero-actions">
                    <Link to="projects" smooth={true} offset={-80} duration={600} className="btn btn-primary hero-cta">
                        Retrieve Projects <ArrowRight size={16} />
                    </Link>
                    <div className="hero-socials">
                        <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="GitHub">
                            <Github size={18} />
                        </a>
                        <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="LinkedIn">
                            <Linkedin size={18} />
                        </a>
                        <a href={`mailto:${personalInfo.email}`} className="btn-icon" aria-label="Email">
                            <Mail size={18} />
                        </a>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};
