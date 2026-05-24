import { AuditData } from "@/types/audit";
import { pricing } from "@/data/pricing";
import { normalizePrice } from "./currency";

export interface Recommendation {
  toolId: string;
  toolName: string;
  currentPlan: string;
  recommendedPlan: string;
  currentSpend: number;
  recommendedSpend: number;
  savings: number;
  reason: string;
}

export interface AuditResult {
  recommendations: Recommendation[];
  totalMonthlySavings: number;
  totalAnnualSavings: number;
}

const TOOL_NAMES: Record<string, string> = {
  chatgpt: "ChatGPT",
  claude: "Claude",
  copilot: "GitHub Copilot",
  cursor: "Cursor",
  gemini: "Gemini",
  windsurf: "Windsurf",
  "openai-api": "OpenAI API",
  "anthropic-api": "Anthropic API",
};

export function runAudit(data: AuditData): AuditResult {
  const recommendations: Recommendation[] = [];

  const {selectedTools, toolDetails, teamSize} = data;

  for (const toolId of selectedTools) {
    const detail = toolDetails[toolId];

    if (!detail?.plan || !detail?.spend) {
      continue;
    }

    const toolPricing = pricing[toolId];

    if (!toolPricing) {
      continue;
    }

    const planInfo = toolPricing[detail.plan];

    if (!planInfo) {
      continue;
    }

    const currentSpend = detail.spend;

    let recommendedPlan = detail.plan;
    let recommendedSpend = currentSpend;
    let reason = "Your current setup looks reasonably optimized.";

    //Rule 1: Too many seats

    if (detail.seats > teamSize && teamSize > 0 && planInfo.pricePerSeat != null) {
      const unusedSeats = detail.seats - teamSize;

      const savings = normalizePrice(unusedSeats * planInfo.pricePerSeat, planInfo.currency);

      recommendedSpend = currentSpend - savings;

      reason = `You currently pay for ${detail.seats} seats but only ${teamSize} active users were reported.`;

      recommendations.push({
        toolId,
        toolName: TOOL_NAMES[toolId] ?? toolId,
        currentPlan: detail.plan,
        recommendedPlan: `${detail.plan} (${teamSize} seats)`,
        currentSpend,
        recommendedSpend,
        savings,
        reason,
      });

      continue;
    }

    //Rule 2: Expensive plans for tiny teams

    if (planInfo.tier === "pro" && teamSize <= 3) {

      recommendedSpend = currentSpend * 0.6;

      const savings = currentSpend - recommendedSpend;

      recommendedPlan = "Lower-tier plan";

      reason = "Your current subscription tier may be oversized for your current team size.";

      recommendations.push({
        toolId,
        toolName: TOOL_NAMES[toolId] ?? toolId,
        currentPlan: detail.plan,
        recommendedPlan,
        currentSpend,
        recommendedSpend,
        savings,
        reason,
      });

      continue;
    }

    //Default

    recommendations.push({
      toolId,
      toolName: TOOL_NAMES[toolId] ?? toolId,
      currentPlan: detail.plan,
      recommendedPlan,
      currentSpend,
      recommendedSpend,
      savings: 0,
      reason,
    });
  }

  //Overlap rule

  const codingTools = selectedTools.filter((tool) =>
        [
          "cursor",
          "copilot",
          "windsurf",
        ].includes(tool)
    );

  if (codingTools.length >= 2) {
    codingTools
      .slice(1)
      .forEach((toolId) => {
        const detail = toolDetails[toolId];

        if (!detail) {
          return;
        }

        const existingIndex =
            recommendations.findIndex((item) =>
                item.toolId === toolId
            );

            if (existingIndex !== -1) {
            recommendations.splice(existingIndex, 1);
            }

        recommendations.push({
          toolId,
          toolName: TOOL_NAMES[toolId] ?? toolId,
          currentPlan: detail.plan,
          recommendedPlan: "Remove tool",
          currentSpend: detail.spend,
          recommendedSpend: 0,
          savings: detail.spend,
          reason: "Your team currently pays for multiple AI coding assistants with overlapping functionality.",
        });
      });
  }

  const totalMonthlySavings = 
    recommendations.reduce((sum, item) => sum + item.savings, 0);

  return {
    recommendations,
    totalMonthlySavings,
    totalAnnualSavings: totalMonthlySavings * 12,
  };
}