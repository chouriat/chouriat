import type { Metadata } from "next";
import Link from "next/link";

import { isAdSenseEnabled } from "@/lib/adsense";
import { CONTACT_EMAIL, SITE_OPERATOR } from "@/lib/site-operator";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung von DeutschMed",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <div className="space-y-2 text-sm leading-relaxed text-slate-700">{children}</div>
    </section>
  );
}

export default function DatenschutzPage() {
  return (
    <main className="mx-auto max-w-2xl space-y-8 px-4 py-10">
      <header className="space-y-2">
        <Link href="/" className="text-sm text-blue-700 hover:underline">
          ← Zurück zu DeutschMed
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">Datenschutzerklärung</h1>
      </header>

      <Section title="1. Verantwortlicher">
        {SITE_OPERATOR ? (
          <p className="whitespace-pre-line">{SITE_OPERATOR}</p>
        ) : (
          <p>Die Angaben zum Betreiber werden in Kürze ergänzt.</p>
        )}
        {CONTACT_EMAIL && (
          <p>
            E-Mail: <a className="text-blue-700 hover:underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        )}
      </Section>

      <Section title="2. Hosting und Server-Logdateien">
        <p>
          Diese Website wird auf einem Server in der Europäischen Union betrieben. Beim Aufruf
          werden technisch notwendige Daten verarbeitet (IP-Adresse, Zeitpunkt, aufgerufene Seite,
          Browser). Das dient dem sicheren Betrieb der Website (Art. 6 Abs. 1 lit. f DSGVO).
          Logdateien werden nach kurzer Zeit gelöscht.
        </p>
      </Section>

      <Section title="3. Lernfortschritt und Einstellungen">
        <p>
          Dein Lernfortschritt und deine Einstellungen werden im lokalen Speicher deines Browsers
          (localStorage) abgelegt. Sie verlassen dein Gerät nicht, solange du kein Konto nutzt.
        </p>
      </Section>

      <Section title="4. Eigener KI-Schlüssel und Patienten-Simulator">
        <p>
          Wenn du im Anamnese-Simulator einen eigenen KI-Schlüssel (Google Gemini, OpenAI oder
          Anthropic) hinterlegst, wird er nur in deinem Browser gespeichert. Für eine Antwort
          werden deine Chat-Nachrichten und der Schlüssel über unseren Server an den von dir
          gewählten Anbieter weitergeleitet. Wir speichern weder die Nachrichten noch den
          Schlüssel. Für die Verarbeitung beim Anbieter gelten dessen Datenschutzbestimmungen.
          Gib im Simulator bitte keine echten Patientendaten ein.
        </p>
      </Section>

      <Section title="5. Datenbank (Supabase)">
        <p>
          Lerninhalte wie Fälle und Vokabeln werden aus einer Datenbank des Anbieters Supabase
          geladen. Dabei wird deine IP-Adresse technisch an Supabase übermittelt.
        </p>
      </Section>

      {isAdSenseEnabled && (
        <Section title="6. Werbung (Google AdSense)">
          <p>
            Diese Website finanziert sich über Werbung von Google AdSense (Google Ireland Limited,
            Gordon House, Barrow Street, Dublin 4, Irland). Google kann dafür Cookies und ähnliche
            Technologien einsetzen und Daten wie IP-Adresse und Geräteinformationen verarbeiten,
            auch in Länder außerhalb der EU.
          </p>
          <p>
            Personalisierte Werbung wird nur mit deiner Einwilligung angezeigt (Art. 6 Abs. 1 lit. a
            DSGVO, § 25 Abs. 1 TDDDG). Die Einwilligung holen wir über das Einwilligungsbanner von
            Google ein. Du kannst sie dort jederzeit ändern oder widerrufen. Ohne Einwilligung
            zeigt Google höchstens nicht personalisierte Werbung.
          </p>
          <p>
            Mehr dazu:{" "}
            <a className="text-blue-700 hover:underline" href="https://policies.google.com/technologies/ads?hl=de" target="_blank" rel="noopener noreferrer">
              Wie Google Daten bei Werbung verwendet
            </a>
            .
          </p>
        </Section>
      )}

      <Section title={isAdSenseEnabled ? "7. Deine Rechte" : "6. Deine Rechte"}>
        <p>
          Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
          Datenübertragbarkeit und Widerspruch sowie auf Widerruf erteilter Einwilligungen. Außerdem
          kannst du dich bei einer Datenschutz-Aufsichtsbehörde beschweren.
        </p>
      </Section>

      <p className="text-xs text-slate-500">Stand: November 2026</p>
    </main>
  );
}
