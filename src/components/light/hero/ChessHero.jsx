import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../../../data/resume';
import { Github, Linkedin, Mail } from 'lucide-react';
import { WatermarkKing } from './WatermarkKing';
import './ChessHero.css';

export const ChessHero = () => {
    const { personalInfo } = resumeData;
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);
    }, []);

    const phrases = ["Open To Work", "Full Stack GenAI Developer", personalInfo.name];

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
                        <span className="chess-roller-viewport">
                            <motion.span
                                className="chess-roller-strip"
                                initial={{ y: '0em' }}
                                animate={{
                                    y: ['0em', '0em', '-1.3em', '-1.3em', '-2.6em']
                                }}
                                transition={{
                                    duration: 8.2,
                                    times: [0, 0.22, 0.48, 0.70, 1],
                                    ease: [
                                        'linear',
                                        [0.33, 1, 0.68, 1],
                                        'linear',
                                        [0.16, 1, 0.3, 1]
                                    ]
                                }}
                            >
                                {phrases.map((phrase, idx) => (
                                    <span key={idx} className="chess-roller-row">
                                        <span className="highlight">
                                            {phrase}
                                        </span>
                                    </span>
                                ))}
                            </motion.span>
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
