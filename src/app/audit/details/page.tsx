"use client";

import styles from "./page.module.css";
import { tools } from "@/data/tools";

import { useAuditStore } from "@/store/audit-store";
import { useRouter } from "next/navigation";
import ToolCard from "@/components/ToolCard";

export default function AuditDetailsPage() {
  const router = useRouter();
  const {selectedTools, toolDetails, updateTool} = useAuditStore();

  const filteredTools = tools.filter((tool) =>
    selectedTools.includes(tool.id));

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.step}>
            STEP 2 OF 3
          </p>

          <h1 className={styles.heading}>
            Add plan and spend details
          </h1>

          <p className={styles.subheading}>
            Tell us what your team currently pays for each selected AI tool.
          </p>
        </div>

        <div className={styles.cards}>
          {filteredTools.map((tool) => (
             <ToolCard
              key={tool.id}
              tool={tool}
              toolDetails={toolDetails[tool.id]}
              updateTool={updateTool}
            />
          ))}
        </div>

        <div className={styles.footer}>
          <button
            className={styles.continueBtn}
            onClick={() => { router.push("/audit/team"); }}
            >
            Continue
            </button>
        </div>
      </div>
    </main>
  );
}