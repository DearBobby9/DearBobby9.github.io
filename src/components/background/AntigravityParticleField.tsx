"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type FieldVariant = "light" | "dark";

interface AntigravityParticleFieldProps {
    className?: string;
    variant?: FieldVariant;
}

interface Particle {
    x: number;
    y: number;
    originX: number;
    originY: number;
    phase: number;
    colorIndex: number;
    size: number;
}

const GOOGLE_COLORS = [
    [66, 133, 244],
    [234, 67, 53],
    [251, 188, 5],
    [52, 168, 83],
    [32, 33, 36],
];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function AntigravityParticleField({
    className,
    variant = "light",
}: AntigravityParticleFieldProps) {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

    React.useEffect(() => {
        const query = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(query.matches);
        const handler = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
        query.addEventListener("change", handler);
        return () => query.removeEventListener("change", handler);
    }, []);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container || prefersReducedMotion) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;
        const root = container;
        const context = ctx;

        let width = 0;
        let height = 0;
        let raf = 0;
        let isVisible = true;
        let lastTime = performance.now();
        let centerX = 0;
        let centerY = 0;
        const particles: Particle[] = [];
        const mouse = {
            x: -9999,
            y: -9999,
            active: false,
        };

        const createParticles = () => {
            particles.length = 0;
            if (width <= 0 || height <= 0) return;

            const area = width * height;
            const targetCount = clamp(
                Math.round(area / (variant === "light" ? 920 : 820)),
                variant === "light" ? 360 : 460,
                variant === "light" ? 1900 : 2300
            );
            const aspect = width / height;
            const cols = Math.max(12, Math.round(Math.sqrt(targetCount * aspect)));
            const rows = Math.max(8, Math.ceil(targetCount / cols));
            const cellW = width / cols;
            const cellH = height / rows;

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    if (particles.length >= targetCount) break;

                    const jitterX = (Math.random() - 0.5) * 0.76;
                    const jitterY = (Math.random() - 0.5) * 0.76;
                    const x = (col + 0.5 + jitterX) * cellW;
                    const y = (row + 0.5 + jitterY) * cellH;

                    particles.push({
                        x,
                        y,
                        originX: x,
                        originY: y,
                        phase: Math.random() * Math.PI * 2,
                        colorIndex: Math.random() < 0.48 ? Math.floor(Math.random() * 4) : 4,
                        size: 0.55 + Math.random() * 0.95,
                    });
                }
            }
        };

        const resize = () => {
            const rect = root.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = Math.max(1, rect.width);
            height = Math.max(1, rect.height);
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            context.setTransform(dpr, 0, 0, dpr, 0, 0);
            centerX = variant === "light" ? width * 0.08 : width * 0.72;
            centerY = variant === "light" ? height * 0.14 : height * 0.22;
            createParticles();
        };

        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(root);
        resize();

        const visibilityObserver = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
                if (isVisible && raf === 0) {
                    lastTime = performance.now();
                    raf = requestAnimationFrame(render);
                }
            },
            { threshold: 0 }
        );
        visibilityObserver.observe(root);

        const onPointerMove = (event: PointerEvent) => {
            const rect = root.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            mouse.active = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;
            if (mouse.active) {
                mouse.x = x;
                mouse.y = y;
            }
        };

        const onPointerLeave = () => {
            mouse.active = false;
        };

        window.addEventListener("pointermove", onPointerMove, { passive: true });
        window.addEventListener("pointerleave", onPointerLeave);

        function render(now: number) {
            raf = 0;
            if (!isVisible) return;

            const delta = Math.min(34, now - lastTime);
            lastTime = now;
            const time = now * 0.001;
            const rect = root.getBoundingClientRect();
            const scrollProgress = clamp(-rect.top / Math.max(1, rect.height), -0.25, 1.15);

            context.clearRect(0, 0, width, height);

            const idleX =
                variant === "light"
                    ? width * (0.07 + scrollProgress * 0.08) + Math.sin(time * 0.25) * width * 0.035
                    : width * (0.73 - scrollProgress * 0.08) + Math.sin(time * 0.18) * width * 0.04;
            const idleY =
                variant === "light"
                    ? height * (0.15 + scrollProgress * 0.08) + Math.cos(time * 0.21) * height * 0.035
                    : height * (0.2 + scrollProgress * 0.16) + Math.cos(time * 0.2) * height * 0.05;
            const targetX = mouse.active ? mouse.x : idleX;
            const targetY = mouse.active ? mouse.y : idleY;
            const follow = mouse.active ? 0.15 : 0.035;
            centerX += (targetX - centerX) * follow;
            centerY += (targetY - centerY) * follow;

            const minDim = Math.min(width, height);
            const ringRadius =
                minDim * (variant === "light" ? 0.36 : 0.43) *
                (1 + Math.sin(time * 0.9) * 0.075 + Math.cos(time * 1.7) * 0.035);
            const ringWidth = minDim * (variant === "light" ? 0.058 : 0.074);
            const secondRingRadius = ringRadius * 0.58;
            const secondRingWidth = ringWidth * 0.48;
            const isDark = variant === "dark";

            for (const particle of particles) {
                const dx = particle.originX - centerX;
                const dy = particle.originY - centerY;
                const distance = Math.sqrt(dx * dx + dy * dy) || 1;
                const angle = Math.atan2(dy, dx);
                const radialX = dx / distance;
                const radialY = dy / distance;
                const tangentX = -radialY;
                const tangentY = radialX;

                const mainBand = clamp(1 - Math.abs(distance - ringRadius) / ringWidth, 0, 1);
                const innerBand = clamp(1 - Math.abs(distance - secondRingRadius) / secondRingWidth, 0, 1);
                const orbitalGate = clamp(
                    Math.sin(angle * 9 + particle.phase * 1.7 + time * 0.72) * 1.25 +
                    Math.sin(distance * 0.025 - time * 0.58 + particle.phase) * 0.55,
                    0,
                    1
                );
                const ringEnergy =
                    Math.pow(mainBand, 2.35) * (0.25 + orbitalGate * 0.95) +
                    Math.pow(innerBand, 2.1) * (0.12 + orbitalGate * 0.38);
                const hoverBoost = mouse.active ? 1.2 : 0.82;
                const energy = clamp(ringEnergy * hoverBoost, 0, 1);

                const driftX = Math.sin(time * 0.32 + particle.phase) * (isDark ? 0.8 : 0.62);
                const driftY = Math.cos(time * 0.27 + particle.phase * 1.31) * (isDark ? 0.8 : 0.62);
                const displacement = energy * minDim * (isDark ? 0.035 : 0.042);
                const tangentDrift = Math.sin(time * 0.74 + particle.phase) * energy * minDim * 0.009;
                const targetParticleX = particle.originX + driftX + radialX * displacement + tangentX * tangentDrift;
                const targetParticleY = particle.originY + driftY + radialY * displacement + tangentY * tangentDrift;
                const ease = clamp(delta / 90, 0.08, 0.32);
                particle.x += (targetParticleX - particle.x) * ease;
                particle.y += (targetParticleY - particle.y) * ease;

                const color = GOOGLE_COLORS[particle.colorIndex % GOOGLE_COLORS.length];
                const baseAlpha = isDark ? 0.064 : 0.058;
                const flicker = (Math.sin(time * 0.95 + particle.phase) + 1) * 0.5;
                const alpha = clamp(baseAlpha + flicker * (isDark ? 0.042 : 0.032) + energy * (isDark ? 0.4 : 0.52), 0.018, isDark ? 0.72 : 0.86);
                const size = particle.size * (isDark ? 0.95 : 0.75) * (1 + energy * 1.9);

                context.fillStyle =
                    energy > 0.08
                        ? `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`
                        : isDark
                            ? `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha * 0.72})`
                            : `rgba(32, 34, 38, ${alpha * (particle.colorIndex === 4 ? 1.25 : 0.72)})`;

                if (energy > 0.075) {
                    context.beginPath();
                    context.ellipse(
                        particle.x,
                        particle.y,
                        size * (2.8 + energy * 4.8),
                        Math.max(0.42, size * 0.66),
                        angle + Math.PI / 2,
                        0,
                        Math.PI * 2
                    );
                    context.fill();
                } else {
                    const dot = size * (isDark ? 1.25 : 1);
                    context.fillRect(particle.x - dot * 0.5, particle.y - dot * 0.5, dot, dot);
                }
            }

            raf = requestAnimationFrame(render);
        }

        raf = requestAnimationFrame(render);

        return () => {
            resizeObserver.disconnect();
            visibilityObserver.disconnect();
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerleave", onPointerLeave);
            if (raf) cancelAnimationFrame(raf);
        };
    }, [prefersReducedMotion, variant]);

    return (
        <div
            ref={containerRef}
            className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
            aria-hidden="true"
        >
            <canvas ref={canvasRef} className="absolute inset-0 block" />
        </div>
    );
}
