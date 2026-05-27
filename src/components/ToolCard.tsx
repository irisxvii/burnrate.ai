"use client";

import Image from "next/image";
import styles from "@/app/audit/details/page.module.css";

import { plans } from "@/data/plans";
import { tools } from "@/data/tools";

type ToolDetails = {
  plan?: string;
  spend?: number;
  seats?: number;
};

type Props = {
  tool: typeof tools[number];
  toolDetails?: ToolDetails;
  updateTool: (
    toolId: string,
    field: string,
    value: string | number
  ) => void;
};

export default function ToolCard({
  tool,
  toolDetails,
  updateTool,
}: Props) {
  return (
    <div className={styles.card}>
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

          <select
            value={toolDetails?.plan || ""}
            onChange={(e) => updateTool(tool.id, "plan", e.target.value)}
          >
            {plans[
              tool.id as keyof typeof plans
            ]?.map((plan) => (
              <option
                key={plan}
                value={plan}
              >
                {plan}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label>Total Monthly Spend (₹)</label>

          <input
            type="number"
            placeholder="₹18000"
            value={toolDetails?.spend || ""}
            onChange={(e) => updateTool(tool.id, "spend", Number(e.target.value))}
          />
        </div>

        <div className={styles.field}>
          <label>Seats</label>

          <input
            type="number"
            placeholder="5"
            value={toolDetails?.seats || ""}
            onChange={(e) => updateTool(tool.id, "seats", Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}