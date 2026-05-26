import { notFound } from "next/navigation";

import AuditHero from "@/components/AuditHero";
import RecommendationsList from "@/components/RecommendationsList";
import styles from "@/app/audit/results/page.module.css";

import { Metadata } from "next";
import { getPublicAudit } from "@/lib/public-audits";

type Props = {
  params: Promise<{slug: string;}>;
};
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {

  const { slug } = await params;
  const { data } = await getPublicAudit(slug);

  if (!data) {
    return {
      title: "Audit Report | BurnRate.ai",
    };
  }

  return {
    title:
      `₹${data.total_savings.toLocaleString()}/mo AI Savings Audit`,

    description:
      `AI spend audit identifying ₹${data.total_savings.toLocaleString()}/month in optimization opportunities.`,

    openGraph: {
      title:
        `₹${data.total_savings.toLocaleString()}/mo AI Savings Audit`,

      description:
        `View this AI stack optimization audit generated with BurnRate.ai.`,

      type: "website",
    },

    twitter: {
      card:
        "summary_large_image",

      title:
        `₹${data.total_savings.toLocaleString()}/mo AI Savings Audit`,

      description:
        `View this AI stack optimization audit generated with BurnRate.ai.`,
    },
  };
}

export default async function PublicReportPage({
  params,
}: Props) {

  const { slug } = await params;
  const { data, error } = await getPublicAudit(slug);

  if (error || !data) {
    notFound();
  }

  const annualSavings = data.total_savings * 12;

  return (
    <main className={styles.page}>
      <div className={styles.container}>

        <AuditHero
          totalMonthlySavings={data.total_savings}
          totalAnnualSavings={annualSavings}
        />

        <RecommendationsList
          recommendations={data.recommendations}
        />

      </div>
    </main>
  );
}