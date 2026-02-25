import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#09090b",
                    borderRadius: 6,
                }}
            >
                <span
                    style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: "#fafafa",
                        letterSpacing: -1,
                    }}
                >
                    DJ
                </span>
            </div>
        ),
        { ...size }
    );
}
