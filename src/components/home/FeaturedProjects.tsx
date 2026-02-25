import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, FileText, Play } from "lucide-react";
import { featuredProjects, type Project } from "@/data/projects";

export function FeaturedProjects() {
    return (
        <section id="projects" className="section scroll-mt-20">
            <div className="container-custom glass-panel">
                {/* Section header */}
                <div className="mb-12">
                    <h2>Projects</h2>
                </div>

                {/* Projects grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredProjects.map((project) => (
                        <ProjectCard key={project.slug} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProjectCard({ project }: { project: Project }) {
    const hasLinks = project.links.paper || project.links.code || project.links.demo || project.links.video;

    return (
        <Card className="group h-full gap-0 py-0 overflow-hidden border-border/50 bg-card hover:bg-accent hover:border-border transition-all duration-300">
            {/* Project image */}
            <div className="aspect-video bg-muted relative overflow-hidden">
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

            <CardContent className="p-4 flex flex-col flex-1">
                {/* Top: Content area */}
                <div className="flex-1">
                    {/* Year */}
                    <span className="font-mono text-xs text-muted-foreground">
                        {project.year}
                    </span>

                    {/* Title */}
                    <h3 className="text-lg font-semibold mt-1 mb-1.5 group-hover:text-accent-foreground transition-colors">
                        {project.title}
                    </h3>

                    {/* One-liner */}
                    <p className="text-sm text-muted-foreground line-clamp-3">
                        {project.oneLiner}
                    </p>

                    {/* Credits: Inspiration + Backed by */}
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

                {/* Bottom: Tags + Links on same row, pushed to bottom */}
                <div className="mt-auto pt-3 border-t border-border/40 flex items-center justify-between">
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
