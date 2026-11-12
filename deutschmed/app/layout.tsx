import type { Metadata, Viewport } from "next";
import Script from "next/script";

import { ADSENSE_CLIENT_ID, isAdSenseEnabled } from "@/lib/adsense";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "DeutschMed",
    template: "%s · DeutschMed",
  },
  description:
    "Medizinisches Deutsch für internationale Ärztinnen, Ärzte und Pflegekräfte: Vorbereitung auf Fachsprachenprüfung (FSP) und Kenntnisprüfung (KP).",
  // Lets AdSense verify site ownership.
  ...(isAdSenseEnabled ? { other: { "google-adsense-account": ADSENSE_CLIENT_ID } } : {}),
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

// The persistent sidebar navigation is added in a follow-up PR.
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body className="min-h-dvh">
        {children}
        {isAdSenseEnabled && (
          // AdSense Auto ads: Google picks ad placements. In the EU, the consent
          // banner comes from AdSense > Privacy & messaging (Google-certified CMP).
          <Script
            id="adsense"
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          />
        )}
      </body>
    </html>
  );
}
