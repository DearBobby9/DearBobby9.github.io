import Link from "next/link";
import Image from "next/image";
import type { ComponentType } from "react";
import { ArrowRight, ExternalLink, Github, FileText, Play } from "lucide-react";
import { featuredProjects, type Project } from "@/data/projects";

export function FeaturedProjects() {
    return (
        <section id="projects" className="section scroll-mt-20 bg-background">
            <div className="container-custom">
                <div className="mb-14 grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-end">
                    <div>
                        <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Featured work</span>
                        <h2 className="ag-display max-w-3xl text-5xl font-medium leading-[0.95] tracking-[-0.055em] md:text-7xl">
                            Projects from the lab and field.
                        </h2>
                    </div>
                    <div className="md:justify-self-end">
                        <p className="max-w-[42ch] text-sm leading-7 text-muted-foreground md:text-base">
                            A selection of prototypes, studies, and tools that keep shaping how I think
                            about spatial interfaces and physical work.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
                    {featuredProjects.map((project, index) => (
                        <ProjectCard key={project.slug} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const hasLinks = project.links.paper || project.links.code || project.links.demo || project.links.video;
    const hasDetail = project.hasDetail === true;
    const detailHref = `/projects/${project.slug}`;
    const spanClass =
        index === 0
            ? "md:col-span-7 md:row-span-2"
            : index === 1
                ? "md:col-span-5"
                : "md:col-span-4";

    const imageBlock = (
        <div className="relative aspect-[16/10] overflow-hidden rounded-[1.4rem] bg-foreground/[0.035] ring-1 ring-inset ring-foreground/[0.05]">
            {project.image ? (
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                />
            ) : (
                <div className="absolute inset-0 bg-muted" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/15 to-transparent" />
        </div>
    );

    return (
        <article className={`group relative ${spanClass}`}>
            <div className="h-full rounded-[1.75rem] border border-foreground/[0.07] bg-background/78 p-3 shadow-[0_18px_50px_-34px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-foreground/[0.14] hover:shadow-[0_24px_70px_-38px_rgba(0,0,0,0.55)]">
                {hasDetail ? (
                    <Link href={detailHref} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                        {imageBlock}
                    </Link>
                ) : (
                    imageBlock
                )}

                <div className="flex min-h-[220px] flex-col px-2 pb-3 pt-5">
                    <div className="mb-4 flex items-center justify-between gap-4">
                        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                            {project.category} / {project.year}
                        </span>
                        {hasDetail && (
                            <Link
                                href={detailHref}
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-foreground/[0.08] text-muted-foreground transition-colors hover:text-foreground"
                                aria-label={`Open ${project.title}`}
                            >
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        )}
                    </div>

                    <h3 className="ag-display max-w-[14ch] text-2xl font-medium leading-none tracking-[-0.04em] md:text-3xl">
                        {hasDetail ? (
                            <Link href={detailHref} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                                {project.title}
                            </Link>
                        ) : (
                            project.title
                        )}
                    </h3>

                    <p className="mt-4 line-clamp-3 text-sm leading-7 text-muted-foreground">
                        {project.oneLiner}
                    </p>

                    {(project.inspiration || project.backedBy) && (
                        <div className="mt-4 space-y-1">
                            {project.inspiration && <Credit label="Inspired by" item={project.inspiration} />}
                            {project.backedBy && <Credit label="Backed by" item={project.backedBy} />}
                        </div>
                    )}

                    <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                        <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full bg-foreground/[0.045] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground"
                            >
                                {tag}
                            </span>
                        ))}
                        </div>

                        {hasLinks && (
                            <div className="flex shrink-0 gap-2">
                                {project.links.paper && <IconLink href={project.links.paper} label="Paper" icon={FileText} />}
                                {project.links.code && <IconLink href={project.links.code} label="Code" icon={Github} />}
                                {project.links.demo && <IconLink href={project.links.demo} label="Demo" icon={ExternalLink} />}
                                {project.links.video && <IconLink href={project.links.video} label="Video" icon={Play} />}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}

function Credit({
    label,
    item,
}: {
    label: string;
    item: { name: string; url: string };
}) {
    return (
        <p className="text-[11px] text-muted-foreground/65">
            {label}{" "}
            <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 transition-colors hover:text-foreground"
            >
                {item.name}
            </a>
        </p>
    );
}

function IconLink({
    href,
    label,
    icon: Icon,
}: {
    href: string;
    label: string;
    icon: ComponentType<{ className?: string }>;
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-foreground/[0.08] text-muted-foreground transition-colors hover:text-foreground"
            aria-label={label}
        >
            <Icon className="h-3.5 w-3.5" />
        </a>
    );
}
