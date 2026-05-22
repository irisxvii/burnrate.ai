"use client";

import styles from "./page.module.css";

const mockResults = [
  {
    tool: "ChatGPT Team",
    currentSpend: 60,
    recommendedPlan: "ChatGPT Plus",
    recommendedSpend: 20,
    savings: 40,
    reason: "Team collaboration features are likely unnecessary for a 2-person workflow.",
  },

  {
    tool: "Claude Team",
    currentSpend: 100,
    recommendedPlan: "Claude Pro",
    recommendedSpend: 40,
    savings: 60,
    reason: "Your usage pattern suggests individual subscriptions would be more cost effective.",
  },
];

export default function AuditResultsPage() {
  const totalMonthlySavings =
    mockResults.reduce((acc, item) => acc + item.savings, 0);

  const totalAnnualSavings = totalMonthlySavings * 12;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.hero}>
          <p className={styles.label}>
            AI SPEND AUDIT RESULTS
          </p>

          <h1 className={styles.heroValue}>
            ${totalMonthlySavings}/mo
          </h1>

          <p className={styles.heroSubValue}>
            ${totalAnnualSavings.toLocaleString()}
            /year in potential savings
          </p>

          <p className={styles.heroText}>
            Your team is overspending on overlapping subscriptions and underutilized team plans.
          </p>
        </section>

        <section className={styles.breakdown}>
          <div className={styles.sectionHeader}>
            <h2>Recommended Optimizations</h2>
            <p>Per-tool savings breakdown based on your current stack.</p>
          </div>

          <div className={styles.cards}>
            {mockResults.map((result) => (
              <div
                key={result.tool}
                className={styles.card}
              >
                <div className={styles.cardTop}>
                  <div>
                    <h3>{result.tool}</h3>

                    <p>Current spend: ${result.currentSpend}/mo</p>
                  </div>

                  <div className={styles.savings}>
                    +${result.savings}/mo
                  </div>
                </div>

                <div className={styles.planBox}>
                  <div>
                    <span>
                      Recommended Plan
                    </span>

                    <h4>{result.recommendedPlan}</h4>
                  </div>

                  <div className={styles.reducedSpend}>
                    $
                    {result.recommendedSpend}/mo
                  </div>
                </div>

                <p className={styles.reason}>
                  {result.reason}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.cta}>
          <div className={styles.ctaCard}>
            <div>
              <p className={styles.ctaLabel}>
                NEED DEEPER OPTIMIZATION?
              </p>

              <h2>
                Capture even more savings with infrastructure-level AI cost optimization.
              </h2>
            </div>

            <button className={styles.ctaBtn}>
              Talk to Credex
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}