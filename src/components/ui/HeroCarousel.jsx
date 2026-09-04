import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, animate, useMotionValue, useReducedMotion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import './HeroCarousel.css';

const CARD_H = 0.25; // active card height ratio
const CARD_AR = 0.75; // 3:4 aspect ratio
const GAP = 0.04;
const STRIP_TOP = 0.65;
const TITLE = 0.06;
const LABEL = 0.011;
const PAD = 0.02;
const RAIL = 0.22;

const WHEEL_THRESHOLD = 60;
const WHEEL_COOLDOWN = 420;

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

export function HeroCarousel({
  items,
  index: controlled,
  defaultIndex = 0,
  onIndexChange,
  brand = "VIVEK ANAND // WORK EXPERIENCE",
  autoplay = false,
  autoplayDelay = 5000,
  theme = "default",
  className
}) {
  const stageRef = useRef(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [uncontrolled, setUncontrolled] = useState(defaultIndex);
  const [dragging, setDragging] = useState(false);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();

  const isControlled = controlled !== undefined;
  const last = items.length - 1;
  const index = clamp(isControlled ? controlled : uncontrolled, 0, Math.max(0, last));

  const go = useCallback(
    (next) => {
      const clamped = clamp(next, 0, Math.max(0, last));
      if (!isControlled) setUncontrolled(clamped);
      if (clamped !== index) onIndexChange?.(clamped);
    },
    [isControlled, index, last, onIndexChange]
  );

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const read = () => setBox({ w: stage.clientWidth, h: stage.clientHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(stage);
    return () => ro.disconnect();
  }, []);

  const fullH = clamp(box.h * CARD_H, 110, 360);
  const halfH = fullH / 2;
  const cardW = fullH * CARD_AR;
  const gap = Math.max(8, Math.round(cardW * GAP));
  const step = cardW + gap;
  const pad = Math.max(20, Math.round(box.w * PAD));
  const label = Math.max(11, Math.round(box.h * LABEL));

  const xFor = useCallback(
    (i) => box.w / 2 - (i * step + cardW / 2),
    [box.w, step, cardW]
  );
  const x = useMotionValue(0);
  const target = xFor(index);

  const swing = reduced
    ? { duration: 0 }
    : { duration: 0.7, ease: "easeOut" };
  const spring = reduced
    ? { duration: 0 }
    : { type: "spring", stiffness: 260, damping: 34, mass: 0.9 };

  useEffect(() => {
    if (dragging) return;
    const run = animate(x, target, spring);
    return () => run.stop();
  }, [target, dragging, reduced, x]);

  // Only attach wheel listener when NOT controlled by scroll progress.
  // When controlled (scroll-driven), the page scroll naturally drives the index
  // via useScroll in the parent — no wheel interception needed.
  useEffect(() => {
    if (isControlled) return; // <-- Key fix: skip wheel trapping for scroll-driven mode

    const stage = stageRef.current;
    if (!stage) return;
    let acc = 0;
    let until = 0;

    const onWheel = (e) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const stuck = (delta > 0 && index === last) || (delta < 0 && index === 0);
      if (stuck) {
        acc = 0;
        return;
      }
      e.preventDefault();
      const now = e.timeStamp;
      if (now < until) return;
      acc += delta;
      if (Math.abs(acc) < WHEEL_THRESHOLD) return;
      go(index + Math.sign(acc));
      acc = 0;
      until = now + WHEEL_COOLDOWN;
    };

    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [isControlled, go, index, last]);

  useEffect(() => {
    if (!autoplay || paused || dragging || items.length < 2) return;
    const id = window.setTimeout(
      () => go(index === last ? 0 : index + 1),
      autoplayDelay
    );
    return () => window.clearTimeout(id);
  }, [autoplay, autoplayDelay, dragging, go, index, items.length, last, paused]);

  const active = items[index];
  if (!active) return null;

  const lines = active.title.split("\n");
  const accent = theme === "chess" ? "#000000" : (active.accent ?? "#4ce0d2");

  return (
    <div
      ref={stageRef}
      tabIndex={0}
      role="group"
      aria-label="Work Experience Hero Carousel"
      onKeyDown={(e) => {
        const keys = {
          ArrowLeft: index - 1,
          ArrowRight: index + 1,
          Home: 0,
          End: last,
        };
        if (!(e.key in keys)) return;
        e.preventDefault();
        go(keys[e.key]);
      }}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className={cn(
        "hero-carousel-container",
        theme === "chess" && "theme-chess",
        className
      )}
    >
      {/* ── Background: Active photo blown up with color accent blend ── */}
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={swing}
        >
          <motion.img
            src={active.image}
            alt={active.title}
            aria-hidden
            draggable={false}
            className="hero-backdrop-img"
            initial={{ scale: reduced ? 1.22 : 1.35 }}
            animate={{ scale: 1.22 }}
            transition={reduced ? { duration: 0 } : { duration: 6, ease: "linear" }}
          />
          {theme !== "chess" && (
            <>
              <div
                className="absolute inset-0"
                style={{ backgroundColor: accent, mixBlendMode: "color" }}
              />
              <div
                className="absolute inset-0 opacity-60"
                style={{ backgroundColor: accent, mixBlendMode: "multiply" }}
              />
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Legibility wash + grain */}
      <div className="hero-wash-overlay" />
      <div
        aria-hidden
        className="hero-grain-overlay"
        style={{ backgroundImage: GRAIN, backgroundSize: "180px 180px" }}
      />

      {/* ── Top Bar ── */}
      <div className="hero-top-bar">
        <div className="hero-brand">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
          {brand}
        </div>
      </div>

      {/* ── Headline Block ── */}
      <div className="hero-headline-block">
        <div className="hero-headline-content">
          <div className="hero-headline-header-row">
            {/* Animated Title */}
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.h2
                key={index}
                className="hero-title"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.18 } }}
              >
                {lines.map((line, i) => (
                  <span key={i} className="hero-title-line">
                    <motion.span
                      className="block"
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={
                        reduced
                          ? { duration: 0 }
                          : { duration: 0.62, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }
                      }
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </motion.h2>
            </AnimatePresence>

            {/* Subtitle & Action Buttons Row */}
            <div className="hero-subtitle-actions-row">
              {active.subtitle ? (
                <motion.p
                  key={`sub-${index}`}
                  className="hero-credit-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {active.subtitle} • {active.credit}
                </motion.p>
              ) : null}

              {/* Action Buttons */}
              <div className="hero-action-buttons">
                {active.links?.live ? (
                  <a
                    href={active.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-action-btn primary"
                  >
                    Live Demo <ArrowUpRight size={15} />
                  </a>
                ) : (
                  <span className="hero-action-btn disabled">Live Disabled</span>
                )}

                {active.links?.github ? (
                  <a
                    href={active.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-action-btn secondary"
                  >
                    <Github size={15} /> GitHub
                  </a>
                ) : null}
              </div>
            </div>

            {/* Meta row */}
            {active.meta?.length ? (
              <div className="hero-meta-row">
                {active.meta.map((fact, i) => (
                  <motion.span
                    key={`${index}-${fact}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 0.9, y: 0 }}
                    transition={
                      reduced ? { duration: 0 } : { duration: 0.45, delay: 0.12 + i * 0.06 }
                    }
                  >
                    {fact}
                  </motion.span>
                ))}
              </div>
            ) : null}
          </div>

          {/* Tech Stack Pills */}
          {active.stack?.length ? (
            <motion.div
              key={`stack-${index}`}
              className="hero-stack-badges"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              {active.stack.map((tech, i) => (
                <span key={i} className="hero-stack-pill">
                  {tech}
                </span>
              ))}
            </motion.div>
          ) : null}

          {/* Impact Points */}
          {active.points?.length ? (
            <div className="hero-points-list">
              {active.points.map((pt, i) => (
                <div key={i} className="hero-point-item">
                  <span className="hero-point-bullet">›</span>
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {/* ── Filmstrip Cards Track (Anchored safely at top: 65%) ── */}
      <div className="hero-strip-container" style={{ height: fullH }}>
        <motion.div
          className="hero-strip-track"
          style={{ gap, x, cursor: dragging ? "grabbing" : "grab" }}
          drag="x"
          dragMomentum={false}
          dragElastic={0.08}
          dragConstraints={{ left: xFor(last), right: xFor(0) }}
          onDragStart={() => setDragging(true)}
          onDragEnd={(_, info) => {
            setDragging(false);
            const thrown = x.get() + info.velocity.x * 0.12;
            go(Math.round((box.w / 2 - thrown - cardW / 2) / step));
          }}
        >
          {items.map((item, i) => {
            const isActive = i === index;
            return (
              <motion.button
                key={item.id ?? i}
                type="button"
                aria-label={item.title.replace(/\n/g, " ")}
                aria-current={isActive}
                onClick={() => go(i)}
                className={cn(
                  "hero-card-button",
                  isActive && "active-card"
                )}
                style={{
                  width: cardW,
                  "--card-accent": theme === "chess" ? "#ffffff" : (item.accent || "#4ce0d2")
                }}
                animate={{ height: isActive ? fullH : halfH }}
                transition={spring}
              >
                <div className="hero-card-logo-box">
                  <img
                    src={item.logo || item.image}
                    alt=""
                    draggable={false}
                    className="hero-card-logo-img"
                  />
                  <div className="hero-card-title-overlay">
                    {item.id.replace("-", " ")}
                  </div>
                </div>

                {/* Dark overlay on inactive cards */}
                <motion.span
                  aria-hidden
                  className="absolute inset-0 bg-black"
                  animate={{ opacity: isActive ? 0 : 0.4 }}
                  transition={spring}
                />
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* ── Position Progress Rail ── */}
      <div className="hero-progress-rail">
        <div className="hero-rail-nums">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{String(items.length).padStart(2, "0")}</span>
        </div>
        <div className="hero-rail-track">
          <motion.div
            className="hero-rail-indicator"
            style={{ width: `${100 / items.length}%` }}
            animate={{ left: `${(index / items.length) * 100}%` }}
            transition={spring}
          />
        </div>
      </div>
    </div>
  );
}
