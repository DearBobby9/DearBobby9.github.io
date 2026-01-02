// Header and Footer are now in layout.tsx
import { Hero } from "@/components/home/Hero";
import { NowSection } from "@/components/home/NowSection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { SelectedPublications } from "@/components/home/SelectedPublications";
import { LatestWriting } from "@/components/home/LatestWriting";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Now / Latest Updates */}
      <NowSection />

      {/* Featured Projects */}
      <FeaturedProjects />

      {/* Selected Publications */}
      <SelectedPublications />

      {/* Latest Writing */}
      <LatestWriting />
    </>
  );
}
