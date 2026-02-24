"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
} from "@/components/ui/sheet";
import { navigation } from "@/data/navigation";
import { siteConfig } from "@/data/site";

function useScrollToHash() {
    const pathname = usePathname();
    const router = useRouter();

    return React.useCallback(
        (href: string, e?: React.MouseEvent) => {
            // Only handle anchor links like /#publications
            if (!href.startsWith("/#")) return false;

            const hash = href.slice(1); // e.g. "#publications"
            const id = hash.slice(1); // e.g. "publications"

            if (pathname === "/") {
                // Already on homepage — just scroll
                e?.preventDefault();
                const el = document.getElementById(id);
                if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                    window.history.pushState(null, "", hash);
                }
                return true;
            } else {
                // On another page — navigate to homepage with hash
                e?.preventDefault();
                router.push(href);
                return true;
            }
        },
        [pathname, router]
    );
}

export function Header() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = React.useState(false);
    const scrollToHash = useScrollToHash();

    const navItems = navigation;

    // Determine if a nav item is active
    const isActive = (href: string) => {
        if (href.startsWith("/#")) {
            // Anchor links are "active" when on homepage
            return pathname === "/";
        }
        return pathname === href;
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/30 backdrop-blur-xl">
            <div className="container-custom flex h-16 items-center justify-between">
                {/* Logo / Name */}
                <Link
                    href="/"
                    className="text-lg font-semibold tracking-tight transition-colors hover:text-muted-foreground"
                >
                    {siteConfig.name.toUpperCase()}
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={(e) => scrollToHash(item.href, e)}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-foreground",
                                isActive(item.href)
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Right side */}
                <div className="flex items-center gap-4">
                    {/* Mobile Menu */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon" className="h-9 w-9">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-full sm:w-[400px] bg-background/95 backdrop-blur-xl border-l border-border/40 p-0">
                            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

                            <div className="flex flex-col h-full justify-center px-8">
                                <div className="font-mono text-xs text-muted-foreground mb-8 tracking-widest uppercase text-center">
                                    Menu
                                </div>

                                <nav className="flex flex-col gap-6 items-center">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={(e) => {
                                                scrollToHash(item.href, e);
                                                setIsOpen(false);
                                            }}
                                            className={cn(
                                                "text-4xl md:text-5xl font-serif font-light italic tracking-tight transition-all duration-300 hover:text-foreground hover:scale-105",
                                                isActive(item.href)
                                                    ? "text-foreground"
                                                    : "text-muted-foreground"
                                            )}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </nav>

                                <div className="mt-12 text-center">
                                    <div className="w-12 h-[1px] bg-border mx-auto mb-8" />
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
