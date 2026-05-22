"use client";

import styles from "./page.module.css";

import { useRouter } from "next/navigation";
import { useAuditStore } from "@/store/audit-store";

export default function AuditTeamPage() {
  const router = useRouter();

  const teamSize = 
    useAuditStore((state) => state.teamSize);

  const setTeamSize = 
    useAuditStore((state) => state.setTeamSize);

  const useCase = 
    useAuditStore((state) => state.useCase);

  const setUseCase = 
    useAuditStore((state) => state.setUseCase);

  const useCases = [
    "Coding",
    "Writing",
    "Research",
    "Data",
    "Mixed",
  ];
  
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
            A little context helps generate more relevant savings recommendations.
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
              value={teamSize}
              onChange={(e) => 
                setTeamSize(Number(e.target.value))}
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
              {useCases.map((caseItem) => (
                <button
                  key={caseItem}
                  type="button"
                  className={`${styles.option} ${
                    useCase === caseItem
                      ? styles.selected
                      : ""
                  }`}
                  onClick={() => setUseCase(caseItem)}
                >
                  {caseItem}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button
            className={styles.generateBtn}
            disabled={!teamSize || !useCase}

            onClick={() => {
              router.push("/audit/results");
            }}
          >
            Generate Audit
          </button>
        </div>
      </div>
    </main>
  );
}