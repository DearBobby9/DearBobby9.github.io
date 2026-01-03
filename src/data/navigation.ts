// src/data/navigation.ts
// Centralized navigation data - edit here to update all navigation menus

export interface NavItem {
    name: string;
    nameZh?: string; // Chinese translation (for future i18n)
    href: string;
}

export const navigation: NavItem[] = [
    { name: "Projects", nameZh: "项目", href: "/projects" },
    { name: "Publications", nameZh: "论文", href: "/publications" },
    { name: "Blog", nameZh: "博客", href: "/blog" },
    { name: "About", nameZh: "关于", href: "/about" },
];

// Footer-specific links (if different from main nav)
export const footerLinks = navigation;
