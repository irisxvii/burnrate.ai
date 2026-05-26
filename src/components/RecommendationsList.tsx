import styles from "@/app/audit/results/page.module.css";
import { Recommendation } from "@/lib/audit";

type Props = {
  recommendations: Recommendation[];
};

export default function RecommendationsList({
  recommendations,
}: Props) {

  return (
    <section className={styles.breakdown}>
      <div className={styles.sectionHeader}>
        <h2> Recommended Optimizations </h2>

        <p> Per-tool savings breakdown based on your current stack. </p>
      </div>

      <div className={styles.cards}>
        {recommendations.map((result) => (
            <div
              key={result.toolId}
              className={styles.card}
            >
              <div className={styles.cardTop}>
                <div>
                  <h3>{result.toolName}</h3>
                  <p>Current spend: ₹{Math.round(result.currentSpend).toLocaleString()}/mo</p>
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
  );
}