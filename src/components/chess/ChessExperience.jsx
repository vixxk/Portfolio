import { motion } from 'framer-motion';
import { resumeData } from '../../data/resume';
import { Calendar, MapPin, Trophy, Crown, Github, ExternalLink } from 'lucide-react';
import './ChessExperience.css';

const ChampionshipCard = ({ role, company, period, location, points, stack, links, index }) => {
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
                    <span className="font-black tracking-widest text-lg">BLUNDERMASTER CHAMPIONSHIP</span>
                </div>
                <div className="champ-year">{period}</div>
            </div>

            <div className="champ-body">
                <h3 className="champ-role">{role}</h3>

                <div className="champ-company">
                    <Crown size={18} fill="currentColor" />
                    {company} <span className="mx-2">•</span> {location}
                </div>

                <div className="champ-moves-list">
                    {points.map((point, idx) => (
                        <div key={idx} className="champ-move">
                            <div className="move-notation">{idx + 1}. e4</div>
                            <div className="move-desc">{point}</div>
                        </div>
                    ))}
                </div>

                <div className="champ-tech-stack mb-12">
                    {stack.map(tech => (
                        <span key={tech} className="champ-tech-tag">
                            {tech}
                        </span>
                    ))}
                </div>

                {links && (
                    <div className="mt-16 pt-10 border-t border-black/10 flex flex-wrap gap-10 justify-center">
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

export const ChessExperience = () => {
    const { experience } = resumeData;

    return (
        <section id="experience" className="chess-section min-h-screen py-20 bg-[var(--chess-bg-dark)] text-center relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-10 right-10 opacity-[0.03] pointer-events-none">
                <Crown size={180} />
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-16 relative z-10"
            >
                <h2 className="text-5xl font-black mb-4 uppercase tracking-tighter">
                    Tournament <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '2px #fff' }}>History</span>
                </h2>
                <div className="w-24 h-2 bg-white mx-auto"></div>
            </motion.div>

            <div className="chess-exp-timeline relative z-10 px-4">
                {experience.map((job, index) => (
                    <ChampionshipCard
                        key={index}
                        {...job}
                        index={index}
                    />
                ))}
            </div>
        </section>
    );
};
