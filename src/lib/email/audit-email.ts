type Props = { totalSavings: number; };

export function buildAuditEmail({totalSavings}: Props) {
  return `
    <div
      style="
        background:#09090b;
        padding:48px 24px;
        font-family:Inter,sans-serif;
        color:#fafafa;
      "
    >
      <div
        style="
          max-width:620px;
          margin:0 auto;
          background:#111114;
          border:1px solid #27272a;
          border-radius:28px;
          padding:40px;
        "
      >

        <p
          style="
            font-size:12px;
            letter-spacing:0.12em;
            color:#71717a;
            margin-bottom:18px;
          "
        >
          BURNRATE.AI AUDIT
        </p>

        <h1
          style="
            font-size:42px;
            line-height:1;
            letter-spacing:-0.06em;
            margin-bottom:20px;
            color:#fafafa;
          "
        >
          Your audit report is ready.
        </h1>

        <p
          style="
            color:#a1a1aa;
            line-height:1.8;
            font-size:16px;
            margin-bottom:28px;
          "
        >
          We analyzed your AI tooling stack and identified approximately
          <span
            style="
              color:#c4b5fd;
              font-weight:600;
            "
          >
            ₹${totalSavings.toLocaleString()}/mo
          </span>
          in potential savings opportunities across overlapping subscriptions and plan optimization recommendations.
        </p>

        <div
          style="
            background:#18181c;
            border:1px solid #27272a;
            border-radius:20px;
            padding:22px;
            margin-bottom:28px;
          "
        >
          <p
            style="
              color:#71717a;
              font-size:13px;
              margin-bottom:10px;
            "
          >
            WHAT HAPPENS NEXT
          </p>

          <p
            style="
              color:#d4d4d8;
              line-height:1.7;
              margin:0;
            "
          >
            Credex may reach out with additional optimization recommendations for high-savings audit cases and enterprise tooling consolidation opportunities.
          </p>
        </div>

        <p
          style="
            color:#71717a;
            line-height:1.7;
            font-size:14px;
          "
        >
          This email confirms your audit submission and report generation request.
        </p>

      </div>
    </div>
  `;
}