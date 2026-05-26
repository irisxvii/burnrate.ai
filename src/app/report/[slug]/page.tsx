import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

import AuditHero from "@/components/AuditHero";
import RecommendationsList from "@/components/RecommendationsList";
import styles from "@/app/audit/results/page.module.css";

type Props = {
  params: Promise<{slug: string;}>;
};

export default async function PublicReportPage({
  params,
}: Props) {

  const { slug } = await params;

  const { data, error } =
    await supabase
      .from("public_audits")
      .select("*")
      .eq("slug", slug)
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