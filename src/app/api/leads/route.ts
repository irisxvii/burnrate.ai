import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const {
      email,
      companyName,
      role,
      teamSize,
      totalSavings,
      selectedTools,
      website,
    } = await req.json();

    // Honeypot protection
    if (website) {
      return NextResponse.json(
        { success: false },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("leads")
      .insert({
        email,
        company_name: companyName,
        role,
        team_size: teamSize,
        total_savings: totalSavings,
        selected_tools: selectedTools,
      });

    if (error) {
        console.log(error);
      throw error;
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.log("SUPABASE ERROR:", error);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}