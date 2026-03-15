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
        slug: "macbook-setup-2026",
        title: "My MacBook Setup for CS in 2026",
        date: "2026-03-15",
        readingTime: "5 min read",
        summary:
            "The 16 apps I install on every new Mac — from launcher to terminal to AI tools. An opinionated guide for CS students and developers.",
        tags: ["Setup", "Productivity", "Tools"],
    },
];

// Helper: Get all unique tags
export const allPostTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

// Helper: Get recent posts (first 3 for homepage)
export const recentPosts = posts.slice(0, 3);
