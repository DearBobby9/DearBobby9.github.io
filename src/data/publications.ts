// src/data/publications.ts
// Centralized publication data - edit here to update all publication displays

export interface Publication {
    id: string;
    title: string;
    authors: string[];
    venue: string;
    year: string;
    note?: string;
    image?: string;
    links: {
        pdf?: string;
        doi?: string;
    };
    bibtex: string;
}

export const publications: Publication[] = [
    {
        id: "pub-1",
        title: "Can AR Embedded Visualizations Foster Appropriate Reliance on AI in Spatial Decision-Making? A Comparative Study of AR X-Ray vs. 2D Minimap",
        authors: ["Xianhao Carton Liu", "Difan Jia", "Tongyu Nie", "Evan Suma Rosenberg", "Victoria Interrante", "Chen Zhu-Tian"],
        venue: "CHI 2026",
        year: "2026",
        note: "Accepted",
        image: "/images/projects/ar-embedded-vis.webp",
        links: {
            pdf: "https://arxiv.org/pdf/2507.14316",
            doi: "https://doi.org/10.1145/3772318.3790710",
        },
        bibtex: `@inproceedings{liu2026ar,
  title={Can AR Embedded Visualizations Foster Appropriate Reliance on AI in Spatial Decision-Making? A Comparative Study of AR X-Ray vs. 2D Minimap},
  author={Liu, Xianhao Carton and Jia, Difan and Nie, Tongyu and Suma Rosenberg, Evan and Interrante, Victoria and Zhu-Tian, Chen},
  booktitle={Proceedings of the 2026 CHI Conference on Human Factors in Computing Systems (CHI '26)},
  year={2026}
}`,
    },
    {
        id: "pub-2",
        title: "Reality Proxy: Fluid Interactions with Real-World Objects in MR via Abstract Representations",
        authors: ["Xiaoan Liu", "Difan Jia", "Xianhao Carton Liu", "Mar Gonzalez-Franco", "Chen Zhu-Tian"],
        venue: "UIST 2025",
        year: "2025",
        note: "Accepted",
        image: "/images/projects/reality-proxy.webp",
        links: {
            pdf: "https://arxiv.org/pdf/2507.17248",
            doi: "https://doi.org/10.1145/3746059.3747709",
        },
        bibtex: `@inproceedings{liu2025reality,
  title={Reality Proxy: Fluid Interactions with Real-World Objects in MR via Abstract Representations},
  author={Liu, Xiaoan and Jia, Difan and Liu, Xianhao Carton and Gonzalez-Franco, Mar and Zhu-Tian, Chen},
  booktitle={Proceedings of the 38th Annual ACM Symposium on User Interface Software and Technology (UIST '25)},
  year={2025},
  doi={10.1145/3746059.3747709}
}`,
    },
];

// Helper: Group publications by year
export function getPublicationsByYear(): Record<string, Publication[]> {
    return publications.reduce((acc, pub) => {
        if (!acc[pub.year]) {
            acc[pub.year] = [];
        }
        acc[pub.year].push(pub);
        return acc;
    }, {} as Record<string, Publication[]>);
}

// Helper: Get selected publications (first 3 for homepage)
export const selectedPublications = publications.slice(0, 3);
