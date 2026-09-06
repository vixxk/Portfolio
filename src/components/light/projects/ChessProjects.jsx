import { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../../../data/resume';
import { MatchCard } from './MatchCard';
import './ChessProjects.css';

export const ChessProjects = () => {
    const { projects } = resumeData;
    const gridRef = useRef(null);

    useLayoutEffect(() => {
        const updateHeight = () => {
            if (!gridRef.current) return;
            gridRef.current.style.removeProperty('--card-min-height');
            const cards = gridRef.current.querySelectorAll('.chess-match-card');
            let maxH = 0;
            cards.forEach((card) => {
                const h = card.offsetHeight;
                if (h > maxH) maxH = h;
            });
            if (maxH > 0) {
                gridRef.current.style.setProperty('--card-min-height', `${maxH}px`);
            }
        };

        updateHeight();
        if (document.fonts?.ready) {
            document.fonts.ready.then(updateHeight);
        }
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, [projects]);

    return (
        <section id="projects" className="chess-section">
            <div className="chess-projects-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="chess-section-header"
                >
                    <h2 className="chess-section-title">
                        Match <span className="chess-title-highlight">History</span>
                    </h2>
                    <div className="chess-header-underline"></div>
                </motion.div>

                <div className="chess-projects-grid" ref={gridRef}>
                    {projects.map((project, index) => (
                        <MatchCard 
                            key={index} 
                            project={project} 
                            index={index} 
                            totalProjects={projects.length} 
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
