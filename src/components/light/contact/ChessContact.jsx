import { motion } from 'framer-motion';
import { resumeData } from '../../../data/resume';
import { Mail, Phone } from 'lucide-react';
import { ChessStatsGrid } from './ChessStatsGrid';
import './ChessContact.css';

export const ChessContact = () => {
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
                <ChessStatsGrid personalInfo={personalInfo} />

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
