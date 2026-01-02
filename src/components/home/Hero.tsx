import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Mail, Github } from "lucide-react";

const tags = ["XR", "HCI", "CAD", "Spatial Computing", "Fabrication"];

export function Hero() {
    return (
        <section className="section pt-24 md:pt-32 lg:pt-40">
            <div className="container-custom">
                <div className="flex flex-col items-center text-center">
                    {/* Avatar */}
                    <div className="relative mb-8 md:mb-12">
                        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-border">
                            <Image
                                src="/images/profile.png"
                                alt="Difan Jia"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        {/* Subtle glow effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent to-background/80 pointer-events-none" />
                    </div>

                    {/* Name */}
                    <h1 className="mb-4">
                        DIFAN JIA
                    </h1>

                    {/* Tagline with blinking cursor */}
                    <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
                        XR + Fabrication + Spatial Computing
                        <span className="cursor-blink ml-1 text-foreground">_</span>
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap justify-center gap-2 mb-10">
                        {tags.map((tag) => (
                            <Badge
                                key={tag}
                                variant="outline"
                                className="font-mono text-xs px-3 py-1"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button asChild size="lg" className="gap-2">
                            <Link href="/about">
                                <FileText className="h-4 w-4" />
                                Download CV
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="gap-2">
                            <Link href="mailto:keithtmaxwell99@gmail.com">
                                <Mail className="h-4 w-4" />
                                Email
                            </Link>
                        </Button>
                        <Button asChild variant="ghost" size="lg" className="gap-2">
                            <Link
                                href="https://github.com/DearBobby9"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Github className="h-4 w-4" />
                                GitHub
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
