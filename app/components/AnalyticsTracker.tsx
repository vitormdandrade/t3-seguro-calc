"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const SITE = process.env.NEXT_PUBLIC_SITE_NAME || "calculaseguro";

export function AnalyticsTracker() {
  const pathname = usePathname();
  useEffect(() => {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return;
    fetch(`${SUPABASE_URL}/rest/v1/mc_pageviews`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal",
      },
      body: JSON.stringify({
        site: SITE,
        path: pathname || "/",
        referrer: document.referrer || null,
      }),
    }).catch(() => {}); // silent fail
  }, [pathname]);
  return null;
}
