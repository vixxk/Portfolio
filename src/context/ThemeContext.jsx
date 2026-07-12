import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('portfolio-theme') || 'default';
    });

    useEffect(() => {
        localStorage.setItem('portfolio-theme', theme);
        if (theme === 'chess') {
            document.documentElement.classList.add('chess-theme');
        } else {
            document.documentElement.classList.remove('chess-theme');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'default' ? 'chess' : 'default');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className={theme === 'chess' ? 'chess-theme' : ''}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
