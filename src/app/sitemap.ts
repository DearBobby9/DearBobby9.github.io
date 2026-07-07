import type { MetadataRoute } from "next";
import { posts } from "@/data/posts";
import { projects } from "@/data/projects";
import { publications } from "@/data/publications";
import { assertContentDataInSync } from "@/lib/content-validation";

const BASE_URL = "https://dearbobby9.github.io";

export const dynamic = "force-static";

function toUrl(pathname: string) {
    return `${BASE_URL}${pathname}`;
}

function yearToDate(year: string) {
    return `${year}-01-01`;
}

function latestDate(dates: string[]) {
    return dates.sort().at(-1) ?? "2026-01-01";
}

export default function sitemap(): MetadataRoute.Sitemap {
    assertContentDataInSync();

    const latestContentDate = latestDate([
        ...posts.map((post) => post.date),
        ...projects.map((project) => yearToDate(project.year)),
        ...publications.map((publication) => yearToDate(publication.year)),
    ]);

    return [
        {
            url: toUrl("/"),
            lastModified: latestContentDate,
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: toUrl("/about/"),
            lastModified: latestContentDate,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: toUrl("/blog/"),
            lastModified: latestDate(posts.map((post) => post.date)),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        ...posts.map((post) => ({
            url: toUrl(`/blog/${post.slug}/`),
            lastModified: post.date,
            changeFrequency: "monthly" as const,
            priority: 0.7,
        })),
        ...projects
            .filter((project) => project.hasDetail !== false)
            .map((project) => ({
                url: toUrl(`/projects/${project.slug}/`),
                lastModified: yearToDate(project.year),
                changeFrequency: "monthly" as const,
                priority: 0.8,
            })),
        ...publications.map((publication) => ({
            url: toUrl(`/publications/${publication.id}/`),
            lastModified: yearToDate(publication.year),
            changeFrequency: "yearly" as const,
            priority: 0.7,
        })),
    ];
}
