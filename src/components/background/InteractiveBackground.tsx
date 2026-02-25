"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { usePalette } from "@/components/PaletteProvider";
import { COLOR_PALETTES } from "@/data/colorPalettes";

interface InteractiveBackgroundProps {
    className?: string;
}

export function InteractiveBackground({ className }: InteractiveBackgroundProps) {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
    const { paletteId } = usePalette();

    // Ref so the canvas render loop can read the current palette without restarting
    const paletteRef = React.useRef(COLOR_PALETTES[paletteId]);
    React.useEffect(() => {
        paletteRef.current = COLOR_PALETTES[paletteId];
    }, [paletteId]);

    // Check for reduced motion preference
    React.useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mediaQuery.matches);

        const handler = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };

        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    React.useEffect(() => {
        if (prefersReducedMotion) return;

        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let width = 0;
        let height = 0;

        // Mouse state with smooth interpolation
        const mouse = {
            x: -1000,
            y: -1000,
            targetX: -1000,
            targetY: -1000,
        };

        // Grid configuration
        const DOT_SPACING = 30;
        const MOUSE_RADIUS = 375;
        const DOT_SIZE = 1.2;

        // Ripple configuration — particle-driven, no stroke rings
        const RIPPLE_MAX_RADIUS = 1050;
        const RIPPLE_SPEED = 3.75;
        const RIPPLE_BAND_WIDTH = 120;      // wider wave band
        const RIPPLE_DOT_FORCE = 52.5;      // strong outward push
        const RIPPLE_INITIAL_STRENGTH = 1.0; // full initial energy

        // [Enhancement 3] Dynamic dark mode detection
        let isDark = document.documentElement.classList.contains("dark");

        const observer = new MutationObserver(() => {
            isDark = document.documentElement.classList.contains("dark");
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        interface Dot {
            x: number;
            y: number;
            originX: number;
            originY: number;
            vx: number;
            vy: number;
            phase: number;
            colorIndex: number;
        }

        interface Ripple {
            x: number;
            y: number;
            radius: number;
            maxRadius: number;
            speed: number;
            strength: number;   // force decay factor
        }

        let dots: Dot[] = [];
        let ripples: Ripple[] = [];

        const initDots = () => {
            dots = [];
            const cols = Math.ceil(width / DOT_SPACING);
            const rows = Math.ceil(height / DOT_SPACING);

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * DOT_SPACING + (DOT_SPACING / 2);
                    const y = j * DOT_SPACING + (DOT_SPACING / 2);
                    dots.push({
                        x,
                        y,
                        originX: x,
                        originY: y,
                        vx: 0,
                        vy: 0,
                        phase: Math.random() * Math.PI * 2,
                        colorIndex: Math.floor(Math.random() * paletteRef.current.light.length),
                    });
                }
            }
        };

        // [Enhancement 1] DPR-aware resize
        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            initDots();
        };

        // Initial setup
        resize();
        window.addEventListener("resize", resize);

        // Mouse tracking
        const handleMouseMove = (e: MouseEvent) => {
            mouse.targetX = e.clientX;
            mouse.targetY = e.clientY;
        };

        const handleMouseLeave = () => {
            mouse.targetX = -1000;
            mouse.targetY = -1000;
        };

        // Click ripple
        const handleClick = (e: MouseEvent) => {
            ripples.push({
                x: e.clientX,
                y: e.clientY,
                radius: 0,
                maxRadius: RIPPLE_MAX_RADIUS,
                speed: RIPPLE_SPEED,
                strength: RIPPLE_INITIAL_STRENGTH,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("click", handleClick);

        // Animation loop
        const render = () => {
            if (!ctx) return;

            ctx.clearRect(0, 0, width, height);

            // Smooth mouse movement
            mouse.x += (mouse.targetX - mouse.x) * 0.1;
            mouse.y += (mouse.targetY - mouse.y) * 0.1;

            const time = performance.now();
            const palette = isDark ? paletteRef.current.dark : paletteRef.current.light;

            // Update ripples — smooth cubic decay
            for (let i = ripples.length - 1; i >= 0; i--) {
                const ripple = ripples[i];
                ripple.radius += ripple.speed;
                const progress = ripple.radius / ripple.maxRadius;
                const decay = (1 - progress);
                ripple.strength = RIPPLE_INITIAL_STRENGTH * decay * decay * decay;

                if (ripple.radius > ripple.maxRadius) {
                    ripples.splice(i, 1);
                }
            }

            dots.forEach((dot) => {
                const dx = mouse.x - dot.originX;
                const dy = mouse.y - dot.originY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Accumulate ripple forces
                let rippleForceX = 0;
                let rippleForceY = 0;
                let rippleIntensity = 0; // for visual brightness boost

                for (const ripple of ripples) {
                    const rdx = dot.originX - ripple.x;
                    const rdy = dot.originY - ripple.y;
                    const dotDist = Math.sqrt(rdx * rdx + rdy * rdy);
                    const ringDist = Math.abs(dotDist - ripple.radius);

                    if (ringDist < RIPPLE_BAND_WIDTH && dotDist > 0) {
                        // Smooth bell-curve force within the band
                        const t = ringDist / RIPPLE_BAND_WIDTH;
                        const bandForce = Math.cos(t * Math.PI * 0.5); // cos falloff: 1 at center, 0 at edge
                        const force = bandForce * ripple.strength * RIPPLE_DOT_FORCE;

                        const angle = Math.atan2(rdy, rdx);
                        rippleForceX += Math.cos(angle) * force;
                        rippleForceY += Math.sin(angle) * force;

                        // Track max intensity for glow
                        rippleIntensity = Math.max(rippleIntensity, bandForce * ripple.strength);
                    }
                }

                const [r, g, b] = palette[dot.colorIndex % palette.length];
                let color: string;
                let scale = 1;

                if (dist < MOUSE_RADIUS) {
                    const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
                    const angle = Math.atan2(dy, dx);

                    // Breathing oscillation
                    const oscillation = Math.sin(time * 0.002 + dist * 0.05);

                    // Displacement (repulsion from mouse + ripple)
                    const moveDist = force * 20 + (force * oscillation * 15);
                    const tx = dot.originX - Math.cos(angle) * moveDist + rippleForceX;
                    const ty = dot.originY - Math.sin(angle) * moveDist + rippleForceY;

                    dot.x += (tx - dot.x) * 0.15;
                    dot.y += (ty - dot.y) * 0.15;

                    // Scale & color — combine mouse proximity + ripple intensity
                    scale = 1 + force * 1.5 + (force * oscillation * 0.5) + rippleIntensity * 2.5;
                    const alpha = 0.08 + force * 0.45 + rippleIntensity * 0.5;
                    color = `rgba(${r}, ${g}, ${b}, ${Math.min(alpha, 0.9)})`;

                    // [Enhancement 4] Shape variation — ellipse near mouse
                    const stretch = 1 + force * 1.8;
                    ctx.fillStyle = color;
                    ctx.beginPath();
                    ctx.ellipse(
                        dot.x,
                        dot.y,
                        DOT_SIZE * scale * stretch,
                        DOT_SIZE * scale,
                        angle + Math.PI / 2,
                        0,
                        Math.PI * 2
                    );
                    ctx.fill();
                } else {
                    // [Enhancement 2] Idle micro-animation
                    const driftX = Math.sin(time * 0.0008 + dot.phase) * 1.5;
                    const driftY = Math.cos(time * 0.0006 + dot.phase * 1.3) * 1.5;

                    const targetX = dot.originX + driftX + rippleForceX;
                    const targetY = dot.originY + driftY + rippleForceY;

                    dot.x += (targetX - dot.x) * 0.12;
                    dot.y += (targetY - dot.y) * 0.12;

                    // Scale & opacity — dramatic boost from ripple
                    scale = 1 + rippleIntensity * 3;
                    const baseAlpha = 0.04 + Math.sin(time * 0.001 + dot.phase) * 0.03;
                    const alpha = baseAlpha + rippleIntensity * 0.55;
                    color = `rgba(${r}, ${g}, ${b}, ${Math.min(Math.max(0.01, alpha), 0.85)})`;

                    ctx.fillStyle = color;
                    ctx.beginPath();
                    ctx.arc(dot.x, dot.y, DOT_SIZE * scale, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            // No stroke rings — ripple is expressed entirely through particle movement and glow

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("click", handleClick);
            cancelAnimationFrame(animationFrameId);
            observer.disconnect();
        };
    }, [prefersReducedMotion]);

    if (prefersReducedMotion) return null;

    return (
        <div
            ref={containerRef}
            className={cn(
                "fixed inset-0 -z-10 bg-background pointer-events-none transition-colors duration-300",
                className
            )}
        >
            <canvas
                ref={canvasRef}
                className="absolute inset-0 block"
            />
        </div>
    );
}
