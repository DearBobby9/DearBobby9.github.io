import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { InteractiveBackground } from "@/components/background/InteractiveBackground";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Difan Jia | XR + Fabrication + Spatial Computing",
    description:
      "Personal website of Difan (Bobby) Jia - Researcher and developer in XR, HCI, CAD, and spatial computing.",
    creator: "@KeithMaxwell99",
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
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <InteractiveBackground />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
