// src/data/posts.ts
// Centralized blog post data - edit here to update all blog displays

export interface Post {
    slug: string;
    title: string;
    date: string;
    readingTime: string;
    summary: string;
    tags: string[];
}

export const posts: Post[] = [
    {
        slug: "future-of-hci",
        title: "Thoughts on the Future of Human-Computer Interaction",
        date: "2025-12-15",
        readingTime: "6 min",
        summary: "Exploring emerging trends in HCI and what they mean for designers and researchers.",
        tags: ["HCI", "Research", "Future"],
    },
    {
        slug: "xr-fabrication-workflow",
        title: "My XR Fabrication Workflow: From Concept to Physical Object",
        date: "2025-11-28",
        readingTime: "8 min",
        summary: "A deep dive into my process for designing and fabricating objects using XR tools.",
        tags: ["XR", "Fabrication", "Tutorial"],
    },
    {
        slug: "academic-journey",
        title: "Reflections on My Academic Journey",
        date: "2025-10-10",
        readingTime: "5 min",
        summary: "Personal insights and lessons learned from research and academia.",
        tags: ["Personal", "Academia"],
    },
    {
        slug: "spatial-computing-primer",
        title: "A Primer on Spatial Computing",
        date: "2025-09-05",
        readingTime: "10 min",
        summary: "An introduction to spatial computing concepts for newcomers to the field.",
        tags: ["Spatial", "Tutorial", "XR"],
    },
];

// Helper: Get all unique tags
export const allPostTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

// Helper: Get recent posts (first 3 for homepage)
export const recentPosts = posts.slice(0, 3);
