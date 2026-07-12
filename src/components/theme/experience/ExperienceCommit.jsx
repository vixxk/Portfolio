import { motion } from 'framer-motion';
import { GitCommit, Github, ExternalLink } from 'lucide-react';

export const ExperienceCommit = ({ job, index, commitHash }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            className="git-commit"
        >
            {/* Git Branch Timeline Dot */}
            <div className="git-node-wrapper">
                <div className="git-node">
                    <GitCommit size={16} />
                </div>
            </div>

            {/* Commit Details Card */}
            <div className="git-commit-card">
                {/* Commit Meta */}
                <div className="git-commit-meta">
                    <span className="git-hash">{commitHash}</span>
                    <span className="git-author">Author: Vivek Anand &lt;vivek.jsx@gmail.com&gt;</span>
                    <span className="git-date">Date: {job.period} ({job.location})</span>
                </div>

                {/* Commit Message Header */}
                <h3 className="git-commit-title">
                    {job.role} <span className="git-company">@ {job.company}</span>
                </h3>

                {/* Diff Body */}
                <div className="git-diff-body">
                    <div className="git-diff-header">
                        <span>diff --git a/{job.role.toLowerCase().replace(/\s+/g, '_')}.log b/experience.log</span>
                        <span>index {commitHash.substring(7, 14)}..head 100644</span>
                        <span>--- a/{job.role.toLowerCase().replace(/\s+/g, '_')}.log</span>
                        <span>+++ b/experience.log</span>
                    </div>
                    <ul className="git-diff-lines">
                        {job.points.map((point, idx) => (
                            <li key={idx} className="git-diff-line-item">
                                <span className="diff-plus">+</span>
                                <span className="diff-text">{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Footer stack and links */}
                <div className="git-commit-footer">
                    <div className="git-commit-stack">
                        <span className="footer-label">Stack:</span>
                        {job.stack.map((tech) => (
                            <span key={tech} className="git-stack-tag">
                                {tech}
                            </span>
                        ))}
                    </div>

                    {job.links && (
                        <div className="git-commit-links">
                            {job.links.github && (
                                <a
                                    href={job.links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="git-link-btn"
                                    title="View Source Repository"
                                >
                                    <Github size={14} /> <span>[code]</span>
                                </a>
                            )}
                            {job.links.live && (
                                <a
                                    href={job.links.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="git-link-btn"
                                    title="View Live Site"
                                >
                                    <ExternalLink size={14} /> <span>[live]</span>
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};
