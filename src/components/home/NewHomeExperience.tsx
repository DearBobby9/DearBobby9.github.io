import { Hero } from "@/components/home/Hero";
import { NowSection } from "@/components/home/NowSection";
import { SelectedPublications } from "@/components/home/SelectedPublications";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";

export function NewHomeExperience() {
    return (
        <>
            <Hero />
            <NowSection />
            <SelectedPublications />
            <FeaturedProjects />
        </>
    );
}
