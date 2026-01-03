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
}

export const projects: Project[] = [
    {
        slug: "xr-fabrication-toolkit",
        title: "XR Fabrication Toolkit",
        oneLiner: "Bridging virtual design with physical fabrication through spatial interfaces",
        year: "2025",
        category: "Research",
        tags: ["XR", "Fabrication", "HCI"],
        image: "/images/projects/project-a.png",
        links: { paper: "#", code: "https://github.com/DearBobby9", demo: "#" },
    },
    {
        slug: "spatial-computing-interface",
        title: "Spatial Computing Interface",
        oneLiner: "Novel interaction paradigms for 3D content creation in mixed reality",
        year: "2024",
        category: "Research",
        tags: ["Spatial", "CAD", "XR"],
        image: "/images/projects/project-b.png",
        links: { paper: "#", video: "#" },
    },
    {
        slug: "collaborative-ar-system",
        title: "Collaborative AR System",
        oneLiner: "Real-time multi-user collaboration in augmented reality environments",
        year: "2024",
        category: "Research",
        tags: ["AR", "Collaboration", "HCI"],
        image: "/images/projects/project-c.png",
        links: { paper: "#", code: "#" },
    },
    {
        slug: "personal-website",
        title: "Personal Website",
        oneLiner: "A minimalist academic portfolio with interactive background effects",
        year: "2025",
        category: "Build",
        tags: ["Next.js", "React", "Design"],
        links: { code: "https://github.com/DearBobby9/DearBobby9.github.io" },
    },
];

// Helper: Get featured projects (first 3)
export const featuredProjects = projects.slice(0, 3);

// Helper: Get all unique categories
export const projectCategories = ["All", "Research", "Build", "Writing"] as const;
