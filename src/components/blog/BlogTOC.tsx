"use client";

import { useEffect, useState, useRef } from "react";

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

export default function BlogTOC() {
    const [headings, setHeadings] = useState<TOCItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");
    const observerRef = useRef<IntersectionObserver | null>(null);

    // Extract headings from the rendered MDX content
    useEffect(() => {
        const content = document.querySelector(".mdx-content");
        if (!content) return;

        const elements = content.querySelectorAll("h2, h3");
        const items: TOCItem[] = [];

        elements.forEach((el) => {
            // Generate ID from text content if not present
            const text = el.textContent?.split("—")[0]?.trim() || "";
            if (!text) return;

            const id =
                el.id ||
                text
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, "");

            el.id = id;
            items.push({
                id,
                text: text.replace(/\s*\|.*$/, ""), // strip "| url" part
                level: el.tagName === "H2" ? 2 : 3,
            });
        });

        setHeadings(items);
    }, []);

    // Intersection observer for active tracking
    useEffect(() => {
        if (headings.length === 0) return;

        observerRef.current = new IntersectionObserver(
            (entries) => {
                // Find the first heading that is intersecting
                const visible = entries.filter((e) => e.isIntersecting);
                if (visible.length > 0) {
                    setActiveId(visible[0].target.id);
                }
            },
            {
                rootMargin: "-80px 0px -60% 0px",
                threshold: 0,
            }
        );

        headings.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observerRef.current?.observe(el);
        });

        return () => observerRef.current?.disconnect();
    }, [headings]);

    const handleClick = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    if (headings.length === 0) return null;

    return (
        <nav className="hidden xl:block fixed left-[max(1.5rem,calc((100vw-1120px)/2-220px))] top-1/2 -translate-y-1/2 z-40 w-[200px]">
            <ul className="space-y-1.5">
                {headings.map(({ id, text, level }) => {
                    const isActive = activeId === id;
                    const isCategory = level === 2;

                    return (
                        <li key={id}>
                            <button
                                onClick={() => handleClick(id)}
                                className={`
                                    group flex items-center gap-2 w-full text-left
                                    transition-all duration-300 ease-out
                                    ${isCategory ? "mt-4 first:mt-0" : ""}
                                `}
                            >
                                {/* The bar indicator */}
                                <span
                                    className={`
                                        block rounded-full shrink-0
                                        transition-all duration-300 ease-out
                                        ${
                                            isActive
                                                ? "w-7 h-[2.5px] bg-foreground"
                                                : isCategory
                                                  ? "w-4 h-[2.5px] bg-muted-foreground/40 group-hover:bg-muted-foreground/70 group-hover:w-5"
                                                  : "w-2 h-[2px] bg-muted-foreground/25 group-hover:bg-muted-foreground/50 group-hover:w-4"
                                        }
                                    `}
                                />

                                {/* Text label */}
                                <span
                                    className={`
                                        text-xs leading-tight truncate
                                        transition-all duration-300 ease-out
                                        ${
                                            isActive
                                                ? "opacity-100 text-foreground font-medium max-w-[160px]"
                                                : isCategory
                                                  ? "opacity-0 group-hover:opacity-60 text-muted-foreground max-w-0 group-hover:max-w-[160px] font-medium"
                                                  : "opacity-0 group-hover:opacity-50 text-muted-foreground max-w-0 group-hover:max-w-[160px]"
                                        }
                                        overflow-hidden whitespace-nowrap
                                    `}
                                >
                                    {text}
                                </span>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
