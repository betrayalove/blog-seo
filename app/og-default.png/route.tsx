import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", height: "100%", padding: 80, background: "#020617", color: "#e2e8f0" }}>
      <div style={{ display: "flex", color: "#93c5fd", fontSize: 34 }}>BETRAYALOVE / BLOG</div>
      <div style={{ display: "flex", fontSize: 100, fontWeight: 700, marginTop: 30 }}>Next.js & SEO</div>
      <div style={{ display: "flex", fontSize: 34, marginTop: 30 }}>TypeScript · React · Tailwind CSS</div>
    </div>,
    { width: 1200, height: 630 },
  );
}
