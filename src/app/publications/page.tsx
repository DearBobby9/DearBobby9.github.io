"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink, Copy, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { getPublicationsByYear, type Publication } from "@/data/publications";

const publicationsByYear = getPublicationsByYear();

export default function PublicationsPage() {
    const [expandedYears, setExpandedYears] = useState<Set<string>>(
        new Set(["2026", "2025"])
    );

    const toggleYear = (year: string) => {
        setExpandedYears((prev) => {
            const next = new Set(prev);
            if (next.has(year)) {
                next.delete(year);
            } else {
                next.add(year);
            }
            return next;
        });
    };

    const years = Object.keys(publicationsByYear).sort((a, b) => parseInt(b) - parseInt(a));

    return (
        <section className="section pt-24 md:pt-32">
            <div className="container-custom">
                {/* Page header */}
                <h1 className="mb-4">Publications</h1>
                <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
                    Research papers in XR, HCI, CAD, and spatial computing.
                </p>

                {/* Google Scholar link */}
                <div className="mb-12">
                    <Button variant="outline" asChild>
                        <Link
                            href="https://scholar.google.com/citations?user=M3bt3kAAAAAJ&hl=en"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Google Scholar Profile
                        </Link>
                    </Button>
                </div>

                {/* Publications by year */}
                <div className="space-y-8">
                    {years.map((year) => (
                        <div key={year}>
                            {/* Year header */}
                            <button
                                onClick={() => toggleYear(year)}
                                className="flex items-center gap-4 w-full text-left mb-4 group"
                            >
                                <h2 className="text-2xl font-semibold">{year}</h2>
                                <div className="flex-1 h-px bg-border" />
                                <ChevronDown
                                    className={cn(
                                        "h-5 w-5 text-muted-foreground transition-transform",
                                        expandedYears.has(year) && "rotate-180"
                                    )}
                                />
                            </button>

                            {/* Publications list */}
                            {expandedYears.has(year) && (
                                <div className="space-y-4 pl-4 border-l-2 border-border">
                                    {publicationsByYear[year].map((pub) => (
                                        <PublicationItem key={pub.id} publication={pub} />
                                    ))}
                                </div>
                            )}
                        </div>
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
        <div className="group py-4">
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
            <div className="flex items-center gap-2 text-sm mb-4">
                <span className="font-medium">{publication.venue}</span>
                {publication.note && (
                    <span className="text-muted-foreground text-xs font-mono px-2 py-0.5 bg-muted rounded">
                        {publication.note}
                    </span>
                )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
                {publication.links.pdf && (
                    <Button variant="ghost" size="sm" asChild className="h-8 px-3 text-xs">
                        <Link href={publication.links.pdf}>
                            <FileText className="h-3.5 w-3.5 mr-1.5" />
                            PDF
                        </Link>
                    </Button>
                )}
                {publication.links.doi && (
                    <Button variant="ghost" size="sm" asChild className="h-8 px-3 text-xs">
                        <Link href={publication.links.doi} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                            DOI
                        </Link>
                    </Button>
                )}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyBibtex}
                    className="h-8 px-3 text-xs"
                >
                    <Copy className="h-3.5 w-3.5 mr-1.5" />
                    {copied ? "Copied!" : "BibTeX"}
                </Button>
            </div>
        </div>
    );
}
