// src/data/projects.ts
// Centralized project data - edit here to update all project displays

export interface Project {
    slug: string;
    title: string;
    oneLiner: string;
    year: string;
    category: "Research" | "Build" | "Writing";
    tags: string[];
    image?: string;
    links: {
        paper?: string;
        code?: string;
        demo?: string;
        video?: string;
    };
    inspiration?: {
        name: string;
        url: string;
    };
    backedBy?: {
        name: string;
        url: string;
    };
    hasDetail?: boolean;
}

export const projects: Project[] = [
    {
        slug: "notev",
        title: "NoteV",
        oneLiner: "A multimodal knowledge AI agent for Meta Ray-Ban smart glasses that sees and hears your lectures",
        year: "2026",
        category: "Build",
        tags: ["Smart Glasses", "AI", "EdTech", "Wearable"],
        image: "/images/projects/notev.webp",
        links: {},
        inspiration: {
            name: "VisionClaw",
            url: "https://github.com/sseanliu/VisionClaw",
        },
        backedBy: {
            name: "UTD Draper Pitch Competition",
            url: "https://innovation.utdallas.edu/draper-pitch-competition/",
        },
        hasDetail: true,
    },
    {
        slug: "refbib",
        title: "RefBib",
        oneLiner: "Extract real BibTeX from academic PDF references — no AI hallucinations, just real citations from CrossRef, Semantic Scholar, and DBLP",
        year: "2026",
        category: "Build",
        tags: ["Academic Tools", "Python", "Next.js"],
        image: "/images/projects/refbib.webp",
        links: {
            code: "https://github.com/DearBobby9/RefBib",
            demo: "https://ref-bib.vercel.app/",
        },
        hasDetail: true,
    },
    {
        slug: "ar-embedded-visualization",
        title: "AR Embedded Visualization & AI Reliance",
        oneLiner: "Studying how AR embedded visualizations affect human reliance on AI in spatial decision-making",
        year: "2026",
        category: "Research",
        tags: ["AR", "Visualization", "Human-AI"],
        image: "/images/projects/ar-embedded-vis.webp",
        links: {
            paper: "https://arxiv.org/abs/2507.14316",
        },
        hasDetail: true,
    },
    {
        slug: "reality-proxy",
        title: "Reality Proxy",
        oneLiner: "Decoupling MR interaction from physical constraints via AI-powered abstract proxy representations",
        year: "2025",
        category: "Research",
        tags: ["Mixed Reality", "Interaction", "AI"],
        image: "/images/projects/reality-proxy.webp",
        links: {
            paper: "https://doi.org/10.1145/3746059.3747709",
        },
        hasDetail: true,
    },
];

// Helper: Get featured projects (all projects shown on homepage)
export const featuredProjects = projects;

// Helper: Get all unique categories
export const projectCategories = ["All", "Research", "Build", "Writing"] as const;
