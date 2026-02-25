import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileText, Mail, Github, GraduationCap } from "lucide-react";
import { siteConfig } from "@/data/site";

const XIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
);

export const metadata = {
    title: "About",
};

const timeline = [
    {
        period: "2025 – Present",
        title: "PhD Student & Research Assistant",
        organization: "University of Texas at Dallas",
        description: (
            <>
                <Link href="https://www.de4m.xyz/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground transition-colors">DE4M Lab</Link>, advised by Prof.{" "}
                <Link href="https://www.lianghe.me/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground transition-colors">Liang He</Link>. Researching embodied AR interaction and spatial computing.
            </>
        ),
    },
    {
        period: "2023 – 2025",
        title: "B.S. in Computer Science",
        organization: "University of Minnesota, Twin Cities",
        description: (
            <>
                Worked with Prof.{" "}
                <Link href="https://chenzhutian.org/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground transition-colors">Zhu-Tian Chen</Link>{" "}
                on visualization and interactive systems.
            </>
        ),
    },
    {
        period: "2020 – 2023",
        title: "Undergraduate",
        organization: "University of Shanghai for Science and Technology",
        description: "Completed foundational coursework before transferring to UMN.",
    },
];

export default function AboutPage() {
    return (
        <section className="section pt-24 md:pt-32">
            <div className="container-custom glass-panel">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    {/* Left column - Photo and quick info */}
                    <div className="lg:col-span-4">
                        {/* Photo */}
                        <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-border mx-auto lg:mx-0 mb-8">
                            <Image
                                src="/images/profile.jpg"
                                alt="Difan Jia"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Quick links */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
                            <Button asChild size="sm" className="gap-2">
                                <Link href="/cv.pdf" target="_blank">
                                    <FileText className="h-4 w-4" />
                                    Download CV
                                </Link>
                            </Button>
                            <Button variant="outline" size="sm" asChild className="gap-2">
                                <Link href={`mailto:${siteConfig.email}`}>
                                    <Mail className="h-4 w-4" />
                                    Email
                                </Link>
                            </Button>
                        </div>

                        {/* Social links */}
                        <div className="flex justify-center lg:justify-start gap-4">
                            <Link
                                href={siteConfig.socials.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="GitHub"
                            >
                                <Github className="h-5 w-5" />
                            </Link>
                            <Link
                                href={siteConfig.socials.x}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="X (Twitter)"
                            >
                                <XIcon className="h-5 w-5" />
                            </Link>
                            <Link
                                href={siteConfig.socials.scholar}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="Google Scholar"
                            >
                                <GraduationCap className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Right column - Bio and timeline */}
                    <div className="lg:col-span-8">
                        {/* Name */}
                        <h1 className="mb-6">About</h1>

                        {/* Bio */}
                        <div className="prose prose-neutral dark:prose-invert max-w-none mb-12">
                            <p className="text-lg leading-relaxed">
                                Hi, I&apos;m <strong>Difan &quot;Bobby&quot; Jia</strong> (贾迪帆). Bobby has been my name since I was three — given by my first English teacher, and it stuck ever since. I&apos;m a CS PhD student at the <strong>University of Texas at Dallas</strong>, advised by Prof.{" "}
                                <Link href="https://www.lianghe.me/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground transition-colors">Liang He</Link>{" "}
                                in the{" "}
                                <Link href="https://www.de4m.xyz/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground transition-colors">DE4M Lab</Link>.
                            </p>
                            <p className="text-base text-muted-foreground leading-relaxed">
                                My research sits at the intersection of <strong className="text-foreground">Mixed Reality</strong>, <strong className="text-foreground">spatial computing</strong>, and <strong className="text-foreground">embodied interaction</strong>. I&apos;m interested in how intelligent systems can help people create, visualize, and manipulate digital content more naturally in physical space — using AR, AI agents, and novel interaction techniques.
                            </p>
                            <p className="text-base text-muted-foreground leading-relaxed">
                                I completed my B.S. in Computer Science at the <strong className="text-foreground">University of Minnesota, Twin Cities</strong>, where I worked with Prof.{" "}
                                <Link href="https://chenzhutian.org/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground transition-colors">Zhu-Tian Chen</Link>{" "}
                                on visualization and interactive systems. Before that, I spent three years at the University of Shanghai for Science and Technology.
                            </p>
                            <p className="text-base text-muted-foreground leading-relaxed">
                                Outside of research, I follow the Premier League, tinker with new dev tools, and occasionally overthink my investment portfolio.
                            </p>
                        </div>

                        <Separator className="my-12" />

                        {/* Timeline */}
                        <div>
                            <h2 className="text-xl font-semibold mb-8">Timeline</h2>
                            <div className="space-y-8">
                                {timeline.map((item, index) => (
                                    <div key={index} className="flex gap-6">
                                        {/* Period */}
                                        <span className="font-mono text-xs text-muted-foreground w-28 shrink-0 pt-1">
                                            {item.period}
                                        </span>

                                        {/* Content */}
                                        <div className="flex-1 pb-8 border-l border-border pl-6 relative">
                                            {/* Dot */}
                                            <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-foreground -translate-x-1/2" />

                                            <h3 className="font-medium mb-1">{item.title}</h3>
                                            <p className="text-sm text-muted-foreground mb-2">
                                                {item.organization}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
