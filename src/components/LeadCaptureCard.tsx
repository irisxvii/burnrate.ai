"use client";

import { useState } from "react";
import styles from "./LeadCaptureCard.module.css";

type Props = {
  teamSize: number;
  totalMonthlySavings: number;
  selectedTools: string[];
};

export default function LeadCaptureCard({
  teamSize,
  totalMonthlySavings,
  selectedTools,
}: Props) {

  const [email, setEmail] = useState("");

  const [companyName, setCompanyName] = useState("");

  const [role, setRole] = useState("");

  const [submittingLead, setSubmittingLead] = useState(false);

  const [leadSubmitted, setLeadSubmitted] = useState(false);

  async function submitLead() {
    try {
      setSubmittingLead(true);

      const response =
        await fetch(
          "/api/leads",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },

            body: JSON.stringify({
              email,
              companyName,
              role,
              teamSize,
              totalSavings: totalMonthlySavings,
              selectedTools,
              website: "",
            }),
          }
        );

      if (!response.ok) {
        throw new Error();
      }

      setLeadSubmitted(true);

    } catch (error) {
      console.log(error);
    } finally {
      setSubmittingLead(false);
    }
  }

  return (
    <section className={styles.capture}>
      <div className={styles.captureCard}>
        {!leadSubmitted ? (
          <>
            <div>
              <p className={styles.captureLabel}>
                SAVE & SHARE AUDIT
              </p>

              <h2> Get a shareable audit link and receive a copy of your report by email. </h2>
            </div>

            <div className={styles.captureForm}>

              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="text"
                placeholder="Company name (optional)"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />

              <input
                type="text"
                placeholder="Role (optional)"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />

              <button
                onClick={submitLead}
                disabled={submittingLead ||!email}
                className={styles.captureBtn}
              >
                {submittingLead
                  ? "Saving..."
                  : "Generate Shareable Report"}
              </button>
            </div>

          </>
        ) : (

          <div className={styles.captureSuccess}>
            <p className={styles.captureLabel}>
              AUDIT SAVED
            </p>

            <h2> Your audit report has been saved successfully.</h2>

            <p> A confirmation email will be sent shortly. </p>
          </div>
        )}
      </div>
    </section>
  );
}