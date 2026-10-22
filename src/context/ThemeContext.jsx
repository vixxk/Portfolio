import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        // Clean up legacy key where 'chess' was saved as default in past sessions
        const legacy = localStorage.getItem('portfolio-theme');
        if (legacy) {
            localStorage.removeItem('portfolio-theme');
        }
        
        // Use v2 storage key; default is always 'dark'
        const saved = localStorage.getItem('portfolio-theme-v2');
        if (saved === 'chess' || saved === 'dark') {
            return saved;
        }
        return 'dark';
    });

    useEffect(() => {
        localStorage.setItem('portfolio-theme-v2', theme);
        if (theme === 'chess') {
            document.documentElement.classList.add('chess-theme');
        } else {
            document.documentElement.classList.remove('chess-theme');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'chess' ? 'dark' : 'chess');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isChess: theme === 'chess' }}>
            <div className={theme === 'chess' ? 'chess-theme' : ''}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);

