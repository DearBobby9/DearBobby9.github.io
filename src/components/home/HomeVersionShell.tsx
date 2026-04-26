"use client";

import * as React from "react";
import { Hero } from "@/components/home/Hero";
import { NowSection } from "@/components/home/NowSection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { SelectedPublications } from "@/components/home/SelectedPublications";
import { OldCloudHome } from "@/components/home/OldCloudHome";

type HomeVersion = "new" | "old";

const STORAGE_KEY = "home-version";

export function HomeVersionShell() {
    const [version, setVersion] = React.useState<HomeVersion>("new");
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored === "old" || stored === "new") {
            setVersion(stored);
        }
        setMounted(true);
    }, []);

    React.useEffect(() => {
        document.documentElement.dataset.homeVersion = version;
        window.localStorage.setItem(STORAGE_KEY, version);
        return () => {
            delete document.documentElement.dataset.homeVersion;
        };
    }, [version]);

    return (
        <>
            <div className="fixed right-4 top-20 z-40 rounded-full border border-foreground/[0.08] bg-background/78 p-1 text-xs font-medium shadow-sm backdrop-blur-xl md:right-6">
                <div className="grid grid-cols-2 gap-1">
                    {(["new", "old"] as const).map((item) => (
                        <button
                            key={item}
                            type="button"
                            aria-pressed={version === item}
                            onClick={() => setVersion(item)}
                            className={
                                version === item
                                    ? "rounded-full bg-foreground px-3 py-1.5 text-background transition-colors"
                                    : "rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
                            }
                        >
                            {item === "new" ? "New" : "Old"}
                        </button>
                    ))}
                </div>
            </div>

            {mounted && version === "old" ? (
                <OldCloudHome />
            ) : (
                <>
                    <Hero />
                    <NowSection />
                    <SelectedPublications />
                    <FeaturedProjects />
                </>
            )}
        </>
    );
}
