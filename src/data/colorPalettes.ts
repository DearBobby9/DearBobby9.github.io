// src/data/colorPalettes.ts
// All particle background color palettes — edit here to add/modify palettes

export type PaletteId = "jewel" | "indigo" | "academic" | "pastel";

export interface ColorPalette {
    id: PaletteId;
    name: string;
    light: [number, number, number][];
    dark: [number, number, number][];
}

export const COLOR_PALETTES: Record<PaletteId, ColorPalette> = {
    jewel: {
        id: "jewel",
        name: "Jewel Tones",
        light: [
            [50, 100, 200],   // sapphire
            [40, 88, 185],    // sapphire variant
            [180, 60, 80],    // ruby
            [165, 50, 70],    // ruby variant
            [30, 140, 90],    // emerald
            [22, 125, 78],    // emerald variant
            [120, 70, 190],   // amethyst
            [105, 58, 175],   // amethyst variant
            [200, 150, 40],   // amber
        ],
        dark: [
            [80, 140, 240],   // bright sapphire
            [70, 128, 225],   // sapphire variant
            [210, 90, 110],   // light ruby
            [195, 78, 98],    // ruby variant
            [60, 180, 120],   // bright emerald
            [50, 165, 108],   // emerald variant
            [155, 110, 230],  // light amethyst
            [140, 95, 218],   // amethyst variant
            [230, 180, 80],   // bright amber
        ],
    },
    indigo: {
        id: "indigo",
        name: "Indigo",
        light: [
            [79, 70, 229],    // indigo-600
            [89, 80, 235],    // indigo variant
            [99, 102, 241],   // indigo-500
            [109, 112, 245],  // indigo variant
            [119, 122, 248],  // indigo-400
            [129, 140, 251],  // indigo variant
            [69, 60, 220],    // deep indigo
            [85, 95, 238],    // mid indigo
            [140, 150, 252],  // light indigo
        ],
        dark: [
            [119, 130, 238],  // bright indigo
            [129, 140, 248],  // indigo variant
            [139, 150, 255],  // indigo light
            [149, 160, 255],  // indigo variant
            [159, 168, 255],  // indigo lighter
            [165, 180, 252],  // indigo lightest
            [110, 120, 232],  // deep bright
            [145, 155, 250],  // mid bright
            [170, 185, 255],  // extra light
        ],
    },
    academic: {
        id: "academic",
        name: "Academic",
        light: [
            [66, 133, 244],   // google blue
            [55, 120, 230],   // blue variant
            [219, 88, 96],    // google red
            [200, 75, 85],    // red variant
            [230, 180, 60],   // google yellow
            [60, 160, 100],   // google green
            [50, 145, 90],    // green variant
            [130, 100, 220],  // purple
            [115, 85, 205],   // purple variant
        ],
        dark: [
            [100, 160, 255],  // bright blue
            [120, 175, 255],  // blue variant
            [240, 120, 130],  // bright red
            [225, 105, 115],  // red variant
            [245, 200, 100],  // bright yellow
            [90, 190, 130],   // bright green
            [80, 175, 120],   // green variant
            [160, 140, 250],  // bright purple
            [145, 125, 235],  // purple variant
        ],
    },
    pastel: {
        id: "pastel",
        name: "Pastel",
        light: [
            [120, 170, 240],  // sky blue
            [110, 158, 228],  // sky variant
            [170, 140, 220],  // lavender
            [158, 128, 210],  // lavender variant
            [235, 150, 130],  // coral
            [222, 138, 118],  // coral variant
            [120, 200, 170],  // mint
            [108, 188, 158],  // mint variant
            [230, 200, 100],  // gold
        ],
        dark: [
            [150, 195, 255],  // bright sky
            [140, 185, 248],  // sky variant
            [190, 165, 240],  // bright lavender
            [178, 153, 232],  // lavender variant
            [245, 170, 155],  // bright coral
            [235, 160, 145],  // coral variant
            [150, 220, 190],  // bright mint
            [140, 210, 178],  // mint variant
            [240, 215, 130],  // bright gold
        ],
    },
};

export const DEFAULT_PALETTE: PaletteId = "indigo";
export const PALETTE_ORDER: PaletteId[] = ["indigo", "jewel", "academic", "pastel"];
