"use client";

import Link from "next/link";
import { FileText, ExternalLink, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

// Placeholder data - will be replaced with actual publication data
const publications = [
    {
        id: "pub-1",
        title: "Spatial Fabrication: A Novel Approach to XR-Assisted Manufacturing",
        authors: ["Difan Jia", "Author B", "Author C"],
        venue: "CHI 2026",
        year: "2026",
        note: "Under review",
        links: {
            pdf: "#",
            doi: "#",
        },
        bibtex: `@inproceedings{jia2026spatial,
  title={Spatial Fabrication: A Novel Approach to XR-Assisted Manufacturing},
  author={Jia, Difan and others},
  booktitle={CHI},
  year={2026}
}`,
    },
    {
        id: "pub-2",
        title: "Interactive 3D Modeling in Mixed Reality Environments",
        authors: ["Author A", "Difan Jia", "Author C"],
        venue: "UIST 2025",
        year: "2025",
        links: {
            pdf: "#",
            doi: "#",
        },
        bibtex: `@inproceedings{author2025interactive,
  title={Interactive 3D Modeling in Mixed Reality Environments},
  author={Author, A and Jia, Difan and others},
  booktitle={UIST},
  year={2025}
}`,
    },
    {
        id: "pub-3",
        title: "Understanding User Behavior in Collaborative AR Systems",
        authors: ["Difan Jia", "Author B"],
        venue: "CHI 2025",
        year: "2025",
        links: {
            pdf: "#",
            doi: "#",
        },
        bibtex: `@inproceedings{jia2025understanding,
  title={Understanding User Behavior in Collaborative AR Systems},
  author={Jia, Difan and others},
  booktitle={CHI},
  year={2025}
}`,
    },
];

export function SelectedPublications() {
    return (
        <section className="section bg-muted/30">
            <div className="container-custom">
                {/* Section header */}
                <div className="flex items-center justify-between mb-12">
                    <h2>Selected Publications</h2>
                    <Link
                        href="/publications"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        View all publications →
                    </Link>
                </div>

                {/* Publications list */}
                <div className="max-w-4xl space-y-6">
                    {publications.map((pub) => (
                        <PublicationItem key={pub.id} publication={pub} />
                    ))}
                </div>
            </div>
        </section>
    );
}

interface Publication {
    id: string;
    title: string;
    authors: string[];
    venue: string;
    year: string;
    note?: string;
    links: {
        pdf?: string;
        doi?: string;
    };
    bibtex: string;
}

function PublicationItem({ publication }: { publication: Publication }) {
    const handleCopyBibtex = () => {
        navigator.clipboard.writeText(publication.bibtex);
    };

    return (
        <div className="group p-4 -mx-4 rounded-sm hover:bg-background transition-colors">
            <div className="flex flex-col md:flex-row md:items-start gap-4">
                {/* Year */}
                <span className="font-mono text-xs text-muted-foreground w-12 shrink-0 pt-1">
                    {publication.year}
                </span>

                {/* Content */}
                <div className="flex-1">
                    {/* Title */}
                    <h3 className="text-base md:text-lg font-medium mb-2 leading-snug">
                        {publication.title}
                    </h3>

                    {/* Authors */}
                    <p className="text-sm text-muted-foreground mb-2">
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

                    {/* Venue and note */}
                    <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">{publication.venue}</span>
                        {publication.note && (
                            <span className="text-muted-foreground text-xs font-mono px-2 py-0.5 bg-muted rounded">
                                {publication.note}
                            </span>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 shrink-0 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                    {publication.links.pdf && (
                        <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="h-8 px-2 text-xs"
                        >
                            <Link href={publication.links.pdf}>
                                <FileText className="h-3.5 w-3.5 mr-1" />
                                PDF
                            </Link>
                        </Button>
                    )}
                    {publication.links.doi && (
                        <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="h-8 px-2 text-xs"
                        >
                            <Link href={publication.links.doi} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-3.5 w-3.5 mr-1" />
                                DOI
                            </Link>
                        </Button>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopyBibtex}
                        className="h-8 px-2 text-xs"
                    >
                        <Copy className="h-3.5 w-3.5 mr-1" />
                        BibTeX
                    </Button>
                </div>
            </div>
        </div>
    );
}
