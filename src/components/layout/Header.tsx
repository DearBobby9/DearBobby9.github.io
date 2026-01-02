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
// Dropdown imports removed

const navigation = [
    { name: "Projects", href: "/projects" },
    { name: "Publications", href: "/publications" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
];

const navigationZh = [
    { name: "项目", href: "/projects" },
    { name: "论文", href: "/publications" },
    { name: "博客", href: "/blog" },
    { name: "关于", href: "/about" },
];

export function Header() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = React.useState(false);
    const [locale, setLocale] = React.useState<"en" | "zh">("en");

    const navItems = locale === "zh" ? navigationZh : navigation;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
            <div className="container-custom flex h-16 items-center justify-between">
                {/* Logo / Name */}
                <Link
                    href="/"
                    className="text-lg font-semibold tracking-tight transition-colors hover:text-muted-foreground"
                >
                    DIFAN JIA
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
                        <SheetContent side="right" className="w-[280px] bg-background">
                            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                            <nav className="flex flex-col gap-4 mt-8">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "text-lg font-medium transition-colors hover:text-foreground py-2",
                                            pathname === item.href
                                                ? "text-foreground"
                                                : "text-muted-foreground"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
