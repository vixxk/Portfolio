import { motion } from 'framer-motion';

export const PieceCard = ({ piece, title, skills, description, index }) => {
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
