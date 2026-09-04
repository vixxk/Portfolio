import { motion } from 'framer-motion';

export const FooterBigName = ({ name = "VIVEK ANAND" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="footer-big-name-wrapper"
        >
            <svg
                viewBox="0 0 1200 120"
                width="100%"
                className="footer-big-name-svg"
                preserveAspectRatio="xMidYMax meet"
            >
                <defs>
                    <linearGradient id="footerNameGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4CE0D2" stopOpacity="0.45" />
                        <stop offset="50%" stopColor="#8B7FFF" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#4CE0D2" stopOpacity="0.45" />
                    </linearGradient>
                </defs>
                <text
                    x="50%"
                    y="115"
                    textAnchor="middle"
                    dominantBaseline="alphabetic"
                    className="footer-big-name-text"
                >
                    {name.toUpperCase()}
                </text>
            </svg>
        </motion.div>
    );
};
