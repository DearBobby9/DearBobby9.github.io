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

export const posts: Post[] = [];

// Helper: Get all unique tags
export const allPostTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

// Helper: Get recent posts (first 3 for homepage)
export const recentPosts = posts.slice(0, 3);
