import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Timing knobs (ms) — tweak the whole sequence from here.
 */
const STAGGER = 55; // delay between consecutive letters
const SWIRL_DUR = 450; // hollow outline appears (circular sweep)
const FILL_DUR = 520; // inside-out fill after the outline lands
const GLOW_DUR = 900; // glow pulse after the fill completes
const OVERLAP = 0.55; // 0..1 — how much each letter overlaps the previous
const HOLD = 140; // pause between the stroke phase and the fill phase

const TOTAL_PER_LETTER = SWIRL_DUR + HOLD + FILL_DUR + GLOW_DUR;

/**
 * Giant bottom wordmark, e.g. "VIVEK ANAND".
 *
 * Position stays fixed the whole time. Per letter:
 *   1. Hollow outline is revealed by a circular mask that expands + sweeps
 *      around the glyph's center (attribute-driven, no CSS transforms inside
 *      clipPath — those rotate around the wrong origin in some browsers and
 *      slice neighboring glyphs).
 *   2. The hollow inside then fills radially from the letter's center with
 *      the same gradient, followed by a soft glow pulse.
 */
export const FooterBigName = ({ name = 'VIVEK ANAND' }) => {
    const textRef = useRef(null);
    const [metrics, setMetrics] = useState(null);
    const [visible, setVisible] = useState(false);
    const display = name.toUpperCase();

    // Measure glyph cells (viewBox units) so per-letter layers sit exactly
    // on top of the base text.
    useLayoutEffect(() => {
        const el = textRef.current;
        if (!el || typeof el.getExtentOfChar !== 'function') return;
        let cancelled = false;

        const measure = () => {
            try {
                const count = el.getNumberOfChars();
                if (!count) return;
                const items = [];
                for (let i = 0; i < count; i++) {
                    const ch = display[i];
                    if (!ch.trim()) {
                        items.push(null);
                        continue;
                    }
                    const ext = el.getExtentOfChar(i);
                    // Tight masks: stay within the glyph's own advance cell so
                    // a letter's circular mask never spills onto its neighbor.
                    // ry is clamped to roughly cap-height (extent height spans
                    // full ascent+descent, far taller than the capital ink).
                    items.push({
                        ch,
                        cx: ext.x + ext.width / 2,
                        cy: ext.y + ext.height / 2,
                        rx: Math.max(ext.width / 2 + 4, 20),
                        ry: Math.max(Math.min(ext.height / 2, 64), 34),
                    });
                }
                if (!cancelled) setMetrics(items);
            } catch {
                /* measurement unsupported — static fallback stays */
            }
        };

        measure();
        document.fonts?.ready.then(() => !cancelled && measure());
        const t = setTimeout(() => !cancelled && measure(), 500);
        return () => {
            cancelled = true;
            clearTimeout(t);
        };
    }, [display]);

    // rAF driver: mutates rx/ry + glow opacity per letter. Attribute animation
    // avoids clipPath transform-origin pitfalls across browsers.
    useEffect(() => {
        if (!metrics || !visible) return;
        const indexes = metrics
            .map((_, i) => i)
            .filter((i) => metrics[i]);
        const nodes = indexes.map((i) => ({
            swirl: document.getElementById(`fbn-swirl-${i}`),
            fill: document.getElementById(`fbn-fill-${i}`),
            glow: document.getElementById(`fbn-glow-${i}`),
            stroke: document.getElementById(`fbn-stroke-${i}`),
        }));
        if (!nodes.length) return;

        const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
        const easeInOut = (t) =>
            t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

        let raf;
        const start = performance.now();

        const tick = (now) => {
            const elapsed = now - start;

            nodes.forEach(({ swirl, fill, glow, stroke }, k) => {
                const m = metrics[indexes[k]];
                // Overlapping cascade: each letter starts OVERLAP into the
                // previous one's timeline, so the sweep flows continuously.
                const begin = k * STAGGER * (1 - OVERLAP);

                // 1) Hollow outline: circular sweep, expanding to full size
                const tSwirl = (elapsed - begin) / SWIRL_DUR;
                if (swirl) {
                    if (tSwirl <= 0) {
                        swirl.setAttribute('rx', '0.01');
                        swirl.setAttribute('ry', '0.01');
                    } else if (tSwirl >= 1) {
                        swirl.setAttribute('rx', String(m.rx));
                        swirl.setAttribute('ry', String(m.ry));
                    } else {
                        const p = easeOutCubic(tSwirl);
                        swirl.setAttribute('rx', (m.rx * p).toFixed(2));
                        swirl.setAttribute('ry', (m.ry * p).toFixed(2));
                    }
                }

                // 2) Inside-out fill, starting after the outline has landed.
                // As the fill expands, the hollow border dissolves in sync so
                // the stroke never overlaps the filled letter — by the time
                // the fill completes, the border is fully gone.
                const tFill = (elapsed - begin - SWIRL_DUR - HOLD) / FILL_DUR;
                if (fill) {
                    if (tFill <= 0) {
                        fill.setAttribute('rx', '0.01');
                        fill.setAttribute('ry', '0.01');
                    } else if (tFill >= 1) {
                        fill.setAttribute('rx', String(m.rx));
                        fill.setAttribute('ry', String(m.ry));
                    } else {
                        const p = easeInOut(tFill);
                        fill.setAttribute('rx', (m.rx * p).toFixed(2));
                        fill.setAttribute('ry', (m.ry * p).toFixed(2));
                    }
                }
                if (stroke) {
                    const o = tFill <= 0 ? 1 : Math.max(0, 1 - tFill);
                    stroke.setAttribute('opacity', o.toFixed(3));
                }

                // 3) Glow pulse once the fill has fully landed
                const tGlow =
                    (elapsed - begin - SWIRL_DUR - HOLD - FILL_DUR) / GLOW_DUR;
                if (glow) {
                    if (tGlow <= 0 || tGlow >= 1) {
                        glow.setAttribute('opacity', '0');
                    } else {
                        // single subtle pulse: quick rise, slow decay
                        const pulse = Math.sin(Math.PI * tGlow);
                        glow.setAttribute('opacity', (pulse * 0.35).toFixed(3));
                    }
                }
            });

            raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
        const total =
            (indexes.length - 1) * STAGGER * (1 - OVERLAP) +
            TOTAL_PER_LETTER +
            100;
        const stop = setTimeout(() => cancelAnimationFrame(raf), total);

        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(stop);
        };
    }, [metrics, visible]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            onViewportEnter={() => setVisible(true)}
            transition={{ duration: 0.3 }}
            className="footer-big-name-wrapper"
        >
            <svg
                viewBox="0 0 1200 120"
                width="100%"
                className="footer-big-name-svg"
                preserveAspectRatio="xMidYMax meet"
                role="img"
                aria-label={display}
            >
                <defs>
                    <linearGradient
                        id="footerNameGradient"
                        gradientUnits="userSpaceOnUse"
                        x1="0"
                        y1="0"
                        x2="1200"
                        y2="0"
                    >
                        <stop offset="0%" stopColor="#4CE0D2" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="#8B7FFF" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#4CE0D2" stopOpacity="0.3" />
                    </linearGradient>
                    {/* Dedicated brighter gradient for the completion glow */}
                    <linearGradient
                        id="footerGlowGradient"
                        gradientUnits="userSpaceOnUse"
                        x1="0"
                        y1="0"
                        x2="1200"
                        y2="0"
                    >
                        <stop offset="0%" stopColor="#4CE0D2" />
                        <stop offset="50%" stopColor="#8B7FFF" />
                        <stop offset="100%" stopColor="#4CE0D2" />
                    </linearGradient>
                </defs>

                {/* Base text: measurement source + static fallback. Hidden
                    once the animated layers take over. */}
                <text
                    ref={textRef}
                    x="50%"
                    y="115"
                    textAnchor="middle"
                    dominantBaseline="alphabetic"
                    className="footer-big-name-text"
                    style={{ visibility: metrics ? 'hidden' : 'visible' }}
                >
                    {display}
                </text>

                {metrics &&
                    visible &&
                    metrics.map((m, i) =>
                        m ? (
                            <g key={i} className="fbn-letter">
                                <clipPath id={`fbn-clip-${i}`}>
                                    <ellipse
                                        id={`fbn-swirl-${i}`}
                                        cx={m.cx}
                                        cy={m.cy}
                                        rx="0.01"
                                        ry="0.01"
                                    />
                                </clipPath>
                                <clipPath id={`fbn-fill-clip-${i}`}>
                                    <ellipse
                                        id={`fbn-fill-${i}`}
                                        cx={m.cx}
                                        cy={m.cy}
                                        rx="0.01"
                                        ry="0.01"
                                    />
                                </clipPath>

                                {/* Hollow outline, revealed by the swirl and
                                    dissolved while the fill expands */}
                                <g clipPath={`url(#fbn-clip-${i})`}>
                                    <text
                                        id={`fbn-stroke-${i}`}
                                        x={m.cx}
                                        y="115"
                                        textAnchor="middle"
                                        dominantBaseline="alphabetic"
                                        className="footer-big-name-text fbn-stroke-text"
                                    >
                                        {m.ch}
                                    </text>
                                </g>

                                {/* Gradient fill, revealed radially */}
                                <g clipPath={`url(#fbn-fill-clip-${i})`}>
                                    <text
                                        x={m.cx}
                                        y="115"
                                        textAnchor="middle"
                                        dominantBaseline="alphabetic"
                                        className="footer-big-name-text fbn-fill-text"
                                    >
                                        {m.ch}
                                    </text>
                                </g>

                                {/* Soft glow that pulses when the fill lands */}
                                <text
                                    id={`fbn-glow-${i}`}
                                    x={m.cx}
                                    y="115"
                                    textAnchor="middle"
                                    dominantBaseline="alphabetic"
                                    className="footer-big-name-text fbn-glow-text"
                                    opacity="0"
                                >
                                    {m.ch}
                                </text>
                            </g>
                        ) : null
                    )}
            </svg>
        </motion.div>
    );
};
