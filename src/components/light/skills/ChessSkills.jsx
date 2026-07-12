import { motion } from 'framer-motion';
import { resumeData } from '../../../data/resume';
import { PieceCard } from './PieceCard';
import './ChessSkills.css';

export const ChessSkills = () => {
    const { skills } = resumeData;

    const chessCategories = [
        {
            piece: '♟',
            title: 'The Pawns (Foundation)',
            desc: 'HTML, CSS, JS - The soul of the game.',
            skills: skills.web || []
        },
        {
            piece: '♞',
            title: 'The Knights (Tactics)',
            desc: 'Versatile languages and frameworks jumping over obstacles.',
            skills: skills.languages || []
        },
        {
            piece: '♝',
            title: 'The Bishops (Range)',
            desc: 'AI & GenAI - Long-range strategic advantages.',
            skills: skills.ai || []
        },
        {
            piece: '♜',
            title: 'The Rooks (Structure)',
            desc: 'Databases & Backend - Solid, heavy lifting columns.',
            skills: skills.database || []
        },
        {
            piece: '♛',
            title: 'The Queen (Power)',
            desc: 'DevOps & Tools - Most powerful utility across the board.',
            skills: skills.tools || []
        }
    ];

    return (
        <section id="skills" className="chess-skills-section">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="chess-skills-header"
            >
                <h2 className="chess-section-title">My <span className="chess-title-highlight">Pieces</span></h2>
                <p className="chess-section-subtitle">Every piece has a purpose. Here is my arsenal.</p>
                <div className="chess-header-underline"></div>
            </motion.div>

            <div className="chess-skills-grid">
                {chessCategories.map((cat, idx) => (
                    <PieceCard
                        key={cat.title}
                        piece={cat.piece}
                        title={cat.title}
                        skills={cat.skills}
                        description={cat.desc}
                        index={idx}
                    />
                ))}
            </div>
        </section>
    );
};
