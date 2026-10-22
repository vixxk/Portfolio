import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../../../data/resume';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-scroll';
import { InteractiveCanvas } from './InteractiveCanvas';
import './Hero.css';

export const Hero = () => {
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
            <InteractiveCanvas />
            <div className="hero-ambient-glow" aria-hidden="true"></div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="hero-content"
            >
                <motion.h1 variants={itemVariants} className="hero-title">
                    Hi, I'm <br />
                    {prefersReducedMotion ? (
                        <span className="hero-highlight-name">{personalInfo.name}</span>
                    ) : (
                        <span className="hero-roller-viewport">
                            <motion.span
                                className="hero-roller-strip"
                                initial={{ y: '0em' }}
                                animate={{
                                    y: ['0em', '0em', '-1.35em', '-1.35em', '-2.7em']
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
                                    <span key={idx} className="hero-roller-row">
                                        <span className="hero-highlight-name">
                                            {phrase}
                                        </span>
                                    </span>
                                ))}
                            </motion.span>
                        </span>
                    )}
                </motion.h1>

                <motion.p variants={itemVariants} className="hero-subtitle">
                    {personalInfo.objective.split('.')[0]}.
                </motion.p>

                <motion.div variants={itemVariants} className="hero-actions">
                    <Link to="projects" smooth={true} offset={-80} duration={600} className="btn-primary hero-cta">
                        <span>View Projects</span>
                        <ArrowRight size={15} />
                    </Link>

                    <div className="hero-socials">
                        <a 
                            href={personalInfo.social.github} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn-icon" 
                            aria-label="GitHub profile"
                            title="GitHub"
                        >
                            <Github size={18} />
                        </a>
                        <a 
                            href={personalInfo.social.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn-icon" 
                            aria-label="LinkedIn profile"
                            title="LinkedIn"
                        >
                            <Linkedin size={18} />
                        </a>
                        <a 
                            href={`mailto:${personalInfo.email}`} 
                            className="btn-icon" 
                            aria-label="Send Email"
                            title="Email"
                        >
                            <Mail size={18} />
                        </a>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};
