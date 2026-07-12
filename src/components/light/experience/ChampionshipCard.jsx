import { motion } from 'framer-motion';
import { Trophy, Crown, Github, ExternalLink } from 'lucide-react';

export const ChampionshipCard = ({ role, company, period, location, points, stack, links, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="chess-championship-card"
        >
            <div className="champ-header">
                <div className="champ-title">
                    <Trophy size={28} className="champ-trophy" />
                    <span className="champ-championship-name">BLUNDERMASTER CHAMPIONSHIP</span>
                </div>
                <div className="champ-year">{period}</div>
            </div>

            <div className="champ-body">
                <h3 className="champ-role">{role}</h3>

                <div className="champ-company">
                    <Crown size={18} fill="currentColor" className="crown-icon" />
                    {company} <span className="champ-separator">•</span> {location}
                </div>

                <div className="champ-moves-list">
                    {points.map((point, idx) => {
                        const movesList = ['1. f3', '1... e5', '2. g4', '2... Qh4#'];
                        const moveNotation = movesList[idx % movesList.length];
                        return (
                            <div key={idx} className="champ-move">
                                <div className="move-notation">{moveNotation}</div>
                                <div className="move-desc">{point}</div>
                            </div>
                        );
                    })}
                </div>

                <div className="champ-tech-stack">
                    {stack.map(tech => (
                        <span key={tech} className="champ-tech-tag">
                            {tech}
                        </span>
                    ))}
                </div>

                {links && (
                    <div className="champ-links-container">
                        {links.github && (
                            <a
                                href={links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="chess-btn-secondary"
                            >
                                <Github size={18} />
                                <span>ANALYZE GAME</span>
                            </a>
                        )}
                        {links.live && (
                            <a
                                href={links.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="chess-btn-primary"
                            >
                                <ExternalLink size={18} />
                                <span>REPLAY MATCH</span>
                            </a>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
};
