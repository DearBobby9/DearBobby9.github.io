"use client";

import Link from "next/link";
import Image from "next/image";
import { FileText, ExternalLink } from "lucide-react";
import { selectedPublications, type Publication } from "@/data/publications";
import { BibtexCopyButton } from "@/components/publications/BibtexCopyButton";

export function SelectedPublications() {
    return (
        <section id="publications" className="section scroll-mt-20 bg-background">
            <div className="container-custom">
                <div className="mb-14 grid gap-6 border-t border-foreground/[0.07] pt-12 md:grid-cols-[0.9fr_1.1fr] md:items-end">
                    <div>
                        <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Selected work</span>
                        <h2 className="ag-display max-w-3xl text-5xl font-medium leading-[0.95] tracking-[-0.055em] md:text-7xl">
                            Evidence, prototypes, and studies.
                        </h2>
                    </div>
                    <div className="md:justify-self-end">
                        <p className="max-w-[42ch] text-sm leading-7 text-muted-foreground md:text-base">
                            Peer-reviewed research in AR, spatial computing, and human-computer interaction.
                        </p>
                    </div>
                </div>

                <div className="divide-y divide-foreground/[0.07] border-y border-foreground/[0.07]">
                    {selectedPublications.map((pub) => (
                        <PublicationItem key={pub.id} publication={pub} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function PublicationItem({ publication }: { publication: Publication }) {
    return (
        <div className="group py-7 transition-colors">
            <div className="grid gap-6 md:grid-cols-[280px_1fr] md:items-start">
                {publication.image && (
                    <div className="w-full">
                        <Link href={`/publications/${publication.id}`} className="relative block aspect-video overflow-hidden rounded-2xl bg-foreground/[0.03] ring-1 ring-inset ring-foreground/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                            <Image
                                src={publication.image}
                                alt={publication.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                            />
                        </Link>
                    </div>
                )}

                <div className="flex-1 min-w-0">
                    <div className="mb-3 flex items-center gap-2">
                        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                            {publication.venue}
                        </span>
                        {publication.note && (
                            <span className="rounded-full bg-muted px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                                {publication.note}
                            </span>
                        )}
                    </div>

                    <h3 className="ag-display mb-3 max-w-3xl text-xl font-medium leading-snug tracking-[-0.025em] md:text-2xl">
                        <Link href={`/publications/${publication.id}`} className="hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                            {publication.title}
                        </Link>
                    </h3>

                    <p className="mb-5 text-sm leading-7 text-muted-foreground">
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
