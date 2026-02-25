import Link from "next/link";

const updates = [
    {
        year: "2026",
        type: "Project",
        title: "NoteV advanced to the next round of UTD Big Idea Pitch — excited to present this smart-glasses idea, stay tuned!",
        href: "/#projects",
    },
    {
        year: "2026",
        type: "Paper",
        title: "CHI '26 — AR Embedded Visualizations & AI Reliance in Spatial Decision-Making",
        href: "/#publications",
    },
    {
        year: "2025",
        type: "Paper",
        title: "UIST '25 — Reality Proxy: Fluid MR Interaction via Abstract Representations",
        href: "/#publications",
    },
];

export function NowSection() {
    return (
        <section className="py-16 md:py-20">
            <div className="container-custom">
                <div className="max-w-3xl mx-auto glass-panel">
                    {/* Section header */}
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-lg font-semibold">Now</h2>
                        <div className="flex-1 h-px bg-border" />
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
                                <span className="font-mono text-xs text-muted-foreground/60 w-16 shrink-0">
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
