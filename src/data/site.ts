// src/data/site.ts
// Centralized site metadata - edit here to update personal info everywhere

export const siteConfig = {
    name: "Difan Jia",
    nickname: "Bobby",
    title: "Researcher & Designer",
    greeting: 'Hi, I\'m Difan "Bobby" Jia',
    pronounciation: "(Dee-Fae Bobby Jae)",

    // Bio for About page and meta descriptions
    bio: `I explore the intersection of Mixed Reality, Digital Fabrication, and Spatial Computing. Currently building tools that bridge the gap between virtual design and physical making.`,

    // Email
    email: "difan.jia@utdallas.edu",

    // Social links - update these to change all social icons across the site
    socials: {
        github: "https://github.com/DearBobby9",
        x: "https://x.com/KeithMaxwell99",
        scholar: "https://scholar.google.com/citations?user=M3bt3kAAAAAJ&hl=en",
        linkedin: "", // Add if needed
    },

    // CV/Resume link
    cvUrl: "/about", // Update with actual CV file path when available

    // SEO
    siteUrl: "https://dearbobby9.github.io",
    siteDescription: "Personal portfolio of Difan Jia - Researcher & Designer specializing in XR, Fabrication, and Spatial Computing.",
};

export type SiteConfig = typeof siteConfig;
