import { ADSENSE_PUBLISHER_ID, isAdSenseEnabled } from "@/lib/adsense";

export const dynamic = "force-static";

// Serves /ads.txt so AdSense can verify this site is allowed to sell its ad space.
export function GET() {
  const body = isAdSenseEnabled
    ? `google.com, ${ADSENSE_PUBLISHER_ID}, DIRECT, f08c47fec0942fa0\n`
    : "# AdSense is not configured. Set NEXT_PUBLIC_ADSENSE_CLIENT_ID.\n";

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
