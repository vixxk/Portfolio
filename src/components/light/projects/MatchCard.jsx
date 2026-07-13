import { motion } from 'framer-motion';
import { Github, ExternalLink, Trophy, Clock } from 'lucide-react';

export const MatchCard = ({ project, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="chess-match-card group"
        >
            <div className="match-header">
                <div className="match-opponent">
                    {project.title}
                </div>
                <div className="match-result-badge">
                    <Trophy size={14} className="trophy-icon" /> VICTORY
                </div>
            </div>

            <h3 className="match-title">
                {project.title.split('–')[0]}
            </h3>

            <p className="match-problem">
                "{project.points[0]}"
            </p>

            <div className="match-stats-grid">
                <div className="stat-box">
                    <span className="stat-label">Tactics (Stack)</span>
                    <div className="stat-value">
                        {project.stack.slice(0, 3).map(tech => (
                            <span key={tech} className="tech-tag">
                                {tech}
                            </span>
                        ))}
                        {project.stack.length > 3 && (
                            <span className="tech-more-tag">
                                +{project.stack.length - 3}
                            </span>
                        )}
                    </div>
                </div>
                <div className="stat-box">
                    <span className="stat-label">
                        <Clock size={12} className="clock-icon" /> Time Control
                    </span>
                    <div className="stat-value-text">
                        {project.date}
                    </div>
                </div>
            </div>

            <div className="match-actions">
                <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="chess-btn-secondary">
                    <Github size={13} /> Analyze Game
                </a>
                <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="chess-btn-primary">
                    <ExternalLink size={13} /> Replay Match
                </a>
            </div>
        </motion.div>
    );
};
