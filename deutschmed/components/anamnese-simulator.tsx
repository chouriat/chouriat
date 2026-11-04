"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Brain,
  Eye,
  EyeOff,
  Info,
  Lightbulb,
  Loader2,
  RotateCcw,
  RotateCw,
  Send,
  User,
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  MAX_MESSAGE_CHARS,
  type AnamneseError,
  type AnamneseRequest,
  type AnamneseResponse,
  type ChatMessage,
} from "@/lib/anamnese";
import { getHiddenFacts, getSpeaker, getVitals, type Scenario } from "@/lib/scenarios";
import { cn } from "@/lib/utils";

type AnamneseSimulatorProps = {
  scenarios: Scenario[];
  /** Where the cases came from: the database, or the static fallback. */
  source: "supabase" | "static";
  /** False when ANTHROPIC_API_KEY is not set and the offline demo patient answers. */
  aiEnabled: boolean;
};

const newId = () => (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Math.random()));

export default function AnamneseSimulator({ scenarios, source, aiEnabled }: AnamneseSimulatorProps) {
  const [scenarioId, setScenarioId] = useState(scenarios[0]?.id ?? "");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [showFacts, setShowFacts] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"ai" | "demo">(aiEnabled ? "ai" : "demo");

  const scenario = scenarios.find((s) => s.id === scenarioId) ?? null;
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep the newest message in view.
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading, error]);

  if (!scenario) {
    return <div className="text-muted-foreground p-8 text-center">Keine Fälle verfügbar.</div>;
  }

  const speaker = getSpeaker(scenario);
  const vitals = getVitals(scenario);
  const hiddenFacts = getHiddenFacts(scenario);
  const userLabel = scenario.target_role === "doctor" ? "Doc" : "Pfl";

  const resetSession = () => {
    setIsSessionActive(false);
    setMessages([]);
    setInputValue("");
    setError(null);
    setShowFacts(false);
  };

  const selectScenario = (id: string) => {
    setScenarioId(id);
    resetSession();
  };

  const startSimulation = () => {
    setIsSessionActive(true);
    setError(null);
    setMessages([
      {
        id: newId(),
        role: "patient",
        status: "sent",
        content: `Guten Tag … (stöhnt leise). ${scenario.chief_complaint}`,
      },
    ]);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  /** Sends the conversation up to and including `pending`, a user message that is already on screen. */
  const requestReply = async (history: ChatMessage[], pending: ChatMessage) => {
    setIsLoading(true);
    setError(null);

    const chatHistory: AnamneseRequest["chatHistory"] = [...history, pending]
      .filter((m) => m.status === "sent" || m.id === pending.id)
      .map(({ role, content }) => ({ role, content }));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenarioId: scenario.id, chatHistory } satisfies AnamneseRequest),
      });
      const data = (await response.json().catch(() => null)) as AnamneseResponse | AnamneseError | null;

      if (!response.ok || !data || "error" in data) {
        throw new Error(data && "error" in data ? data.error : "Der KI-Patient ist gerade nicht erreichbar.");
      }

      setMode(data.mode);
      // Confirm the optimistic message, attach its correction, then append the patient's reply.
      setMessages((prev) => [
        ...prev.map((m) => (m.id === pending.id ? { ...m, status: "sent" as const, correction: data.correction } : m)),
        { id: newId(), role: "patient", status: "sent", content: data.patient_reply },
      ]);
    } catch (err) {
      console.error("Failed to generate response:", err);
      setMessages((prev) => prev.map((m) => (m.id === pending.id ? { ...m, status: "failed" as const } : m)));
      setError(err instanceof Error ? err.message : "Unbekannter Fehler.");
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text || isLoading) return;

    // A message that failed earlier is dropped once the user writes a new one.
    const history = messages.filter((m) => m.status !== "failed");
    const pending: ChatMessage = { id: newId(), role: "user", status: "sending", content: text };

    // Optimistic UI update: show the user's message instantly.
    setInputValue("");
    setMessages([...history, pending]);
    await requestReply(history, pending);
  };

  const retryMessage = async (failed: ChatMessage) => {
    if (isLoading) return;
    const index = messages.findIndex((m) => m.id === failed.id);
    const history = messages.slice(0, index);
    const pending: ChatMessage = { ...failed, status: "sending" };
    setMessages([...history, pending]);
    await requestReply(history, pending);
  };

  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 p-4 sm:gap-6 sm:p-6 lg:h-[calc(100dvh-4rem)] lg:grid-cols-3">
      {/* LEFT COLUMN: Clinical Patient Dossier File */}
      <div className="flex flex-col gap-4 lg:col-span-1 lg:h-full lg:overflow-y-auto lg:pr-2">
        <label className="grid gap-1.5 text-sm">
          <span className="text-muted-foreground font-medium">Fall auswählen</span>
          <select
            value={scenario.id}
            onChange={(e) => selectScenario(e.target.value)}
            disabled={isLoading}
            className="border-input bg-card focus-visible:ring-ring/50 h-9 rounded-md border px-3 text-sm shadow-xs outline-none focus-visible:ring-[3px]"
          >
            {scenarios.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title} ({s.difficulty}, {s.target_role === "doctor" ? "Arzt" : "Pflege"})
              </option>
            ))}
          </select>
        </label>

        <Card className="border-t-4 border-t-blue-600 shadow-md">
          <CardHeader className="pb-3">
            <div className="mb-1 flex items-center justify-between">
              <Badge
                variant="outline"
                className="border-blue-200 bg-blue-50 font-semibold text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300"
              >
                {scenario.specialty}
              </Badge>
              <Badge className="bg-amber-500 text-white hover:bg-amber-600">{scenario.difficulty}</Badge>
            </div>
            <CardTitle className="text-xl">{scenario.title}</CardTitle>
            <CardDescription>Patientenakte / Patient Record File</CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4 text-sm">
            <div className="bg-muted/60 rounded-lg border p-3">
              <h4 className="text-foreground mb-2 flex items-center gap-2 font-bold">
                <User size={16} /> Demografie
              </h4>
              <p>
                <strong>Name:</strong> {scenario.patient.name}
              </p>
              <p>
                <strong>Alter / Geschlecht:</strong> {scenario.patient.age ?? "?"} Jahre ({scenario.patient.gender})
              </p>
              {scenario.patient.profession && (
                <p>
                  <strong>Beruf:</strong> {scenario.patient.profession}
                </p>
              )}
              {speaker && (
                <p className="mt-2 text-xs">
                  <strong>Fremdanamnese:</strong> Sie sprechen mit {speaker}.
                </p>
              )}
            </div>

            {vitals.length > 0 && (
              <div className="rounded-lg border border-rose-100 bg-rose-50/50 p-3 dark:border-rose-950 dark:bg-rose-950/30">
                <h4 className="mb-2 flex items-center gap-2 font-bold text-rose-800 dark:text-rose-300">
                  <Activity size={16} className="animate-pulse text-rose-600" /> Vitalzeichen (Vitals)
                </h4>
                {vitals.map((v) => (
                  <p key={v.label}>
                    <strong>{v.label}:</strong> {v.value}
                  </p>
                ))}
              </div>
            )}

            {hiddenFacts.length > 0 && (
              <div className="space-y-2 border-t pt-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="-ml-2"
                  onClick={() => setShowFacts((v) => !v)}
                  aria-expanded={showFacts}
                >
                  {showFacts ? <EyeOff /> : <Eye />}
                  {showFacts ? "Falldaten verbergen" : "Falldaten aufdecken (Lösung)"}
                </Button>
                {showFacts && (
                  <dl className="bg-muted/60 space-y-2 rounded p-2 text-xs">
                    {hiddenFacts.map((f) => (
                      <div key={f.label}>
                        <dt className="text-foreground font-semibold">{f.label}</dt>
                        {f.lines.map((line, i) => (
                          <dd key={i}>{line}</dd>
                        ))}
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter>
            {!isSessionActive ? (
              <Button onClick={startSimulation} className="flex w-full gap-2 bg-blue-600 text-white hover:bg-blue-700">
                Simulation Starten <ArrowRight size={16} />
              </Button>
            ) : (
              <Button variant="outline" onClick={resetSession} disabled={isLoading} className="w-full">
                <RotateCcw /> Gespräch neu starten
              </Button>
            )}
          </CardFooter>
        </Card>

        {(mode === "demo" || source === "static") && (
          <Alert>
            <Info />
            <AlertTitle>Hinweis</AlertTitle>
            <AlertDescription>
              {mode === "demo" && (
                <p>Demo-Modus: Ohne ANTHROPIC_API_KEY antwortet ein einfacher Offline-Patient mit Regel-Korrekturen.</p>
              )}
              {source === "static" && <p>Es werden die eingebauten Beispielfälle angezeigt.</p>}
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* RIGHT COLUMN: Interactive Chat Workspace */}
      <div className="bg-card flex h-[75dvh] flex-col overflow-hidden rounded-xl border shadow-md lg:col-span-2 lg:h-full">
        <div className="flex items-center justify-between bg-slate-900 p-4 text-white">
          <div className="flex items-center gap-3">
            <div className={cn("h-2 w-2 rounded-full", isSessionActive ? "animate-ping bg-emerald-400" : "bg-slate-500")} />
            <div>
              <p className="text-sm font-medium">Gesprächsführung: Arzt-Patient-Kommunikation</p>
              <p className="text-xs text-slate-400">
                Rolle: {scenario.target_role === "doctor" ? "Assistenzarzt/-ärztin" : "Pflegekraft"}
              </p>
            </div>
          </div>
          {isSessionActive && (
            <Badge variant="outline" className="border-slate-600 text-slate-300">
              {mode === "ai" ? "KI-Patient" : "Demo"}
            </Badge>
          )}
        </div>

        {/* Message Delivery Window */}
        <div className="bg-muted/30 flex-1 overflow-y-auto p-4" aria-live="polite">
          {!isSessionActive ? (
            <div className="text-muted-foreground flex h-full flex-col items-center justify-center p-8 text-center">
              <Brain size={48} className="mb-3 opacity-40" />
              <p className="font-medium">
                Klicken Sie auf „Simulation Starten“, um das Anamnesegespräch zu beginnen.
              </p>
              <p className="mt-1 max-w-sm text-xs">
                Sprechen Sie respektvoll und benutzen Sie professionelle medizinische Formulierungen.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="space-y-2">
                  <div className={cn("flex max-w-[85%] gap-3", msg.role === "user" && "ml-auto flex-row-reverse")}>
                    <div
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                        msg.role === "user" ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-700"
                      )}
                    >
                      {msg.role === "user" ? userLabel : "Pat"}
                    </div>
                    <div
                      className={cn(
                        "rounded-xl p-3 text-sm whitespace-pre-wrap shadow-sm",
                        msg.role === "user"
                          ? "rounded-tr-none bg-blue-600 text-white"
                          : "bg-card text-card-foreground rounded-tl-none border",
                        msg.status === "sending" && "opacity-70",
                        msg.status === "failed" && "bg-blue-600/50 ring-destructive ring-2"
                      )}
                    >
                      {msg.content}
                    </div>
                  </div>

                  {msg.status === "failed" && (
                    <div className="text-destructive ml-auto flex max-w-[85%] items-center justify-end gap-2 pr-11 text-xs">
                      <AlertTriangle size={14} /> Nicht gesendet.
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => retryMessage(msg)}
                        disabled={isLoading}
                      >
                        <RotateCw /> Erneut senden
                      </Button>
                    </div>
                  )}

                  {/* Dynamic Grammar & Pro Phrasing Suggestions */}
                  {msg.correction?.has_error && (
                    <div className="ml-auto max-w-[92%] sm:max-w-[85%] sm:pr-11">
                      <Alert className="border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
                        <Lightbulb />
                        <AlertTitle>Besser formuliert</AlertTitle>
                        <AlertDescription className="text-amber-900/90 dark:text-amber-200/90">
                          <p className="font-medium">„{msg.correction.better_phrasing}“</p>
                          {msg.correction.explanation && <p className="text-xs">{msg.correction.explanation}</p>}
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex max-w-[85%] gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">
                    Pat
                  </div>
                  <div className="bg-card text-muted-foreground flex items-center gap-2 rounded-xl rounded-tl-none border p-3 text-sm shadow-sm">
                    <Loader2 size={14} className="animate-spin" /> Patient antwortet …
                  </div>
                </div>
              )}

              {error && (
                <Alert variant="destructive">
                  <AlertTriangle />
                  <AlertTitle>Antwort fehlgeschlagen</AlertTitle>
                  <AlertDescription>
                    <p>{error} Sie können die Nachricht erneut senden.</p>
                  </AlertDescription>
                </Alert>
              )}
              <div ref={endRef} />
            </div>
          )}
        </div>

        {/* Composer */}
        <form onSubmit={handleSendMessage} className="flex gap-2 border-t p-3 sm:p-4">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isSessionActive ? "Ihre Frage an den Patienten …" : "Starten Sie zuerst die Simulation"}
            disabled={!isSessionActive || isLoading}
            maxLength={MAX_MESSAGE_CHARS}
            aria-label="Nachricht an den Patienten"
            autoComplete="off"
            enterKeyHint="send"
          />
          <Button
            type="submit"
            disabled={!isSessionActive || isLoading || !inputValue.trim()}
            className="bg-blue-600 text-white hover:bg-blue-700"
            aria-label="Senden"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
            <span className="hidden sm:inline">Senden</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
