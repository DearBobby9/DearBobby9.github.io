import type { Metadata } from "next";
import { Fraunces, Space_Grotesk, JetBrains_Mono } from "next/font/google"; // Plan A fonts
import "./globals.css";
import { InteractiveBackground } from "@/components/background/InteractiveBackground";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PaletteProvider } from "@/components/PaletteProvider";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { JsonLd } from "@/components/JsonLd";
import { Analytics } from "@/components/Analytics";

const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dearbobby9.github.io"),
  title: {
    default: "Difan Jia | XR + Fabrication + Spatial Computing",
    template: "%s | Difan Jia",
  },
  description:
    "Personal website of Difan (Bobby) Jia - Researcher and developer in XR, HCI, CAD, and spatial computing.",
  keywords: ["XR", "HCI", "CAD", "Spatial Computing", "Research", "Developer"],
  authors: [{ name: "Difan Jia" }],
  creator: "Difan Jia",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "zh_CN",
    title: "Difan Jia | XR + Fabrication + Spatial Computing",
    description:
      "Personal website of Difan (Bobby) Jia - Researcher and developer in XR, HCI, CAD, and spatial computing.",
    siteName: "Difan Jia",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Difan Jia | XR + Fabrication + Spatial Computing",
    description:
      "Personal website of Difan (Bobby) Jia - Researcher and developer in XR, HCI, CAD, and spatial computing.",
    creator: "@KeithMaxwell99",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd />
        <Analytics />
      </head>
      <body
        className={`${fraunces.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider>
          <PaletteProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:rounded-md focus:text-sm focus:font-medium"
            >
              Skip to content
            </a>
            <InteractiveBackground />
            <div className="flex flex-col min-h-screen">
              <Header />
              <main id="main" className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <ChatWidget />
          </PaletteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
