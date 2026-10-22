import { motion } from 'framer-motion';

export const StatusBadge = ({ variants }) => {
    return (
        <motion.div variants={variants} className="status-badge">
            <span className="status-dot" aria-hidden="true"></span>
            <span className="status-text">SYSTEM ONLINE // VECTOR SPACE ACTIVE</span>
        </motion.div>
    );
};
