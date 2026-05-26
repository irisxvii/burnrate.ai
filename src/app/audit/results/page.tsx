"use client";

import styles from "./page.module.css";
import { useAuditStore } from "@/store/audit-store";
import { runAudit } from "@/lib/audit";

import LeadCaptureCard from "@/components/LeadCaptureCard";
import { useAuditSummary } from "@/hooks/useAuditSummary";
import SavingsCTA from "@/components/SavingsCTA";
import RecommendationsList from "@/components/RecommendationsList";
import SummaryCard from "@/components/SummaryCard";
import AuditHero from "@/components/AuditHero";

export default function AuditResultsPage() {
  const {
    selectedTools,
    toolDetails,
    teamSize,
    useCase,
  } = useAuditStore();

  const audit = runAudit({selectedTools, toolDetails, teamSize, useCase,});

  const {recommendations, totalMonthlySavings, totalAnnualSavings} = audit;

  const { summary, loadingSummary } = useAuditSummary({
    recommendations,
    totalSavings: totalMonthlySavings,
  });

  return (
    <main className={styles.page}>
      <div className={styles.container}>  

      <AuditHero
        totalMonthlySavings={totalMonthlySavings}
        totalAnnualSavings={totalAnnualSavings}
      />

      <RecommendationsList
        recommendations={recommendations}
      />

      <SummaryCard
        summary={summary}
        loadingSummary={loadingSummary}
      />

      <SavingsCTA
        totalMonthlySavings={totalMonthlySavings}
      />

      <LeadCaptureCard
        teamSize={teamSize}
        totalMonthlySavings={totalMonthlySavings}
        selectedTools={selectedTools}
        recommendations={recommendations}
      />

      </div>
    </main>
  );
}