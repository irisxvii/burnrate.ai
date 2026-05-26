import { supabase } from "@/lib/supabase";

export async function getPublicAudit( slug: string ) {
  const { data, error } =
    await supabase
      .from("public_audits")
      .select("*")
      .eq("slug", slug)
      .single();

  return {
    data,
    error,
  };
}