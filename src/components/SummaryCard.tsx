import styles from "@/app/audit/results/page.module.css";

type Props = {
  summary: string;
  loadingSummary: boolean;
};

export default function SummaryCard({
  summary,
  loadingSummary,
}: Props) {

  return (
    <section className={styles.summary}>
      <div className={styles.summaryCard}>
        <p className={styles.summaryLabel}>
          AI GENERATED SUMMARY
        </p>
        <p className={styles.summaryText}>
          {loadingSummary
            ? "Generating personalized audit summary..."
            : summary}
        </p>
      </div>
    </section>
  );
}