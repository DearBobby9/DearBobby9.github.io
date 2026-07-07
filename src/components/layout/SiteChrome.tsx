"use client";

import * as React from "react";
import { InteractiveBackground } from "@/components/background/InteractiveBackground";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
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
    </>
  );
}
