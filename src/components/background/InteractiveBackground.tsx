"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface InteractiveBackgroundProps {
    className?: string;
}

// Indigo family — subtle single-hue variation
const COLORS_LIGHT: [number, number, number][] = [
    [79, 70, 229],    // indigo-600
    [89, 80, 235],
    [99, 102, 241],   // indigo-500
    [109, 112, 245],
    [119, 122, 248],
    [129, 140, 251],  // indigo-400
];

const COLORS_DARK: [number, number, number][] = [
    [119, 130, 238],
    [129, 140, 248],  // indigo-400
    [139, 150, 255],
    [149, 160, 255],
    [159, 168, 255],
    [165, 180, 252],  // indigo-300
];

export function InteractiveBackground({ className }: InteractiveBackgroundProps) {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

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
        const MOUSE_RADIUS = 250;
        const DOT_SIZE = 1.2;

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
            phase: number;      // random phase for idle micro-animation
            colorIndex: number;  // index into color palette
        }

        let dots: Dot[] = [];

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
                        colorIndex: Math.floor(Math.random() * COLORS_LIGHT.length),
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

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);

        // Animation loop
        const render = () => {
            if (!ctx) return;

            ctx.clearRect(0, 0, width, height);

            // Smooth mouse movement
            mouse.x += (mouse.targetX - mouse.x) * 0.1;
            mouse.y += (mouse.targetY - mouse.y) * 0.1;

            const time = performance.now();
            const palette = isDark ? COLORS_DARK : COLORS_LIGHT;

            dots.forEach((dot) => {
                const dx = mouse.x - dot.originX;
                const dy = mouse.y - dot.originY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                const [r, g, b] = palette[dot.colorIndex];
                let color: string;
                let scale = 1;

                if (dist < MOUSE_RADIUS) {
                    const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
                    const angle = Math.atan2(dy, dx);

                    // Breathing oscillation
                    const oscillation = Math.sin(time * 0.002 + dist * 0.05);

                    // Displacement (repulsion from mouse)
                    const moveDist = force * 20 + (force * oscillation * 15);
                    const tx = dot.originX - Math.cos(angle) * moveDist;
                    const ty = dot.originY - Math.sin(angle) * moveDist;

                    dot.x += (tx - dot.x) * 0.15;
                    dot.y += (ty - dot.y) * 0.15;

                    // Scale & color
                    scale = 1 + force * 1.5 + (force * oscillation * 0.5);
                    const alpha = 0.08 + force * 0.45;
                    color = `rgba(${r}, ${g}, ${b}, ${alpha})`;

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

                    const targetX = dot.originX + driftX;
                    const targetY = dot.originY + driftY;

                    dot.x += (targetX - dot.x) * 0.08;
                    dot.y += (targetY - dot.y) * 0.08;

                    // Pulsing idle opacity
                    const alpha = 0.04 + Math.sin(time * 0.001 + dot.phase) * 0.03;
                    color = `rgba(${r}, ${g}, ${b}, ${Math.max(0.01, alpha)})`;

                    // Draw circle for idle dots
                    ctx.fillStyle = color;
                    ctx.beginPath();
                    ctx.arc(dot.x, dot.y, DOT_SIZE * scale, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
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
