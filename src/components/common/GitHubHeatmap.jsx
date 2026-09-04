import React, { useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';

export const GitHubHeatmap = ({ username = "vixxk", theme = "dark" }) => {
    const [hasError, setHasError] = useState(false);

    const darkGithubTheme = {
        light: ['#121a2e', '#044e46', '#028476', '#14b8a6', '#4ce0d2'],
        dark: ['#121a2e', '#044e46', '#028476', '#14b8a6', '#4ce0d2'],
    };

    // Distinct medium-light grey (#d4d4d8) for level 0 so empty squares pop on white background
    const chessGithubTheme = {
        light: ['#d4d4d8', '#9ca3af', '#52525b', '#27272a', '#09090b'],
        dark: ['#d4d4d8', '#9ca3af', '#52525b', '#27272a', '#09090b'],
    };

    const isChess = theme === "chess";
    const hexColor = isChess ? "000000" : "4ce0d2";
    const svgUrl = `https://ghchart.rshah.org/${hexColor}/${username}`;

    if (hasError) {
        return (
            <div className={isChess ? "chess-heatmap-scroll" : "github-calendar-scroll-wrapper"}>
                <img 
                    src={svgUrl} 
                    alt={`${username}'s GitHub contribution graph`} 
                    className="github-svg-graph" 
                    loading="lazy"
                />
            </div>
        );
    }

    return (
        <div className={isChess ? "chess-heatmap-scroll" : "github-calendar-scroll-wrapper"}>
            <GitHubCalendar 
                username={username}
                colorScheme={isChess ? "light" : "dark"}
                theme={isChess ? chessGithubTheme : darkGithubTheme}
                blockSize={15}
                blockMargin={5}
                fontSize={13}
                transformData={(data) => {
                    if (!data || data.length === 0) {
                        setHasError(true);
                    }
                    return data;
                }}
                throwOnError={false}
                errorMessage={
                    <img 
                        src={svgUrl} 
                        alt={`${username}'s GitHub contribution graph`} 
                        className="github-svg-graph" 
                        loading="lazy"
                    />
                }
            />
        </div>
    );
};
