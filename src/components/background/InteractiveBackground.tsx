"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { usePalette } from "@/components/PaletteProvider";

interface InteractiveBackgroundProps {
    className?: string;
}

export function InteractiveBackground({ className }: InteractiveBackgroundProps) {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
    const [isSuppressedForNewHome, setIsSuppressedForNewHome] = React.useState(false);
    const pathname = usePathname();
    const { getActivePalette, paletteId, customColors } = usePalette();

    // Ref so the canvas render loop can read the current palette without restarting
    const paletteRef = React.useRef(getActivePalette());
    React.useEffect(() => {
        paletteRef.current = getActivePalette();
    }, [getActivePalette, paletteId, customColors]);

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
        const normalizedPathname = pathname.replace(/\/$/, "") || "/";
        setIsSuppressedForNewHome(normalizedPathname === "/new-home");
    }, [pathname]);

    React.useEffect(() => {
        if (prefersReducedMotion || isSuppressedForNewHome) return;

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
        const RIPPLE_MAX_RADIUS = 1400;
        const RIPPLE_SPEED = 3.75;
        const RIPPLE_BAND_WIDTH = 180;
        const RIPPLE_DOT_FORCE = 52.5;
        const RIPPLE_INITIAL_STRENGTH = 2.0;

        // [Enhancement 3] Dynamic dark mode detection with smooth interpolation
        let darkProgress = document.documentElement.classList.contains("dark") ? 1 : 0;
        let darkTarget = darkProgress;

        const observer = new MutationObserver(() => {
            darkTarget = document.documentElement.classList.contains("dark") ? 1 : 0;
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
        const ripples: Ripple[] = [];

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

        // Touch tracking (mobile)
        const handleTouchStart = (e: TouchEvent) => {
            const touch = e.touches[0];
            mouse.targetX = touch.clientX;
            mouse.targetY = touch.clientY;
            // Spawn ripple on tap
            ripples.push({
                x: touch.clientX,
                y: touch.clientY,
                radius: 0,
                maxRadius: RIPPLE_MAX_RADIUS,
                speed: RIPPLE_SPEED,
                strength: RIPPLE_INITIAL_STRENGTH,
            });
        };

        const handleTouchMove = (e: TouchEvent) => {
            const touch = e.touches[0];
            mouse.targetX = touch.clientX;
            mouse.targetY = touch.clientY;
        };

        const handleTouchEnd = () => {
            mouse.targetX = -1000;
            mouse.targetY = -1000;
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("click", handleClick);
        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchmove", handleTouchMove, { passive: true });
        window.addEventListener("touchend", handleTouchEnd);

        // Pre-squared constants to avoid sqrt in hot path
        const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS;

        // Batch rendering: group dots by fillStyle to minimize state changes
        // Key = rgba string, Value = array of [x, y, radius] or [x, y, rx, ry, rotation]
        type CircleDraw = { x: number; y: number; r: number };
        type EllipseDraw = { x: number; y: number; rx: number; ry: number; rot: number };

        // Animation loop
        const render = () => {
            if (!ctx) return;

            ctx.clearRect(0, 0, width, height);

            // Smooth dark mode interpolation — 0.12 factor ≈ 0.6s to 99% at 60fps
            darkProgress += (darkTarget - darkProgress) * 0.12;
            if (Math.abs(darkTarget - darkProgress) < 0.001) darkProgress = darkTarget;
            const dp = darkProgress; // 0 = light, 1 = dark

            // Smooth mouse movement
            mouse.x += (mouse.targetX - mouse.x) * 0.18;
            mouse.y += (mouse.targetY - mouse.y) * 0.18;

            const time = performance.now();
            const lightPalette = paletteRef.current.light;
            const darkPalette = paletteRef.current.dark;

            // Update ripples — slower decay for longer-lasting waves
            for (let i = ripples.length - 1; i >= 0; i--) {
                const ripple = ripples[i];
                ripple.radius += ripple.speed;
                const progress = ripple.radius / ripple.maxRadius;
                const decay = (1 - progress);
                ripple.strength = RIPPLE_INITIAL_STRENGTH * Math.pow(decay, 1.8);

                if (ripple.radius > ripple.maxRadius) {
                    ripples.splice(i, 1);
                }
            }

            // Pre-compute ripple bounding boxes for fast rejection
            const activeRipples = ripples.map(r => ({
                ...r,
                innerR: r.radius - RIPPLE_BAND_WIDTH,
                outerR: r.radius + RIPPLE_BAND_WIDTH,
            }));

            // Batch maps: collect draws by color, then flush once
            const circleBatches = new Map<string, CircleDraw[]>();
            const ellipseBatches = new Map<string, EllipseDraw[]>();

            const hasRipples = activeRipples.length > 0;
            const mouseInView = mouse.x > -500 && mouse.y > -500;

            for (let i = 0, len = dots.length; i < len; i++) {
                const dot = dots[i];
                const dx = mouse.x - dot.originX;
                const dy = mouse.y - dot.originY;
                // Use squared distance to avoid sqrt for far dots
                const distSq = dx * dx + dy * dy;

                // Accumulate ripple forces — only if ripples exist
                let rippleForceX = 0;
                let rippleForceY = 0;
                let rippleIntensity = 0;

                if (hasRipples) {
                    for (let ri = 0; ri < activeRipples.length; ri++) {
                        const ripple = activeRipples[ri];
                        const rdx = dot.originX - ripple.x;
                        const rdy = dot.originY - ripple.y;
                        const dotDistSq = rdx * rdx + rdy * rdy;

                        // Fast rejection: skip if clearly outside the band
                        // dotDist must be between innerR and outerR
                        if (dotDistSq < ripple.innerR * ripple.innerR && ripple.innerR > 0) continue;
                        if (dotDistSq > ripple.outerR * ripple.outerR) continue;

                        const dotDist = Math.sqrt(dotDistSq);
                        const ringDist = Math.abs(dotDist - ripple.radius);

                        if (ringDist < RIPPLE_BAND_WIDTH && dotDist > 0) {
                            const t = ringDist / RIPPLE_BAND_WIDTH;
                            const bandForce = Math.cos(t * Math.PI * 0.5);
                            const force = bandForce * ripple.strength * RIPPLE_DOT_FORCE;

                            const invDist = 1 / dotDist;
                            rippleForceX += rdx * invDist * force;
                            rippleForceY += rdy * invDist * force;

                            rippleIntensity = Math.max(rippleIntensity, bandForce * ripple.strength);
                        }
                    }
                }

                const ci = dot.colorIndex % lightPalette.length;
                const lc = lightPalette[ci], dc = darkPalette[ci % darkPalette.length];
                const r = Math.round(lc[0] + (dc[0] - lc[0]) * dp);
                const g = Math.round(lc[1] + (dc[1] - lc[1]) * dp);
                const b = Math.round(lc[2] + (dc[2] - lc[2]) * dp);
                let scale = 1;
                let alpha: number;

                if (mouseInView && distSq < MOUSE_RADIUS_SQ) {
                    const dist = Math.sqrt(distSq);
                    const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
                    const angle = Math.atan2(dy, dx);

                    const oscillation = Math.sin(time * 0.002 + dist * 0.05);
                    const moveDist = force * 20 + (force * oscillation * 22.5);
                    const cosA = Math.cos(angle);
                    const sinA = Math.sin(angle);
                    const tx = dot.originX - cosA * moveDist + rippleForceX;
                    const ty = dot.originY - sinA * moveDist + rippleForceY;

                    dot.x += (tx - dot.x) * 0.25;
                    dot.y += (ty - dot.y) * 0.25;

                    scale = 1 + force * 1.5 + (force * oscillation * 0.75) + rippleIntensity * 2.5;
                    alpha = Math.min(0.08 + force * 0.45 + rippleIntensity * 0.5, 0.9);

                    // Quantize alpha to reduce unique fillStyle strings
                    alpha = Math.round(alpha * 50) / 50;
                    const color = `rgba(${r},${g},${b},${alpha})`;

                    const stretch = 1 + force * 1.8;
                    let batch = ellipseBatches.get(color);
                    if (!batch) { batch = []; ellipseBatches.set(color, batch); }
                    batch.push({
                        x: dot.x, y: dot.y,
                        rx: DOT_SIZE * scale * stretch,
                        ry: DOT_SIZE * scale,
                        rot: angle + Math.PI / 2,
                    });
                } else {
                    const driftX = Math.sin(time * 0.0015 + dot.phase) * 2.25;
                    const driftY = Math.cos(time * 0.0012 + dot.phase * 1.3) * 2.25;

                    const targetX = dot.originX + driftX + rippleForceX;
                    const targetY = dot.originY + driftY + rippleForceY;

                    dot.x += (targetX - dot.x) * 0.2;
                    dot.y += (targetY - dot.y) * 0.2;

                    scale = 1 + rippleIntensity * 3;
                    const baseAlpha = 0.04 + Math.sin(time * 0.001 + dot.phase) * 0.045;
                    alpha = Math.min(Math.max(0.01, baseAlpha + rippleIntensity * 0.55), 0.85);

                    // Quantize alpha to batch more aggressively for idle dots
                    alpha = Math.round(alpha * 20) / 20;
                    const color = `rgba(${r},${g},${b},${alpha})`;

                    const radius = DOT_SIZE * scale;
                    // For tiny idle dots, use fillRect (no arc path needed)
                    if (scale < 1.5) {
                        const size = radius * 2;
                        let batch = circleBatches.get(color);
                        if (!batch) { batch = []; circleBatches.set(color, batch); }
                        batch.push({ x: dot.x - radius, y: dot.y - radius, r: size });
                    } else {
                        let batch = circleBatches.get(color);
                        if (!batch) { batch = []; circleBatches.set(color, batch); }
                        batch.push({ x: dot.x, y: dot.y, r: -radius }); // negative = arc mode
                    }
                }
            }

            // Flush circle batches — one fillStyle change per unique color
            circleBatches.forEach((draws, color) => {
                ctx.fillStyle = color;
                // Split into rect draws (r > 0 = size) and arc draws (r < 0 = radius)
                let hasRect = false;
                let hasArc = false;
                for (let i = 0; i < draws.length; i++) {
                    if (draws[i].r > 0) { hasRect = true; } else { hasArc = true; }
                    if (hasRect && hasArc) break;
                }

                if (hasRect) {
                    for (let i = 0; i < draws.length; i++) {
                        const d = draws[i];
                        if (d.r > 0) ctx.fillRect(d.x, d.y, d.r, d.r);
                    }
                }
                if (hasArc) {
                    ctx.beginPath();
                    for (let i = 0; i < draws.length; i++) {
                        const d = draws[i];
                        if (d.r < 0) {
                            const radius = -d.r;
                            ctx.moveTo(d.x + radius, d.y);
                            ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
                        }
                    }
                    ctx.fill();
                }
            });

            // Flush ellipse batches
            ellipseBatches.forEach((draws, color) => {
                ctx.fillStyle = color;
                ctx.beginPath();
                for (let i = 0; i < draws.length; i++) {
                    const d = draws[i];
                    ctx.moveTo(
                        d.x + d.rx * Math.cos(d.rot),
                        d.y + d.rx * Math.sin(d.rot)
                    );
                    ctx.ellipse(d.x, d.y, d.rx, d.ry, d.rot, 0, Math.PI * 2);
                }
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("click", handleClick);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
            cancelAnimationFrame(animationFrameId);
            observer.disconnect();
        };
    }, [prefersReducedMotion, isSuppressedForNewHome]);

    if (prefersReducedMotion || isSuppressedForNewHome) return null;

    return (
        <div
            ref={containerRef}
            className={cn(
                "fixed inset-0 -z-10 bg-background pointer-events-none transition-colors duration-600 ease-in-out",
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
