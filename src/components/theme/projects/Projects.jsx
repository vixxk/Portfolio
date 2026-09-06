import { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../../../data/resume';
import { ProjectCard } from './ProjectCard';
import './Projects.css';

export const Projects = () => {
    const { projects } = resumeData;
    const gridRef = useRef(null);

    useLayoutEffect(() => {
        const updateHeight = () => {
            if (!gridRef.current) return;
            gridRef.current.style.removeProperty('--card-min-height');
            const cards = gridRef.current.querySelectorAll('.featured-project-card');
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
        <section id="projects" className="section projects-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-header"
                >
                    <span className="section-eyebrow">// retrieve_modules</span>
                    <h2 className="text-3xl font-display font-bold">
                        Self <span className="text-gradient">Projects</span>
                    </h2>
                    <div className="section-line"></div>
                </motion.div>

                <div className="projects-grid" ref={gridRef}>
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} totalProjects={projects.length} />
                    ))}
                </div>
            </div>
        </section>
    );
};
