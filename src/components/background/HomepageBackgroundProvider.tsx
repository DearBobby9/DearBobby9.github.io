"use client";

import * as React from "react";

export type HomepageBackgroundMode = "current" | "antigravity";

interface HomepageBackgroundContextValue {
  backgroundMode: HomepageBackgroundMode;
  setBackgroundMode: (mode: HomepageBackgroundMode) => void;
}

const STORAGE_KEY = "homepage-background-mode";
const BACKGROUND_SELECTOR_PATHS = new Set(["/", "/about", "/blog"]);

const HomepageBackgroundContext = React.createContext<HomepageBackgroundContextValue>({
  backgroundMode: "current",
  setBackgroundMode: () => {},
});

function parseMode(value: string | null): HomepageBackgroundMode {
  return value === "antigravity" ? "antigravity" : "current";
}

export function normalizeBackgroundPathname(pathname: string) {
  return pathname.replace(/\/$/, "") || "/";
}

export function supportsSelectableBackground(pathname: string) {
  const normalizedPathname = normalizeBackgroundPathname(pathname);
  return BACKGROUND_SELECTOR_PATHS.has(normalizedPathname) || normalizedPathname.startsWith("/blog/");
}

export function HomepageBackgroundProvider({ children }: { children: React.ReactNode }) {
  const [backgroundMode, setBackgroundModeState] =
    React.useState<HomepageBackgroundMode>("current");

  React.useEffect(() => {
    setBackgroundModeState(parseMode(window.localStorage.getItem(STORAGE_KEY)));
  }, []);

  const setBackgroundMode = React.useCallback((mode: HomepageBackgroundMode) => {
    setBackgroundModeState(mode);
    window.localStorage.setItem(STORAGE_KEY, mode);
  }, []);

  const value = React.useMemo(
    () => ({ backgroundMode, setBackgroundMode }),
    [backgroundMode, setBackgroundMode]
  );

  return (
    <HomepageBackgroundContext.Provider value={value}>
      {children}
    </HomepageBackgroundContext.Provider>
  );
}

export function useHomepageBackground() {
  return React.useContext(HomepageBackgroundContext);
}
