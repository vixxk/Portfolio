import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resumeData } from '../../../data/resume';
import { Github, Linkedin, Mail } from 'lucide-react';
import { WatermarkKing } from './WatermarkKing';
import './ChessHero.css';

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

export const ChessHero = () => {
    const { personalInfo } = resumeData;
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);
    }, []);

    const phrases = ["Open To Work", "Full Stack GenAI Developer", personalInfo.name];

    const { currentIndex, hasStarted } = useSequentialPhrases(
        phrases,
        [2500, 3500],
        600,
        !prefersReducedMotion
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3, delayChildren: 0.5 }
        }
    };

    return (
        <section id="hero" className="chess-hero-section">
            <WatermarkKing />

            <motion.div
                className="chess-hero-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h1 className="hero-title" variants={{ hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                    Hi, I'm <br />
                    {prefersReducedMotion ? (
                        <span className="highlight">{personalInfo.name}</span>
                    ) : (
                        <span style={{ display: 'block', position: 'relative', minHeight: '1.2em', verticalAlign: 'bottom' }}>
                            <AnimatePresence mode="wait">
                                {hasStarted && (
                                    <motion.span
                                        key={currentIndex}
                                        className="highlight"
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

                <motion.div
                    className="hero-subtitle"
                    variants={{ hidden: { x: -20, opacity: 0 }, visible: { x: 0, opacity: 1 } }}
                >
                    <p className="hero-subtitle-primary">The King behind the board.</p>
                    <p className="hero-subtitle-secondary">Strategizing complex systems and executing precise solutions with endgame mastery.</p>
                </motion.div>

                <motion.div
                    className="chess-social-container"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                >
                    <a
                        href={personalInfo.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="chess-social-icon"
                        title="Github"
                    >
                        <Github size={20} strokeWidth={2} />
                    </a>

                    <a
                        href={personalInfo.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="chess-social-icon"
                        title="LinkedIn"
                    >
                        <Linkedin size={20} strokeWidth={2} />
                    </a>

                    <a
                        href={`mailto:${personalInfo.email}`}
                        className="chess-social-icon"
                        title="Email"
                    >
                        <Mail size={20} strokeWidth={2} />
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
};
