import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { updates } from "@/data/updates";
import { AntigravityParticleField } from "@/components/background/AntigravityParticleField";

export function NowSection() {
    const focus = [
        ["Primary thread", "How AR and AI systems can understand messy physical context without pulling people out of the work."],
        ["Current materials", "Smart-glasses prototypes, construction workflows, spatial annotations, and fabrication studies."],
        ["Working style", "I move between code, paper drafts, lab setups, and field observations until the interface earns its place."],
    ];

    return (
        <section className="relative isolate overflow-hidden bg-[#0d0f14] py-24 text-white md:py-32">
            <AntigravityParticleField variant="dark" />
            <div className="container-custom relative">
                <div className="grid gap-14 lg:grid-cols-[0.58fr_0.42fr] lg:items-start">
                    <div className="max-w-xl">
                        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                            Currently
                        </span>
                        <h2 className="ag-display mt-5 text-5xl font-medium leading-[0.95] tracking-[-0.055em] text-white md:text-7xl">
                            What I am working through now.
                        </h2>
                        <p className="mt-8 max-w-[42ch] text-base leading-8 text-white/55 md:text-lg">
                            Most of my attention is on interfaces that can carry spatial context:
                            what a worker sees, what a system should remember, and how a prototype
                            becomes useful outside a controlled demo.
                        </p>

                        <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
                            {focus.map(([label, value]) => (
                                <div key={label} className="grid gap-3 py-5 sm:grid-cols-[9.5rem_1fr]">
                                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
                                        {label}
                                    </span>
                                    <p className="text-sm leading-7 text-white/67">{value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative pt-2 lg:pt-24">
                        <div className="mb-5 flex items-end justify-between gap-6">
                            <div>
                                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/35">
                                    Recent notes
                                </span>
                                <h3 className="mt-2 text-lg font-medium text-white">A small log from the workbench</h3>
                            </div>
                            <Link
                                href="/blog/"
                                className="hidden border-b border-white/20 pb-1 text-sm font-medium text-white/65 transition-colors hover:border-white/60 hover:text-white sm:block"
                            >
                                More notes
                            </Link>
                        </div>

                        <div className="divide-y divide-white/10 border-y border-white/10 bg-white/[0.025] backdrop-blur-sm">
                            {updates.map((update, index) => (
                                <Link
                                    key={`${update.href}-${index}`}
                                    href={update.href}
                                    className="group block px-0 py-5 transition-colors hover:bg-white/[0.035] sm:px-5"
                                >
                                    <div className="grid gap-4 sm:grid-cols-[6.5rem_1fr_auto] sm:items-start">
                                        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/35">
                                            <span>{update.type}</span>
                                            <span className="mx-2 text-white/18">/</span>
                                            <span>{update.year}</span>
                                        </div>
                                        <p className="text-sm font-medium leading-6 text-white/78">
                                            {update.title}
                                        </p>
                                        <ArrowRight className="hidden h-4 w-4 text-white/30 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white/75 sm:block" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
