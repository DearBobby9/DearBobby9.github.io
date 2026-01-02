import Link from "next/link";

// Placeholder data - will be replaced with actual blog posts
const latestPosts = [
    {
        slug: "future-of-hci",
        title: "Thoughts on the Future of Human-Computer Interaction",
        date: "2025-12-15",
        readingTime: "6 min",
        summary: "Exploring emerging trends in HCI and what they mean for designers and researchers.",
    },
    {
        slug: "xr-fabrication-workflow",
        title: "My XR Fabrication Workflow: From Concept to Physical Object",
        date: "2025-11-28",
        readingTime: "8 min",
        summary: "A deep dive into my process for designing and fabricating objects using XR tools.",
    },
    {
        slug: "academic-journey",
        title: "Reflections on My Academic Journey",
        date: "2025-10-10",
        readingTime: "5 min",
        summary: "Personal insights and lessons learned from research and academia.",
    },
];

function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export function LatestWriting() {
    return (
        <section className="section">
            <div className="container-custom">
                {/* Section header */}
                <div className="flex items-center justify-between mb-12">
                    <h2>Latest Writing</h2>
                    <Link
                        href="/blog"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        View blog →
                    </Link>
                </div>

                {/* Posts list */}
                <div className="max-w-3xl space-y-1">
                    {latestPosts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group block py-4 -mx-4 px-4 rounded-sm hover:bg-muted/50 transition-colors"
                        >
                            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6">
                                {/* Date */}
                                <span className="font-mono text-xs text-muted-foreground shrink-0 w-28">
                                    {formatDate(post.date)}
                                </span>

                                {/* Title */}
                                <h3 className="text-base md:text-lg font-medium group-hover:text-muted-foreground transition-colors flex-1">
                                    {post.title}
                                </h3>

                                {/* Reading time */}
                                <span className="font-mono text-xs text-muted-foreground shrink-0">
                                    {post.readingTime}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
