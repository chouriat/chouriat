// Offline patient simulator: answers the doctor's question from the case's
// written patient dialogue, without any AI provider. Used by /api/anamnese
// when no API key is available, and by the chat page when the request fails
// (for example in the mobile app without network).

import type { MedicalCase, PatientTopic } from '@/lib/medical-cases';

// Keyword stems per topic, matched against the lower-cased question.
// Order matters only for ties: earlier topics win.
export const TOPIC_KEYWORDS: Record<PatientTopic, string[]> = {
  sorgen: ['sorge', 'angst', 'befürcht', 'vermutung', 'was denken sie', 'fragen an mich', 'noch fragen', 'beunruhig'],
  beginn: ['seit wann', 'wann hat', 'wann haben', 'wann fing', 'angefangen', 'begonnen', 'wie lange', 'plötzlich', 'allmählich', 'zum ersten mal', 'erstmals'],
  lokalisation: ['wo genau', 'wo tut', 'wo haben', 'wo spüren', 'zeigen sie', 'welche stelle', 'lokalis', 'welche seite', 'wo sitzt'],
  charakter: ['wie fühlt', 'wie würden sie', 'beschreiben', 'stechend', 'drückend', 'brennend', 'krampf', 'dumpf', 'art von schmerz', 'art der schmerz', 'charakter', 'wie ist der schmerz', 'wie sind die schmerz'],
  intensitaet: ['wie stark', 'skala', '0 bis 10', 'null bis zehn', '1 bis 10', 'eins bis zehn', 'stärke', 'intensität'],
  ausstrahlung: ['ausstrahl', 'strahlt', 'strahlen', 'zieht', 'wandert', 'woandershin', 'irgendwohin'],
  verlauf: ['verlauf', 'besser geworden', 'schlechter geworden', 'schlimmer geworden', 'verändert', 'zugenommen', 'gleich geblieben', 'dauerhaft', 'kommt und geht'],
  ausloeser: ['auslös', 'verstärk', 'lindert', 'besser wenn', 'schlimmer wenn', 'was hilft', 'was haben sie gemacht', 'belastung', 'in ruhe', 'beim gehen', 'beim atmen', 'nach dem essen', 'unfall', 'hergang', 'gestürzt'],
  begleitsymptome: ['begleit', 'weitere beschwerden', 'andere beschwerden', 'sonst noch', 'noch etwas', 'übelkeit', 'übel', 'erbrechen', 'gebrochen', 'schwindel', 'husten', 'luftnot', 'atemnot', 'schwitzen', 'schweiß', 'herzrasen', 'herzklopfen', 'kopfschmerz', 'sehen', 'sehstörung', 'taub', 'kribbel', 'lähmung', 'schwäche', 'ausschlag'],
  fieber: ['fieber', 'temperatur', 'schüttelfrost', 'nachtschweiß', 'frieren'],
  appetit_gewicht: ['appetit', 'gewicht', 'abgenommen', 'zugenommen', 'essen', 'gegessen', 'trinken sie genug', 'nüchtern', 'hunger', 'durst'],
  verdauung: ['stuhl', 'verdauung', 'durchfall', 'verstopf', 'darm', 'blut im stuhl', 'schwarz', 'toilette gehen', 'windel'],
  wasserlassen: ['wasserlassen', 'urin', 'harn', 'blase', 'brennen beim', 'pinkeln', 'wasser lassen'],
  schlaf: ['schlaf', 'nachts', 'müde', 'erschöpf'],
  familie: ['familie', 'eltern', 'mutter', 'vater', 'geschwister', 'bruder', 'schwester', 'erblich', 'verwandt'],
  vorerkrankungen: ['vorerkrank', 'erkrankung', 'krankheit', 'chronisch', 'früher krank', 'bekannte', 'herz', 'zucker', 'diabetes', 'blutdruck', 'krank gewesen'],
  operationen: ['operation', 'operiert', ' op ', 'eingriff', 'krankenhaus', 'stationär'],
  medikamente: ['medikament', 'tablette', 'arznei', 'nehmen sie', 'einnehmen', 'spray', 'blutverdünn', 'pille', 'mittel'],
  allergien: ['allergi', 'unverträglich', 'vertragen'],
  impfungen: ['impf', 'tetanus', 'impfpass'],
  rauchen: ['rauch', 'zigarett', 'nikotin', 'tabak'],
  alkohol: ['alkohol', 'trinken sie', 'bier', 'wein', 'schnaps'],
  drogen: ['drogen', 'cannabis', 'kiffen', 'rauschmittel', 'kokain'],
  beruf: ['beruf', 'arbeiten', 'arbeit', 'tätig', 'job', 'schule', 'studi', 'rente', 'kita'],
  wohnen: ['wohnen', 'wohnsituation', 'leben sie', 'allein', 'verheiratet', 'partner', 'kinder', 'versorgt', 'zu hause', 'treppe'],
  gyn: ['periode', 'regelblutung', 'letzte regel', 'menstruation', 'schwanger', 'verhütung', 'zyklus', 'ausfluss'],
  reisen: ['reise', 'ausland', 'urlaub', 'tropen', 'gereist'],
  beschwerden: ['was führt', 'was kann ich', 'beschwerden', 'was ist passiert', 'warum sind sie', 'erzählen sie', 'wie geht es ihnen', 'was fehlt', 'schmerz'],
};

const GREETING = /^(guten (tag|morgen|abend)|hallo|grüß gott|moin)\b/;

function introReply(c: MedicalCase): string {
  const self = c.speaker
    ? `Guten Tag. Ich bin hier wegen ${c.patient.name}.`
    : `Guten Tag, Herr Doktor. Ich bin ${c.patient.name.replace(/^(Herr|Frau)\s+/, '')}.`;
  return `${self} ${c.patient.chiefComplaint}`;
}

/** Topics the question asks about, best match first. */
export function matchTopics(message: string): PatientTopic[] {
  const q = ` ${message.toLowerCase()} `;
  const hits: { topic: PatientTopic; score: number; order: number }[] = [];
  (Object.keys(TOPIC_KEYWORDS) as PatientTopic[]).forEach((topic, order) => {
    const score = TOPIC_KEYWORDS[topic].filter((k) => q.includes(k)).length;
    if (score > 0) hits.push({ topic, score, order });
  });
  hits.sort((a, b) => b.score - a.score || a.order - b.order);
  return hits.map((h) => h.topic);
}

function derivedAnswer(c: MedicalCase, topic: PatientTopic): string | undefined {
  // Cases without a written dialogue: fall back to the guided-mode answers.
  const q = c.anamneseQuestions || [];
  switch (topic) {
    case 'vorerkrankungen':
    case 'operationen':
    case 'medikamente':
      return q[1]?.patientResponse;
    case 'allergien':
    case 'rauchen':
    case 'alkohol':
    case 'drogen':
    case 'beruf':
    case 'wohnen':
    case 'familie':
      return q[2]?.patientResponse;
    default:
      return undefined;
  }
}

export function localPatientReply(c: MedicalCase, message: string, isFirstTurn = false): string {
  const q = message.toLowerCase().trim();
  const dialogue = c.patientDialogue;
  const topics = matchTopics(q);

  if (topics.length === 0) {
    if (isFirstTurn || GREETING.test(q)) return introReply(c);
    if (/\b(name|heißen|wie alt|geburtsdatum|geboren)\b/.test(q)) {
      return c.speaker
        ? `Das ist ${c.patient.name}, ${c.patient.age} Jahre alt.`
        : `Ich heiße ${c.patient.name} und bin ${c.patient.age} Jahre alt.`;
    }
    return 'Entschuldigung, das hab ich nicht ganz verstanden. Können Sie das bitte noch mal anders fragen?';
  }

  // A combined question ("… und …?") gets up to two answers; otherwise only
  // the best-matching topic is answered.
  const combined = /\bund\b|,|\boder\b/.test(q);
  const candidates = combined
    ? [topics[0], ...topics.slice(1).filter((t) => t !== 'beschwerden')]
    : [topics[0]];
  const answers: string[] = [];
  for (const t of candidates) {
    const a = dialogue?.[t] ?? derivedAnswer(c, t);
    if (a && !answers.includes(a)) answers.push(a);
    if (answers.length === 2) break;
  }
  if (answers.length > 0) return answers.join(' ');

  const top = topics[0];
  if (top === 'beschwerden') return dialogue?.beschwerden ?? c.patient.chiefComplaint;
  if (top === 'sorgen') return 'Ist das etwas Schlimmes? Was machen Sie jetzt mit mir?';
  // Cases without a written dialogue: don't invent a "no", repeat the complaint.
  if (!dialogue) return c.patient.chiefComplaint;
  return 'Nein, da ist mir nichts aufgefallen.';
}

const JARGON: [RegExp, string][] = [
  [/dyspnoe/i, '„Atemnot“ oder „Luftnot“'],
  [/retrosternal/i, '„hinter dem Brustbein“'],
  [/emesis|vomitus/i, '„Erbrechen“'],
  [/nausea/i, '„Übelkeit“'],
  [/pyrexie|febril/i, '„Fieber“'],
  [/cephalgie|zephalgie/i, '„Kopfschmerzen“'],
  [/vertigo/i, '„Schwindel“'],
  [/inappetenz/i, '„Appetitlosigkeit“'],
  [/komorbidit/i, '„andere Erkrankungen“'],
  [/noxen/i, '„Rauchen, Alkohol oder Drogen“'],
  [/miktion/i, '„Wasserlassen“'],
  [/defäkation/i, '„Stuhlgang“'],
  [/synkope/i, '„Ohnmacht“'],
  [/expektoration/i, '„Auswurf“'],
  [/hämoptyse/i, '„Bluthusten“'],
  [/diarrh/i, '„Durchfall“'],
  [/obstipation/i, '„Verstopfung“'],
  [/irradiation/i, '„Ausstrahlen“'],
  [/b-symptom/i, '„Fieber, Nachtschweiß, Gewichtsverlust“'],
  [/anamnestisch/i, 'eine einfache Frage ohne Fachwort'],
  [/(appendizitis|cholezystitis|pankreatitis|pneumonie|myokardinfarkt|apoplex)/i, 'eine Beschreibung der Beschwerden statt einer Diagnose'],
];

export function localFeedback(message: string): string {
  const hit = JARGON.find(([re]) => re.test(message));
  if (hit) {
    return `⚠️ FSP-Hinweis: Fachbegriff im Patientengespräch. Sagen Sie stattdessen ${hit[1]}.`;
  }
  const m = message.trim().toLowerCase();
  if (GREETING.test(m) && /(mein name|ich bin)/.test(m)) {
    return '✓ Gute Vorstellung mit Namen. So beginnt ein professionelles Arzt-Patienten-Gespräch.';
  }
  if (/(^|[.!?,]\s*)(wie|was|wo|wann|seit wann|welche|warum|weshalb|können sie|erzählen|beschreiben)\b/.test(m)) {
    return '✓ Gute offene Frage in verständlicher Sprache.';
  }
  return '✓ Verständlich formuliert. Tipp: Offene W-Fragen („Wie…?“, „Seit wann…?“) bringen mehr Informationen.';
}
