import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, FileText, Play } from "lucide-react";
import { featuredProjects, type Project } from "@/data/projects";

export function FeaturedProjects() {
    return (
        <section className="section">
            <div className="container-custom">
                {/* Section header */}
                <div className="flex items-center justify-between mb-12">
                    <h2>Featured Projects</h2>
                    <Link
                        href="/projects"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        View all projects →
                    </Link>
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
    return (
        <Link href={`/projects/${project.slug}`}>
            <Card className="group h-full overflow-hidden border-border/50 bg-card hover:bg-accent hover:border-border transition-all duration-300">
                {/* Image placeholder */}
                <div className="aspect-video bg-muted relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                        {/* Placeholder - will show actual image when available */}
                        <span className="font-mono text-xs">[ Image ]</span>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors" />
                </div>

                <CardContent className="p-5">
                    {/* Year */}
                    <span className="font-mono text-xs text-muted-foreground">
                        {project.year}
                    </span>

                    {/* Title */}
                    <h3 className="text-lg font-semibold mt-2 mb-2 group-hover:text-accent-foreground transition-colors">
                        {project.title}
                    </h3>

                    {/* One-liner */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {project.oneLiner}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
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

                    {/* Links */}
                    <div className="flex gap-3">
                        {project.links.paper && (
                            <span className="text-muted-foreground hover:text-foreground transition-colors">
                                <FileText className="h-4 w-4" />
                            </span>
                        )}
                        {project.links.code && (
                            <span className="text-muted-foreground hover:text-foreground transition-colors">
                                <Github className="h-4 w-4" />
                            </span>
                        )}
                        {project.links.demo && (
                            <span className="text-muted-foreground hover:text-foreground transition-colors">
                                <ExternalLink className="h-4 w-4" />
                            </span>
                        )}
                        {project.links.video && (
                            <span className="text-muted-foreground hover:text-foreground transition-colors">
                                <Play className="h-4 w-4" />
                            </span>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
