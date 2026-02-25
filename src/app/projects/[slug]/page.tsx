import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, FileText, Github, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/projects";
import { getProjectMDX } from "@/lib/mdx";

type ProjectDetailPageProps = {
    params: Promise<{ slug: string }>;
};

function findProject(slug: string) {
    return projects.find((project) => project.slug === slug);
}

export const dynamicParams = false;

export function generateStaticParams() {
    return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = findProject(slug);

    if (!project) {
        return { title: "Project" };
    }

    return {
        title: project.title,
        description: project.oneLiner,
    };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
    const { slug } = await params;
    const project = findProject(slug);

    if (!project) {
        notFound();
    }

    const mdxContent = await getProjectMDX(project.slug);

    return (
        <section className="section pt-24 md:pt-32">
            <div className="container-custom max-w-4xl">
                <Link
                    href="/#projects"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Projects
                </Link>

                <article className="glass-panel mt-6">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        <Badge variant="secondary" className="font-mono text-[10px] uppercase tracking-wide">
                            {project.category}
                        </Badge>
                        <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight mb-4">{project.title}</h1>
                    <p className="text-base md:text-lg text-muted-foreground mb-6">{project.oneLiner}</p>

                    {(project.inspiration || project.backedBy) && (
                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.inspiration && (
                                <a
                                    href={project.inspiration.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Inspired by {project.inspiration.name}
                                </a>
                            )}
                            {project.backedBy && (
                                <a
                                    href={project.backedBy.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Backed by {project.backedBy.name}
                                </a>
                            )}
                        </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="font-mono text-[10px] uppercase tracking-wide">
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mb-8">
                        {project.links.paper && (
                            <a
                                href={project.links.paper}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-md border border-border/60 px-3 py-1.5 text-xs hover:bg-accent transition-colors"
                            >
                                <FileText className="h-3.5 w-3.5" />
                                Paper
                            </a>
                        )}
                        {project.links.code && (
                            <a
                                href={project.links.code}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-md border border-border/60 px-3 py-1.5 text-xs hover:bg-accent transition-colors"
                            >
                                <Github className="h-3.5 w-3.5" />
                                Code
                            </a>
                        )}
                        {project.links.demo && (
                            <a
                                href={project.links.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-md border border-border/60 px-3 py-1.5 text-xs hover:bg-accent transition-colors"
                            >
                                <ExternalLink className="h-3.5 w-3.5" />
                                Demo
                            </a>
                        )}
                        {project.links.video && (
                            <a
                                href={project.links.video}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-md border border-border/60 px-3 py-1.5 text-xs hover:bg-accent transition-colors"
                            >
                                <Play className="h-3.5 w-3.5" />
                                Video
                            </a>
                        )}
                    </div>

                    {project.image && (
                        <div className="relative w-full aspect-video overflow-hidden rounded-lg border border-border/50 mb-10">
                            <Image src={project.image} alt={project.title} fill className="object-cover" priority />
                        </div>
                    )}

                    <div className="pt-8 border-t border-border/50">
                        {mdxContent ? (
                            <div className="mdx-content">{mdxContent}</div>
                        ) : (
                            <div className="rounded-lg border border-dashed border-border/60 bg-muted/20 px-6 py-10 text-center">
                                <p className="text-base md:text-lg font-medium text-foreground">Detail page coming soon.</p>
                            </div>
                        )}
                    </div>
                </article>
            </div>
        </section>
    );
}
