import React, { useState, useEffect, useRef } from 'react';
import { GitHubCalendar } from 'react-github-calendar';

export const GitHubHeatmap = ({ username = "vixxk", theme = "dark" }) => {
    const [hasError, setHasError] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const scrollToRight = () => {
            if (!el) return;
            el.scrollLeft = el.scrollWidth;
            const scrollables = el.querySelectorAll('.react-activity-calendar__scroll-container, .react-activity-calendar, article, div');
            scrollables.forEach((node) => {
                node.scrollLeft = node.scrollWidth;
            });
        };

        const executeScroll = () => {
            scrollToRight();
            requestAnimationFrame(scrollToRight);
        };

        executeScroll();
        const timers = [50, 100, 200, 400, 700, 1200, 2000, 3000].map(ms => setTimeout(executeScroll, ms));

        const observer = new MutationObserver(() => {
            executeScroll();
            const inner = el.querySelector('.react-activity-calendar__scroll-container');
            if (inner && !inner._observed) {
                inner._observed = true;
                resizeObserver.observe(inner);
            }
        });

        observer.observe(el, { childList: true, subtree: true, attributes: true });

        const resizeObserver = new ResizeObserver(() => {
            executeScroll();
        });
        resizeObserver.observe(el);

        return () => {
            timers.forEach(clearTimeout);
            observer.disconnect();
            resizeObserver.disconnect();
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
                    [50, 100, 200, 400, 800, 1500].forEach((delay) => {
                        setTimeout(() => {
                            if (containerRef.current) {
                                containerRef.current.scrollLeft = 99999;
                                const inners = containerRef.current.querySelectorAll('.react-activity-calendar__scroll-container, .react-activity-calendar, article, div');
                                inners.forEach((c) => {
                                    c.scrollLeft = c.scrollWidth;
                                });
                            }
                        }, delay);
                    });
                    return data;
                }}
                throwOnError={false}
                errorMessage={
                    <img 
                        src={svgUrl} 
                        alt={`${username}'s GitHub contribution graph`} 
                        className="github-svg-graph" 
                        loading="lazy"
                        onLoad={() => {
                            if (containerRef.current) containerRef.current.scrollLeft = 99999;
                        }}
                    />
                }
            />
        </div>
    );
};
