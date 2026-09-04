import React, { useRef, useState, useEffect } from 'react';
import { useScroll } from 'framer-motion';
import { HeroCarousel } from '../../ui/HeroCarousel';
import { WORK_EXPERIENCE_ITEMS } from '../../../data/experienceItems';
import './Experience.css';

export const Experience = () => {
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
        <section id="experience" ref={sectionRef} className="experience-sticky-section">
            <div className="experience-sticky-wrapper">
                <HeroCarousel
                    items={WORK_EXPERIENCE_ITEMS}
                    index={activeIndex}
                    onIndexChange={(idx) => setActiveIndex(idx)}
                    brand="VIVEK ANAND // WORK EXPERIENCE"
                />
            </div>
        </section>
    );
};
