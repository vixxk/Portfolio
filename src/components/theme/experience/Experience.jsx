import { motion } from 'framer-motion';
import { resumeData } from '../../../data/resume';
import { ExperienceCommit } from './ExperienceCommit';
import './Experience.css';

export const Experience = () => {
    const { experience } = resumeData;
    const commitHashes = ['commit f429cb0a811d', 'commit e8b31a29f61b'];

    return (
        <section id="experience" className="section experience-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-header"
                >
                    <span className="section-eyebrow">// git_log_history</span>
                    <h2 className="text-3xl font-display font-bold">
                        Work <span className="text-gradient">Experience</span>
                    </h2>
                    <div className="section-line"></div>
                </motion.div>

                <div className="git-log">
                    {experience.map((job, index) => (
                        <ExperienceCommit
                            key={index}
                            job={job}
                            index={index}
                            commitHash={commitHashes[index] || 'commit 8a3c5df290b2'}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
