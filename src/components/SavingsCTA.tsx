import styles from "@/app/audit/results/page.module.css";

type Props = {
  totalMonthlySavings: number;
};

export default function SavingsCTA({ 
  totalMonthlySavings 
}: Props) {

  if (totalMonthlySavings >= 8500) {
    return (
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
    );
  }

  return (
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
  );
}