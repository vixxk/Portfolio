import { motion } from 'framer-motion';
import { resumeData } from '../../../data/resume';
import { Crown } from 'lucide-react';
import { ChampionshipCard } from './ChampionshipCard';
import './ChessExperience.css';

export const ChessExperience = () => {
    const { experience } = resumeData;

    return (
        <section id="experience" className="chess-experience-section">
            {/* Background elements */}
            <div className="chess-bg-decoration">
                <Crown size={180} />
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="chess-experience-header"
            >
                <h2 className="chess-experience-title">
                    Tournament <span className="chess-experience-highlight">History</span>
                </h2>
                <div className="chess-header-underline"></div>
            </motion.div>

            <div className="chess-exp-timeline">
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
