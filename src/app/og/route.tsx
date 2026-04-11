import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "Haritha Akkad";
  const description =
    searchParams.get("description") ??
    "Senior software engineer building at the intersection of mobile, backend, and generative AI.";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#f9f7f2",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "64px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 14,
            color: "#c48a08",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          harithaakkad.dev
        </div>
        <div
          style={{
            fontSize: title.length > 40 ? 40 : 52,
            fontWeight: 700,
            color: "#17150e",
            lineHeight: 1.15,
            marginBottom: 20,
            maxWidth: 800,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 20,
            color: "#5c5549",
            maxWidth: 680,
            lineHeight: 1.5,
          }}
        >
          {description}
        </div>
        <div
          style={{
            position: "absolute",
            top: 64,
            right: 64,
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#c48a08",
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
