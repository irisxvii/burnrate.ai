import styles from "@/app/audit/results/page.module.css";

type Props = {
  totalMonthlySavings: number;
  totalAnnualSavings: number;
};

export default function AuditHero({
  totalMonthlySavings,
  totalAnnualSavings,
}: Props) {

  return (
    <section className={styles.hero}>
      <p className={styles.label}>
        AI SPEND AUDIT RESULTS
      </p>

      <h1 className={styles.heroValue}>
        ₹{Math.round(totalMonthlySavings).toLocaleString()}/mo
      </h1>

      <p className={styles.heroSubValue}>
        ₹{Math.round(totalAnnualSavings).toLocaleString()}/year in potential savings
      </p>

      <p className={styles.heroText}>
        Your team may be overspending on overlapping subscriptions and underutilized plans.
      </p>

    </section>
  );
}