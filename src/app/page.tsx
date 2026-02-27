import type { Metadata } from "next";
// Header and Footer are now in layout.tsx
import { Hero } from "@/components/home/Hero";

export const metadata: Metadata = {
  title: "Difan Jia | XR + Fabrication + Spatial Computing",
  description:
    "Personal website of Difan (Bobby) Jia — researcher and builder in AR, spatial computing, and AI. Explore projects, publications, and more.",
};
import { NowSection } from "@/components/home/NowSection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { SelectedPublications } from "@/components/home/SelectedPublications";
// import { LatestWriting } from "@/components/home/LatestWriting";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Now / Latest Updates */}
      <NowSection />

      {/* Selected Publications */}
      <SelectedPublications />

      {/* Featured Projects */}
      <FeaturedProjects />

      {/* Latest Writing — hidden until real posts are added */}
      {/* <LatestWriting /> */}
    </>
  );
}
