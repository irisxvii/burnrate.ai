import { Recommendation } from "./audit";

export function buildSummaryPrompt(
  recommendations: Recommendation[],
  totalSavings: number
) {
  return `
You are an AI finance auditor.

Write a concise 100-word executive summary for a startup team about their AI software spending.

Be practical and direct.
Do not exaggerate savings.
Mention overlapping tools if present.
Mention unnecessary premium plans if relevant.

Total monthly savings:
₹${totalSavings}

Recommendations:
${recommendations
  .map(
    (rec) => `
- ${rec.toolName}
- Current: ₹${rec.currentSpend}
- Recommended: ${rec.recommendedPlan}
- Savings: ₹${rec.savings}
- Reason: ${rec.reason}
`
  )
  .join("\n")}
`;
}