import { useEffect, useState } from "react";
import { Recommendation } from "@/lib/audit";

type Props = {
  recommendations: Recommendation[];
  totalSavings: number;
};

export function useAuditSummary({
  recommendations,
  totalSavings,
}: Props) {

  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(true);

  useEffect(() => {
    async function fetchSummary() {
      if ( recommendations.length === 0 ) {
        return;
      }

      try {
        const response = await fetch( "/api/summary",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ recommendations, totalSavings }),
            }
          );

        const data = await response.json();

        setSummary( data.summary );
      } catch {
        setSummary(`Your audit identified approximately ₹${totalSavings.toLocaleString()} in potential monthly savings across ${recommendations.length} optimization opportunities. Your current AI stack appears to contain opportunities for plan optimization and tool consolidation, particularly across overlapping subscriptions and underutilized premium tiers.`);
      } finally {
        setLoadingSummary( false );
      }
    }

    fetchSummary();
  }, [ recommendations, totalSavings ]
  );

  return {
    summary,
    loadingSummary,
  };
}