import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";

const contentDir = path.join(process.cwd(), "src/content");

export async function getProjectMDX(slug: string) {
    return getMDXContent("projects", slug);
}

export async function getPublicationMDX(id: string) {
    return getMDXContent("publications", id);
}

async function getMDXContent(type: string, name: string) {
    const filePath = path.join(contentDir, type, `${name}.mdx`);

    if (!fs.existsSync(filePath)) {
        return null;
    }

    const source = fs.readFileSync(filePath, "utf-8");
    const { content } = await compileMDX({ source, options: { parseFrontmatter: false } });
    return content;
}
