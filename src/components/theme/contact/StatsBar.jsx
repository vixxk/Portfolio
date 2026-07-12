import { motion } from 'framer-motion';

export const StatsBar = ({ stats }) => {
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
                <div className="stat-group">
                    <span className="stat-source">leetcode</span>
                    <div className="stat-metrics">
                        <div className="stat-metric-item">
                            <span className="stat-number">280+</span>
                            <span className="stat-label">dsa problems</span>
                        </div>
                        <div className="stat-metric-divider"></div>
                        <div className="stat-metric-item">
                            <span className="stat-number">{stats.leetcode.sql}+</span>
                            <span className="stat-label">sql queries</span>
                        </div>
                    </div>
                </div>

                {/* GFG group */}
                <div className="stat-group">
                    <span className="stat-source">geeksforgeeks</span>
                    <div className="stat-metrics">
                        <div className="stat-metric-item">
                            <span className="stat-number">{stats.gfg.score}</span>
                            <span className="stat-label">score</span>
                        </div>
                        <div className="stat-metric-divider"></div>
                        <div className="stat-metric-item">
                            <span className="stat-number">{stats.gfg.solved}+</span>
                            <span className="stat-label">solved</span>
                        </div>
                    </div>
                </div>

                {/* GitHub group */}
                <div className="stat-group">
                    <span className="stat-source">github</span>
                    <div className="stat-metrics">
                        <div className="stat-metric-item">
                            <span className="stat-number">25+</span>
                            <span className="stat-label">stars</span>
                        </div>
                        <div className="stat-metric-divider"></div>
                        <div className="stat-metric-item">
                            <span className="stat-number">38</span>
                            <span className="stat-label">repos</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
