// src/data/publications.ts
// Centralized publication data - edit here to update all publication displays

export interface Publication {
    id: string;
    title: string;
    authors: string[];
    venue: string;
    year: string;
    note?: string;
    links: {
        pdf?: string;
        doi?: string;
    };
    bibtex: string;
}

export const publications: Publication[] = [
    {
        id: "pub-1",
        title: "Spatial Fabrication: A Novel Approach to XR-Assisted Manufacturing",
        authors: ["Difan Jia", "Author B", "Author C"],
        venue: "CHI 2026",
        year: "2026",
        note: "Under review",
        links: { pdf: "#", doi: "#" },
        bibtex: `@inproceedings{jia2026spatial,
  title={Spatial Fabrication},
  author={Jia, Difan},
  booktitle={CHI},
  year={2026}
}`,
    },
    {
        id: "pub-2",
        title: "Interactive 3D Modeling in Mixed Reality Environments",
        authors: ["Author A", "Difan Jia", "Author C"],
        venue: "UIST 2025",
        year: "2025",
        links: { pdf: "#", doi: "#" },
        bibtex: `@inproceedings{author2025interactive,
  title={Interactive 3D Modeling},
  author={Author, A and Jia, Difan},
  booktitle={UIST},
  year={2025}
}`,
    },
    {
        id: "pub-3",
        title: "Understanding User Behavior in Collaborative AR Systems",
        authors: ["Difan Jia", "Author B"],
        venue: "CHI 2025",
        year: "2025",
        links: { pdf: "#", doi: "#" },
        bibtex: `@inproceedings{jia2025understanding,
  title={Understanding User Behavior},
  author={Jia, Difan},
  booktitle={CHI},
  year={2025}
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
