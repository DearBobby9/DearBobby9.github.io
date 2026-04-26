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

type RectDraw = { x: number; y: number; size: number };

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
        let bounds = root.getBoundingClientRect();
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
                Math.round(area / (variant === "light" ? 520 : 470)),
                variant === "light" ? 620 : 760,
                variant === "light" ? 3400 : 3900
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
            bounds = root.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = Math.max(1, bounds.width);
            height = Math.max(1, bounds.height);
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
            if (!isVisible) return;
            const x = event.clientX - bounds.left;
            const y = event.clientY - bounds.top;
            mouse.active = x >= 0 && x <= bounds.width && y >= 0 && y <= bounds.height;
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
            bounds = root.getBoundingClientRect();
            const scrollProgress = clamp(-bounds.top / Math.max(1, bounds.height), -0.25, 1.15);

            context.clearRect(0, 0, width, height);
            const rectBatches = new Map<string, RectDraw[]>();

            const idleX =
                variant === "light"
                    ? width * (0.07 + scrollProgress * 0.08) + Math.sin(time * 0.25) * width * 0.035
                    : width * (0.73 - scrollProgress * 0.08) + Math.sin(time * 0.18) * width * 0.04;
            const idleY =
                variant === "light"
                    ? height * (0.15 + scrollProgress * 0.08) + Math.cos(time * 0.21) * height * 0.035
                    : height * (0.2 + scrollProgress * 0.16) + Math.cos(time * 0.2) * height * 0.05;
            centerX += (idleX - centerX) * 0.035;
            centerY += (idleY - centerY) * 0.035;

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

                let mousePresence = 0;
                let mousePushX = 0;
                let mousePushY = 0;
                if (mouse.active) {
                    const mdx = particle.originX - mouse.x;
                    const mdy = particle.originY - mouse.y;
                    const mouseDistance = Math.sqrt(mdx * mdx + mdy * mdy) || 1;
                    const mouseRadius = minDim * (isDark ? 0.48 : 0.42);
                    const rawPresence = clamp(1 - mouseDistance / mouseRadius, 0, 1);
                    mousePresence = rawPresence * rawPresence * (3 - 2 * rawPresence);
                    const invMouseDistance = 1 / mouseDistance;
                    mousePushX = mdx * invMouseDistance * mousePresence;
                    mousePushY = mdy * invMouseDistance * mousePresence;
                }

                const energy = clamp(ringEnergy * 0.66 + mousePresence * 0.34, 0, 1);

                const driftX = Math.sin(time * 0.32 + particle.phase) * (isDark ? 0.8 : 0.62);
                const driftY = Math.cos(time * 0.27 + particle.phase * 1.31) * (isDark ? 0.8 : 0.62);
                const ringDisplacement = ringEnergy * minDim * (isDark ? 0.011 : 0.013);
                const mouseDisplacement = mousePresence * minDim * (isDark ? 0.014 : 0.016);
                const tangentDrift = Math.sin(time * 0.74 + particle.phase) * ringEnergy * minDim * 0.004;
                const targetParticleX = particle.originX + driftX + radialX * ringDisplacement + tangentX * tangentDrift + mousePushX * mouseDisplacement;
                const targetParticleY = particle.originY + driftY + radialY * ringDisplacement + tangentY * tangentDrift + mousePushY * mouseDisplacement;
                const ease = clamp(delta / 90, 0.08, 0.32);
                particle.x += (targetParticleX - particle.x) * ease;
                particle.y += (targetParticleY - particle.y) * ease;

                const color = GOOGLE_COLORS[particle.colorIndex % GOOGLE_COLORS.length];
                const isNeutral = particle.colorIndex === 4;
                const baseAlpha = isDark ? 0.052 : 0.044;
                const flicker = (Math.sin(time * 0.95 + particle.phase) + 1) * 0.5;
                const alpha = Math.round(
                    clamp(
                        baseAlpha + flicker * (isDark ? 0.026 : 0.02) + ringEnergy * (isDark ? 0.11 : 0.13) + mousePresence * (isDark ? 0.18 : 0.2),
                        isDark ? 0.022 : 0.016,
                        isDark ? 0.45 : 0.4
                    ) * 40
                ) / 40;
                const dotSize = particle.size * (isDark ? 0.74 : 0.56) * (1 + energy * 0.72);

                const colorStyle =
                    isNeutral
                        ? isDark
                            ? `rgba(230, 234, 240, ${alpha * 0.48})`
                            : `rgba(32, 34, 38, ${alpha * 0.82})`
                        : `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha * (isDark ? 0.66 : 0.54)})`;

                let batch = rectBatches.get(colorStyle);
                if (!batch) {
                    batch = [];
                    rectBatches.set(colorStyle, batch);
                }
                batch.push({
                    x: particle.x - dotSize * 0.5,
                    y: particle.y - dotSize * 0.5,
                    size: dotSize,
                });
            }

            rectBatches.forEach((draws, colorStyle) => {
                context.fillStyle = colorStyle;
                for (const draw of draws) {
                    context.fillRect(draw.x, draw.y, draw.size, draw.size);
                }
            });

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
