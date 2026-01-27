import { useState } from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../../data/resume';
import { useTheme } from '../../context/ThemeContext';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-scroll';
import './ChessHero.css';

export const ChessHero = () => {
    const { personalInfo } = resumeData;
    const { theme } = useTheme();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3, delayChildren: 0.5 }
        }
    };

    return (
        <section id="hero" className="chess-hero-section relative min-h-screen flex items-center justify-center overflow-hidden">

            {/* Watermark King Image */}
            <div className="king-watermark-bg"></div>

            <motion.div
                className="chess-hero-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >


                <motion.h1 className="hero-title" variants={{ hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                    Hi, I'm <br />
                    <span className="highlight">{personalInfo.name}</span>
                </motion.h1>

                <motion.div
                    className="hero-subtitle"
                    variants={{ hidden: { x: -20, opacity: 0 }, visible: { x: 0, opacity: 1 } }}
                >
                    <p className="mb-2 font-bold">The King behind the board.</p>
                    <p className="opacity-80">Strategizing complex systems and executing precise solutions with endgame mastery.</p>
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
