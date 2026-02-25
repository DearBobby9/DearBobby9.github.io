"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Sun, Moon, Palette } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
} from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navigation } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { usePalette } from "@/components/PaletteProvider";
import { COLOR_PALETTES, PALETTE_ORDER } from "@/data/colorPalettes";

function useScrollToHash() {
    const pathname = usePathname();
    const router = useRouter();

    return React.useCallback(
        (href: string, e?: React.MouseEvent) => {
            // Home link — scroll to top if already on homepage
            if (href === "/" && pathname === "/") {
                e?.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                window.history.pushState(null, "", "/");
                return true;
            }

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
    const [mounted, setMounted] = React.useState(false);
    const { theme, setTheme } = useTheme();
    const { paletteId, setPaletteId } = usePalette();
    const scrollToHash = useScrollToHash();

    React.useEffect(() => setMounted(true), []);

    const navItems = navigation;

    // Determine if a nav item is active
    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        if (href.startsWith("/#")) return pathname === "/";
        return pathname === href || pathname.startsWith(href + "/");
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
                                "text-sm transition-colors hover:text-foreground",
                                isActive(item.href)
                                    ? "text-foreground font-semibold"
                                    : "text-muted-foreground font-normal"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Right side */}
                <div className="flex items-center gap-2">
                    {/* Theme toggle */}
                    {mounted && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? (
                                <Sun className="h-4 w-4" />
                            ) : (
                                <Moon className="h-4 w-4" />
                            )}
                        </Button>
                    )}

                    {/* Palette selector (desktop only) */}
                    {mounted && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="hidden md:inline-flex h-9 w-9"
                                    aria-label="Change color palette"
                                >
                                    <Palette className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Color Palette</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup
                                    value={paletteId}
                                    onValueChange={(v) => setPaletteId(v as typeof paletteId)}
                                >
                                    {PALETTE_ORDER.map((id) => {
                                        const p = COLOR_PALETTES[id];
                                        return (
                                            <DropdownMenuRadioItem key={id} value={id}>
                                                <span className="flex items-center gap-2">
                                                    <span className="flex gap-0.5">
                                                        {p.light.slice(0, 3).map((c, i) => (
                                                            <span
                                                                key={i}
                                                                className="inline-block w-2.5 h-2.5 rounded-full"
                                                                style={{ backgroundColor: `rgb(${c[0]}, ${c[1]}, ${c[2]})` }}
                                                            />
                                                        ))}
                                                    </span>
                                                    {p.name}
                                                </span>
                                            </DropdownMenuRadioItem>
                                        );
                                    })}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}

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
