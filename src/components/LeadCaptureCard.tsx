"use client";

import { useState } from "react";
import styles from "./LeadCaptureCard.module.css";
import { Recommendation } from "@/lib/audit";
import { toast } from "sonner";

type Props = {
  teamSize: number;
  totalMonthlySavings: number;
  selectedTools: string[];
  recommendations: Recommendation[];
};

export default function LeadCaptureCard({
  teamSize,
  totalMonthlySavings,
  selectedTools,
  recommendations
}: Props) {

  const [email, setEmail] = useState("");

  const [companyName, setCompanyName] = useState("");

  const [role, setRole] = useState("");

  const [submittingLead, setSubmittingLead] = useState(false);

  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const [shareUrl, setShareUrl] = useState("");

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
              recommendations,
              website: "",
            }),
          }
        );

        const data = await response.json();

      if (!response.ok) {
        throw new Error();
      }

    const generatedUrl = `${window.location.origin}/report/${data.auditSlug}`;
    setShareUrl(generatedUrl);
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
            <h2> Your shareable audit report is ready. </h2>
            <p> A confirmation email has been sent with your audit summary. </p>

            <div className={styles.shareBox}>
                <input
                value={shareUrl}
                readOnly
                />

                <button
                className={styles.captureBtn}
                onClick={() => {
                    navigator.clipboard.writeText(shareUrl);
                    toast.success("Link copied to clipboard");
                }}
                >
                Copy Link
                </button>

            </div>
            </div>
        )}
      </div>
    </section>
  );
}