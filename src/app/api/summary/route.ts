import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import type { Recommendation } from "@/lib/audit";
import { buildSummaryPrompt } from "@/lib/prompts";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  let recommendations: Recommendation[] = [];
  let totalSavings = 0;

  try {
    const body = await req.json();
    recommendations = body.recommendations ?? [];
    totalSavings = body.totalSavings ?? 0;

    const prompt = buildSummaryPrompt(recommendations, totalSavings);

    const model =
      genAI.getGenerativeModel({
           model: "gemini-2.0-flash",
      });

    const result = await model.generateContent(prompt);

    const summary = result.response.text();

    return NextResponse.json({summary,});

  } catch (error) {
    console.log(error);

    return NextResponse.json({
      summary:
      `Your audit identified approximately ₹${totalSavings.toLocaleString()} in potential monthly savings across ${recommendations.length} optimization opportunities. Your current AI stack appears to contain opportunities for plan optimization and tool consolidation, particularly across overlapping subscriptions and underutilized premium tiers.`,
    });
  }
}