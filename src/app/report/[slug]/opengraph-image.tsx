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
            width: "100%",
            height: "100%",
            display: "flex",
            background: "#050505",
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
          padding: "48px 56px",
          background: "#050505",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >

        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#71717a",
            letterSpacing: "0.12em",
          }}
        >
          AI SPEND AUDIT RESULTS
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "8px",
              lineHeight: 0.9,
              letterSpacing: "-0.08em",
              fontWeight: 800,
              fontSize: 170,
              background:
                "linear-gradient(to bottom right, #c4b5fd, #8b5cf6)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            ₹{data.total_savings.toLocaleString()}/mo
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 42,
              color: "#d4d4d8",
              letterSpacing: "-0.04em",
            }}
          >
            in potential AI savings
          </div>

        </div>

        <div
          style={{
            display: "flex",
            gap: "14px",
            flexWrap: "wrap",
          }}
        >

          {data.selected_tools.map(
            (tool: string) => (
              <div
                key={tool}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "14px 24px",
                  borderRadius: 999,
                  background: "#111114",
                  border:
                    "1px solid #27272a",
                  fontSize: 24,
                  color: "#fafafa",
                  textTransform:
                    "capitalize",
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