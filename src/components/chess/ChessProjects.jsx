import { motion } from 'framer-motion';
import { resumeData } from '../../data/resume';
import { Github, ExternalLink, Trophy, Clock } from 'lucide-react';
import './ChessProjects.css';

const MatchCard = ({ project, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="chess-match-card group"
        >
            <div className="match-header">
                <div className="match-opponent text-sm uppercase tracking-[0.2em] font-bold text-[var(--chess-accent-purple)]">
                    {project.title}
                </div>
                <div className="match-result-badge">
                    <Trophy size={14} className="mr-1" /> VICTORY
                </div>
            </div>

            <h3 className="match-title text-2xl font-bold mb-2 text-[var(--chess-text-primary)] group-hover:text-[var(--chess-accent-purple)] transition-colors">
                {project.title.split('–')[0]}
            </h3>

            <p className="match-problem text-[var(--chess-text-secondary)] mb-6 text-sm">
                "{project.points[0]}"
            </p>

            <div className="match-stats-grid">
                <div className="stat-box">
                    <span className="stat-label">Tactics (Stack)</span>
                    <div className="stat-value flex flex-wrap gap-2 mt-1">
                        {project.stack.slice(0, 3).map(tech => (
                            <span key={tech} className="tech-tag">
                                {tech}
                            </span>
                        ))}
                        {project.stack.length > 3 && (
                            <span className="text-xs px-1.5 py-0.5 text-[var(--chess-text-secondary)] font-bold">
                                +{project.stack.length - 3}
                            </span>
                        )}
                    </div>
                </div>
                <div className="stat-box">
                    <span className="stat-label"><Clock size={12} className="inline mr-1" /> Time Control</span>
                    <div className="stat-value text-sm text-[var(--chess-text-primary)]">
                        {project.date}
                    </div>
                </div>
            </div>

            <div className="match-actions mt-6 flex gap-3">
                <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="chess-btn-secondary flex-1 text-center flex items-center justify-center gap-2">
                    <Github size={16} /> Analyze Game
                </a>
                <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="chess-btn-primary flex-1 text-center flex items-center justify-center gap-2">
                    <ExternalLink size={16} /> Replay Match
                </a>
            </div>

        </motion.div>
    );
};

export const ChessProjects = () => {
    const { projects } = resumeData;

    return (
        <section id="projects" className="chess-section">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="chess-section-header text-center mb-16"
            >
                <h2 className="text-4xl font-bold mb-4">Match <span className="text-[var(--chess-accent-purple)]">History</span></h2>
                <div className="w-16 h-1 bg-[var(--chess-accent-purple)] mx-auto rounded-full"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
                {projects.map((project, index) => (
                    <MatchCard key={index} project={project} index={index} />
                ))}
            </div>
        </section>
    );
};
