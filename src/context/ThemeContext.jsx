import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('default'); // 'default' or 'chess'

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
