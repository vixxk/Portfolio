import { useEffect, useRef, useState } from 'react';

export const InteractiveCanvas = ({ isResolved }) => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: null, y: null });
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);
        const handleChange = (e) => setPrefersReducedMotion(e.matches);
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    useEffect(() => {
        if (prefersReducedMotion) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * window.devicePixelRatio;
            canvas.height = rect.height * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const particles = [];
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 35 : 85;
        const width = canvas.width / window.devicePixelRatio;
        const height = canvas.height / window.devicePixelRatio;

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.25,
                vy: (Math.random() - 0.5) * 0.25,
                radius: Math.random() * 1.5 + 1.2,
                baseOpacity: Math.random() * 0.35 + 0.15,
                opacity: 0.15,
                isNearest: Math.random() < 0.08,
                color: '#4CE0D2'
            });
        }

        // Special target/resolved node
        const targetNode = {
            x: width * 0.76,
            y: height * 0.28,
            radius: 5,
            isTarget: true,
            opacity: 1,
            pulse: 0
        };

        const render = () => {
            ctx.clearRect(0, 0, width, height);
            const currentWidth = canvas.width / window.devicePixelRatio;
            const currentHeight = canvas.height / window.devicePixelRatio;
            const currentIsMobile = window.innerWidth < 768;

            // Keep target node floating cleanly in top-right quadrant
            targetNode.x = currentIsMobile ? currentWidth * 0.78 : currentWidth * 0.76;
            targetNode.y = currentIsMobile ? currentHeight * 0.22 : currentHeight * 0.28;

            // Draw particles and update them
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                // Bounce
                if (p.x < 0 || p.x > currentWidth) p.vx *= -1;
                if (p.y < 0 || p.y > currentHeight) p.vy *= -1;

                let opacity = p.baseOpacity;
                let scale = 1;

                if (mouseRef.current.x !== null) {
                    const dx = mouseRef.current.x - p.x;
                    const dy = mouseRef.current.y - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const interactionRadius = 160;

                    if (dist < interactionRadius) {
                        const factor = 1 - dist / interactionRadius;
                        opacity = p.baseOpacity + factor * 0.65;
                        scale = 1 + factor * 0.8;

                        // Mild attraction
                        p.x += (dx / dist) * factor * 0.35;
                        p.y += (dy / dist) * factor * 0.35;
                    }
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius * scale, 0, Math.PI * 2);

                if (p.isNearest) {
                    ctx.fillStyle = `rgba(76, 224, 210, ${opacity})`;
                } else {
                    ctx.fillStyle = `rgba(136, 145, 168, ${opacity * 0.7})`;
                }
                ctx.fill();
            });

            // Draw Target node
            if (isResolved) {
                targetNode.pulse += 0.03;
                const pulseRadius = targetNode.radius + Math.sin(targetNode.pulse) * 4;

                ctx.beginPath();
                ctx.arc(targetNode.x, targetNode.y, pulseRadius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(139, 127, 255, 0.15)';
                ctx.fill();

                ctx.beginPath();
                ctx.arc(targetNode.x, targetNode.y, targetNode.radius, 0, Math.PI * 2);
                ctx.fillStyle = '#8B7FFF';
                ctx.fill();

                ctx.font = '10px JetBrains Mono, monospace';
                ctx.fillStyle = '#8B7FFF';
                ctx.fillText('// query_resolved: vivek_anand.vector', targetNode.x + 12, targetNode.y + 4);

                // Connect to mouse if close
                if (mouseRef.current.x !== null) {
                    const dx = mouseRef.current.x - targetNode.x;
                    const dy = mouseRef.current.y - targetNode.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 220) {
                        ctx.beginPath();
                        ctx.moveTo(mouseRef.current.x, mouseRef.current.y);
                        ctx.lineTo(targetNode.x, targetNode.y);
                        ctx.strokeStyle = `rgba(139, 127, 255, ${(1 - dist / 220) * 0.4})`;
                        ctx.lineWidth = 1.2;
                        ctx.stroke();
                    }
                }
            }

            // Draw connections between particles
            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    const maxDist = currentIsMobile ? 80 : 105;
                    if (dist < maxDist) {
                        const alpha = (1 - dist / maxDist) * 0.12;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(76, 224, 210, ${alpha})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }

            // Draw mouse point
            if (mouseRef.current.x !== null) {
                ctx.beginPath();
                ctx.arc(mouseRef.current.x, mouseRef.current.y, 4, 0, Math.PI * 2);
                ctx.fillStyle = '#4CE0D2';
                ctx.fill();

                ctx.font = '10px JetBrains Mono, monospace';
                ctx.fillStyle = '#4CE0D2';
                ctx.fillText('// query_vector', mouseRef.current.x + 10, mouseRef.current.y - 6);

                particles.forEach((p) => {
                    const dx = mouseRef.current.x - p.x;
                    const dy = mouseRef.current.y - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 130) {
                        ctx.beginPath();
                        ctx.moveTo(mouseRef.current.x, mouseRef.current.y);
                        ctx.lineTo(p.x, p.y);
                        ctx.strokeStyle = `rgba(76, 224, 210, ${(1 - dist / 130) * 0.25})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                });
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isResolved, prefersReducedMotion]);

    if (prefersReducedMotion) return null;

    const handleMouseMove = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        mouseRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    const handleMouseLeave = () => {
        mouseRef.current = { x: null, y: null };
    };

    return (
        <canvas
            ref={canvasRef}
            className="hero-canvas"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        />
    );
};
