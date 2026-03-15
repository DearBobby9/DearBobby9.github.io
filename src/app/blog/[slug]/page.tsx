import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { posts } from "@/data/posts";
import { getBlogContent } from "@/lib/mdx";
import BlogTOC from "@/components/blog/BlogTOC";
import type { Metadata } from "next";

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
    params,
}: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = posts.find((p) => p.slug === slug);
    if (!post) return {};
    return {
        title: post.title,
        description: post.summary,
    };
}

function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = posts.find((p) => p.slug === slug);
    if (!post) notFound();

    const content = await getBlogContent(slug);

    return (
        <article className="section pt-24 md:pt-32">
            <BlogTOC />
            <div className="container-custom max-w-3xl">
                {/* Back link */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Blog
                </Link>

                <div className="glass-panel">
                {/* Header */}
                <header className="mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                        {post.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <time>{formatDate(post.date)}</time>
                        <span>·</span>
                        <span>{post.readingTime}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </header>

                {/* Content */}
                <div className="mdx-content">
                    {content}
                </div>
                </div>
            </div>
        </article>
    );
}
