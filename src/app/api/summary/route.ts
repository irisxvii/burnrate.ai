import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const anthropic =
  new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await anthropic.messages.create({
        model:
          "claude-3-5-sonnet-latest",

        max_tokens: 200,
        messages: [
          {
            role: "user",
            content: body.prompt,
          },
        ],
      });

    const text = response.content[0];

    return NextResponse.json({
      summary: text.type === "text" ? text.text : "",
    });

  } catch {
    return NextResponse.json(
      {
        summary:
          "Your audit suggests there may be opportunities to reduce AI software spend through tool consolidation and plan optimization.",
      },
      {
        status: 200,
      }
    );
  }
}