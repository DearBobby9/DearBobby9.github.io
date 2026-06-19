import type { Metadata } from "next";
import { AntigravityClone } from "./AntigravityClone";

export const metadata: Metadata = {
  title: "Google Antigravity clone",
  description: "A local recreation of the Google Antigravity landing page.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AntigravityClonePage() {
  return <AntigravityClone />;
}
