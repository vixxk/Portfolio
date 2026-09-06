import React, { useRef, useState, useEffect } from 'react';
import { useScroll, motion } from 'framer-motion';
import { HeroCarousel } from '../../ui/HeroCarousel';
import { WORK_EXPERIENCE_ITEMS } from '../../../data/experienceItems';
import './ChessExperience.css';

export const ChessExperience = () => {
    const sectionRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            const index = Math.min(
                WORK_EXPERIENCE_ITEMS.length - 1,
                Math.floor(latest * WORK_EXPERIENCE_ITEMS.length)
            );
            setActiveIndex(index);
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    return (
        <section id="experience" ref={sectionRef} className="chess-experience-sticky-section">
            <div className="chess-experience-sticky-wrapper">
                <HeroCarousel
                    items={WORK_EXPERIENCE_ITEMS}
                    index={activeIndex}
                    onIndexChange={(idx) => setActiveIndex(idx)}
                    brand=""
                    theme="chess"
                    header={
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="chess-experience-header"
                        >
                            <h2 className="chess-section-title">
                                Tournament <span className="chess-title-highlight">History</span>
                            </h2>
                            <div className="chess-header-underline"></div>
                        </motion.div>
                    }
                />
            </div>
        </section>
    );
};
