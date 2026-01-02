"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Github, ExternalLink, Play, LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";

// Placeholder data - will be replaced with MDX content
const projects = [
    {
        slug: "xr-fabrication-toolkit",
        title: "XR Fabrication Toolkit",
        oneLiner: "Bridging virtual design with physical fabrication through spatial interfaces",
        year: "2025",
        category: "Research",
        tags: ["XR", "Fabrication", "HCI"],
        links: { paper: "#", code: "https://github.com/DearBobby9", demo: "#" },
    },
    {
        slug: "spatial-computing-interface",
        title: "Spatial Computing Interface",
        oneLiner: "Novel interaction paradigms for 3D content creation in mixed reality",
        year: "2024",
        category: "Research",
        tags: ["Spatial", "CAD", "XR"],
        links: { paper: "#", video: "#" },
    },
    {
        slug: "collaborative-ar-system",
        title: "Collaborative AR System",
        oneLiner: "Real-time multi-user collaboration in augmented reality environments",
        year: "2024",
        category: "Research",
        tags: ["AR", "Collaboration", "HCI"],
        links: { paper: "#", code: "#" },
    },
    {
        slug: "personal-website",
        title: "Personal Website",
        oneLiner: "A minimalist academic portfolio with interactive background effects",
        year: "2025",
        category: "Build",
        tags: ["Next.js", "React", "Design"],
        links: { code: "https://github.com/DearBobby9/DearBobby9.github.io" },
    },
];

const categories = ["All", "Research", "Build", "Writing"];

export default function ProjectsPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [viewMode, setViewMode] = useState<"list" | "grid">("list");

    const filteredProjects =
        activeCategory === "All"
            ? projects
            : projects.filter((p) => p.category === activeCategory);

    return (
        <section className="section pt-24 md:pt-32">
            <div className="container-custom">
                {/* Page header */}
                <h1 className="mb-4">Projects</h1>
                <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
                    A collection of research projects, tools, and experiments in XR, HCI, and spatial computing.
                </p>

                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    {/* Category filters */}
                    <div className="flex gap-2">
                        {categories.map((cat) => (
                            <Button
                                key={cat}
                                variant={activeCategory === cat ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setActiveCategory(cat)}
                                className="text-xs"
                            >
                                {cat}
                            </Button>
                        ))}
                    </div>

                    {/* View toggle */}
                    <div className="flex gap-1">
                        <Button
                            variant={viewMode === "list" ? "default" : "ghost"}
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setViewMode("list")}
                        >
                            <List className="h-4 w-4" />
                        </Button>
                        <Button
                            variant={viewMode === "grid" ? "default" : "ghost"}
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setViewMode("grid")}
                        >
                            <LayoutGrid className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Projects display */}
                {viewMode === "list" ? (
                    <div className="space-y-2">
                        {filteredProjects.map((project) => (
                            <ProjectListItem key={project.slug} project={project} />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project) => (
                            <ProjectGridItem key={project.slug} project={project} />
                        ))}
                    </div>
                )}
            </div>
        </section>

    );
}

interface Project {
    slug: string;
    title: string;
    oneLiner: string;
    year: string;
    category: string;
    tags: string[];
    links: {
        paper?: string;
        code?: string;
        demo?: string;
        video?: string;
    };
}

function ProjectListItem({ project }: { project: Project }) {
    return (
        <Link
            href={`/projects/${project.slug}`}
            className="group flex flex-col md:flex-row md:items-center gap-2 md:gap-6 py-4 px-4 -mx-4 rounded-sm hover:bg-muted/50 transition-colors"
        >
            {/* Year */}
            <span className="font-mono text-xs text-muted-foreground w-12 shrink-0">
                {project.year}
            </span>

            {/* Title */}
            <h3 className="text-base md:text-lg font-medium flex-1 group-hover:text-muted-foreground transition-colors">
                {project.title}
            </h3>

            {/* One-liner (hidden on mobile) */}
            <p className="hidden lg:block text-sm text-muted-foreground flex-1 truncate">
                {project.oneLiner}
            </p>

            {/* Tags */}
            <div className="flex gap-1.5 shrink-0">
                {project.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="font-mono text-[10px]">
                        {tag}
                    </Badge>
                ))}
            </div>

            {/* Links */}
            <div className="flex gap-2 shrink-0 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                {project.links.paper && <FileText className="h-4 w-4 text-muted-foreground" />}
                {project.links.code && <Github className="h-4 w-4 text-muted-foreground" />}
                {project.links.demo && <ExternalLink className="h-4 w-4 text-muted-foreground" />}
                {project.links.video && <Play className="h-4 w-4 text-muted-foreground" />}
            </div>
        </Link>
    );
}

function ProjectGridItem({ project }: { project: Project }) {
    return (
        <Link href={`/projects/${project.slug}`}>
            <Card className="group h-full border-border/50 hover:bg-accent hover:border-border transition-all duration-300">
                {/* Image placeholder */}
                <div className="aspect-video bg-muted relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                        <span className="font-mono text-xs">[ Image ]</span>
                    </div>
                </div>

                <CardContent className="p-5">
                    <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
                    <h3 className="text-lg font-semibold mt-2 mb-2">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.oneLiner}</p>

                    <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="font-mono text-[10px]">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
