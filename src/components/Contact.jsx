import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';
import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Code2, Database, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ChessContact } from './chess/ChessContact';
import './Contact.css';

export const Contact = () => {
    const { personalInfo } = resumeData;
    const { theme } = useTheme();
    const [stats, setStats] = useState(personalInfo.stats);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // 1. Fetch GitHub User Data
                const githubUserRes = await fetch(`https://api.github.com/users/${personalInfo.stats.github.username}`);
                const githubUser = await githubUserRes.json();

                // 2. Fetch GitHub Repos (for Stars)
                const githubReposRes = await fetch(`https://api.github.com/users/${personalInfo.stats.github.username}/repos?per_page=100`);
                const githubRepos = await githubReposRes.json();
                const totalStars = Array.isArray(githubRepos)
                    ? githubRepos.reduce((acc, repo) => acc + repo.stargazers_count, 0)
                    : personalInfo.stats.github.stars;

                // 3. Fetch LeetCode Data (Total Solved - optional if we want to show total somewhere else, but for now we show specific DSA/SQL)
                // const leetcodeRes = await fetch(...) 
                // skipping strict fetch update for DSA/SQL split as proxy doesn't give easy "DSA" vs "SQL" Category without parsing.
                // We'll keep the total fetch if we want to use it later, but for the requested view, we use static.

                // 3. LeetCode and GFG - Using static data as APIs are unreliable/CORS restricted

                // Update State
                setStats(prev => ({
                    ...prev,
                    github: {
                        ...prev.github,
                        repos: githubUser.public_repos || prev.github.repos,
                        stars: totalStars,
                    }
                }));

            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };

        fetchStats();
    }, []);

    if (theme === 'chess') {
        return <ChessContact stats={stats} />;
    }

    return (
        <section id="contact" className="section contact-section">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="section-header"
            >
                <h2 className="text-3xl font-display font-bold mb-4">Get in <span className="text-primary">Touch</span></h2>
                <div className="section-line"></div>
            </motion.div>

            <div className="contact-grid">
                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <p className="contact-intro">
                        I'm currently looking for internships and new opportunities.
                        Whether you have a question or just want to say hi, feel free to drop a message!
                    </p>

                    <div className="contact-details">
                        <div className="contact-item">
                            <div className="btn-icon">
                                <Mail size={20} />
                            </div>
                            <a href={`mailto:${personalInfo.email}`} className="text-lg">{personalInfo.email}</a>
                        </div>

                        <div className="contact-item">
                            <div className="btn-icon">
                                <Phone size={20} />
                            </div>
                            <span className="text-lg">{personalInfo.phone}</span>
                        </div>

                        <div className="contact-item">
                            <div className="btn-icon">
                                <MapPin size={20} />
                            </div>
                            <span className="text-lg">{personalInfo.location}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Cards (Replacing Form) */}
                <div className="stats-container">
                    {/* LeetCode Card */}
                    <motion.a
                        href={personalInfo.social.leetcode}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="stat-card leetcode group"
                    >
                        <img src="/leetcode.webp" alt="" className="card-bg-icon" />
                        <div className="stat-icon-wrapper">
                            <img src="/leetcode.webp" alt="LeetCode" className="w-8 h-8 object-contain" />
                        </div>
                        <div className="stat-info">
                            <h3>LeetCode</h3>
                            <div className="stat-numbers">
                                <div>
                                    <span className="stat-value">{personalInfo.stats.leetcode.dsa}+</span>
                                    <span className="stat-label">DSA</span>
                                </div>
                                <div>
                                    <span className="stat-value">{personalInfo.stats.leetcode.sql}+</span>
                                    <span className="stat-label">SQL</span>
                                </div>
                            </div>
                        </div>
                    </motion.a>

                    {/* GFG Card */}
                    <motion.a
                        href={personalInfo.social.gfg}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="stat-card gfg group"
                    >
                        <img src="/geeksforgeeks.png" alt="" className="card-bg-icon" />
                        <div className="stat-icon-wrapper">
                            <img src="/geeksforgeeks.png" alt="GFG" className="w-8 h-8 object-contain" />
                        </div>
                        <div className="stat-info">
                            <h3>GeeksForGeeks</h3>
                            <div className="stat-numbers">
                                <div>
                                    <span className="stat-value">{personalInfo.stats.gfg.score}</span>
                                    <span className="stat-label">Score</span>
                                </div>
                                <div>
                                    <span className="stat-value">{stats.gfg.solved}+</span>
                                    <span className="stat-label">Solved</span>
                                </div>
                            </div>
                        </div>
                    </motion.a>

                    {/* GitHub Card */}
                    <motion.a
                        href={personalInfo.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="stat-card github group"
                    >
                        <img src="/github.webp" alt="" className="card-bg-icon" />
                        <div className="stat-icon-wrapper">
                            <img src="/github.webp" alt="GitHub" className="w-8 h-8 object-contain" />
                        </div>
                        <div className="stat-info">
                            <h3>GitHub</h3>
                            <div className="stat-numbers">
                                <div>
                                    <span className="stat-value">{stats.github.stars}+</span>
                                    <span className="stat-label">Stars</span>
                                </div>
                                <div>
                                    <span className="stat-value">{stats.github.repos}</span>
                                    <span className="stat-label">Repos</span>
                                </div>
                            </div>
                        </div>
                    </motion.a>
                </div>
            </div>
        </section>
    );
};
