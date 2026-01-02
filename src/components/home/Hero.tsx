import Image from "next/image";
import Link from "next/link";
// import { Button } from "@/components/ui/button"; // Removed
// import { Badge } from "@/components/ui/badge"; // Removed
import { FileText, Mail, Github } from "lucide-react";

// const tags = ["XR", "HCI", "CAD", "Spatial Computing", "Fabrication"]; // Removed

export function Hero() {
    return (
        <section className="section min-h-[90vh] flex flex-col justify-center pt-24 md:pt-32">
            <div className="container-custom">
                <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start lg:justify-between gap-12 lg:gap-24">

                    {/* Left: Narrative Content */}
                    <div className="flex-1 text-left space-y-8 max-w-3xl">

                        {/* Minimal Name Tag */}
                        <div className="font-mono text-sm tracking-widest uppercase text-muted-foreground mb-4">
                            Hi, I'm Difan Jia
                        </div>

                        {/* Huge Headline - FIXED: Removed mix-blend-difference */}
                        <h1 className="leading-[0.9] text-7xl md:text-8xl lg:text-9xl tracking-tighter">
                            Research Engineer <span className="font-serif italic font-light">&</span> Designer
                        </h1>

                        {/* Divide & Connect Line */}
                        <hr className="w-24 border-t-2 border-foreground/30 my-8" />

                        {/* Narrative Paragraph */}
                        <p className="text-xl md:text-2xl leading-relaxed font-light text-muted-foreground/90 max-w-2xl mt-8">
                            I explore the intersection of <span className="text-foreground font-medium">Mixed Reality</span>, <span className="text-foreground font-medium">Digital Fabrication</span>, and <span className="text-foreground font-medium">Spatial Computing</span>.
                            Currently building tools that bridge the gap between virtual design and physical making.
                        </p>

                        {/* Editorial Links (Not Buttons) */}
                        <div className="flex flex-wrap gap-8 pt-8 font-mono text-sm">
                            <Link href="/about" className="group flex items-center gap-2 hover:text-muted-foreground transition-colors">
                                <span className="border-b border-foreground group-hover:border-muted-foreground transition-colors">Download CV</span>
                                <FileText className="h-3 w-3" />
                            </Link>
                            <Link href="mailto:keithtmaxwell99@gmail.com" className="group flex items-center gap-2 hover:text-muted-foreground transition-colors">
                                <span className="border-b border-foreground group-hover:border-muted-foreground transition-colors">Email</span>
                                <Mail className="h-3 w-3" />
                            </Link>
                            <Link href="https://github.com/DearBobby9" target="_blank" className="group flex items-center gap-2 hover:text-muted-foreground transition-colors">
                                <span className="border-b border-foreground group-hover:border-muted-foreground transition-colors">GitHub</span>
                                <Github className="h-3 w-3" />
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
