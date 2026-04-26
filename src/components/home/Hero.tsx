import Image from "next/image";
import Link from "next/link";
import { FileText, Github, GraduationCap, Mail } from "lucide-react";
import { AntigravityParticleField } from "@/components/background/AntigravityParticleField";

export function Hero() {
    const links = [
        { label: "About", href: "/about/", icon: FileText },
        { label: "Email", href: "mailto:difan.jia@utdallas.edu", icon: Mail },
        { label: "GitHub", href: "https://github.com/DearBobby9", icon: Github },
        { label: "Scholar", href: "https://scholar.google.com/citations?user=M3bt3kAAAAAJ&hl=en", icon: GraduationCap },
    ];

    return (
        <section className="relative isolate min-h-[92dvh] overflow-hidden bg-background pt-24 md:pt-32">
            <AntigravityParticleField variant="light" />
            <div className="container-custom relative grid min-h-[calc(92dvh-8rem)] items-center gap-12 pb-16 lg:grid-cols-[minmax(0,0.68fr)_minmax(260px,0.32fr)] lg:gap-16">
                <div className="max-w-5xl text-left">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                        Difan &quot;Bobby&quot; Jia / XR, HCI, spatial AI
                    </span>

                    <h1 className="ag-display mt-6 max-w-5xl text-balance text-[clamp(3.1rem,7.2vw,6.8rem)] font-medium leading-[0.92] tracking-[-0.055em]">
                        Hi, I&apos;m Bobby. I build XR tools for spatial work and fabrication.
                    </h1>

                    <p className="mt-8 max-w-[58ch] text-pretty text-base leading-8 text-muted-foreground md:text-xl md:leading-9">
                        I am a researcher and builder working across mixed reality, smart glasses,
                        construction workflows, and human-computer interaction. This site is my
                        running index of papers, prototypes, notes, and the projects I keep testing
                        in the field.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-x-7 gap-y-4">
                        <Link href="/#projects" className="group border-b border-foreground/20 pb-1 text-sm font-medium text-foreground transition-colors hover:border-foreground">
                            Projects
                        </Link>
                        <Link href="/#publications" className="group border-b border-foreground/20 pb-1 text-sm font-medium text-foreground transition-colors hover:border-foreground">
                            Publications
                        </Link>
                        {links.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                target={item.href.startsWith("http") ? "_blank" : undefined}
                                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                className="group inline-flex items-center gap-2 border-b border-foreground/15 pb-1 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground/45 hover:text-foreground"
                            >
                                <item.icon className="h-3.5 w-3.5" />
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>

                <aside className="relative w-full max-w-[360px] justify-self-start lg:justify-self-end">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-foreground/[0.035] ring-1 ring-inset ring-foreground/[0.08]">
                        <Image
                            src="/images/profile.webp"
                            alt="Difan Jia"
                            fill
                            className="object-cover grayscale"
                            priority
                            sizes="(min-width: 1024px) 360px, 80vw"
                        />
                    </div>

                    <div className="mt-6 divide-y divide-foreground/[0.08] border-y border-foreground/[0.08] bg-background/30 backdrop-blur-sm">
                        {[
                            ["Based in", "Dallas, Texas"],
                            ["Studying", "Spatial computing for real work"],
                            ["Often in", "AR labs, job sites, and CAD tools"],
                        ].map(([label, value]) => (
                            <div key={label} className="grid grid-cols-[7.5rem_1fr] gap-4 py-4 text-sm">
                                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                                    {label}
                                </span>
                                <span className="font-medium leading-6 text-foreground">{value}</span>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background" />
        </section>
    );
}
