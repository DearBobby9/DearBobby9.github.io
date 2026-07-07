import type { Metadata } from "next";
import { HomeExperience } from "@/components/home/HomeExperience";

export const metadata: Metadata = {
  title: "Difan Jia | XR + Fabrication + Spatial Computing",
  description:
    "Personal website of Difan (Bobby) Jia — researcher and builder in AR, spatial computing, and AI. Explore projects, publications, and more.",
};
export default function Home() {
  return <HomeExperience />;
}
