import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-scroll';
import { useTheme } from '../context/ThemeContext';
import { ChessHero } from './chess/ChessHero';
import './Hero.css';

export const Hero = () => {
    const { personalInfo } = resumeData;
    const { theme } = useTheme();

    if (theme === 'chess') {
        return <ChessHero />;
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <section id="hero" className="hero-section">
            <div className="hero-bg-pattern"></div>
            <div className="hero-art"></div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="hero-content"
            >
                <div className="status-badge">
                    Available for Opportunities
                </div>

                <h1 className="hero-title">
                    Hi, I'm <br />
                    <span className="text-gradient">
                        {personalInfo.name}
                    </span>
                </h1>

                <p className="hero-subtitle">
                    {personalInfo.objective.split('.')[0]}.
                </p>

                <div className="hero-actions">
                    <Link to="projects" smooth={true} offset={-100} className="btn btn-primary">
                        View Projects <ArrowRight size={18} />
                    </Link>
                    <div className="hero-socials">
                        <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer" className="btn-icon">
                            <Github size={20} />
                        </a>
                        <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="btn-icon">
                            <Linkedin size={20} />
                        </a>
                        <a href={`mailto:${personalInfo.email}`} className="btn-icon">
                            <Mail size={20} />
                        </a>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};
