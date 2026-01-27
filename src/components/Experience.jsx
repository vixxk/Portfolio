import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';
import { Briefcase, Calendar, MapPin, Github, ExternalLink } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ChessExperience } from './chess/ChessExperience';
import './Experience.css';

export const Experience = () => {
    const { experience } = resumeData;
    const { theme } = useTheme();

    if (theme === 'chess') {
        return <ChessExperience />;
    }

    return (
        <section id="experience" className="section">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="section-header"
            >
                <h2 className="text-3xl font-display font-bold mb-4">Work <span className="text-primary">Experience</span></h2>
                <div className="section-line"></div>
            </motion.div>

            <div className="timeline">
                {experience.map((job, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className="timeline-item"
                    >
                        {/* Timeline Dot */}
                        <div className="timeline-dot"></div>

                        <div className="card timeline-content">
                            <div className="timeline-header">
                                <div>
                                    <h3 className="timeline-role">{job.role}</h3>
                                    <div className="timeline-company">{job.company}</div>
                                </div>
                                <div className="timeline-meta">
                                    <div className="meta-item"><Calendar size={14} /> {job.period}</div>
                                    <div className="meta-item"><MapPin size={14} /> {job.location}</div>
                                </div>
                            </div>

                            <ul className="timeline-points">
                                {job.points.map((point, idx) => (
                                    <li key={idx} className="point-item">
                                        <span className="point-bullet">•</span>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="timeline-stack">
                                {job.stack.map(tech => (
                                    <span key={tech} className="stack-badge">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {job.links && (
                                <div className="timeline-links" style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                                    {job.links.github && (
                                        <a href={job.links.github} target="_blank" rel="noopener noreferrer" className="btn-icon" style={{ width: '40px', height: '40px', padding: '0.5rem' }}>
                                            <Github size={18} />
                                        </a>
                                    )}
                                    {job.links.live && (
                                        <a href={job.links.live} target="_blank" rel="noopener noreferrer" className="btn-icon" style={{ width: '40px', height: '40px', padding: '0.5rem' }}>
                                            <ExternalLink size={18} />
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
