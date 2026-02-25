import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BibtexCopyButton } from "@/components/publications/BibtexCopyButton";
import { publications } from "@/data/publications";
import { getPublicationMDX } from "@/lib/mdx";

type PublicationDetailPageProps = {
    params: Promise<{ id: string }>;
};

function findPublication(id: string) {
    return publications.find((publication) => publication.id === id);
}

export const dynamicParams = false;

export function generateStaticParams() {
    return publications.map((publication) => ({ id: publication.id }));
}

export async function generateMetadata({ params }: PublicationDetailPageProps): Promise<Metadata> {
    const { id } = await params;
    const publication = findPublication(id);

    if (!publication) {
        return { title: "Publication" };
    }

    return {
        title: publication.title,
        description: `${publication.venue} ${publication.year}`,
    };
}

export default async function PublicationDetailPage({ params }: PublicationDetailPageProps) {
    const { id } = await params;
    const publication = findPublication(id);

    if (!publication) {
        notFound();
    }

    const mdxContent = await getPublicationMDX(publication.id);

    return (
        <section className="section pt-24 md:pt-32">
            <div className="container-custom max-w-4xl">
                <Link
                    href="/#publications"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Publications
                </Link>

                <article className="glass-panel mt-6">
                    <p className="font-mono text-xs text-muted-foreground mb-3">
                        {publication.venue}
                        {publication.note ? ` · ${publication.note}` : ""}
                    </p>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight mb-4">{publication.title}</h1>

                    <p className="text-sm md:text-base text-muted-foreground mb-6">
                        {publication.authors.map((author, index) => (
                            <span key={author}>
                                {author === "Difan Jia" ? (
                                    <strong className="text-foreground font-semibold">{author}</strong>
                                ) : (
                                    author
                                )}
                                {index < publication.authors.length - 1 ? ", " : ""}
                            </span>
                        ))}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {publication.links.pdf && (
                            <Button variant="ghost" size="sm" asChild className="h-8 px-2 text-xs">
                                <Link href={publication.links.pdf} target="_blank" rel="noopener noreferrer">
                                    <FileText className="h-3.5 w-3.5 mr-1" />
                                    PDF
                                </Link>
                            </Button>
                        )}
                        {publication.links.doi && (
                            <Button variant="ghost" size="sm" asChild className="h-8 px-2 text-xs">
                                <Link href={publication.links.doi} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-3.5 w-3.5 mr-1" />
                                    DOI
                                </Link>
                            </Button>
                        )}
                        <BibtexCopyButton
                            bibtex={publication.bibtex}
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-xs"
                        />
                    </div>

                    {publication.image && (
                        <div className="relative w-full aspect-video overflow-hidden rounded-lg border border-border/50 mb-10">
                            <Image src={publication.image} alt={publication.title} fill className="object-cover" priority />
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
