import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { Github, ExternalLink, Code2, Globe, Star, ShieldCheck } from 'lucide-react';

const LangSmithIcon = ({ size = 20, className = "" }) => (
    <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className={className}
        style={{ flexShrink: 0 }}
    >
        <path d="M14.09 15.207c-.067.11-.268.116-.44.015a.466.466 0 01-.19-.2c-.032-.071-.033-.138-.002-.189.035-.057.108-.086.194-.086.077 0 .165.023.246.071.17.101.259.28.192.389zM24 12c0 3.308-2.736 6-6.099 6H6.1C2.736 18 0 15.309 0 12s2.736-6 6.099-6H17.9C21.264 6 24 8.692 24 12zm-12.246 3.01c.096-.116-.348-.439-.439-.557-.184-.197-.185-.48-.31-.71-.304-.694-.654-1.383-1.143-1.97-.518-.643-1.156-1.175-1.716-1.778-.417-.421-.528-1.02-.895-1.474-.507-.735-2.108-.936-2.343.103.001.033-.009.053-.038.074-.13.093-.245.199-.342.327-.238.325-.274.877.022 1.17.01-.154.015-.3.14-.41.229.194.575.262.84.117.588.825.442 1.967.908 2.856.13.21.259.425.424.609.135.205.598.448.625.638.005.326-.034.683.184.956.102.205-.15.41-.352.385-.264.035-.585-.175-.816-.046-.082.087-.241-.009-.312.112-.024.062-.156.15-.077.21.087-.065.168-.133.286-.095-.018.095.058.108.118.135-.002.064-.04.13.01.184.058-.058.092-.14.185-.163.306.401.618-.407 1.28-.043-.134-.006-.253.01-.344.119-.023.024-.042.053-.002.085.358-.227.356.078.588-.016.178-.092.356-.206.568-.174-.206.059-.214.222-.335.36-.02.02-.03.045-.007.08.429-.036.464-.176.81-.348.258-.155.515.221.738.007.05-.046.117-.03.178-.037-.078-.41-.936.075-.923-.474.276-.185.213-.539.232-.824.317.173.67.274.982.44.157.249.403.579.732.557l.025-.072c.1.017.228.081.283-.043.148.154.367.146.561.107.144-.116-.27-.28-.326-.398zm4.452-1.936l-.653-.867c-.57.642-.95.954-.957.96-.004.003-.367.351-.698.65-.325.293-.582.524-.713.778a.763.763 0 00-.004.586c.085.2.258.342.515.423.077.024.15.034.221.034.463 0 .767-.457.769-.46.004-.006.398-.56.877-1.258.16-.232.342-.478.643-.846zm3.07 1.997a.518.518 0 00-.134-.347l-.081-.09-2.235-2.491a37.665 37.665 0 01-1.357-1.628l-.082-.168v-.296a.8.8 0 00-.065-.314l-.174-.408c-.003-.006-.004-.013-.003-.019l.007-.057c0-.009.005-.017.013-.023a2.079 2.079 0 011.426-.469c.103.004.12-.05.124-.074.014-.114-.25-.247-.494-.297-.337-.067-1.232-.247-1.947.215l-.006.004c-.462.38-.834.67-.838.674l-.008.008a.476.476 0 00-.105.357c.02.127-.046.173-.05.175-.004.003-.096.06-.19-.005-.115-.084-.314.06-.355.093l-.3.254-.006.006c-.006.006-.135.154.038.392.149.206.201.275.33.433.132.16.368.364.381.374.006.005.15.113.35-.037.163-.124.294-.235.294-.235.01-.009.106-.085.11-.199v-.086c-.003-.08-.003-.104.058-.142.03 0 .119.032.196.07a.83.83 0 00.376.104c.11.014.232.138.274.188.004.004.377.39.902 1.064.1.129.468.61.568.744l.695.931c.474.634 1.004 1.345 1.245 1.665.08.106.197.178.329.203l.09.017a.524.524 0 00.51-.18l.004-.007a.512.512 0 00.11-.32v-.08zm.42-5.694l-.105-.102a.155.155 0 00-.227.01l-.653.76a.111.111 0 01-.074.038l-.232.023a.113.113 0 01-.083-.025l-.371-.31a.109.109 0 01-.04-.079l-.005-.183a.107.107 0 01.025-.073l.636-.753a.15.15 0 000-.196l-.065-.074a.156.156 0 00-.171-.044 7.53 7.53 0 00-.803.348c-.387.205-.656.531-.702.85-.034.234-.02.62-.008.828a.443.443 0 01-.055.238c-.05.091-.138.237-.271.413-.069.092-.112.127-.17.195l.719.832c.173-.199.325-.35.457-.495.241-.264.316-.267.517-.273.124-.005.294-.01.563-.076.734-.18.966-.962.976-.997l.182-.71a.151.151 0 00-.04-.144zM8.41 14.333c-.08.303-.105.82-.506.835-.033.175.123.241.265.185.141-.064.208.05.256.164.217.031.54-.072.551-.325-.325-.184-.425-.535-.567-.86h.001z" />
    </svg>
);

export const ProjectCard = ({ project, index, totalProjects = 3 }) => {
    const cardRef = useRef(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const formattedIndex = String(index + 1).padStart(2, '0');
    const projectDate = project.date || '2025';

    // All cards share the same sticky top so each fully covers the previous one
    const stickyTop = 185;

    // Deck breadth offset: Card 1 is broadest (100%), subsequent cards are incrementally inset
    const widthOffset = (totalProjects - 1 - index) * 40;
    const cardWidth = widthOffset > 0 ? `calc(100% - ${widthOffset}px)` : '100%';

    // Track scroll progress for dynamic scale expansion as incoming cards approach
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "start start"]
    });

    // Dynamic scale expansion as the card approaches its sticky overlap.
    // Origin is the top edge (not center): a center-origin scale on a taller
    // card grows downward past the shorter card covering it, breaking the
    // full-cover effect. Top anchoring keeps the deck's top edge aligned.
    const cardScale = useTransform(
        scrollYProgress,
        [0.2, 1],
        [0.97, 1 + (totalProjects - 1 - index) * 0.025]
    );

    // Dim while the NEXT card slides over this one, so its edges recede as
    // it gets covered. Uses a brightness filter (not opacity) because the
    // entry animation already owns the card's opacity. Measured directly
    // from the next card's bounding rect (its DOM sibling).
    const dimBrightness = useMotionValue(1);
    useLayoutEffect(() => {
        const update = () => {
            const next = cardRef.current?.nextElementSibling;
            if (!next) return;
            const rect = next.getBoundingClientRect();
            const vh = window.innerHeight;
            // 0 = next card still below the fold, 1 = fully stacked at top
            const p = Math.min(1, Math.max(0, (vh - rect.top) / (vh - 185)));
            dimBrightness.set(1 - p * 0.5); // 1 → 0.5 brightness
        };
        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        return () => {
            window.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, [dimBrightness]);
    const dimFilter = useTransform(dimBrightness, (b) => `brightness(${b})`);

    const handleMouseEnter = () => {
        if (window.innerWidth > 900) {
            setIsZoomed(true);
        }
    };

    return (
        <>
            <motion.div
                ref={cardRef}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="featured-project-card"
                style={{
                    '--card-index': index,
                    top: `${stickyTop}px`,
                    zIndex: index + 1,
                    width: cardWidth,
                    scale: cardScale,
                    transformOrigin: '50% 0%',
                    filter: dimFilter,
                    margin: '0 auto'
                }}
            >
                {/* Left Column: Image / Preview Canvas Container */}
                <div 
                    className="project-preview-container"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={() => setIsZoomed(false)}
                >
                    {/* Year Pill Badge */}
                    <div className="project-index-badge">
                        <span>{projectDate}</span>
                    </div>

                    {/* Preview Image or Styled Glass Placeholder */}
                    {project.image ? (
                        <img 
                            src={project.image} 
                            alt={project.title} 
                            className="project-preview-img"
                            loading="lazy"
                        />
                    ) : (
                    <div className="project-preview-placeholder">
                        <div className="placeholder-content">
                            <Code2 size={36} className="placeholder-icon" />
                            <span className="placeholder-title">{project.title.split('–')[0].trim()}</span>
                        </div>
                        <div className="placeholder-pattern" />
                    </div>
                )}

                {/* Bottom Tagline Bar */}
                {project.tagline && (
                    <div className="project-preview-tagline-bar">
                        {project.title.toLowerCase().includes('skinify') ? (
                            <>
                                <Star size={13} fill="#eab308" color="#eab308" />
                                <Github size={13} />
                                <span>{project.tagline}</span>
                            </>
                        ) : project.title.toLowerCase().includes('knowchain') ? (
                            <>
                                <LangSmithIcon size={20} />
                                <span>{project.tagline}</span>
                            </>
                        ) : (
                            <>
                                <ShieldCheck size={13} />
                                <span>{project.tagline}</span>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Right Column: Details & Metadata */}
            <div className="project-content-container">
                {/* Header Row: Live Status + Tech Stack Pills */}
                <div className="project-badges-row">
                    <div className="project-status-pill">
                        <span className="status-live-dot" />
                        <span>Live</span>
                    </div>

                    <div className="project-stack-pills">
                        {project.stack && project.stack.map((tech, i) => (
                            <span key={i} className="tech-pill">{tech}</span>
                        ))}
                    </div>
                </div>

                {/* Main Project Title */}
                <h3 className="project-title">{project.title}</h3>

                {/* Points / Description Paragraph */}
                <div className="project-description">
                    {project.points && project.points.length > 0 ? (
                        <ul className="project-points-list">
                            {project.points.map((pt, i) => (
                                <li key={i}>{pt}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>{project.description}</p>
                    )}
                </div>

                {/* Hashtags / Categories */}
                {project.tags && project.tags.length > 0 && (
                    <div className="project-hashtags-row">
                        {project.tags.map((tag, i) => (
                            <span key={i} className="hashtag-pill">
                                {tag.startsWith('#') ? tag : `#${tag}`}
                            </span>
                        ))}
                    </div>
                )}

                {/* Action CTA Buttons */}
                <div className="project-actions-row">
                    {project.links?.live && (
                        <a 
                            href={project.links.live} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="project-btn-primary"
                        >
                            <Globe size={14} />
                            <span>Live Demo</span>
                            <ExternalLink size={12} />
                        </a>
                    )}
                    {project.links?.github && (
                        <a 
                            href={project.links.github} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="project-btn-secondary"
                        >
                            <Github size={14} />
                            <span>Source</span>
                            <Code2 size={12} />
                        </a>
                    )}
                </div>
            </div>
        </motion.div>

        {isZoomed && project.image && createPortal(
            <div className="image-zoom-overlay">
                <div className="image-zoom-content">
                    <img src={project.image} alt={project.title} className="zoomed-image" />
                </div>
            </div>,
            document.body
        )}
        </>
    );
};
