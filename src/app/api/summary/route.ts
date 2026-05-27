import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import type { Recommendation } from "@/lib/audit";
import { buildSummaryPrompt } from "@/lib/prompts";

const summaryCache = new Map<
  string,
  { summary: string; expiresAt: number }
>();

export async function POST(req: Request) {
  let recommendations: Recommendation[] = [];
  let totalSavings = 0;

  try {
    const body = await req.json();
    recommendations = body.recommendations ?? [];
    totalSavings = body.totalSavings ?? 0;

    const compact = [...recommendations]
      .sort((a, b) => (b.savings ?? 0) - (a.savings ?? 0))
      .slice(0, 7)
      .map((r) => ({
        toolName: r.toolName,
        currentPlan: r.currentPlan,
        recommendedPlan: r.recommendedPlan,
        savings: r.savings,
        reason: r.reason,
      }));

    const cacheKey = JSON.stringify({ totalSavings, compact });
    const cached = summaryCache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
      return NextResponse.json({ summary: cached.summary });
    }

    const topRecs = [...recommendations]
      .sort((a, b) => (b.savings ?? 0) - (a.savings ?? 0))
      .slice(0, 7);

    const prompt = buildSummaryPrompt(topRecs, totalSavings);

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY not set");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(prompt);
    const text = result?.response?.text?.() ?? "";

    const summary =
      text.trim().length > 0
        ? text.trim()
        : buildRuleBasedSummary(recommendations, totalSavings);

    summaryCache.set(cacheKey, {
      summary,
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
    });

    return NextResponse.json({ summary });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[/api/summary] AI summary error:", message);

    const fallback = buildRuleBasedSummary(recommendations, totalSavings);

    const compact = [...recommendations]
      .sort((a, b) => (b.savings ?? 0) - (a.savings ?? 0))
      .slice(0, 7)
      .map((r) => ({
        toolName: r.toolName,
        currentPlan: r.currentPlan,
        recommendedPlan: r.recommendedPlan,
        savings: r.savings,
        reason: r.reason,
      }));

    const cacheKey = JSON.stringify({ totalSavings, compact });
    summaryCache.set(cacheKey, {
      summary: fallback,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes for fallback
    });

    return NextResponse.json({ summary: fallback }, { status: 200 });
  }
}

function buildRuleBasedSummary(
  recommendations: Recommendation[],
  totalSavings: number
) {
  const total = Math.max(0, totalSavings || 0);
  const count = recommendations.length;

  if (count === 0 || total === 0) {
    return "Your current AI stack looks reasonably lean based on the inputs you provided. We did not detect any obvious savings opportunities from overlapping tools or oversized plans at your reported team size.";
  }

  const sorted = [...recommendations].sort(
    (a, b) => (b.savings ?? 0) - (a.savings ?? 0)
  );

  const top = sorted.find((r) => (r.savings ?? 0) > 0);
  const positiveCount = recommendations.filter(
    (r) => (r.savings ?? 0) > 0
  ).length;

  const hasOverlap = recommendations.some((r) =>
    r.reason.toLowerCase().includes("overlapping")
  );
  const hasPremium =
    recommendations.some((r) =>
      r.reason.toLowerCase().includes("oversized")
    ) ||
    recommendations.some((r) =>
      r.recommendedPlan.toLowerCase().includes("lower-tier")
    );

  const parts: string[] = [];

  parts.push(
    `Your audit identified approximately ₹${total.toLocaleString()} in potential monthly savings across ${positiveCount || count} optimization opportunities in your AI stack.`
  );

  if (top) {
    parts.push(
      `The single biggest opportunity is ${top.toolName}, where you could save around ₹${top.savings.toLocaleString()} per month by moving to “${top.recommendedPlan}”.`
    );
  }

  if (hasOverlap) {
    parts.push(
      "You are paying for multiple tools with overlapping functionality; consolidating to a smaller set of assistants would unlock part of these savings."
    );
  }

  if (hasPremium) {
    parts.push(
      "Some subscriptions appear oversized for your current team size, so stepping down from premium tiers is another meaningful lever."
    );
  }

  parts.push(
    "Treat these numbers as directional rather than precise finance advice, but they should give you a clear starting point for cutting AI software waste this quarter."
  );

  return parts.join(" ");
}