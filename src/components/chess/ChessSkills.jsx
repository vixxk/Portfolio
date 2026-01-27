import { motion } from 'framer-motion';
import { resumeData } from '../../data/resume';
import './ChessSkills.css';

const PieceCard = ({ piece, title, skills, description, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="chess-skill-card group"
        >
            <div className="piece-icon">{piece}</div>
            <h3 className="chess-skill-category">{title}</h3>
            <p className="chess-skill-desc">{description}</p>

            <div className="chess-skill-list">
                {skills.map((skill) => (
                    <span key={skill} className="chess-skill-tag">
                        {skill}
                    </span>
                ))}
            </div>
        </motion.div>
    );
};

export const ChessSkills = () => {
    const { skills } = resumeData;

    // Mapping Skills to Chess Logic
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
        <section id="skills" className="chess-section">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="chess-section-header text-center mb-12"
            >
                <h2 className="text-4xl font-bold mb-2">My <span className="text-[var(--chess-accent-purple)]">Pieces</span></h2>
                <p className="text-[var(--chess-text-secondary)]">Every piece has a purpose. Here is my arsenal.</p>
            </motion.div>

            <div className="chess-grid">
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
