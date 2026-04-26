"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, FileText, GraduationCap, Mail, Play, Github } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChatCTA } from "@/components/home/ChatCTA";
import { updates } from "@/data/updates";
import { featuredProjects, type Project } from "@/data/projects";
import { selectedPublications, type Publication } from "@/data/publications";
import { BibtexCopyButton } from "@/components/publications/BibtexCopyButton";

export function OldCloudHome() {
    return (
        <>
            <OldHero />
            <OldNowSection />
            <OldSelectedPublications />
            <OldFeaturedProjects />
        </>
    );
}

function OldHero() {
    return (
        <section className="section min-h-[90vh] flex flex-col justify-center pt-24 md:pt-32">
            <div className="container-custom">
                <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start lg:justify-between gap-12 lg:gap-24">
                    <div className="flex-1 text-left space-y-8 max-w-3xl glass-panel">
                        <div className="font-mono text-xs md:text-sm tracking-widest uppercase text-muted-foreground mb-4">
                            Hi, I&apos;m Difan &ldquo;Bobby&rdquo; Jia (Dee-Fae Bobby Jae)
                        </div>

                        <h1
                            className="!text-[3.5rem] md:!text-8xl lg:!text-9xl leading-[0.9] tracking-tighter"
                            style={{ textWrap: "balance" as const }}
                        >
                            Researcher <span className="font-serif italic font-light">&</span> Builder
                        </h1>

                        <hr className="w-24 border-t-2 border-foreground/30 my-8" />

                        <p
                            className="text-xl md:text-2xl leading-[2] font-light text-muted-foreground/90 max-w-[58ch] mt-8"
                            style={{ textWrap: "pretty" as const }}
                        >
                            I design interactive systems at the intersection of{" "}
                            <span className="text-foreground font-medium">AR</span>,{" "}
                            <span className="text-foreground font-medium">spatial computing</span>, and{" "}
                            <span className="text-foreground font-medium">AI</span> — exploring how
                            intelligent, embodied interfaces can reshape the way we create, visualize,
                            and engage with digital content in the real world.
                        </p>

                        <div className="flex flex-wrap gap-8 pt-8 font-mono text-sm">
                            <Link href="/cv.pdf" target="_blank" rel="noopener noreferrer" prefetch={false} className="group flex items-center gap-2 hover:text-muted-foreground transition-colors">
                                <span className="border-b border-foreground group-hover:border-muted-foreground transition-colors">Download CV</span>
                                <FileText className="h-3 w-3" />
                            </Link>
                            <Link href="mailto:difan.jia@utdallas.edu" className="group flex items-center gap-2 hover:text-muted-foreground transition-colors">
                                <span className="border-b border-foreground group-hover:border-muted-foreground transition-colors">Email</span>
                                <Mail className="h-3 w-3" />
                            </Link>
                            <Link href="https://x.com/KeithMaxwell99" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 hover:text-muted-foreground transition-colors">
                                <span className="border-b border-foreground group-hover:border-muted-foreground transition-colors">X</span>
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

                    <div className="w-full max-w-[280px] lg:max-w-xs shrink-0 self-start lg:self-center lg:mt-12">
                        <div className="aspect-[4/5] relative grayscale hover:grayscale-0 transition-all duration-700 ease-out">
                            <Image
                                src="/images/profile.webp"
                                alt="Difan Jia"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <ChatCTA />
                    </div>
                </div>
            </div>
        </section>
    );
}

function OldNowSection() {
    return (
        <section className="py-16 md:py-20">
            <div className="container-custom">
                <div className="max-w-3xl glass-panel">
                    <div className="mb-10 max-w-[65ch]">
                        <p className="text-xl md:text-2xl font-heading" style={{ textWrap: "balance" as const }}>
                            <span className="text-foreground font-semibold">Now</span>
                            <span className="text-muted-foreground font-normal"> — what I&apos;m currently working on and recent milestones.</span>
                        </p>
                    </div>

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
                                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60 w-16 shrink-0">
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

function OldSelectedPublications() {
    return (
        <section id="publications" className="section scroll-mt-20">
            <div className="container-custom glass-panel">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-14">
                    <div className="md:w-3/5">
                        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground block mb-3">Selected Work</span>
                        <h2>Publications</h2>
                    </div>
                    <div className="md:w-2/5 md:pt-10">
                        <p className="text-sm text-muted-foreground max-w-[40ch]" style={{ lineHeight: "1.85" }}>
                            Peer-reviewed research in AR, spatial computing, and human-computer interaction.
                        </p>
                    </div>
                </div>

                <div className="space-y-8">
                    {selectedPublications.map((pub) => (
                        <OldPublicationItem key={pub.id} publication={pub} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function OldPublicationItem({ publication }: { publication: Publication }) {
    return (
        <div className="group p-4 -mx-4 rounded-sm border-l-2 border-transparent hover:border-foreground/30 hover:translate-x-0.5 transition-all duration-200">
            <div className="flex flex-col md:flex-row gap-5">
                {publication.image && (
                    <div className="w-full md:w-[280px] shrink-0">
                        <Link href={`/publications/${publication.id}`} className="block aspect-video bg-foreground/[2.5%] ring-1 ring-inset ring-foreground/[0.05] relative overflow-hidden rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                            <Image
                                src={publication.image}
                                alt={publication.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </Link>
                    </div>
                )}

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-xs font-medium text-muted-foreground">
                            {publication.venue}
                        </span>
                        {publication.note && (
                            <span className="text-xs font-mono px-2 py-0.5 bg-muted rounded text-muted-foreground">
                                {publication.note}
                            </span>
                        )}
                    </div>

                    <h3 className="text-base md:text-lg font-medium mb-2 leading-snug">
                        <Link href={`/publications/${publication.id}`} className="hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                            {publication.title}
                        </Link>
                    </h3>

                    <p className="text-sm text-muted-foreground mb-3">
                        {publication.authors.map((author, index) => (
                            <span key={author}>
                                {author === "Difan Jia" ? (
                                    <strong className="text-foreground">{author}</strong>
                                ) : (
                                    author
                                )}
                                {index < publication.authors.length - 1 && ", "}
                            </span>
                        ))}
                    </p>

                    <div className="flex gap-2">
                        {publication.links.pdf && (
                            <Link
                                href={publication.links.pdf}
                                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent transition-colors ring-1 ring-foreground/[0.08]"
                            >
                                <FileText className="h-3.5 w-3.5" />
                                PDF
                            </Link>
                        )}
                        {publication.links.doi && (
                            <Link
                                href={publication.links.doi}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent transition-colors ring-1 ring-foreground/[0.08]"
                            >
                                <ExternalLink className="h-3.5 w-3.5" />
                                DOI
                            </Link>
                        )}
                        <BibtexCopyButton
                            bibtex={publication.bibtex}
                            variant="ghost"
                            size="sm"
                            className="rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent ring-1 ring-foreground/[0.08]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function OldFeaturedProjects() {
    return (
        <section id="projects" className="section scroll-mt-20">
            <div className="container-custom glass-panel">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-14">
                    <div className="md:w-3/5">
                        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground block mb-3">Featured Work</span>
                        <h2>Projects</h2>
                    </div>
                    <div className="md:w-2/5 md:pt-10">
                        <p className="text-sm text-muted-foreground max-w-[40ch]" style={{ lineHeight: "1.85" }}>
                            Systems built at the intersection of AR, spatial computing, and fabrication.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredProjects.map((project) => (
                        <OldProjectCard key={project.slug} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function OldProjectCard({ project }: { project: Project }) {
    const hasLinks = project.links.paper || project.links.code || project.links.demo || project.links.video;
    const hasDetail = project.hasDetail === true;
    const detailHref = `/projects/${project.slug}`;

    const imageBlock = (
        <div className="aspect-video bg-foreground/[3%] ring-1 ring-inset ring-foreground/[0.04] relative overflow-hidden">
            {project.image ? (
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/60" />
            )}
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors" />
        </div>
    );

    return (
        <Card className="group h-full gap-0 py-0 overflow-hidden bg-card hover:bg-accent hover:shadow-md hover:ring-foreground/[0.12] transition-all duration-300">
            {hasDetail ? (
                <Link href={detailHref} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    {imageBlock}
                </Link>
            ) : (
                imageBlock
            )}

            <CardContent className="p-4 flex flex-col flex-1">
                <div className="flex-1">
                    <span className="font-mono text-xs text-muted-foreground">
                        {project.year}
                    </span>

                    <h3 className="text-lg font-semibold mt-1 mb-1.5 group-hover:text-accent-foreground transition-colors">
                        {hasDetail ? (
                            <Link href={detailHref} className="hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                                {project.title}
                            </Link>
                        ) : (
                            project.title
                        )}
                    </h3>

                    <p className="text-sm text-muted-foreground line-clamp-3">
                        {project.oneLiner}
                    </p>

                    {(project.inspiration || project.backedBy) && (
                        <div className="mt-2 space-y-0.5">
                            {project.inspiration && (
                                <p className="text-[11px] text-muted-foreground/60">
                                    Inspired by{" "}
                                    <a
                                        href={project.inspiration.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline underline-offset-2 hover:text-muted-foreground transition-colors"
                                    >
                                        {project.inspiration.name}
                                    </a>
                                </p>
                            )}
                            {project.backedBy && (
                                <p className="text-[11px] text-muted-foreground/60">
                                    Backed by{" "}
                                    <a
                                        href={project.backedBy.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline underline-offset-2 hover:text-muted-foreground transition-colors"
                                    >
                                        {project.backedBy.name}
                                    </a>
                                </p>
                            )}
                        </div>
                    )}
                </div>

                <div className="mt-auto pt-3 border-t border-foreground/[0.06] flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 3).map((tag) => (
                            <Badge
                                key={tag}
                                variant="secondary"
                                className="font-mono text-[10px] px-2 py-0.5"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    {hasLinks && (
                        <div className="flex gap-2.5 ml-3 shrink-0">
                            {project.links.paper && (
                                <a href={project.links.paper} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                                    <FileText className="h-3.5 w-3.5" />
                                </a>
                            )}
                            {project.links.code && (
                                <a href={project.links.code} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                                    <Github className="h-3.5 w-3.5" />
                                </a>
                            )}
                            {project.links.demo && (
                                <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                                    <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                            )}
                            {project.links.video && (
                                <a href={project.links.video} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                                    <Play className="h-3.5 w-3.5" />
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
