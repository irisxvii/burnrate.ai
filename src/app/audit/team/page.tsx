"use client";

import styles from "./page.module.css";

export default function AuditTeamPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.step}>
            STEP 3 OF 3
          </p>

          <h1 className={styles.heading}>
            Tell us about your team
          </h1>

          <p className={styles.subheading}>
            A little context helps generate more
            relevant savings recommendations.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.field}>
            <label>
              Team Size
            </label>

            <input
              type="number"
              placeholder="10"
            />

            <span className={styles.helper}>
              Number of people actively using AI tools.
            </span>
          </div>

          <div className={styles.field}>
            <label>
              Primary Use Case
            </label>

            <div className={styles.options}>
              <button className={styles.option}>
                Coding
              </button>

              <button className={styles.option}>
                Writing
              </button>

              <button className={styles.option}>
                Research
              </button>

              <button className={styles.option}>
                Data
              </button>

              <button className={styles.option}>
                Mixed
              </button>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.generateBtn}>
            Generate Audit
          </button>
        </div>
      </div>
    </main>
  );
}