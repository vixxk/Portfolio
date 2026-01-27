import { motion } from 'framer-motion';
import { useState } from 'react';
import { resumeData } from '../data/resume';
import { Github, ExternalLink, FolderGit2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ChessProjects } from './chess/ChessProjects';
import './Projects.css';

export const Projects = () => {
    const { projects } = resumeData;
    const { theme } = useTheme();

    if (theme === 'chess') {
        return <ChessProjects />;
    }

    return (
        <section id="projects" className="section">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="section-header"
            >
                <h2 className="text-3xl font-display font-bold mb-4">Featured <span className="text-primary">Projects</span></h2>
                <div className="section-line"></div>
            </motion.div>

            <div className="grid-responsive">
                {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} index={index} />
                ))}
            </div>
        </section>
    );
};

const ProjectCard = ({ project, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const visibleStack = isExpanded ? project.stack : project.stack.slice(0, 3);
    const hiddenCount = project.stack.length - 3;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="card project-card group"
        >
            {/* Top Gradient Line */}
            <div className="card-gradient-top"></div>

            <div className="project-content">
                <div className="project-header">
                    <div className="project-icon">
                        <FolderGit2 size={24} />
                    </div>
                    <div className="project-links">
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="link-icon" title="View Code"><Github size={20} /></a>
                        <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="link-icon" title="Live Demo"><ExternalLink size={20} /></a>
                    </div>
                </div>

                <h3 className="project-title group-hover-text-primary">{project.title.split('–')[0]}</h3>
                <p className="project-date">{project.date}</p>

                <p className="project-description">
                    {project.points[0]}
                </p>

                <div className="project-stack">
                    {visibleStack.map(tech => (
                        <span key={tech} className="skill-tag text-xs">
                            {tech}
                        </span>
                    ))}
                    {!isExpanded && hiddenCount > 0 && (
                        <button
                            onClick={() => setIsExpanded(true)}
                            className="skill-tag text-xs hover:bg-primary/20 hover:text-primary cursor-pointer transition-colors"
                        >
                            + {hiddenCount}
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};
