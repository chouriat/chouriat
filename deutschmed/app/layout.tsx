import type { Metadata, Viewport } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "DeutschMed",
    template: "%s · DeutschMed",
  },
  description:
    "Medizinisches Deutsch für internationale Ärztinnen, Ärzte und Pflegekräfte: Vorbereitung auf Fachsprachenprüfung (FSP) und Kenntnisprüfung (KP).",
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
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
