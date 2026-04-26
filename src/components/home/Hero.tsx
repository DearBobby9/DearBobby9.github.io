import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, Github, GraduationCap, Mail } from "lucide-react";
import { AntigravityParticleField } from "@/components/background/AntigravityParticleField";

export function Hero() {
    return (
        <section className="relative isolate min-h-[92dvh] overflow-hidden bg-background pt-24 md:pt-32">
            <AntigravityParticleField variant="light" />
            <div className="container-custom relative flex min-h-[calc(92dvh-8rem)] flex-col items-center justify-center text-center">
                <div className="mb-9 inline-flex items-center gap-3 rounded-full border border-foreground/[0.08] bg-background/45 px-4 py-2 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-md">
                    <span className="relative flex h-8 w-8 overflow-hidden rounded-full bg-foreground/[0.06] ring-1 ring-foreground/[0.08]">
                        <Image
                            src="/images/profile.webp"
                            alt="Difan Jia"
                            fill
                            className="object-cover grayscale"
                            priority
                            sizes="32px"
                        />
                    </span>
                    <span className="font-medium tracking-tight">Difan &quot;Bobby&quot; Jia</span>
                    <span className="hidden h-1 w-1 rounded-full bg-muted-foreground/45 sm:block" />
                    <span className="hidden text-muted-foreground sm:inline">XR + AI + fabrication</span>
                </div>

                <h1 className="ag-display max-w-6xl text-balance text-[clamp(3.25rem,8.4vw,7.2rem)] font-medium leading-[0.92] tracking-[-0.055em]">
                    Building spatial systems for intelligent interfaces.
                </h1>

                <p className="mt-8 max-w-2xl text-pretty text-base leading-8 text-muted-foreground md:text-xl md:leading-9">
                    I research and build mixed reality tools that help people capture context,
                    reason with space, and turn digital intent into physical action.
                </p>

                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link
                        href="/#projects"
                        className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-all duration-200 hover:bg-foreground/85 active:scale-[0.98]"
                    >
                        Explore projects
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                    <Link
                        href="/#publications"
                        className="inline-flex h-12 items-center justify-center rounded-full border border-foreground/[0.08] bg-background/45 px-6 text-sm font-medium text-foreground backdrop-blur-md transition-all duration-200 hover:bg-muted active:scale-[0.98]"
                    >
                        Read publications
                    </Link>
                </div>

                <div className="mt-12 hidden w-full max-w-3xl grid-cols-2 gap-2 sm:grid sm:grid-cols-4">
                    {[
                        { label: "About", href: "/about/", icon: FileText },
                        { label: "Email", href: "mailto:difan.jia@utdallas.edu", icon: Mail },
                        { label: "GitHub", href: "https://github.com/DearBobby9", icon: Github },
                        { label: "Scholar", href: "https://scholar.google.com/citations?user=M3bt3kAAAAAJ&hl=en", icon: GraduationCap },
                    ].map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="group flex items-center justify-center gap-2 rounded-full border border-foreground/[0.06] bg-background/25 px-4 py-2.5 text-xs font-medium text-muted-foreground backdrop-blur-sm transition-colors hover:text-foreground"
                        >
                            <item.icon className="h-3.5 w-3.5" />
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background" />
        </section>
    );
}
