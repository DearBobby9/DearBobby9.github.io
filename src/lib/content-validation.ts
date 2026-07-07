import fs from "fs";
import path from "path";
import { posts } from "@/data/posts";
import { projects } from "@/data/projects";
import { publications } from "@/data/publications";

const contentDir = path.join(process.cwd(), "src/content");

let hasValidated = false;

type ContentGroup = {
    label: string;
    directory: string;
    expected: string[];
};

function readMdxNames(directory: string) {
    const dirPath = path.join(contentDir, directory);

    if (!fs.existsSync(dirPath)) {
        return new Set<string>();
    }

    return new Set(
        fs
            .readdirSync(dirPath, { withFileTypes: true })
            .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
            .map((entry) => path.basename(entry.name, ".mdx"))
    );
}

function compareGroup({ label, directory, expected }: ContentGroup) {
    const expectedSet = new Set(expected);
    const actualSet = readMdxNames(directory);
    const missing = [...expectedSet].filter((name) => !actualSet.has(name)).sort();
    const extra = [...actualSet].filter((name) => !expectedSet.has(name)).sort();

    return { label, missing, extra };
}

export function assertContentDataInSync() {
    if (hasValidated) return;

    const groups: ContentGroup[] = [
        {
            label: "blog posts",
            directory: "blog",
            expected: posts.map((post) => post.slug),
        },
        {
            label: "projects",
            directory: "projects",
            expected: projects
                .filter((project) => project.hasDetail !== false)
                .map((project) => project.slug),
        },
        {
            label: "publications",
            directory: "publications",
            expected: publications.map((publication) => publication.id),
        },
    ];

    const errors = groups.flatMap((group) => {
        const { label, missing, extra } = compareGroup(group);
        const lines: string[] = [];

        if (missing.length > 0) {
            lines.push(`${label} missing MDX files: ${missing.join(", ")}`);
        }

        if (extra.length > 0) {
            lines.push(`${label} with no data entry: ${extra.join(", ")}`);
        }

        return lines;
    });

    if (errors.length > 0) {
        throw new Error(`Content data is out of sync with MDX files:\n${errors.join("\n")}`);
    }

    hasValidated = true;
}
