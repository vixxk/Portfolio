import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../../../data/resume';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-scroll';
import { InteractiveCanvas } from './InteractiveCanvas';
import { StatusBadge } from './StatusBadge';
import './Hero.css';

const useTextScramble = (targetText, delay = 600, duration = 1200, active = true) => {
    const [text, setText] = useState('');
    useEffect(() => {
        if (!active) {
            setText(targetText);
            return;
        }
        let isMounted = true;
        const chars = '01#@$%&*<>[]{}__+=?~/\\';
        let frame = 0;
        const totalFrames = Math.floor(duration / 16);
        
        const timeoutId = setTimeout(() => {
            const interval = setInterval(() => {
                if (!isMounted) return clearInterval(interval);
                frame++;
                const progress = frame / totalFrames;
                
                if (progress >= 1) {
                    setText(targetText);
                    clearInterval(interval);
                    return;
                }
                
                const scrambled = targetText
                    .split('')
                    .map((char, index) => {
                        if (char === ' ') return ' ';
                        if (index / targetText.length < progress) {
                            return targetText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');
                setText(scrambled);
            }, 16);
        }, delay);

        return () => {
            isMounted = false;
            clearTimeout(timeoutId);
        };
    }, [targetText, delay, duration, active]);
    return text;
};

export const Hero = () => {
    const { personalInfo } = resumeData;
    const [isResolved, setIsResolved] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);
    }, []);

    const scrambledName = useTextScramble(personalInfo.name, 600, 1500, !prefersReducedMotion);

    useEffect(() => {
        setIsResolved(false);
        const timer = setTimeout(() => setIsResolved(true), 2000);
        return () => clearTimeout(timer);
    }, []);

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
                    <span className="text-gradient">
                        {prefersReducedMotion ? personalInfo.name : scrambledName}
                    </span>
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
