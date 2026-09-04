import React, { useState, useEffect, useRef } from 'react';
import { GitHubCalendar } from 'react-github-calendar';

export const GitHubHeatmap = ({ username = "vixxk", theme = "dark" }) => {
    const [hasError, setHasError] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const scrollToRight = () => {
            if (el) {
                el.scrollLeft = 99999;
            }
        };

        scrollToRight();
        const timers = [50, 150, 300, 600, 1000, 2000].map(ms => setTimeout(scrollToRight, ms));

        const observer = new MutationObserver(() => {
            scrollToRight();
        });

        observer.observe(el, { childList: true, subtree: true, attributes: true, characterData: true });

        return () => {
            timers.forEach(clearTimeout);
            observer.disconnect();
        };
    }, [hasError]);

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
            <div ref={containerRef} className={isChess ? "chess-heatmap-scroll" : "github-calendar-scroll-wrapper"}>
                <img 
                    src={svgUrl} 
                    alt={`${username}'s GitHub contribution graph`} 
                    className="github-svg-graph" 
                    loading="lazy"
                    onLoad={() => {
                        if (containerRef.current) containerRef.current.scrollLeft = 99999;
                    }}
                />
            </div>
        );
    }

    return (
        <div ref={containerRef} className={isChess ? "chess-heatmap-scroll" : "github-calendar-scroll-wrapper"}>
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
                    setTimeout(() => {
                        if (containerRef.current) {
                            containerRef.current.scrollLeft = 99999;
                        }
                    }, 50);
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
