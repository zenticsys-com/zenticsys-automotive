import { ImageResponse } from "next/og";

export const socialImageSize = { width: 1200, height: 630 };

export function createSocialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 76px",
          color: "#f5f6f4",
          background: "radial-gradient(circle at 18% 78%, #8d2b1c 0, #3a1715 26%, #111315 62%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 32, fontWeight: 700, letterSpacing: -1 }}>
          <span style={{ display: "flex", width: 54, height: 54, borderRadius: 27, alignItems: "center", justifyContent: "center", background: "#ef3d23" }}>Z</span>
          ZENTICSYS
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 980 }}>
          <span style={{ color: "#ff6a52", fontSize: 22, fontWeight: 650, letterSpacing: 4, textTransform: "uppercase" }}>Automotive digital specialists</span>
          <span style={{ fontSize: 76, fontWeight: 650, lineHeight: 1, letterSpacing: -4 }}>Digital systems that keep automotive businesses moving.</span>
        </div>
      </div>
    ),
    socialImageSize,
  );
}
