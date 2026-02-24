"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FileText, ExternalLink, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { selectedPublications, type Publication } from "@/data/publications";

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
                <div className="space-y-8">
                    {selectedPublications.map((pub) => (
                        <PublicationItem key={pub.id} publication={pub} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function PublicationItem({ publication }: { publication: Publication }) {
    const [copied, setCopied] = useState(false);

    const handleCopyBibtex = () => {
        navigator.clipboard.writeText(publication.bibtex);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="group p-4 -mx-4 rounded-sm hover:bg-background transition-colors">
            <div className="flex flex-col md:flex-row gap-5">
                {/* Teaser image */}
                {publication.image && (
                    <div className="w-full md:w-[280px] shrink-0">
                        <div className="aspect-video bg-muted relative overflow-hidden rounded-sm">
                            <Image
                                src={publication.image}
                                alt={publication.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {/* Venue + note */}
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

                    {/* Title */}
                    <h3 className="text-base md:text-lg font-medium mb-2 leading-snug">
                        {publication.title}
                    </h3>

                    {/* Authors */}
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

                    {/* Actions */}
                    <div className="flex gap-2">
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
                            {copied ? "Copied!" : "BibTeX"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
