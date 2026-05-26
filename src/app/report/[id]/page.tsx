import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

import AuditHero from "@/components/AuditHero";
import RecommendationsList from "@/components/RecommendationsList";
import styles from "@/app/audit/results/page.module.css";

type Props = {
  params: Promise<{id: string;}>;
};

export default async function PublicReportPage({
  params,
}: Props) {

    const { id } = await params;

  const { data, error } =
    await supabase
      .from("public_audits")
      .select("*")
      .eq("id", id)
      .single();

  if (error || !data) {
    notFound();
  }

  const annualSavings = data.total_savings * 12;

  return (
    <main className={styles.page}>
      <div className={styles.container}>

        <AuditHero
          totalMonthlySavings={data.total_savings}
          totalAnnualSavings={annualSavings}
        />

        <RecommendationsList
          recommendations={data.recommendations}
        />

      </div>
    </main>
  );
}