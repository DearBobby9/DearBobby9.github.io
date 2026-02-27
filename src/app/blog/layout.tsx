import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog",
    description:
        "Thoughts on XR, HCI, spatial computing, research, and technology by Difan (Bobby) Jia.",
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
