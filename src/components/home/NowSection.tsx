import Link from "next/link";
import { ArrowRight, Boxes, BrainCircuit, Glasses, Route } from "lucide-react";
import { updates } from "@/data/updates";
import { AntigravityParticleField } from "@/components/background/AntigravityParticleField";

export function NowSection() {
    const capabilities = [
        { label: "Spatial AI", icon: BrainCircuit },
        { label: "Smart glasses", icon: Glasses },
        { label: "Fabrication", icon: Boxes },
        { label: "Field workflows", icon: Route },
    ];

    return (
        <section className="relative isolate overflow-hidden bg-[#0d0f14] py-24 text-white md:py-32">
            <AntigravityParticleField variant="dark" />
            <div className="container-custom relative">
                <div className="mb-16 flex flex-wrap justify-center gap-3 md:justify-start">
                    {capabilities.map((item) => (
                        <span
                            key={item.label}
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-sm text-white/72 backdrop-blur-md"
                        >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                        </span>
                    ))}
                </div>

                <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
                    <div className="max-w-xl">
                        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                            Current trajectory
                        </span>
                        <h2 className="ag-display mt-5 text-5xl font-medium leading-[0.95] tracking-[-0.055em] text-white md:text-7xl">
                            An agentic workspace for spatial research.
                        </h2>
                        <p className="mt-8 max-w-[42ch] text-base leading-8 text-white/55 md:text-lg">
                            The work spans smart glasses, AR visualizations, construction workflows,
                            and tools that make research infrastructure feel immediate.
                        </p>
                    </div>

                    <div className="relative">
                        <div className="absolute -left-10 top-10 hidden h-64 w-64 rounded-full border border-white/10 lg:block" />
                        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#f7f8fb] p-3 text-[#111318] shadow-[0_24px_80px_rgba(0,0,0,0.32)]">
                            <div className="mb-3 flex items-center justify-between rounded-[1.35rem] bg-white px-4 py-3 text-xs text-[#6d7280] shadow-sm">
                                <span className="font-mono uppercase tracking-[0.16em]">Mission control</span>
                                <span className="rounded-full bg-[#e9eef7] px-2.5 py-1 font-medium text-[#3a4253]">Live</span>
                            </div>
                            <div className="space-y-2.5">
                                {updates.map((update, index) => (
                                    <Link
                                        key={index}
                                        href={update.href}
                                        className="group block rounded-2xl bg-white px-4 py-4 shadow-sm ring-1 ring-black/[0.04] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                                    >
                                        <div className="flex items-start gap-4">
                                            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eef2f8] font-mono text-[11px] text-[#657080]">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                            <div className="min-w-0 flex-1">
                                                <div className="mb-1 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[#8b92a1]">
                                                    <span>{update.type}</span>
                                                    <span>{update.year}</span>
                                                </div>
                                                <p className="line-clamp-2 text-sm font-medium leading-6 text-[#1b1f28]">
                                                    {update.title}
                                                </p>
                                            </div>
                                            <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#9aa2af] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#1b1f28]" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
