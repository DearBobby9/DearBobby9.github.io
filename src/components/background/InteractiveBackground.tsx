"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface InteractiveBackgroundProps {
    className?: string;
}

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
        const MOUSE_RADIUS = 250; // Influence radius
        const DOT_SIZE = 1.2;
        const DOT_COLOR = "rgba(128, 128, 128, 0.25)"; // Subtle gray
        const ACTIVE_DOT_COLOR = "rgba(0, 0, 0, 0.8)"; // Variable based on theme ideally, but hardcoding for now or reading CSS var

        // Theme detection for proper coloring
        const isDark = document.documentElement.classList.contains("dark");
        const baseColor = isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)";
        const highlightColor = isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)";

        interface Dot {
            x: number;
            y: number;
            originX: number;
            originY: number;
            vx: number;
            vy: number;
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
                    });
                }
            }
        };

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initDots();
        };

        // Initial setup
        resize();
        window.addEventListener("resize", resize);

        // Mouse Tracking
        const handleMouseMove = (e: MouseEvent) => {
            mouse.targetX = e.clientX;
            mouse.targetY = e.clientY;
        };

        // Reset mouse when leaving window
        const handleMouseLeave = () => {
            mouse.targetX = -1000;
            mouse.targetY = -1000;
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);

        // Animation Loop
        const render = () => {
            if (!ctx) return;

            // Clear canvas
            ctx.clearRect(0, 0, width, height);

            // Smooth mouse movement
            mouse.x += (mouse.targetX - mouse.x) * 0.1;
            mouse.y += (mouse.targetY - mouse.y) * 0.1;

            const time = performance.now();

            // Update and draw dots
            dots.forEach((dot) => {
                // Calculate distance to smooth mouse position
                const dx = mouse.x - dot.originX; // Vector from dot origin to mouse
                const dy = mouse.y - dot.originY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                let size = DOT_SIZE;
                let color = baseColor;
                let scale = 1;


                // Interaction logic
                if (dist < MOUSE_RADIUS) {
                    const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS; // 0 to 1
                    const angle = Math.atan2(dy, dx);

                    // Oscillation for "breathing" effect
                    // Frequency: time * 0.002
                    // Phase: dot position (creates wave effect)
                    const oscillation = Math.sin(time * 0.002 + dist * 0.05);

                    // Displacement amount (max 20px) + Breathing (Tripled amplitude to 15px)
                    const moveDist = force * 20 + (force * oscillation * 15);

                    // Displace dot
                    const tx = dot.originX - Math.cos(angle) * moveDist;
                    const ty = dot.originY - Math.sin(angle) * moveDist;

                    // Smoothly move dot current pos to target pos
                    dot.x += (tx - dot.x) * 0.15;
                    dot.y += (ty - dot.y) * 0.15;

                    // Scale up dots near cursor with pulse (Increased to 0.5)
                    scale = 1 + force * 1.5 + (force * oscillation * 0.5); // Pulse scale
                    color = highlightColor;
                } else {
                    // Return to origin
                    dot.x += (dot.originX - dot.x) * 0.1;
                    dot.y += (dot.originY - dot.y) * 0.1;
                }

                // Draw dot
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, size * scale, 0, Math.PI * 2);
                ctx.fill();

                // Optional: Draw connecting lines if very close (web effect) - skipping for performance/cleanliness
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
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
                className="absolute inset-0 block w-full h-full"
            />
        </div>
    );
}
