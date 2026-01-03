"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

export function Header() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = React.useState(false);

    const navItems = navigation;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
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
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-foreground",
                                pathname === item.href
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Right side: Language Switcher */}
                <div className="flex items-center gap-4">
                    {/* Language Switcher - Hidden for now */}
                    {/* <div className="flex items-center gap-2 font-mono text-xs">
                        <button
                            onClick={() => setLocale("en")}
                            className={cn(
                                "transition-colors hover:text-foreground",
                                locale === "en" ? "text-foreground font-semibold" : "text-muted-foreground/50"
                            )}
                        >
                            EN
                        </button>
                        <span className="text-muted-foreground/20">/</span>
                        <button
                            onClick={() => setLocale("zh")}
                            className={cn(
                                "transition-colors hover:text-foreground",
                                locale === "zh" ? "text-foreground font-semibold" : "text-muted-foreground/50"
                            )}
                        >
                            中文
                        </button>
                    </div> */}

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
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                "text-4xl md:text-5xl font-serif font-light italic tracking-tight transition-all duration-300 hover:text-foreground hover:scale-105",
                                                pathname === item.href
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
                                    {/* Re-add Socials in Menu optionally? No, keep clean. */}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
