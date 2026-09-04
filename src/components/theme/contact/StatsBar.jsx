import { motion } from 'framer-motion';
import { GitHubHeatmap } from '../../common/GitHubHeatmap';

export const StatsBar = ({ stats, personalInfo }) => {
    const social = personalInfo?.social ?? {};

    const gfgScore = stats?.gfg?.score ? String(stats.gfg.score) : "1600+";
    const githubRepos = stats?.github?.repos ? String(stats.github.repos) : "40+";

    return (
        <div className="stats-bar-wrapper">
            <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="stats-header"
            >
                <span className="section-eyebrow">// proof_of_work</span>
                <h3 className="stats-bar-title">Algorithmic & Code Metrics</h3>
            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="stats-row"
            >
                {/* LeetCode group */}
                <a 
                    href={social.leetcode || "https://leetcode.com/u/vivek727anand/"} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="stat-group"
                >
                    <span className="stat-source">leetcode</span>
                    <div className="stat-metrics">
                        <div className="stat-metric-item">
                            <span className="stat-number">280+</span>
                            <span className="stat-label">dsa problems</span>
                        </div>
                        <div className="stat-metric-divider"></div>
                        <div className="stat-metric-item">
                            <span className="stat-number">{stats?.leetcode?.sql ?? 50}+</span>
                            <span className="stat-label">sql queries</span>
                        </div>
                    </div>
                    <img src="/leetcode.webp" alt="" className="stat-card-bg" />
                </a>

                {/* GFG group */}
                <a 
                    href={social.gfg || "https://www.geeksforgeeks.org/profile/vixx"} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="stat-group"
                >
                    <span className="stat-source">geeksforgeeks</span>
                    <div className="stat-metrics">
                        <div className="stat-metric-item">
                            <span className="stat-number">{gfgScore.endsWith('+') ? gfgScore : `${gfgScore}+`}</span>
                            <span className="stat-label">score</span>
                        </div>
                        <div className="stat-metric-divider"></div>
                        <div className="stat-metric-item">
                            <span className="stat-number">{stats?.gfg?.solved ?? 450}+</span>
                            <span className="stat-label">solved</span>
                        </div>
                    </div>
                    <img src="/geeksforgeeks.png" alt="" className="stat-card-bg" />
                </a>

                {/* GitHub group */}
                <a 
                    href={social.github || "https://github.com/vixxk"} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="stat-group"
                >
                    <span className="stat-source">github</span>
                    <div className="stat-metrics">
                        <div className="stat-metric-item">
                            <span className="stat-number">25+</span>
                            <span className="stat-label">stars</span>
                        </div>
                        <div className="stat-metric-divider"></div>
                        <div className="stat-metric-item">
                            <span className="stat-number">{githubRepos.endsWith('+') ? githubRepos : `${githubRepos}+`}</span>
                            <span className="stat-label">repos</span>
                        </div>
                    </div>
                    <img src="/github.webp" alt="" className="stat-card-bg" />
                </a>
            </motion.div>

            {/* GitHub Heatmap Calendar Block */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="github-heatmap-container"
            >
                <div className="github-heatmap-header">
                    <span className="github-heatmap-title">Contribution Activity</span>
                    <a 
                        href={social.github || "https://github.com/vixxk"} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="github-profile-link"
                    >
                        @vixxk
                    </a>
                </div>
                <GitHubHeatmap username="vixxk" theme="dark" />
            </motion.div>
        </div>
    );
};
