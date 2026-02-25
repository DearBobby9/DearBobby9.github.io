"use client";

import * as React from "react";
import { type PaletteId, DEFAULT_PALETTE } from "@/data/colorPalettes";

interface PaletteContextValue {
    paletteId: PaletteId;
    setPaletteId: (id: PaletteId) => void;
}

const PaletteContext = React.createContext<PaletteContextValue>({
    paletteId: DEFAULT_PALETTE,
    setPaletteId: () => {},
});

const STORAGE_KEY = "color-palette";

export function PaletteProvider({ children }: { children: React.ReactNode }) {
    const [paletteId, setPaletteIdState] = React.useState<PaletteId>(DEFAULT_PALETTE);

    // Read from localStorage on mount
    React.useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored && ["jewel", "indigo", "academic", "pastel"].includes(stored)) {
            setPaletteIdState(stored as PaletteId);
        }
    }, []);

    const setPaletteId = React.useCallback((id: PaletteId) => {
        setPaletteIdState(id);
        localStorage.setItem(STORAGE_KEY, id);
    }, []);

    const value = React.useMemo(
        () => ({ paletteId, setPaletteId }),
        [paletteId, setPaletteId]
    );

    return (
        <PaletteContext.Provider value={value}>
            {children}
        </PaletteContext.Provider>
    );
}

export function usePalette() {
    return React.useContext(PaletteContext);
}
