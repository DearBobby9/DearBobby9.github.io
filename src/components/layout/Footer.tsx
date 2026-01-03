import Link from "next/link";
import { Github, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/data/site";
import { navigation } from "@/data/navigation";

const XIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
);

const socialLinks = [
    {
        name: "Email",
        href: `mailto:${siteConfig.email}`,
        icon: Mail,
    },
    {
        name: "X (Twitter)",
        href: siteConfig.socials.x,
        icon: XIcon,
    },
    {
        name: "GitHub",
        href: siteConfig.socials.github,
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
                            {siteConfig.name.toUpperCase()}
                        </span>
                        <span className="text-xs text-muted-foreground font-mono">
                            © {currentYear} All rights reserved
                        </span>
                    </div>

                    {/* Center: Google Scholar link */}
                    <Link
                        href="https://scholar.google.com/citations?user=M3bt3kAAAAAJ&hl=en"
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
                    {navigation.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="hover:text-foreground transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
}
