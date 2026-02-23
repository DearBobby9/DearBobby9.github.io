import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileText, Mail, Github, GraduationCap } from "lucide-react";

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
        period: "2024 - Present",
        title: "Research Assistant",
        organization: "University XR Lab",
        description: "Working on spatial computing and XR fabrication projects.",
    },
    {
        period: "2022 - 2024",
        title: "Graduate Student",
        organization: "University of Technology",
        description: "Master's program in Human-Computer Interaction.",
    },
    {
        period: "2018 - 2022",
        title: "Undergraduate",
        organization: "University",
        description: "Bachelor's degree in Computer Science.",
    },
];

export default function AboutPage() {
    return (
        <section className="section pt-24 md:pt-32">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    {/* Left column - Photo and quick info */}
                    <div className="lg:col-span-4">
                        {/* Photo */}
                        <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-border mx-auto lg:mx-0 mb-8">
                            <Image
                                src="/images/profile.png"
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
                                <Link href="mailto:keithtmaxwell99@gmail.com">
                                    <Mail className="h-4 w-4" />
                                    Email
                                </Link>
                            </Button>
                        </div>

                        {/* Social links */}
                        <div className="flex justify-center lg:justify-start gap-4">
                            <Link
                                href="https://github.com/DearBobby9"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="GitHub"
                            >
                                <Github className="h-5 w-5" />
                            </Link>
                            <Link
                                href="https://x.com/DearBobby9"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="X (Twitter)"
                            >
                                <XIcon className="h-5 w-5" />
                            </Link>
                            <Link
                                href="https://scholar.google.com/citations?user=M3bt3kAAAAAJ&hl=en"
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
                                Hi, I&apos;m <strong>Difan Jia</strong> (贾迪凡), but you can call me Bobby.
                                I&apos;m a researcher and developer interested in <strong>XR</strong>,
                                <strong> HCI</strong>, <strong>CAD</strong>, and <strong>spatial computing</strong>.
                            </p>
                            <p className="text-base text-muted-foreground leading-relaxed">
                                My work focuses on bridging virtual design with physical fabrication
                                through spatial interfaces. I explore novel interaction paradigms for
                                3D content creation in mixed reality environments.
                            </p>
                            <p className="text-base text-muted-foreground leading-relaxed">
                                When I&apos;m not doing research, I enjoy building tools and experimenting
                                with new technologies. I believe in creating technology that feels natural
                                and empowers human creativity.
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
