"use client";

import styles from "./page.module.css";
import { tools } from "@/data/tools";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useAuditStore } from "@/store/audit-store";

export default function AuditPage() {
  const selectedTools =
    useAuditStore(
      (state) => state.selectedTools
    );

  const setSelectedTools =
    useAuditStore(
      (state) => state.setSelectedTools
    );

  const toggleTool = (toolId: string) => {
    if (selectedTools.includes(toolId)) {
      setSelectedTools(
        selectedTools.filter(
          (id) => id !== toolId
        )
      );
    } else {
      setSelectedTools([
        ...selectedTools,
        toolId,
      ]);
    }
  };

  const router = useRouter();

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.step}>STEP 1 OF 3</p>

          <h1 className={styles.heading}>
            Which AI tools does your team use?
          </h1>

          <p className={styles.subheading}>
            Select all that apply. You&apos;ll add plan details next.
          </p>
        </div>

        <div className={styles.grid}>
          {tools.map((tool) => {
            const selected = selectedTools.includes(tool.id);

            return (
              <button
                key={tool.id}
                className={`${styles.card} ${
                  selected ? styles.selected : ""
                }`}
                onClick={() => toggleTool(tool.id)}
              >
                <div className={styles.cardTop}>
                  <div className={styles.icon}>
                    <Image
                        src={tool.icon}
                        alt={tool.name}
                        width={50}
                        height={50}
                        />
                  </div>

                  <div
                    className={`${styles.checkbox} ${
                      selected ? styles.checked : ""
                    }`}
                  >
                    {selected}
                  </div>
                </div>

                <div className={styles.cardContent}>
                  <h3>{tool.name}</h3>
                  <p>{tool.category}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className={styles.footer}>
          <button
            className={styles.continueBtn}
            disabled={selectedTools.length === 0}
            onClick={() => {
                router.push("/audit/details");
            }}
            >
            Continue 
            </button>
        </div>
      </div>
    </main>
  );
}