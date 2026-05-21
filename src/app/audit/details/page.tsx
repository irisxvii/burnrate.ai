"use client";

import styles from "./page.module.css";
import Image from "next/image";
import { tools } from "@/data/tools";
import { plans } from "@/data/plans";

export default function AuditDetailsPage() {
  const selectedTools = [
    "cursor",
    "claude",
  ];

  const filteredTools = tools.filter((tool) =>
    selectedTools.includes(tool.id)
  );

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
            Tell us what your team currently pays
            for each selected AI tool.
          </p>
        </div>

        <div className={styles.cards}>
          {filteredTools.map((tool) => (
            <div
              className={styles.card}
              key={tool.id}
            >
              <div className={styles.cardHeader}>
                <div className={styles.toolInfo}>
                  <div className={styles.icon}>
                    <Image
                        src={tool.icon}
                        alt={tool.name}
                        width={24}
                        height={24}
                        />
                  </div>

                  <div>
                    <h3>{tool.name}</h3>
                    <p>{tool.category}</p>
                  </div>
                </div>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label>Plan</label>

                  <select>
                    {plans[
                      tool.id as keyof typeof plans
                    ]?.map((plan) => (
                      <option key={plan}>
                        {plan}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.field}>
                  <label>Monthly Spend</label>

                  <input
                    type="number"
                    placeholder="$150"
                  />
                </div>

                <div className={styles.field}>
                  <label>Seats</label>

                  <input
                    type="number"
                    placeholder="5"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <button className={styles.continueBtn}>
            Continue
          </button>
        </div>
      </div>
    </main>
  );
}