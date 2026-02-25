"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { posts, allPostTags } from "@/data/posts";

function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export default function BlogPage() {
    const [activeTag, setActiveTag] = useState<string | null>(null);

    const filteredPosts = activeTag
        ? posts.filter((p) => p.tags.includes(activeTag))
        : posts;

    return (
        <section className="section pt-24 md:pt-32">
            <div className="container-custom">
                {/* Page header */}
                <h1 className="mb-4">Blog</h1>
                <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
                    Thoughts on XR, HCI, research, and technology.
                </p>

                {/* Tag filters */}
                <div className="flex flex-wrap gap-2 mb-12">
                    <Badge
                        variant={activeTag === null ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setActiveTag(null)}
                    >
                        All
                    </Badge>
                    {allPostTags.map((tag) => (
                        <Badge
                            key={tag}
                            variant={activeTag === tag ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => setActiveTag(tag)}
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>

                {/* Posts list */}
                <div className="max-w-3xl space-y-1">
                    {filteredPosts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group block py-5 px-4 -mx-4 rounded-sm hover:bg-muted/50 transition-colors"
                        >
                            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6">
                                {/* Date */}
                                <span className="font-mono text-xs text-muted-foreground shrink-0 w-28">
                                    {formatDate(post.date)}
                                </span>

                                {/* Title and summary */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-base md:text-lg font-medium group-hover:text-muted-foreground transition-colors mb-1">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground line-clamp-1 hidden md:block">
                                        {post.summary}
                                    </p>
                                </div>

                                {/* Reading time */}
                                <span className="font-mono text-xs text-muted-foreground shrink-0">
                                    {post.readingTime}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {filteredPosts.length === 0 && (
                    <p className="text-muted-foreground text-center py-12">
                        No posts found with the selected tag.
                    </p>
                )}
            </div>
        </section>
    );
}
