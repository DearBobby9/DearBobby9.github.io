import type { Metadata } from "next";
import { NewHomeExperience } from "@/components/home/NewHomeExperience";

export const metadata: Metadata = {
    title: "New home experiment",
    robots: {
        index: false,
        follow: false,
    },
};

export default function NewHomePage() {
    return <NewHomeExperience />;
}
