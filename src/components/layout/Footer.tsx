import Link from "next/link";
import { Github, Mail, Twitter } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const socialLinks = [
    {
        name: "Email",
        href: "mailto:keithtmaxwell99@gmail.com",
        icon: Mail,
    },
    {
        name: "X (Twitter)",
        href: "https://x.com/KeithMaxwell99",
        icon: Twitter,
    },
    {
        name: "GitHub",
        href: "https://github.com/DearBobby9",
        icon: Github,
    },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border/40">
            <div className="container-custom py-12 md:py-16">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Left: Name and copyright */}
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <span className="text-lg font-semibold tracking-tight">
                            DIFAN JIA
                        </span>
                        <span className="text-xs text-muted-foreground font-mono">
                            © {currentYear} All rights reserved
                        </span>
                    </div>

                    {/* Center: Google Scholar link */}
                    <Link
                        href="https://scholar.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Google Scholar →
                    </Link>

                    {/* Right: Social icons */}
                    <div className="flex items-center gap-4">
                        {socialLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors p-2"
                                aria-label={link.name}
                            >
                                <link.icon className="h-5 w-5" />
                            </Link>
                        ))}
                    </div>
                </div>

                <Separator className="my-8 bg-border/40" />

                {/* Bottom: Quick links */}
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs text-muted-foreground font-mono">
                    <Link href="/projects" className="hover:text-foreground transition-colors">
                        Projects
                    </Link>
                    <Link href="/publications" className="hover:text-foreground transition-colors">
                        Publications
                    </Link>
                    <Link href="/blog" className="hover:text-foreground transition-colors">
                        Blog
                    </Link>
                    <Link href="/about" className="hover:text-foreground transition-colors">
                        About
                    </Link>
                </div>
            </div>
        </footer>
    );
}
