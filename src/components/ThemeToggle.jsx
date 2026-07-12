import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, Crown } from 'lucide-react';
import './ThemeToggle.css';

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const isChess = theme === 'chess';

    return (
        <motion.div
            className="theme-toggle-floating"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div
                onClick={toggleTheme}
                className={`theme-toggle-track ${isChess ? 'chess' : ''}`}
                title={isChess ? "Switch to Retrieval Space Theme" : "Switch to Chess Theme"}
                role="switch"
                aria-checked={isChess}
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleTheme();
                    }
                }}
            >
                {/* Switch Handle */}
                <motion.div
                    className={`theme-toggle-handle ${isChess ? 'chess' : ''}`}
                    animate={{ x: isChess ? 28 : 0 }}
                    transition={{ type: "spring", stiffness: 450, damping: 25 }}
                >
                    <img 
                        src="/bot icon.png" 
                        alt="Theme Icon" 
                        className="theme-toggle-img" 
                    />
                </motion.div>
            </div>
        </motion.div>
    );
};
