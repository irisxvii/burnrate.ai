"use client";

import styles from "./page.module.css";

import { useAuditStore } from "@/store/audit-store";
import { runAudit } from "@/lib/audit";

export default function AuditResultsPage() {

  const selectedTools =
    useAuditStore((state) => state.selectedTools);

  const toolDetails =
    useAuditStore((state) => state.toolDetails);

  const teamSize =
    useAuditStore((state) => state.teamSize);

  const useCase =
    useAuditStore((state) => state.useCase);

  const audit = 
    runAudit({selectedTools, toolDetails, teamSize, useCase,});

  const {recommendations, totalMonthlySavings, totalAnnualSavings} = audit;

  return (
    <main className={styles.page}>
      <div className={styles.container}>

        <section className={styles.hero}>
          <p className={styles.label}>
            AI SPEND AUDIT RESULTS
          </p>

          <h1 className={styles.heroValue}>
            ₹{Math.round(totalMonthlySavings).toLocaleString()}/mo
          </h1>

          <p className={styles.heroSubValue}>
            ₹
            {Math.round(totalAnnualSavings).toLocaleString()}/year in potential savings
          </p>

          <p className={styles.heroText}>
            Your team may be overspending on overlapping subscriptions and underutilized plans.
          </p>
        </section>

        <section className={styles.breakdown}>
          <div className={styles.sectionHeader}>
            <h2>Recommended Optimizations</h2>
            <p>Per-tool savings breakdown based on your current stack.</p>
          </div>

          <div className={styles.cards}>
            {recommendations.map(
              (result) => (
                <div
                  key={result.toolId}
                  className={styles.card}
                >
                  <div className={styles.cardTop}>
                    <div>
                      <h3>{result.toolName}</h3>

                      <p>
                        Current spend:₹{Math.round(result.currentSpend).toLocaleString()}/mo
                      </p>
                    </div>

                    <div className={styles.savings}>
                      +₹{Math.round(result.savings).toLocaleString()}/mo
                    </div>
                  </div>

                  <div className={styles.planBox}>
                    <div>
                      <span>Recommended Plan</span>

                      <h4>{result.recommendedPlan}</h4>
                    </div>

                    <div className={styles.reducedSpend}>
                      ₹{Math.round(result.recommendedSpend).toLocaleString()}/mo
                    </div>
                  </div>

                  <p className={styles.reason}>
                    {result.reason}
                  </p>
                </div>
              )
            )}
          </div>
        </section>

        {totalMonthlySavings >= 8500 && (
          <section className={styles.cta}>
            <div className={styles.ctaCard}>
              <div>
                <p className={styles.ctaLabel}>
                  NEED DEEPER OPTIMIZATION?
                </p>
                <h2>Capture even more savings with infrastructure-level AI cost optimization.</h2>
              </div>

              <button className={styles.ctaBtn}>
                Talk to Credex
              </button>
            </div>
          </section>
        )}

        {totalMonthlySavings < 8500 && (
        <section className={styles.cta}>
          <div className={`${styles.ctaCard} ${styles.optimizedCard}`}>
            <div>
              <p className={styles.ctaLabel}>
                STACK STATUS
              </p>
              <h2>
                Your current AI spending appears reasonably optimized. 
              </h2>
              <p>We’ll notify you when new optimization opportunities apply to your stack.</p>
            </div>
            <button className={styles.ctaBtn}>
              Notify Me
            </button>
          </div>
        </section>
      )}
      </div>
    </main>
  );
}