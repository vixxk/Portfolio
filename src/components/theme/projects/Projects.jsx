import { motion } from 'framer-motion';
import { resumeData } from '../../../data/resume';
import { ProjectCard } from './ProjectCard';
import './Projects.css';

export const Projects = () => {
    const { projects } = resumeData;

    return (
        <section id="projects" className="section projects-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-header"
                >
                    <span className="section-eyebrow">// retrieve_modules</span>
                    <h2 className="text-3xl font-display font-bold">
                        Featured <span className="text-gradient">Projects</span>
                    </h2>
                    <div className="section-line"></div>
                </motion.div>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};
