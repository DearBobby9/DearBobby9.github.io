import Link from "next/link";
import { updates } from "@/data/updates";

export function NowSection() {
    return (
        <section className="py-16 md:py-20">
            <div className="container-custom">
                <div className="max-w-3xl glass-panel">
                    {/* Section header — inline heading (#10) */}
                    <div className="mb-10 max-w-[65ch]">
                        <p className="text-xl md:text-2xl font-heading" style={{ textWrap: 'balance' as const }}>
                            <span className="text-foreground font-semibold">Now</span>
                            <span className="text-muted-foreground font-normal"> — what I&apos;m currently working on and recent milestones.</span>
                        </p>
                    </div>

                    {/* Updates list */}
                    <div className="space-y-4">
                        {updates.map((update, index) => (
                            <Link
                                key={index}
                                href={update.href}
                                className="group flex items-baseline gap-4 py-2 transition-colors hover:text-muted-foreground"
                            >
                                <span className="font-mono text-xs text-muted-foreground w-12 shrink-0">
                                    {update.year}
                                </span>
                                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60 w-16 shrink-0">
                                    {update.type}
                                </span>
                                <span className="text-sm md:text-base">
                                    {update.title}
                                </span>
                                <span className="ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                                    →
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
