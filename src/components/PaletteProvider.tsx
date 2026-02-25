"use client";

import * as React from "react";
import {
    type PaletteId,
    type PresetPaletteId,
    type ColorPalette,
    DEFAULT_PALETTE,
    PALETTE_ORDER,
    COLOR_PALETTES,
    DEFAULT_CUSTOM_COLORS,
    generateDarkVariant,
} from "@/data/colorPalettes";

interface PaletteContextValue {
    paletteId: PaletteId;
    setPaletteId: (id: PaletteId) => void;
    customColors: [number, number, number][];
    setCustomColors: (colors: [number, number, number][]) => void;
    getActivePalette: () => ColorPalette;
}

const PaletteContext = React.createContext<PaletteContextValue>({
    paletteId: DEFAULT_PALETTE,
    setPaletteId: () => {},
    customColors: DEFAULT_CUSTOM_COLORS,
    setCustomColors: () => {},
    getActivePalette: () => COLOR_PALETTES[DEFAULT_PALETTE as PresetPaletteId],
});

const STORAGE_KEY = "color-palette";
const CUSTOM_COLORS_KEY = "custom-palette-colors";

function parseCustomColors(json: string | null): [number, number, number][] | null {
    if (!json) return null;
    try {
        const arr = JSON.parse(json);
        if (
            Array.isArray(arr) &&
            arr.length >= 2 &&
            arr.length <= 6 &&
            arr.every(
                (c: unknown) =>
                    Array.isArray(c) &&
                    c.length === 3 &&
                    c.every((n: unknown) => typeof n === "number" && n >= 0 && n <= 255)
            )
        ) {
            return arr as [number, number, number][];
        }
    } catch { /* invalid JSON */ }
    return null;
}

export function PaletteProvider({ children }: { children: React.ReactNode }) {
    const [paletteId, setPaletteIdState] = React.useState<PaletteId>(DEFAULT_PALETTE);
    const [customColors, setCustomColorsState] = React.useState<[number, number, number][]>(DEFAULT_CUSTOM_COLORS);

    // Read from localStorage on mount
    React.useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === "custom") {
            setPaletteIdState("custom");
        } else if (stored && (PALETTE_ORDER as readonly string[]).includes(stored)) {
            setPaletteIdState(stored as PaletteId);
        }

        const storedColors = parseCustomColors(localStorage.getItem(CUSTOM_COLORS_KEY));
        if (storedColors) {
            setCustomColorsState(storedColors);
        }
    }, []);

    const setPaletteId = React.useCallback((id: PaletteId) => {
        setPaletteIdState(id);
        localStorage.setItem(STORAGE_KEY, id);
    }, []);

    const setCustomColors = React.useCallback((colors: [number, number, number][]) => {
        setCustomColorsState(colors);
        localStorage.setItem(CUSTOM_COLORS_KEY, JSON.stringify(colors));
    }, []);

    const getActivePalette = React.useCallback((): ColorPalette => {
        if (paletteId === "custom") {
            return {
                id: "custom",
                name: "Custom",
                light: customColors,
                dark: customColors.map(generateDarkVariant),
            };
        }
        return COLOR_PALETTES[paletteId as PresetPaletteId];
    }, [paletteId, customColors]);

    const value = React.useMemo(
        () => ({ paletteId, setPaletteId, customColors, setCustomColors, getActivePalette }),
        [paletteId, setPaletteId, customColors, setCustomColors, getActivePalette]
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
