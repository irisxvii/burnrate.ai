import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { resend } from "@/lib/resend";
import { buildAuditEmail } from "@/lib/email/audit-email";

export async function POST(req: Request) {
  try {
    const {
      email,
      companyName,
      role,
      teamSize,
      totalSavings,
      selectedTools,
      recommendations,
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

      const slug = `credex-${Math.floor(1000 + Math.random() * 9000)}`;

      const {
        data: publicAudit,
        error: publicAuditError,
        } = await supabase
        .from("public_audits")
        .insert([
            {
            total_savings: totalSavings,
            selected_tools: selectedTools,
            recommendations,
            slug,
            },
        ])
        .select()
        .single();

        if (publicAuditError) {
            console.log(publicAuditError);
            throw publicAuditError;
        }

    await resend.emails.send({
        from: "BurnRate <audit@burnrateai.dev>",
        to: email,
        subject: "Your AI spend audit is ready",
        html: buildAuditEmail({totalSavings}),
    });

    return NextResponse.json({
        success: true,
        auditSlug: publicAudit.slug,
    });

  } catch (error) {
    console.log("SUPABASE ERROR:", error);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}