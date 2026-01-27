import { motion } from 'framer-motion';
import { resumeData } from '../../data/resume';
import { Code2, Database, Globe, Mail, Phone, ExternalLink } from 'lucide-react';
import './ChessContact.css';

export const ChessContact = ({ stats }) => {
    const { personalInfo } = resumeData;

    return (
        <section id="contact" className="chess-contact-section">
            <div className="chess-bg-grid"></div>

            <div className="chess-contact-container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="chess-contact-header"
                >
                    <h2 className="chess-contact-title">
                        Make Your <br />
                        <span className="highlight">Final Move</span>
                    </h2>
                    <p className="chess-contact-subtitle">
                        "The game is won in the endgame. Let's collaborate and build a winning position together."
                    </p>
                </motion.div>

                {/* Contact Methods */}
                <div className="chess-contact-grid">
                    <a href={`mailto:${personalInfo.email}`} className="chess-contact-card">
                        <div className="icon-box">
                            <Mail size={28} />
                        </div>
                        <div className="content">
                            <span className="label">Send Challenge</span>
                            <span className="value">{personalInfo.email}</span>
                        </div>
                    </a>

                    <div className="chess-contact-card">
                        <div className="icon-box">
                            <Phone size={28} />
                        </div>
                        <div className="content">
                            <span className="label">Direct Line</span>
                            <span className="value">{personalInfo.phone}</span>
                        </div>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="chess-stats-row">
                    {/* LeetCode */}
                    <a href={personalInfo.social.leetcode} target="_blank" rel="noopener noreferrer" className="chess-stat-entry">
                        <div className="chess-stat-top">
                            <span className="chess-stat-label">LeetCode</span>
                            <Code2 className="chess-stat-icon" size={24} />
                        </div>
                        <div className="chess-stat-details">
                            <div className="stat-block">
                                <div className="chess-stat-main">{personalInfo.stats.leetcode.dsa}+</div>
                                <div className="chess-stat-sub">DSA Problems</div>
                            </div>
                            <div className="stat-block">
                                <div className="chess-stat-main">{personalInfo.stats.leetcode.sql}+</div>
                                <div className="chess-stat-sub">SQL Problems</div>
                            </div>
                        </div>
                        <img src="/leetcode.webp" alt="" className="chess-stat-bg" />
                    </a>

                    {/* GFG */}
                    <a href={personalInfo.social.gfg} target="_blank" rel="noopener noreferrer" className="chess-stat-entry">
                        <div className="chess-stat-top">
                            <span className="chess-stat-label">GeeksForGeeks</span>
                            <Database className="chess-stat-icon" size={24} />
                        </div>
                        <div className="chess-stat-details">
                            <div className="stat-block">
                                <div className="chess-stat-main">{personalInfo.stats.gfg.score}</div>
                                <div className="chess-stat-sub">Coding Score</div>
                            </div>
                            <div className="stat-block">
                                <div className="chess-stat-main">{stats?.gfg?.solved || personalInfo.stats.gfg.solved}+</div>
                                <div className="chess-stat-sub">DSA Problems</div>
                            </div>
                        </div>
                        <img src="/geeksforgeeks.png" alt="" className="chess-stat-bg" />
                    </a>

                    {/* GitHub */}
                    <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer" className="chess-stat-entry">
                        <div className="chess-stat-top">
                            <span className="chess-stat-label">GitHub</span>
                            <Globe className="chess-stat-icon" size={24} />
                        </div>
                        <div className="chess-stat-details">
                            <div className="stat-block">
                                <div className="chess-stat-main">{stats?.github?.stars}+</div>
                                <div className="chess-stat-sub">Stars</div>
                            </div>
                            <div className="stat-block">
                                <div className="chess-stat-main">{stats?.github?.repos}</div>
                                <div className="chess-stat-sub">Repos</div>
                            </div>
                        </div>
                        <img src="/github.webp" alt="" className="chess-stat-bg" />
                    </a>
                </div>

                {/* Footer State */}
                <div className="chess-footer-state">
                    <div className="chess-state-badge">
                        <span className="state-dot"></span>
                        Status: Active - Open for Matches
                    </div>
                    <p className="chess-footer-copyright">
                        © {new Date().getFullYear()} Vivek Anand. White to move and win.
                    </p>
                </div>
            </div>
        </section>
    );
};
