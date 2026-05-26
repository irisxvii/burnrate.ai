import { ImageResponse } from "next/og";
import { getPublicAudit } from "@/lib/public-audits";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Image({
  params,
}: Props) {

  const { slug } = await params;

  const { data } = await getPublicAudit(slug);

  if (!data) {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            background: "#09090b",
            width: "100%",
            height: "100%",
          }}
        />
      ),
      size
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px",
          background: "linear-gradient(to bottom right, #09090b, #18181b)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >

        <div
          style={{
            fontSize: 28,
            color: "#a1a1aa",
            display: "flex",
          }}
        >
          BurnRate.ai
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >

          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              letterSpacing: "-4px",
              background: "linear-gradient(to right, #c4b5fd, #8b5cf6)",
              backgroundClip: "text",
              color: "transparent",
              display: "flex",
            }}
          >
            ₹{data.total_savings.toLocaleString()}/mo saved
          </div>

          <div
            style={{
              fontSize: 36,
              color: "#d4d4d8",
              display: "flex",
            }}
          >
            AI Spend Optimization Audit
          </div>

        </div>

        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >

          {data.selected_tools.map(
            (tool: string) => (
              <div
                key={tool}
                style={{
                  padding: "12px 20px",
                  borderRadius: 999,
                  background: "#18181b",
                  border: "1px solid #27272a",
                  fontSize: 24,
                  color: "#e4e4e7",
                  textTransform: "capitalize",
                  display: "flex",
                }}
              >
                {tool}
              </div>
            )
          )}

        </div>
      </div>
    ),
    size
  );
}