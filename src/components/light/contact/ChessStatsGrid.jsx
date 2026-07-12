import { Code2, Database, Globe } from 'lucide-react';

export const ChessStatsGrid = ({ personalInfo }) => {
    return (
        <div className="chess-stats-row">
            {/* LeetCode */}
            <a href={personalInfo.social.leetcode} target="_blank" rel="noopener noreferrer" className="chess-stat-entry">
                <div className="chess-stat-top">
                    <span className="chess-stat-label">LeetCode</span>
                    <Code2 className="chess-stat-icon" size={24} />
                </div>
                <div className="chess-stat-details">
                    <div className="stat-block">
                        <div className="chess-stat-main">280+</div>
                        <div className="chess-stat-sub">DSA Problems</div>
                    </div>
                    <div className="stat-block">
                        <div className="chess-stat-main">{personalInfo.stats.leetcode.sql}+</div>
                        <div className="chess-stat-sub">SQL Queries</div>
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
                        <div className="chess-stat-main">{personalInfo.stats.gfg.solved}+</div>
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
                        <div className="chess-stat-main">25+</div>
                        <div className="chess-stat-sub">Stars</div>
                    </div>
                    <div className="stat-block">
                        <div className="chess-stat-main">38</div>
                        <div className="chess-stat-sub">Repos</div>
                    </div>
                </div>
                <img src="/github.webp" alt="" className="chess-stat-bg" />
            </a>
        </div>
    );
};
