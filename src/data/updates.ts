// src/data/updates.ts
// Centralized "Now" updates - edit here to update the Now section on homepage

export interface Update {
    year: string;
    type: "Project" | "Paper" | "Blog" | "Award";
    title: string;
    href: string;
}

export const updates: Update[] = [
    {
        year: "2026",
        type: "Project",
        title: "OverSite — building an AI copilot for construction field workers with smart glasses + Gemini Live",
        href: "/#projects",
    },
    {
        year: "2026",
        type: "Project",
        title: "NoteV advanced to the next round of UTD Big Idea Pitch — excited to present this smart-glasses idea, stay tuned!",
        href: "/#projects",
    },
    {
        year: "2026",
        type: "Paper",
        title: "CHI '26 — AR Embedded Visualizations & AI Reliance in Spatial Decision-Making",
        href: "/#publications",
    },
    {
        year: "2025",
        type: "Paper",
        title: "UIST '25 — Reality Proxy: Fluid MR Interaction via Abstract Representations",
        href: "/#publications",
    },
];
