import { motion } from 'framer-motion';
import { resumeData } from '../../../data/resume';
import { MatchCard } from './MatchCard';
import './ChessProjects.css';

export const ChessProjects = () => {
    const { projects } = resumeData;

    return (
        <section id="projects" className="chess-section">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="chess-section-header"
            >
                <h2 className="chess-section-title">
                    Match <span className="chess-title-highlight">History</span>
                </h2>
                <div className="chess-header-underline"></div>
            </motion.div>

            <div className="chess-projects-grid">
                {projects.map((project, index) => (
                    <MatchCard key={index} project={project} index={index} />
                ))}
            </div>
        </section>
    );
};
