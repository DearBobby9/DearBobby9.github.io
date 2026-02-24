import Image from "next/image";
import Link from "next/link";
// import { Button } from "@/components/ui/button"; // Removed
// import { Badge } from "@/components/ui/badge"; // Removed
import { FileText, Mail, GraduationCap } from "lucide-react";

// const tags = ["XR", "HCI", "CAD", "Spatial Computing", "Fabrication"]; // Removed

export function Hero() {
    return (
        <section className="section min-h-[90vh] flex flex-col justify-center pt-24 md:pt-32">
            <div className="container-custom">
                <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start lg:justify-between gap-12 lg:gap-24">

                    {/* Left: Narrative Content */}
                    <div className="flex-1 text-left space-y-8 max-w-3xl glass-panel">

                        {/* Minimal Name Tag */}
                        <div className="font-mono text-xs md:text-sm tracking-widest uppercase text-muted-foreground mb-4">
                            Hi, I'm Difan "Bobby" Jia (Dee-Fae Bobby Jae)
                        </div>

                        {/* Huge Headline - FIXED: Removed mix-blend-difference */}
                        <h1 className="!text-[3.5rem] md:!text-8xl lg:!text-9xl leading-[0.9] tracking-tighter">
                            Researcher <span className="font-serif italic font-light">&</span> Builder
                        </h1>

                        {/* Divide & Connect Line */}
                        <hr className="w-24 border-t-2 border-foreground/30 my-8" />

                        {/* Narrative Paragraph */}
                        <p className="text-xl md:text-2xl leading-relaxed font-light text-muted-foreground/90 max-w-2xl mt-8">
                            I design interactive systems at the intersection of <span className="text-foreground font-medium">AR</span>, <span className="text-foreground font-medium">spatial computing</span>, and <span className="text-foreground font-medium">AI</span> — exploring how intelligent, embodied interfaces can reshape the way we create, visualize, and engage with digital content in the real world.
                        </p>

                        {/* Editorial Links (Not Buttons) */}
                        <div className="flex flex-wrap gap-8 pt-8 font-mono text-sm">
                            <Link href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 hover:text-muted-foreground transition-colors">
                                <span className="border-b border-foreground group-hover:border-muted-foreground transition-colors">Download CV</span>
                                <FileText className="h-3 w-3" />
                            </Link>
                            <Link href="mailto:difan.jia@utdallas.edu" className="group flex items-center gap-2 hover:text-muted-foreground transition-colors">
                                <span className="border-b border-foreground group-hover:border-muted-foreground transition-colors">Email</span>
                                <Mail className="h-3 w-3" />
                            </Link>
                            <Link href="https://x.com/KeithMaxwell99" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 hover:text-muted-foreground transition-colors">
                                <span className="border-b border-foreground group-hover:border-muted-foreground transition-colors">X</span>
                                {/* Custom X Logo (Twitter) */}
                                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
                                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                                </svg>
                            </Link>
                            <Link href="https://scholar.google.com/citations?user=M3bt3kAAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 hover:text-muted-foreground transition-colors">
                                <span className="border-b border-foreground group-hover:border-muted-foreground transition-colors">Scholar</span>
                                <GraduationCap className="h-3 w-3" />
                            </Link>
                        </div>
                    </div>

                    {/* Right: Minimal Avatar/Visual */}
                    <div className="w-full max-w-[280px] lg:max-w-xs shrink-0 self-start lg:self-center lg:mt-12">
                        <div className="aspect-[4/5] relative grayscale hover:grayscale-0 transition-all duration-700 ease-out">
                            {/* Simple rectangular crop, no round borders */}
                            <Image
                                src="/images/profile.png"
                                alt="Difan Jia"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
