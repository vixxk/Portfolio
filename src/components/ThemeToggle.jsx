import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, Crown } from 'lucide-react';

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const isChess = theme === 'chess';

    return (
        <motion.div
            className="fixed left-8 bottom-8 z-50 flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div
                onClick={toggleTheme}
                className={`relative w-16 h-8 rounded-full cursor-pointer transition-colors duration-300 border-2 ${isChess ? 'bg-black border-black' : 'bg-gray-200 border-gray-300'}`}
                title={isChess ? "Switch to Default" : "Switch to Chess Mode"}
                role="switch"
                aria-checked={isChess}
                tabIndex={0}
            >
                {/* Switch Handle */}
                <motion.div
                    className="absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center text-xs"
                    animate={{ x: isChess ? 32 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                    {isChess ? <Crown size={14} color="black" /> : <Sparkles size={14} color="#6366f1" />}
                </motion.div>
            </div>

            {/* Optional Label if user wants clarity, but 'switch' implies visual. Keeping it minimal for now based on "switch rather than image" request. */}
        </motion.div>
    );
};
