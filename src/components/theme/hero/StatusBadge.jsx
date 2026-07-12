import { motion } from 'framer-motion';

export const StatusBadge = ({ variants }) => {
    return (
        <motion.div variants={variants} className="status-badge">
            <span className="status-dot"></span>
            <span className="status-text">AVAILABLE FOR OPPORTUNITIES</span>
        </motion.div>
    );
};
