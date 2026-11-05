// Auto-generiert aus supabase/content (45 klinische Fälle & 653 Fachbegriffe)

export interface AnamneseQuestion {
  id: string;
  phase: string;
  doctorOptions: {
    text: string;
    isOptimal: boolean;
    feedback: string;
  }[];
  patientResponse: string;
}

export interface MedicalCase {
  id: string;
  title: string;
  specialty: string;
  category?: string;
  difficulty: string;
  patientName?: string;
  patientAge?: number;
  chiefComplaint?: string;
  patient: {
    name: string;
    age: number;
    gender: 'm' | 'w';
    occupation: string;
    chiefComplaint: string;
    vitalSigns: {
      bp: string;
      hr: string;
      temp: string;
      spo2: string;
    };
    historyDetails: string;
  };
  anamneseQuestions: AnamneseQuestion[];
  arztbriefTemplate: {
    prompt: string;
    requiredTerms: string[];
    sampleSolution: string;
  };
  isbarSteps: {
    step: 'I' | 'S' | 'B' | 'A' | 'R';
    label: string;
    guidance: string;
    sampleSpeech: string;
  }[];
}

export interface VocabularyItem {
  id: string;
  fachbegriff: string;
  patientensprache: string;
  category: string;
  example: string;
}

export const MEDICAL_CASES: MedicalCase[] = [
  {
    "id": "akute-cholezystitis",
    "title": "Akute Cholezystitis bei Cholezystolithiasis",
    "specialty": "Chirurgie",
    "category": "Chirurgie",
    "difficulty": "B2",
    "patientName": "Frau Petra Fischer",
    "patientAge": 47,
    "chiefComplaint": "Nach dem Schweinebraten gestern hab ich so einen krampfartigen Schmerz rechts oben unterm Rippenbogen gekriegt, der bis in die Schulter zieht. Jetzt hab ich auch noch Fieber.",
    "patient": {
      "name": "Frau Petra Fischer",
      "age": 47,
      "gender": "w",
      "occupation": "Friseurin",
      "chiefComplaint": "Nach dem Schweinebraten gestern hab ich so einen krampfartigen Schmerz rechts oben unterm Rippenbogen gekriegt, der bis in die Schulter zieht. Jetzt hab ich auch noch Fieber.",
      "vitalSigns": {
        "bp": "130/85 mmHg",
        "hr": "98 /min",
        "temp": "38,6 °C",
        "spo2": "98 % (Raumluft)"
      },
      "historyDetails": "Seit ca. 20 Stunden zunehmende Schmerzen im rechten Oberbauch nach fettreicher Mahlzeit, initial kolikartig, jetzt Dauerschmerz mit Ausstrahlung in die rechte Schulter. Übelkeit, zweimaliges Erbrechen. Stuhl und Urin farblich unauffällig. Vorerkrankungen: Bekannte Cholezystolithiasis (Sonografie 2023), Adipositas (BMI 31). Medikation: Keine Dauermedikation. Allergien: Metamizol (Agranulozytose in der Vorgeschichte). Sozialanamnese: Nichtraucherin, Alkohol selten. Verheiratet, drei Kinder. Familienanamnese: Mutter Z. n. Cholezystektomie. Körperliche Untersuchung: Abdomen: Druckschmerz im rechten Oberbauch, Murphy-Zeichen positiv, lokale Abwehrspannung. Kein Ikterus. Labor: Leukozyten: 15,1 /nl (erhöht), CRP: 112 mg/l (erhöht), Bilirubin gesamt: 1,1 mg/dl, Lipase: 45 U/l, AP: 110 U/l."
    },
    "anamneseQuestions": [
      {
        "id": "akute-cholezystitis-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Frau Petra Fischer, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Akute kalkulöse Cholezystitis vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Nach dem Schweinebraten gestern hab ich so einen krampfartigen Schmerz rechts oben unterm Rippenbogen gekriegt, der bis in die Schulter zieht. Jetzt hab ich auch noch Fieber."
      },
      {
        "id": "akute-cholezystitis-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Bekannte Cholezystolithiasis (Sonografie 2023), Adipositas (BMI 31). Meine Medikamente sind: Keine Dauermedikation."
      },
      {
        "id": "akute-cholezystitis-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Metamizol (Agranulozytose in der Vorgeschichte). Zu meinem Alltag: Nichtraucherin, Alkohol selten. Verheiratet, drei Kinder. In der Familie: Mutter Z. n. Cholezystektomie."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Frau Petra Fischer (47 J.) mit Verdacht auf Akute kalkulöse Cholezystitis im C1-Fachstil.",
      "requiredTerms": [
        "Akute kalkulöse Cholezystitis",
        "Bekannte",
        "Choledocholithiasis mit Cholangitis",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Frau Petra Fischer (47 J., Friseurin) stellte sich mit folgender aktueller Anamnese vor: Seit ca. 20 Stunden zunehmende Schmerzen im rechten Oberbauch nach fettreicher Mahlzeit, initial kolikartig, jetzt Dauerschmerz mit Ausstrahlung in die rechte Schulter. Übelkeit, zweimaliges Erbrechen. Stuhl und Urin farblich unauffällig. An Vorerkrankungen seien bekannt: Bekannte Cholezystolithiasis (Sonografie 2023), Adipositas (BMI 31). Die Dauermedikation umfasse: Keine Dauermedikation. Allergien: Metamizol (Agranulozytose in der Vorgeschichte). Sozial- und Familienanamnese: Nichtraucherin, Alkohol selten. Verheiratet, drei Kinder. Mutter Z. n. Cholezystektomie. Klinische Untersuchung: Abdomen: Druckschmerz im rechten Oberbauch, Murphy-Zeichen positiv, lokale Abwehrspannung. Kein Ikterus. Zusammenfassend ergibt sich der dringende Verdacht auf: Akute kalkulöse Cholezystitis (Differenzialdiagnosen: Choledocholithiasis mit Cholangitis, Akute Pankreatitis, Ulcus duodeni)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Frau Petra Fischer, 47 Jahre alt, aktuell in der Aufnahme (Chirurgie)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Seit ca. 20 Stunden zunehmende Schmerzen im rechten Oberbauch nach fettreicher Mahlzeit, initial kolikartig, jetzt Dauerschmerz mit Ausstrahlung in die rechte Schulter. Übelkeit, zweimaliges Erbrechen. Stuhl und Urin farblich unauffällig. Es besteht der dringende Verdacht auf Akute kalkulöse Cholezystitis."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Bekannte Cholezystolithiasis (Sonografie 2023), Adipositas (BMI 31). Medikation: Keine Dauermedikation. Allergien: Metamizol (Agranulozytose in der Vorgeschichte)."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 130/85 mmHg, HF 98 /min, Temp 38,6 °C, SpO₂ 98 % (Raumluft). Abdomen: Druckschmerz im rechten Oberbauch, Murphy-Zeichen positiv, lokale Abwehrspannung. Kein Ikterus. Labor: Leukozyten: 15,1 /nl (erhöht), CRP: 112 mg/l (erhöht), Bilirubin gesamt: 1,1 mg/dl, Lipase: 45 U/l, AP: 110 U/l"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Akute kalkulöse Cholezystitis sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Choledocholithiasis mit Cholangitis, Akute Pankreatitis, Ulcus duodeni)."
      }
    ]
  },
  {
    "id": "akute-pankreatitis",
    "title": "Akute Pankreatitis (äthyltoxisch)",
    "specialty": "Gastroenterologie",
    "category": "Gastroenterologie",
    "difficulty": "B2",
    "patientName": "Herr Thomas Keller",
    "patientAge": 45,
    "chiefComplaint": "Ich hab so einen Schmerz im Oberbauch, der wie ein Gürtel bis in den Rücken geht. Ich muss dauernd brechen, und es wird immer schlimmer.",
    "patient": {
      "name": "Herr Thomas Keller",
      "age": 45,
      "gender": "m",
      "occupation": "Gastronom",
      "chiefComplaint": "Ich hab so einen Schmerz im Oberbauch, der wie ein Gürtel bis in den Rücken geht. Ich muss dauernd brechen, und es wird immer schlimmer.",
      "vitalSigns": {
        "bp": "110/70 mmHg",
        "hr": "112 /min",
        "temp": "38,1 °C",
        "spo2": "95 % (Raumluft)"
      },
      "historyDetails": "Seit ca. 12 Stunden heftigste Oberbauchschmerzen mit gürtelförmiger Ausstrahlung in den Rücken, Besserung im Sitzen nach vorn gebeugt. Rezidivierendes Erbrechen. Am Wochenende Feier mit erheblichem Alkoholkonsum. Vorerkrankungen: Alkoholbedingte Fettleber, Z. n. Pankreatitis 2021. Medikation: Pantoprazol 20 mg bei Bedarf. Allergien: Keine bekannt. Sozialanamnese: Alkohol ca. 4–5 Bier und 2–3 Schnäpse täglich. Raucher, 20 pack years. Geschieden. Familienanamnese: Unauffällig. Körperliche Untersuchung: Abdomen: elastische Bauchdeckenspannung (\"Gummibauch\"), diffuser Druckschmerz im Oberbauch, spärliche Darmgeräusche. Labor: Lipase: 2.450 U/l (deutlich erhöht), CRP: 95 mg/l, Leukozyten: 14,0 /nl, γ-GT: 380 U/l (erhöht), Kalzium: 2,0 mmol/l (erniedrigt), Triglyzeride: 210 mg/dl."
    },
    "anamneseQuestions": [
      {
        "id": "akute-pankreatitis-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Herr Thomas Keller, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Akute äthyltoxische Pankreatitis vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Ich hab so einen Schmerz im Oberbauch, der wie ein Gürtel bis in den Rücken geht. Ich muss dauernd brechen, und es wird immer schlimmer."
      },
      {
        "id": "akute-pankreatitis-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Alkoholbedingte Fettleber, Z. n. Pankreatitis 2021. Meine Medikamente sind: Pantoprazol 20 mg bei Bedarf."
      },
      {
        "id": "akute-pankreatitis-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Keine bekannt. Zu meinem Alltag: Alkohol ca. 4–5 Bier und 2–3 Schnäpse täglich. Raucher, 20 pack years. Geschieden. In der Familie: Unauffällig."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Herr Thomas Keller (45 J.) mit Verdacht auf Akute äthyltoxische Pankreatitis im C1-Fachstil.",
      "requiredTerms": [
        "Akute äthyltoxische Pankreatitis",
        "Alkoholbedingte",
        "Perforiertes Ulcus ventriculi/duodeni",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Herr Thomas Keller (45 J., Gastronom) stellte sich mit folgender aktueller Anamnese vor: Seit ca. 12 Stunden heftigste Oberbauchschmerzen mit gürtelförmiger Ausstrahlung in den Rücken, Besserung im Sitzen nach vorn gebeugt. Rezidivierendes Erbrechen. Am Wochenende Feier mit erheblichem Alkoholkonsum. An Vorerkrankungen seien bekannt: Alkoholbedingte Fettleber, Z. n. Pankreatitis 2021. Die Dauermedikation umfasse: Pantoprazol 20 mg bei Bedarf. Allergien: Keine bekannt. Sozial- und Familienanamnese: Alkohol ca. 4–5 Bier und 2–3 Schnäpse täglich. Raucher, 20 pack years. Geschieden. Unauffällig. Klinische Untersuchung: Abdomen: elastische Bauchdeckenspannung (\"Gummibauch\"), diffuser Druckschmerz im Oberbauch, spärliche Darmgeräusche. Zusammenfassend ergibt sich der dringende Verdacht auf: Akute äthyltoxische Pankreatitis (Differenzialdiagnosen: Perforiertes Ulcus ventriculi/duodeni, Akute Cholezystitis, Mesenterialischämie)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Herr Thomas Keller, 45 Jahre alt, aktuell in der Aufnahme (Gastroenterologie)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Seit ca. 12 Stunden heftigste Oberbauchschmerzen mit gürtelförmiger Ausstrahlung in den Rücken, Besserung im Sitzen nach vorn gebeugt. Rezidivierendes Erbrechen. Am Wochenende Feier mit erheblichem Alkoholkonsum. Es besteht der dringende Verdacht auf Akute äthyltoxische Pankreatitis."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Alkoholbedingte Fettleber, Z. n. Pankreatitis 2021. Medikation: Pantoprazol 20 mg bei Bedarf. Allergien: Keine bekannt."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 110/70 mmHg, HF 112 /min, Temp 38,1 °C, SpO₂ 95 % (Raumluft). Abdomen: elastische Bauchdeckenspannung (\"Gummibauch\"), diffuser Druckschmerz im Oberbauch, spärliche Darmgeräusche. Labor: Lipase: 2.450 U/l (deutlich erhöht), CRP: 95 mg/l, Leukozyten: 14,0 /nl, γ-GT: 380 U/l (erhöht), Kalzium: 2,0 mmol/l (erniedrigt), Triglyzeride: 210 mg/dl"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Akute äthyltoxische Pankreatitis sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Perforiertes Ulcus ventriculi/duodeni, Akute Cholezystitis, Mesenterialischämie)."
      }
    ]
  },
  {
    "id": "obere-gi-blutung",
    "title": "Obere gastrointestinale Blutung bei Ulcus duodeni",
    "specialty": "Gastroenterologie",
    "category": "Gastroenterologie",
    "difficulty": "C1",
    "patientName": "Herr Günter Hartmann",
    "patientAge": 69,
    "chiefComplaint": "Mein Stuhlgang ist seit gestern pechschwarz und klebrig, und heute Morgen hab ich so was wie Kaffeesatz erbrochen. Mir ist ganz schwach und schwindelig.",
    "patient": {
      "name": "Herr Günter Hartmann",
      "age": 69,
      "gender": "m",
      "occupation": "Rentner, ehem. Elektriker",
      "chiefComplaint": "Mein Stuhlgang ist seit gestern pechschwarz und klebrig, und heute Morgen hab ich so was wie Kaffeesatz erbrochen. Mir ist ganz schwach und schwindelig.",
      "vitalSigns": {
        "bp": "100/60 mmHg",
        "hr": "116 /min",
        "temp": "36,6 °C",
        "spo2": "96 % (Raumluft)"
      },
      "historyDetails": "Seit gestern Teerstuhl (2x), heute einmalig kaffeesatzartiges Erbrechen. Schwindel beim Aufstehen, Schwäche. Seit 3 Wochen wegen Knieschmerzen Diclofenac 75 mg 1-0-1 ohne Magenschutz. Vorerkrankungen: KHK, Z. n. Stent 2020, Gonarthrose rechts, Arterielle Hypertonie. Medikation: ASS 100 mg 1-0-0, Diclofenac 75 mg 1-0-1 (seit 3 Wochen), Ramipril 5 mg 1-0-0, Atorvastatin 40 mg 0-0-1. Allergien: Keine bekannt. Sozialanamnese: Ex-Raucher. Alkohol gelegentlich. Verheiratet. Familienanamnese: Unauffällig. Körperliche Untersuchung: Blass, kaltschweißig. Abdomen: leichter epigastrischer Druckschmerz. Rektal-digitale Untersuchung: Teerstuhl am Fingerling. Labor: Hb: 7,8 g/dl (deutlich erniedrigt), Harnstoff: 88 mg/dl (erhöht), Kreatinin: 1,1 mg/dl, INR: 1,1, Thrombozyten: 210 /nl."
    },
    "anamneseQuestions": [
      {
        "id": "obere-gi-blutung-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Herr Günter Hartmann, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Obere GI-Blutung bei Ulcus duodeni (Forrest IIa) unter NSAR und ASS vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Mein Stuhlgang ist seit gestern pechschwarz und klebrig, und heute Morgen hab ich so was wie Kaffeesatz erbrochen. Mir ist ganz schwach und schwindelig."
      },
      {
        "id": "obere-gi-blutung-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: KHK, Z. n. Stent 2020, Gonarthrose rechts, Arterielle Hypertonie. Meine Medikamente sind: ASS 100 mg 1-0-0, Diclofenac 75 mg 1-0-1 (seit 3 Wochen), Ramipril 5 mg 1-0-0, Atorvastatin 40 mg 0-0-1."
      },
      {
        "id": "obere-gi-blutung-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Keine bekannt. Zu meinem Alltag: Ex-Raucher. Alkohol gelegentlich. Verheiratet. In der Familie: Unauffällig."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Herr Günter Hartmann (69 J.) mit Verdacht auf Obere GI-Blutung bei Ulcus duodeni (Forrest IIa) unter NSAR und ASS im C1-Fachstil.",
      "requiredTerms": [
        "Obere GI-Blutung bei Ulcus duodeni (Forrest IIa) unter NSAR und ASS",
        "KHK,",
        "Ulcus ventriculi",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Herr Günter Hartmann (69 J., Rentner, ehem. Elektriker) stellte sich mit folgender aktueller Anamnese vor: Seit gestern Teerstuhl (2x), heute einmalig kaffeesatzartiges Erbrechen. Schwindel beim Aufstehen, Schwäche. Seit 3 Wochen wegen Knieschmerzen Diclofenac 75 mg 1-0-1 ohne Magenschutz. An Vorerkrankungen seien bekannt: KHK, Z. n. Stent 2020, Gonarthrose rechts, Arterielle Hypertonie. Die Dauermedikation umfasse: ASS 100 mg 1-0-0, Diclofenac 75 mg 1-0-1 (seit 3 Wochen), Ramipril 5 mg 1-0-0, Atorvastatin 40 mg 0-0-1. Allergien: Keine bekannt. Sozial- und Familienanamnese: Ex-Raucher. Alkohol gelegentlich. Verheiratet. Unauffällig. Klinische Untersuchung: Blass, kaltschweißig. Abdomen: leichter epigastrischer Druckschmerz. Rektal-digitale Untersuchung: Teerstuhl am Fingerling. Zusammenfassend ergibt sich der dringende Verdacht auf: Obere GI-Blutung bei Ulcus duodeni (Forrest IIa) unter NSAR und ASS (Differenzialdiagnosen: Ulcus ventriculi, Ösophagusvarizenblutung, Mallory-Weiss-Läsion)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Herr Günter Hartmann, 69 Jahre alt, aktuell in der Aufnahme (Gastroenterologie)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Seit gestern Teerstuhl (2x), heute einmalig kaffeesatzartiges Erbrechen. Schwindel beim Aufstehen, Schwäche. Seit 3 Wochen wegen Knieschmerzen Diclofenac 75 mg 1-0-1 ohne Magenschutz. Es besteht der dringende Verdacht auf Obere GI-Blutung bei Ulcus duodeni (Forrest IIa) unter NSAR und ASS."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: KHK, Z. n. Stent 2020, Gonarthrose rechts, Arterielle Hypertonie. Medikation: ASS 100 mg 1-0-0, Diclofenac 75 mg 1-0-1 (seit 3 Wochen), Ramipril 5 mg 1-0-0, Atorvastatin 40 mg 0-0-1. Allergien: Keine bekannt."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 100/60 mmHg, HF 116 /min, Temp 36,6 °C, SpO₂ 96 % (Raumluft). Blass, kaltschweißig. Abdomen: leichter epigastrischer Druckschmerz. Rektal-digitale Untersuchung: Teerstuhl am Fingerling. Labor: Hb: 7,8 g/dl (deutlich erniedrigt), Harnstoff: 88 mg/dl (erhöht), Kreatinin: 1,1 mg/dl, INR: 1,1, Thrombozyten: 210 /nl"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Obere GI-Blutung bei Ulcus duodeni (Forrest IIa) unter NSAR und ASS sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Ulcus ventriculi, Ösophagusvarizenblutung, Mallory-Weiss-Läsion)."
      }
    ]
  },
  {
    "id": "sigmadivertikulitis",
    "title": "Akute Sigmadivertikulitis",
    "specialty": "Chirurgie",
    "category": "Chirurgie",
    "difficulty": "B2",
    "patientName": "Frau Renate Schröder",
    "patientAge": 63,
    "chiefComplaint": "Ich hab seit zwei Tagen Bauchweh links unten, so ein dumpfer Dauerschmerz. Gestern hatte ich abends Fieber, und mit dem Stuhlgang klappt's auch nicht richtig.",
    "patient": {
      "name": "Frau Renate Schröder",
      "age": 63,
      "gender": "w",
      "occupation": "Lehrerin",
      "chiefComplaint": "Ich hab seit zwei Tagen Bauchweh links unten, so ein dumpfer Dauerschmerz. Gestern hatte ich abends Fieber, und mit dem Stuhlgang klappt's auch nicht richtig.",
      "vitalSigns": {
        "bp": "140/85 mmHg",
        "hr": "94 /min",
        "temp": "38,3 °C",
        "spo2": "98 % (Raumluft)"
      },
      "historyDetails": "Seit 48 Stunden zunehmende Schmerzen im linken Unterbauch, Fieber bis 38,5 °C, Obstipation seit 2 Tagen, leichte Übelkeit. Kein Blut im Stuhl. Vorerkrankungen: Divertikulose (Koloskopie 2022), Arterielle Hypertonie, Z. n. Hysterektomie 2010. Medikation: Valsartan 80 mg 1-0-0. Allergien: Keine bekannt. Sozialanamnese: Nichtraucherin. Ballaststoffarme Ernährung. Verheiratet. Familienanamnese: Vater hatte Darmkrebs mit 70 Jahren. Körperliche Untersuchung: Abdomen: Druckschmerz und walzenförmige Resistenz im linken Unterbauch (\"Linksappendizitis\"), keine Abwehrspannung, Darmgeräusche regelrecht. Labor: Leukozyten: 13,4 /nl (erhöht), CRP: 78 mg/l (erhöht), Urinstatus: unauffällig."
    },
    "anamneseQuestions": [
      {
        "id": "sigmadivertikulitis-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Frau Renate Schröder, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Akute unkomplizierte Sigmadivertikulitis (CDD Typ 1b) vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Ich hab seit zwei Tagen Bauchweh links unten, so ein dumpfer Dauerschmerz. Gestern hatte ich abends Fieber, und mit dem Stuhlgang klappt's auch nicht richtig."
      },
      {
        "id": "sigmadivertikulitis-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Divertikulose (Koloskopie 2022), Arterielle Hypertonie, Z. n. Hysterektomie 2010. Meine Medikamente sind: Valsartan 80 mg 1-0-0."
      },
      {
        "id": "sigmadivertikulitis-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Keine bekannt. Zu meinem Alltag: Nichtraucherin. Ballaststoffarme Ernährung. Verheiratet. In der Familie: Vater hatte Darmkrebs mit 70 Jahren."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Frau Renate Schröder (63 J.) mit Verdacht auf Akute unkomplizierte Sigmadivertikulitis (CDD Typ 1b) im C1-Fachstil.",
      "requiredTerms": [
        "Akute unkomplizierte Sigmadivertikulitis (CDD Typ 1b)",
        "Divertikulose",
        "Kolonkarzinom",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Frau Renate Schröder (63 J., Lehrerin) stellte sich mit folgender aktueller Anamnese vor: Seit 48 Stunden zunehmende Schmerzen im linken Unterbauch, Fieber bis 38,5 °C, Obstipation seit 2 Tagen, leichte Übelkeit. Kein Blut im Stuhl. An Vorerkrankungen seien bekannt: Divertikulose (Koloskopie 2022), Arterielle Hypertonie, Z. n. Hysterektomie 2010. Die Dauermedikation umfasse: Valsartan 80 mg 1-0-0. Allergien: Keine bekannt. Sozial- und Familienanamnese: Nichtraucherin. Ballaststoffarme Ernährung. Verheiratet. Vater hatte Darmkrebs mit 70 Jahren. Klinische Untersuchung: Abdomen: Druckschmerz und walzenförmige Resistenz im linken Unterbauch (\"Linksappendizitis\"), keine Abwehrspannung, Darmgeräusche regelrecht. Zusammenfassend ergibt sich der dringende Verdacht auf: Akute unkomplizierte Sigmadivertikulitis (CDD Typ 1b) (Differenzialdiagnosen: Kolonkarzinom, Ischämische Kolitis, Chronisch-entzündliche Darmerkrankung)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Frau Renate Schröder, 63 Jahre alt, aktuell in der Aufnahme (Chirurgie)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Seit 48 Stunden zunehmende Schmerzen im linken Unterbauch, Fieber bis 38,5 °C, Obstipation seit 2 Tagen, leichte Übelkeit. Kein Blut im Stuhl. Es besteht der dringende Verdacht auf Akute unkomplizierte Sigmadivertikulitis (CDD Typ 1b)."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Divertikulose (Koloskopie 2022), Arterielle Hypertonie, Z. n. Hysterektomie 2010. Medikation: Valsartan 80 mg 1-0-0. Allergien: Keine bekannt."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 140/85 mmHg, HF 94 /min, Temp 38,3 °C, SpO₂ 98 % (Raumluft). Abdomen: Druckschmerz und walzenförmige Resistenz im linken Unterbauch (\"Linksappendizitis\"), keine Abwehrspannung, Darmgeräusche regelrecht. Labor: Leukozyten: 13,4 /nl (erhöht), CRP: 78 mg/l (erhöht), Urinstatus: unauffällig"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Akute unkomplizierte Sigmadivertikulitis (CDD Typ 1b) sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Kolonkarzinom, Ischämische Kolitis, Chronisch-entzündliche Darmerkrankung)."
      }
    ]
  },
  {
    "id": "mechanischer-ileus",
    "title": "Mechanischer Dünndarmileus (Bridenileus)",
    "specialty": "Chirurgie",
    "category": "Chirurgie",
    "difficulty": "C1",
    "patientName": "Herr Karl-Heinz Wolf",
    "patientAge": 76,
    "chiefComplaint": "Mein Bauch ist so aufgebläht wie ein Ballon und ich hab Krämpfe, die kommen und gehen. Seit zwei Tagen kein Stuhlgang, keine Winde, und jetzt muss ich auch noch brechen.",
    "patient": {
      "name": "Herr Karl-Heinz Wolf",
      "age": 76,
      "gender": "m",
      "occupation": "Rentner",
      "chiefComplaint": "Mein Bauch ist so aufgebläht wie ein Ballon und ich hab Krämpfe, die kommen und gehen. Seit zwei Tagen kein Stuhlgang, keine Winde, und jetzt muss ich auch noch brechen.",
      "vitalSigns": {
        "bp": "125/80 mmHg",
        "hr": "108 /min",
        "temp": "37,5 °C",
        "spo2": "96 % (Raumluft)"
      },
      "historyDetails": "Seit 48 Stunden kolikartige Bauchschmerzen, zunehmende Distension, Stuhl- und Windverhalt, seit heute Erbrechen (zuletzt übelriechend, bräunlich). Vorerkrankungen: Z. n. Hemikolektomie rechts 2019 bei Kolonkarzinom, Z. n. Appendektomie, Benigne Prostatahyperplasie. Medikation: Tamsulosin 0,4 mg 0-0-1, Macrogol bei Bedarf. Allergien: Keine bekannt. Sozialanamnese: Ex-Raucher. Lebt mit Ehefrau. Alkohol selten. Familienanamnese: Unauffällig. Körperliche Untersuchung: Abdomen: meteoristisch gebläht, reizlose Narben, hochgestellte, klingende Darmgeräusche, diffuser Druckschmerz, keine Bruchpforten tastbar. Rektale Ampulle leer. Labor: Leukozyten: 12,8 /nl, CRP: 34 mg/l, Kalium: 3,2 mmol/l (erniedrigt), Laktat: 1,6 mmol/l, Kreatinin: 1,5 mg/dl (erhöht)."
    },
    "anamneseQuestions": [
      {
        "id": "mechanischer-ileus-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Herr Karl-Heinz Wolf, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Mechanischer Dünndarmileus bei Briden nach Voroperation vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Mein Bauch ist so aufgebläht wie ein Ballon und ich hab Krämpfe, die kommen und gehen. Seit zwei Tagen kein Stuhlgang, keine Winde, und jetzt muss ich auch noch brechen."
      },
      {
        "id": "mechanischer-ileus-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Z. n. Hemikolektomie rechts 2019 bei Kolonkarzinom, Z. n. Appendektomie, Benigne Prostatahyperplasie. Meine Medikamente sind: Tamsulosin 0,4 mg 0-0-1, Macrogol bei Bedarf."
      },
      {
        "id": "mechanischer-ileus-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Keine bekannt. Zu meinem Alltag: Ex-Raucher. Lebt mit Ehefrau. Alkohol selten. In der Familie: Unauffällig."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Herr Karl-Heinz Wolf (76 J.) mit Verdacht auf Mechanischer Dünndarmileus bei Briden nach Voroperation im C1-Fachstil.",
      "requiredTerms": [
        "Mechanischer Dünndarmileus bei Briden nach Voroperation",
        "Z.",
        "Kolonkarzinom mit Obstruktion",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Herr Karl-Heinz Wolf (76 J., Rentner) stellte sich mit folgender aktueller Anamnese vor: Seit 48 Stunden kolikartige Bauchschmerzen, zunehmende Distension, Stuhl- und Windverhalt, seit heute Erbrechen (zuletzt übelriechend, bräunlich). An Vorerkrankungen seien bekannt: Z. n. Hemikolektomie rechts 2019 bei Kolonkarzinom, Z. n. Appendektomie, Benigne Prostatahyperplasie. Die Dauermedikation umfasse: Tamsulosin 0,4 mg 0-0-1, Macrogol bei Bedarf. Allergien: Keine bekannt. Sozial- und Familienanamnese: Ex-Raucher. Lebt mit Ehefrau. Alkohol selten. Unauffällig. Klinische Untersuchung: Abdomen: meteoristisch gebläht, reizlose Narben, hochgestellte, klingende Darmgeräusche, diffuser Druckschmerz, keine Bruchpforten tastbar. Rektale Ampulle leer. Zusammenfassend ergibt sich der dringende Verdacht auf: Mechanischer Dünndarmileus bei Briden nach Voroperation (Differenzialdiagnosen: Kolonkarzinom mit Obstruktion, Inkarzerierte Hernie, Paralytischer Ileus)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Herr Karl-Heinz Wolf, 76 Jahre alt, aktuell in der Aufnahme (Chirurgie)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Seit 48 Stunden kolikartige Bauchschmerzen, zunehmende Distension, Stuhl- und Windverhalt, seit heute Erbrechen (zuletzt übelriechend, bräunlich). Es besteht der dringende Verdacht auf Mechanischer Dünndarmileus bei Briden nach Voroperation."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Z. n. Hemikolektomie rechts 2019 bei Kolonkarzinom, Z. n. Appendektomie, Benigne Prostatahyperplasie. Medikation: Tamsulosin 0,4 mg 0-0-1, Macrogol bei Bedarf. Allergien: Keine bekannt."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 125/80 mmHg, HF 108 /min, Temp 37,5 °C, SpO₂ 96 % (Raumluft). Abdomen: meteoristisch gebläht, reizlose Narben, hochgestellte, klingende Darmgeräusche, diffuser Druckschmerz, keine Bruchpforten tastbar. Rektale Ampulle leer. Labor: Leukozyten: 12,8 /nl, CRP: 34 mg/l, Kalium: 3,2 mmol/l (erniedrigt), Laktat: 1,6 mmol/l, Kreatinin: 1,5 mg/dl (erhöht)"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Mechanischer Dünndarmileus bei Briden nach Voroperation sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Kolonkarzinom mit Obstruktion, Inkarzerierte Hernie, Paralytischer Ileus)."
      }
    ]
  },
  {
    "id": "inkarzerierte-leistenhernie",
    "title": "Inkarzerierte Leistenhernie",
    "specialty": "Chirurgie",
    "category": "Chirurgie",
    "difficulty": "B1",
    "patientName": "Herr Mehmet Yılmaz",
    "patientAge": 58,
    "chiefComplaint": "Ich hab schon lange so eine Beule in der rechten Leiste, die ging immer wieder weg. Aber seit heute Morgen ist sie hart, tut höllisch weh und geht nicht mehr rein.",
    "patient": {
      "name": "Herr Mehmet Yılmaz",
      "age": 58,
      "gender": "m",
      "occupation": "Lagerarbeiter",
      "chiefComplaint": "Ich hab schon lange so eine Beule in der rechten Leiste, die ging immer wieder weg. Aber seit heute Morgen ist sie hart, tut höllisch weh und geht nicht mehr rein.",
      "vitalSigns": {
        "bp": "145/90 mmHg",
        "hr": "100 /min",
        "temp": "37,3 °C",
        "spo2": "98 % (Raumluft)"
      },
      "historyDetails": "Seit ca. 6 Stunden schmerzhafte, nicht reponible Schwellung in der rechten Leiste nach schwerem Heben bei der Arbeit. Übelkeit, einmal Erbrechen. Seit 2 Jahren bekannte reponible Vorwölbung. Vorerkrankungen: Arterielle Hypertonie, Chronischer Husten bei Nikotinabusus. Medikation: Amlodipin 5 mg 1-0-0. Allergien: Keine bekannt. Sozialanamnese: Raucher, 30 pack years. Verheiratet, vier Kinder. Körperlich schwere Arbeit. Familienanamnese: Unauffällig. Körperliche Untersuchung: Rechte Leiste: prall-elastische, gerötete, stark druckschmerzhafte, nicht reponible Schwellung (5 x 4 cm). Abdomen leicht gebläht. Labor: Leukozyten: 11,6 /nl, CRP: 18 mg/l, Laktat: 1,4 mmol/l."
    },
    "anamneseQuestions": [
      {
        "id": "inkarzerierte-leistenhernie-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Herr Mehmet Yılmaz, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Inkarzerierte indirekte Leistenhernie rechts vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Ich hab schon lange so eine Beule in der rechten Leiste, die ging immer wieder weg. Aber seit heute Morgen ist sie hart, tut höllisch weh und geht nicht mehr rein."
      },
      {
        "id": "inkarzerierte-leistenhernie-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Arterielle Hypertonie, Chronischer Husten bei Nikotinabusus. Meine Medikamente sind: Amlodipin 5 mg 1-0-0."
      },
      {
        "id": "inkarzerierte-leistenhernie-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Keine bekannt. Zu meinem Alltag: Raucher, 30 pack years. Verheiratet, vier Kinder. Körperlich schwere Arbeit. In der Familie: Unauffällig."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Herr Mehmet Yılmaz (58 J.) mit Verdacht auf Inkarzerierte indirekte Leistenhernie rechts im C1-Fachstil.",
      "requiredTerms": [
        "Inkarzerierte indirekte Leistenhernie rechts",
        "Arterielle",
        "Femoralhernie",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Herr Mehmet Yılmaz (58 J., Lagerarbeiter) stellte sich mit folgender aktueller Anamnese vor: Seit ca. 6 Stunden schmerzhafte, nicht reponible Schwellung in der rechten Leiste nach schwerem Heben bei der Arbeit. Übelkeit, einmal Erbrechen. Seit 2 Jahren bekannte reponible Vorwölbung. An Vorerkrankungen seien bekannt: Arterielle Hypertonie, Chronischer Husten bei Nikotinabusus. Die Dauermedikation umfasse: Amlodipin 5 mg 1-0-0. Allergien: Keine bekannt. Sozial- und Familienanamnese: Raucher, 30 pack years. Verheiratet, vier Kinder. Körperlich schwere Arbeit. Unauffällig. Klinische Untersuchung: Rechte Leiste: prall-elastische, gerötete, stark druckschmerzhafte, nicht reponible Schwellung (5 x 4 cm). Abdomen leicht gebläht. Zusammenfassend ergibt sich der dringende Verdacht auf: Inkarzerierte indirekte Leistenhernie rechts (Differenzialdiagnosen: Femoralhernie, Lymphadenitis inguinalis, Hodentorsion)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Herr Mehmet Yılmaz, 58 Jahre alt, aktuell in der Aufnahme (Chirurgie)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Seit ca. 6 Stunden schmerzhafte, nicht reponible Schwellung in der rechten Leiste nach schwerem Heben bei der Arbeit. Übelkeit, einmal Erbrechen. Seit 2 Jahren bekannte reponible Vorwölbung. Es besteht der dringende Verdacht auf Inkarzerierte indirekte Leistenhernie rechts."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Arterielle Hypertonie, Chronischer Husten bei Nikotinabusus. Medikation: Amlodipin 5 mg 1-0-0. Allergien: Keine bekannt."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 145/90 mmHg, HF 100 /min, Temp 37,3 °C, SpO₂ 98 % (Raumluft). Rechte Leiste: prall-elastische, gerötete, stark druckschmerzhafte, nicht reponible Schwellung (5 x 4 cm). Abdomen leicht gebläht. Labor: Leukozyten: 11,6 /nl, CRP: 18 mg/l, Laktat: 1,4 mmol/l"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Inkarzerierte indirekte Leistenhernie rechts sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Femoralhernie, Lymphadenitis inguinalis, Hodentorsion)."
      }
    ]
  },
  {
    "id": "kolorektales-karzinom",
    "title": "Kolorektales Karzinom (Erstdiagnose)",
    "specialty": "Gastroenterologie",
    "category": "Gastroenterologie",
    "difficulty": "C1",
    "patientName": "Herr Bernd Schmitt",
    "patientAge": 67,
    "chiefComplaint": "Mein Stuhlgang hat sich verändert, mal Durchfall, mal Verstopfung. Manchmal ist auch Blut dabei. Und ich bin ständig müde.",
    "patient": {
      "name": "Herr Bernd Schmitt",
      "age": 67,
      "gender": "m",
      "occupation": "Rentner, ehem. Bankkaufmann",
      "chiefComplaint": "Mein Stuhlgang hat sich verändert, mal Durchfall, mal Verstopfung. Manchmal ist auch Blut dabei. Und ich bin ständig müde.",
      "vitalSigns": {
        "bp": "125/75 mmHg",
        "hr": "92 /min",
        "temp": "36,8 °C",
        "spo2": "97 % (Raumluft)"
      },
      "historyDetails": "Seit ca. 4 Monaten Wechsel von Diarrhö und Obstipation, intermittierend Blutauflagerungen auf dem Stuhl, Bleistiftstühle. Ungewollter Gewichtsverlust von 6 kg, Abgeschlagenheit, Belastungsdyspnoe. Vorsorgekoloskopie bisher abgelehnt. Vorerkrankungen: Diabetes mellitus Typ 2, Arterielle Hypertonie. Medikation: Metformin 1000 mg 1-0-1, Enalapril 10 mg 1-0-0. Allergien: Keine bekannt. Sozialanamnese: Raucher, 30 pack years. Viel rotes Fleisch, wenig Bewegung. Verheiratet. Familienanamnese: Mutter mit 72 Jahren an Darmkrebs erkrankt. Körperliche Untersuchung: Blasses Hautkolorit. Abdomen: weich, tastbare Resistenz im linken Unterbauch. Rektal: Blut am Fingerling, kein Tumor tastbar. Labor: Hb: 9,4 g/dl (erniedrigt), MCV: 74 fl (erniedrigt), Ferritin: 8 µg/l (erniedrigt), CEA: 12,4 ng/ml (erhöht)."
    },
    "anamneseQuestions": [
      {
        "id": "kolorektales-karzinom-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Herr Bernd Schmitt, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für V. a. Sigmakarzinom mit Eisenmangelanämie (Histologie ausstehend) vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Mein Stuhlgang hat sich verändert, mal Durchfall, mal Verstopfung. Manchmal ist auch Blut dabei. Und ich bin ständig müde."
      },
      {
        "id": "kolorektales-karzinom-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Diabetes mellitus Typ 2, Arterielle Hypertonie. Meine Medikamente sind: Metformin 1000 mg 1-0-1, Enalapril 10 mg 1-0-0."
      },
      {
        "id": "kolorektales-karzinom-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Keine bekannt. Zu meinem Alltag: Raucher, 30 pack years. Viel rotes Fleisch, wenig Bewegung. Verheiratet. In der Familie: Mutter mit 72 Jahren an Darmkrebs erkrankt."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Herr Bernd Schmitt (67 J.) mit Verdacht auf V. a. Sigmakarzinom mit Eisenmangelanämie (Histologie ausstehend) im C1-Fachstil.",
      "requiredTerms": [
        "V. a. Sigmakarzinom mit Eisenmangelanämie (Histologie ausstehend)",
        "Diabetes",
        "Hämorrhoidalblutung",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Herr Bernd Schmitt (67 J., Rentner, ehem. Bankkaufmann) stellte sich mit folgender aktueller Anamnese vor: Seit ca. 4 Monaten Wechsel von Diarrhö und Obstipation, intermittierend Blutauflagerungen auf dem Stuhl, Bleistiftstühle. Ungewollter Gewichtsverlust von 6 kg, Abgeschlagenheit, Belastungsdyspnoe. Vorsorgekoloskopie bisher abgelehnt. An Vorerkrankungen seien bekannt: Diabetes mellitus Typ 2, Arterielle Hypertonie. Die Dauermedikation umfasse: Metformin 1000 mg 1-0-1, Enalapril 10 mg 1-0-0. Allergien: Keine bekannt. Sozial- und Familienanamnese: Raucher, 30 pack years. Viel rotes Fleisch, wenig Bewegung. Verheiratet. Mutter mit 72 Jahren an Darmkrebs erkrankt. Klinische Untersuchung: Blasses Hautkolorit. Abdomen: weich, tastbare Resistenz im linken Unterbauch. Rektal: Blut am Fingerling, kein Tumor tastbar. Zusammenfassend ergibt sich der dringende Verdacht auf: V. a. Sigmakarzinom mit Eisenmangelanämie (Histologie ausstehend) (Differenzialdiagnosen: Hämorrhoidalblutung, Divertikelblutung, Colitis ulcerosa)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Herr Bernd Schmitt, 67 Jahre alt, aktuell in der Aufnahme (Gastroenterologie)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Seit ca. 4 Monaten Wechsel von Diarrhö und Obstipation, intermittierend Blutauflagerungen auf dem Stuhl, Bleistiftstühle. Ungewollter Gewichtsverlust von 6 kg, Abgeschlagenheit, Belastungsdyspnoe. Vorsorgekoloskopie bisher abgelehnt. Es besteht der dringende Verdacht auf V. a. Sigmakarzinom mit Eisenmangelanämie (Histologie ausstehend)."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Diabetes mellitus Typ 2, Arterielle Hypertonie. Medikation: Metformin 1000 mg 1-0-1, Enalapril 10 mg 1-0-0. Allergien: Keine bekannt."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 125/75 mmHg, HF 92 /min, Temp 36,8 °C, SpO₂ 97 % (Raumluft). Blasses Hautkolorit. Abdomen: weich, tastbare Resistenz im linken Unterbauch. Rektal: Blut am Fingerling, kein Tumor tastbar. Labor: Hb: 9,4 g/dl (erniedrigt), MCV: 74 fl (erniedrigt), Ferritin: 8 µg/l (erniedrigt), CEA: 12,4 ng/ml (erhöht)"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich V. a. Sigmakarzinom mit Eisenmangelanämie (Histologie ausstehend) sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Hämorrhoidalblutung, Divertikelblutung, Colitis ulcerosa)."
      }
    ]
  },
  {
    "id": "dekompensierte-leberzirrhose",
    "title": "Dekompensierte Leberzirrhose mit Aszites",
    "specialty": "Gastroenterologie",
    "category": "Gastroenterologie",
    "difficulty": "C1",
    "patientName": "Herr Rainer Becker",
    "patientAge": 59,
    "chiefComplaint": "Mein Bauch wird immer dicker, obwohl ich kaum was esse. Meine Frau sagt, meine Augen sind ganz gelb, und ich bin in letzter Zeit so durcheinander.",
    "patient": {
      "name": "Herr Rainer Becker",
      "age": 59,
      "gender": "m",
      "occupation": "Taxifahrer",
      "chiefComplaint": "Mein Bauch wird immer dicker, obwohl ich kaum was esse. Meine Frau sagt, meine Augen sind ganz gelb, und ich bin in letzter Zeit so durcheinander.",
      "vitalSigns": {
        "bp": "100/60 mmHg",
        "hr": "96 /min",
        "temp": "37,6 °C",
        "spo2": "96 % (Raumluft)"
      },
      "historyDetails": "Seit ca. 4 Wochen zunehmender Bauchumfang, Gelbfärbung der Skleren, seit 1 Woche Verwirrtheit und Tag-Nacht-Umkehr (Fremdanamnese Ehefrau). Dunkler Urin, heller Stuhl. Vorerkrankungen: Alkoholabhängigkeit, Bekannte Leberzirrhose seit 2022, Ösophagusvarizen Grad II (Ligatur 2023). Medikation: Propranolol 40 mg 1-0-1, Spironolacton 100 mg 1-0-0, Lactulose 15 ml 1-1-1 (unregelmäßig). Allergien: Keine bekannt. Sozialanamnese: Alkohol trotz Empfehlung weiter ca. 1 Flasche Wein/Tag. Raucher. Verheiratet. Familienanamnese: Unauffällig. Körperliche Untersuchung: Sklerenikterus, Spider naevi, Palmarerythem, Gynäkomastie. Abdomen: ausladend, Undulationsphänomen positiv. Flapping Tremor (Asterixis). Labor: Bilirubin gesamt: 4,8 mg/dl (erhöht), Albumin: 2,4 g/dl (erniedrigt), INR: 1,9 (erhöht), Thrombozyten: 68 /nl (erniedrigt), Ammoniak: 110 µmol/l (erhöht), Natrium: 129 mmol/l."
    },
    "anamneseQuestions": [
      {
        "id": "dekompensierte-leberzirrhose-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Herr Rainer Becker, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Dekompensierte äthyltoxische Leberzirrhose (Child-Pugh C) mit Aszites und hepatischer Enzephalopathie Grad I–II vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Mein Bauch wird immer dicker, obwohl ich kaum was esse. Meine Frau sagt, meine Augen sind ganz gelb, und ich bin in letzter Zeit so durcheinander."
      },
      {
        "id": "dekompensierte-leberzirrhose-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Alkoholabhängigkeit, Bekannte Leberzirrhose seit 2022, Ösophagusvarizen Grad II (Ligatur 2023). Meine Medikamente sind: Propranolol 40 mg 1-0-1, Spironolacton 100 mg 1-0-0, Lactulose 15 ml 1-1-1 (unregelmäßig)."
      },
      {
        "id": "dekompensierte-leberzirrhose-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Keine bekannt. Zu meinem Alltag: Alkohol trotz Empfehlung weiter ca. 1 Flasche Wein/Tag. Raucher. Verheiratet. In der Familie: Unauffällig."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Herr Rainer Becker (59 J.) mit Verdacht auf Dekompensierte äthyltoxische Leberzirrhose (Child-Pugh C) mit Aszites und hepatischer Enzephalopathie Grad I–II im C1-Fachstil.",
      "requiredTerms": [
        "Dekompensierte äthyltoxische Leberzirrhose (Child-Pugh C) mit Aszites und hepatischer Enzephalopathie Grad I–II",
        "Alkoholabhängigkeit",
        "Spontan bakterielle Peritonitis",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Herr Rainer Becker (59 J., Taxifahrer) stellte sich mit folgender aktueller Anamnese vor: Seit ca. 4 Wochen zunehmender Bauchumfang, Gelbfärbung der Skleren, seit 1 Woche Verwirrtheit und Tag-Nacht-Umkehr (Fremdanamnese Ehefrau). Dunkler Urin, heller Stuhl. An Vorerkrankungen seien bekannt: Alkoholabhängigkeit, Bekannte Leberzirrhose seit 2022, Ösophagusvarizen Grad II (Ligatur 2023). Die Dauermedikation umfasse: Propranolol 40 mg 1-0-1, Spironolacton 100 mg 1-0-0, Lactulose 15 ml 1-1-1 (unregelmäßig). Allergien: Keine bekannt. Sozial- und Familienanamnese: Alkohol trotz Empfehlung weiter ca. 1 Flasche Wein/Tag. Raucher. Verheiratet. Unauffällig. Klinische Untersuchung: Sklerenikterus, Spider naevi, Palmarerythem, Gynäkomastie. Abdomen: ausladend, Undulationsphänomen positiv. Flapping Tremor (Asterixis). Zusammenfassend ergibt sich der dringende Verdacht auf: Dekompensierte äthyltoxische Leberzirrhose (Child-Pugh C) mit Aszites und hepatischer Enzephalopathie Grad I–II (Differenzialdiagnosen: Spontan bakterielle Peritonitis, Hepatozelluläres Karzinom, Pfortaderthrombose)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Herr Rainer Becker, 59 Jahre alt, aktuell in der Aufnahme (Gastroenterologie)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Seit ca. 4 Wochen zunehmender Bauchumfang, Gelbfärbung der Skleren, seit 1 Woche Verwirrtheit und Tag-Nacht-Umkehr (Fremdanamnese Ehefrau). Dunkler Urin, heller Stuhl. Es besteht der dringende Verdacht auf Dekompensierte äthyltoxische Leberzirrhose (Child-Pugh C) mit Aszites und hepatischer Enzephalopathie Grad I–II."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Alkoholabhängigkeit, Bekannte Leberzirrhose seit 2022, Ösophagusvarizen Grad II (Ligatur 2023). Medikation: Propranolol 40 mg 1-0-1, Spironolacton 100 mg 1-0-0, Lactulose 15 ml 1-1-1 (unregelmäßig). Allergien: Keine bekannt."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 100/60 mmHg, HF 96 /min, Temp 37,6 °C, SpO₂ 96 % (Raumluft). Sklerenikterus, Spider naevi, Palmarerythem, Gynäkomastie. Abdomen: ausladend, Undulationsphänomen positiv. Flapping Tremor (Asterixis). Labor: Bilirubin gesamt: 4,8 mg/dl (erhöht), Albumin: 2,4 g/dl (erniedrigt), INR: 1,9 (erhöht), Thrombozyten: 68 /nl (erniedrigt), Ammoniak: 110 µmol/l (erhöht), Natrium: 129 mmol/l"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Dekompensierte äthyltoxische Leberzirrhose (Child-Pugh C) mit Aszites und hepatischer Enzephalopathie Grad I–II sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Spontan bakterielle Peritonitis, Hepatozelluläres Karzinom, Pfortaderthrombose)."
      }
    ]
  },
  {
    "id": "gastroenteritis-exsikkose",
    "title": "Akute Gastroenteritis mit Exsikkose",
    "specialty": "Innere Medizin",
    "category": "Innere Medizin",
    "difficulty": "B1",
    "patientName": "Frau Hildegard Meyer",
    "patientAge": 84,
    "chiefComplaint": "Ich hab seit drei Tagen Durchfall, immer wieder ganz wässrig, und spucken musste ich auch. Ich kann gar nichts bei mir behalten und bin so wackelig auf den Beinen.",
    "patient": {
      "name": "Frau Hildegard Meyer",
      "age": 84,
      "gender": "w",
      "occupation": "Rentnerin, lebt im Pflegeheim",
      "chiefComplaint": "Ich hab seit drei Tagen Durchfall, immer wieder ganz wässrig, und spucken musste ich auch. Ich kann gar nichts bei mir behalten und bin so wackelig auf den Beinen.",
      "vitalSigns": {
        "bp": "95/55 mmHg",
        "hr": "108 /min",
        "temp": "37,8 °C",
        "spo2": "96 % (Raumluft)"
      },
      "historyDetails": "Seit 3 Tagen wässrige Diarrhöen (8–10x/Tag), initial Erbrechen, verminderte Trinkmenge, Schwindel. Mehrere Mitbewohner mit ähnlichen Beschwerden. Keine Antibiotika in den letzten Wochen. Vorerkrankungen: Arterielle Hypertonie, Leichte Demenz vom Alzheimer-Typ, Herzinsuffizienz (EF 50 %). Medikation: Ramipril 2,5 mg 1-0-0, Torasemid 10 mg 1-0-0, Donepezil 5 mg 0-0-1. Allergien: Keine bekannt. Sozialanamnese: Pflegeheim, Pflegegrad 3, Rollator. Nichtraucherin. Familienanamnese: Nicht erhebbar. Körperliche Untersuchung: Trockene Schleimhäute, stehende Hautfalten, verlangsamte Rekapillarisierung. Abdomen: weich, diffuser leichter Druckschmerz, lebhafte Darmgeräusche. Labor: Kreatinin: 2,1 mg/dl (erhöht, Ausgangswert 1,0), Harnstoff: 96 mg/dl (erhöht), Natrium: 148 mmol/l (erhöht), Kalium: 3,1 mmol/l (erniedrigt), CRP: 22 mg/l."
    },
    "anamneseQuestions": [
      {
        "id": "gastroenteritis-exsikkose-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Frau Hildegard Meyer, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Akute Gastroenteritis (V. a. Norovirus, Ausbruch im Pflegeheim) mit Exsikkose und prärenalem Nierenversagen vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Ich hab seit drei Tagen Durchfall, immer wieder ganz wässrig, und spucken musste ich auch. Ich kann gar nichts bei mir behalten und bin so wackelig auf den Beinen."
      },
      {
        "id": "gastroenteritis-exsikkose-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Arterielle Hypertonie, Leichte Demenz vom Alzheimer-Typ, Herzinsuffizienz (EF 50 %). Meine Medikamente sind: Ramipril 2,5 mg 1-0-0, Torasemid 10 mg 1-0-0, Donepezil 5 mg 0-0-1."
      },
      {
        "id": "gastroenteritis-exsikkose-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Keine bekannt. Zu meinem Alltag: Pflegeheim, Pflegegrad 3, Rollator. Nichtraucherin. In der Familie: Nicht erhebbar."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Frau Hildegard Meyer (84 J.) mit Verdacht auf Akute Gastroenteritis (V. a. Norovirus, Ausbruch im Pflegeheim) mit Exsikkose und prärenalem Nierenversagen im C1-Fachstil.",
      "requiredTerms": [
        "Akute Gastroenteritis (V. a. Norovirus, Ausbruch im Pflegeheim) mit Exsikkose und prärenalem Nierenversagen",
        "Arterielle",
        "Clostridioides-difficile-Infektion",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Frau Hildegard Meyer (84 J., Rentnerin, lebt im Pflegeheim) stellte sich mit folgender aktueller Anamnese vor: Seit 3 Tagen wässrige Diarrhöen (8–10x/Tag), initial Erbrechen, verminderte Trinkmenge, Schwindel. Mehrere Mitbewohner mit ähnlichen Beschwerden. Keine Antibiotika in den letzten Wochen. An Vorerkrankungen seien bekannt: Arterielle Hypertonie, Leichte Demenz vom Alzheimer-Typ, Herzinsuffizienz (EF 50 %). Die Dauermedikation umfasse: Ramipril 2,5 mg 1-0-0, Torasemid 10 mg 1-0-0, Donepezil 5 mg 0-0-1. Allergien: Keine bekannt. Sozial- und Familienanamnese: Pflegeheim, Pflegegrad 3, Rollator. Nichtraucherin. Nicht erhebbar. Klinische Untersuchung: Trockene Schleimhäute, stehende Hautfalten, verlangsamte Rekapillarisierung. Abdomen: weich, diffuser leichter Druckschmerz, lebhafte Darmgeräusche. Zusammenfassend ergibt sich der dringende Verdacht auf: Akute Gastroenteritis (V. a. Norovirus, Ausbruch im Pflegeheim) mit Exsikkose und prärenalem Nierenversagen (Differenzialdiagnosen: Clostridioides-difficile-Infektion, Ischämische Kolitis, Medikamentös bedingte Diarrhö)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Frau Hildegard Meyer, 84 Jahre alt, aktuell in der Aufnahme (Innere Medizin)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Seit 3 Tagen wässrige Diarrhöen (8–10x/Tag), initial Erbrechen, verminderte Trinkmenge, Schwindel. Mehrere Mitbewohner mit ähnlichen Beschwerden. Keine Antibiotika in den letzten Wochen. Es besteht der dringende Verdacht auf Akute Gastroenteritis (V. a. Norovirus, Ausbruch im Pflegeheim) mit Exsikkose und prärenalem Nierenversagen."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Arterielle Hypertonie, Leichte Demenz vom Alzheimer-Typ, Herzinsuffizienz (EF 50 %). Medikation: Ramipril 2,5 mg 1-0-0, Torasemid 10 mg 1-0-0, Donepezil 5 mg 0-0-1. Allergien: Keine bekannt."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 95/55 mmHg, HF 108 /min, Temp 37,8 °C, SpO₂ 96 % (Raumluft). Trockene Schleimhäute, stehende Hautfalten, verlangsamte Rekapillarisierung. Abdomen: weich, diffuser leichter Druckschmerz, lebhafte Darmgeräusche. Labor: Kreatinin: 2,1 mg/dl (erhöht, Ausgangswert 1,0), Harnstoff: 96 mg/dl (erhöht), Natrium: 148 mmol/l (erhöht), Kalium: 3,1 mmol/l (erniedrigt), CRP: 22 mg/l"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Akute Gastroenteritis (V. a. Norovirus, Ausbruch im Pflegeheim) mit Exsikkose und prärenalem Nierenversagen sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Clostridioides-difficile-Infektion, Ischämische Kolitis, Medikamentös bedingte Diarrhö)."
      }
    ]
  },
  {
    "id": "akute-mesenterialischaemie",
    "title": "Akute Mesenterialischämie",
    "specialty": "Chirurgie",
    "category": "Chirurgie",
    "difficulty": "C1",
    "patientName": "Frau Irmgard Schulze",
    "patientAge": 82,
    "chiefComplaint": "Ich hab so schlimme Bauchschmerzen, so was hatte ich noch nie. Aber wenn Sie draufdrücken, ist es gar nicht so schlimm.",
    "patient": {
      "name": "Frau Irmgard Schulze",
      "age": 82,
      "gender": "w",
      "occupation": "Rentnerin",
      "chiefComplaint": "Ich hab so schlimme Bauchschmerzen, so was hatte ich noch nie. Aber wenn Sie draufdrücken, ist es gar nicht so schlimm.",
      "vitalSigns": {
        "bp": "110/65 mmHg",
        "hr": "124 /min",
        "temp": "37,2 °C",
        "spo2": "94 % (Raumluft)"
      },
      "historyDetails": "Seit ca. 5 Stunden plötzlich aufgetretene, stärkste periumbilikale Bauchschmerzen, initial Diarrhö, einmal blutiger Stuhl. Missverhältnis zwischen starkem Schmerz und geringem Untersuchungsbefund. Vorerkrankungen: Vorhofflimmern (Antikoagulation wegen Sturzneigung abgesetzt), Herzinsuffizienz, Arterielle Hypertonie. Medikation: Metoprololsuccinat 95 mg 1-0-0, Torasemid 10 mg 1-0-0. Allergien: Keine bekannt. Sozialanamnese: Lebt im betreuten Wohnen. Nichtraucherin. Familienanamnese: Unauffällig. Körperliche Untersuchung: Arrhythmischer Puls. Abdomen: weich, kaum Druckschmerz, Darmgeräusche spärlich. Labor: Laktat: 5,8 mmol/l (deutlich erhöht), Leukozyten: 19,2 /nl (erhöht), D-Dimere: 6,2 mg/l FEU (erhöht), CRP: 38 mg/l."
    },
    "anamneseQuestions": [
      {
        "id": "akute-mesenterialischaemie-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Frau Irmgard Schulze, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Akute arterielle Mesenterialischämie bei Embolie der A. mesenterica superior (Vorhofflimmern ohne Antikoagulation) vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Ich hab so schlimme Bauchschmerzen, so was hatte ich noch nie. Aber wenn Sie draufdrücken, ist es gar nicht so schlimm."
      },
      {
        "id": "akute-mesenterialischaemie-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Vorhofflimmern (Antikoagulation wegen Sturzneigung abgesetzt), Herzinsuffizienz, Arterielle Hypertonie. Meine Medikamente sind: Metoprololsuccinat 95 mg 1-0-0, Torasemid 10 mg 1-0-0."
      },
      {
        "id": "akute-mesenterialischaemie-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Keine bekannt. Zu meinem Alltag: Lebt im betreuten Wohnen. Nichtraucherin. In der Familie: Unauffällig."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Frau Irmgard Schulze (82 J.) mit Verdacht auf Akute arterielle Mesenterialischämie bei Embolie der A. mesenterica superior (Vorhofflimmern ohne Antikoagulation) im C1-Fachstil.",
      "requiredTerms": [
        "Akute arterielle Mesenterialischämie bei Embolie der A. mesenterica superior (Vorhofflimmern ohne Antikoagulation)",
        "Vorhofflimmern",
        "Mechanischer Ileus",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Frau Irmgard Schulze (82 J., Rentnerin) stellte sich mit folgender aktueller Anamnese vor: Seit ca. 5 Stunden plötzlich aufgetretene, stärkste periumbilikale Bauchschmerzen, initial Diarrhö, einmal blutiger Stuhl. Missverhältnis zwischen starkem Schmerz und geringem Untersuchungsbefund. An Vorerkrankungen seien bekannt: Vorhofflimmern (Antikoagulation wegen Sturzneigung abgesetzt), Herzinsuffizienz, Arterielle Hypertonie. Die Dauermedikation umfasse: Metoprololsuccinat 95 mg 1-0-0, Torasemid 10 mg 1-0-0. Allergien: Keine bekannt. Sozial- und Familienanamnese: Lebt im betreuten Wohnen. Nichtraucherin. Unauffällig. Klinische Untersuchung: Arrhythmischer Puls. Abdomen: weich, kaum Druckschmerz, Darmgeräusche spärlich. Zusammenfassend ergibt sich der dringende Verdacht auf: Akute arterielle Mesenterialischämie bei Embolie der A. mesenterica superior (Vorhofflimmern ohne Antikoagulation) (Differenzialdiagnosen: Mechanischer Ileus, Perforiertes Hohlorgan, Akute Pankreatitis)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Frau Irmgard Schulze, 82 Jahre alt, aktuell in der Aufnahme (Chirurgie)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Seit ca. 5 Stunden plötzlich aufgetretene, stärkste periumbilikale Bauchschmerzen, initial Diarrhö, einmal blutiger Stuhl. Missverhältnis zwischen starkem Schmerz und geringem Untersuchungsbefund. Es besteht der dringende Verdacht auf Akute arterielle Mesenterialischämie bei Embolie der A. mesenterica superior (Vorhofflimmern ohne Antikoagulation)."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Vorhofflimmern (Antikoagulation wegen Sturzneigung abgesetzt), Herzinsuffizienz, Arterielle Hypertonie. Medikation: Metoprololsuccinat 95 mg 1-0-0, Torasemid 10 mg 1-0-0. Allergien: Keine bekannt."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 110/65 mmHg, HF 124 /min, Temp 37,2 °C, SpO₂ 94 % (Raumluft). Arrhythmischer Puls. Abdomen: weich, kaum Druckschmerz, Darmgeräusche spärlich. Labor: Laktat: 5,8 mmol/l (deutlich erhöht), Leukozyten: 19,2 /nl (erhöht), D-Dimere: 6,2 mg/l FEU (erhöht), CRP: 38 mg/l"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Akute arterielle Mesenterialischämie bei Embolie der A. mesenterica superior (Vorhofflimmern ohne Antikoagulation) sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Mechanischer Ileus, Perforiertes Hohlorgan, Akute Pankreatitis)."
      }
    ]
  },
  {
    "id": "lungenarterienembolie",
    "title": "Lungenarterienembolie (LAE)",
    "specialty": "Innere Medizin",
    "category": "Innere Medizin",
    "difficulty": "C1",
    "patientName": "Frau Sabine Hoffmann",
    "patientAge": 38,
    "chiefComplaint": "Ich krieg seit heute früh so schlecht Luft, und beim Einatmen sticht's rechts in der Brust. Mein Herz rast die ganze Zeit.",
    "patient": {
      "name": "Frau Sabine Hoffmann",
      "age": 38,
      "gender": "w",
      "occupation": "Bürokauffrau",
      "chiefComplaint": "Ich krieg seit heute früh so schlecht Luft, und beim Einatmen sticht's rechts in der Brust. Mein Herz rast die ganze Zeit.",
      "vitalSigns": {
        "bp": "110/70 mmHg",
        "hr": "118 /min",
        "temp": "37,4 °C",
        "spo2": "89 % (Raumluft)"
      },
      "historyDetails": "Seit ca. 6 Stunden plötzlich aufgetretene Dyspnoe und atemabhängige Thoraxschmerzen rechts. Seit 4 Tagen Schwellung und Spannungsgefühl der linken Wade. Rückflug aus Thailand vor 6 Tagen (11 Stunden). Vorerkrankungen: Keine relevanten Vorerkrankungen. Medikation: Kombiniertes orales Kontrazeptivum (Ethinylestradiol/Levonorgestrel) 1-0-0. Allergien: Keine bekannt. Sozialanamnese: Raucherin, ca. 10 Zigaretten/Tag seit 15 Jahren. Alkohol gelegentlich. Ledig. Familienanamnese: Mutter hatte mit 45 Jahren eine Beinvenenthrombose. Körperliche Untersuchung: Tachypnoe, Tachykardie. Pulmo: vesikuläres Atemgeräusch beidseits. Linke Wade überwärmt, Umfangsdifferenz 3 cm, Wadenkompressionsschmerz. Labor: D-Dimere: 4,8 mg/l FEU (erhöht), hs-Troponin T: 22 ng/l (leicht erhöht), BGA: pO2 58 mmHg, pCO2 30 mmHg, β-HCG: negativ."
    },
    "anamneseQuestions": [
      {
        "id": "lungenarterienembolie-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Frau Sabine Hoffmann, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Akute Lungenarterienembolie bei tiefer Beinvenenthrombose links vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Ich krieg seit heute früh so schlecht Luft, und beim Einatmen sticht's rechts in der Brust. Mein Herz rast die ganze Zeit."
      },
      {
        "id": "lungenarterienembolie-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Keine relevanten Vorerkrankungen. Meine Medikamente sind: Kombiniertes orales Kontrazeptivum (Ethinylestradiol/Levonorgestrel) 1-0-0."
      },
      {
        "id": "lungenarterienembolie-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Keine bekannt. Zu meinem Alltag: Raucherin, ca. 10 Zigaretten/Tag seit 15 Jahren. Alkohol gelegentlich. Ledig. In der Familie: Mutter hatte mit 45 Jahren eine Beinvenenthrombose."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Frau Sabine Hoffmann (38 J.) mit Verdacht auf Akute Lungenarterienembolie bei tiefer Beinvenenthrombose links im C1-Fachstil.",
      "requiredTerms": [
        "Akute Lungenarterienembolie bei tiefer Beinvenenthrombose links",
        "Keine",
        "Pneumothorax",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Frau Sabine Hoffmann (38 J., Bürokauffrau) stellte sich mit folgender aktueller Anamnese vor: Seit ca. 6 Stunden plötzlich aufgetretene Dyspnoe und atemabhängige Thoraxschmerzen rechts. Seit 4 Tagen Schwellung und Spannungsgefühl der linken Wade. Rückflug aus Thailand vor 6 Tagen (11 Stunden). An Vorerkrankungen seien bekannt: Keine relevanten Vorerkrankungen. Die Dauermedikation umfasse: Kombiniertes orales Kontrazeptivum (Ethinylestradiol/Levonorgestrel) 1-0-0. Allergien: Keine bekannt. Sozial- und Familienanamnese: Raucherin, ca. 10 Zigaretten/Tag seit 15 Jahren. Alkohol gelegentlich. Ledig. Mutter hatte mit 45 Jahren eine Beinvenenthrombose. Klinische Untersuchung: Tachypnoe, Tachykardie. Pulmo: vesikuläres Atemgeräusch beidseits. Linke Wade überwärmt, Umfangsdifferenz 3 cm, Wadenkompressionsschmerz. Zusammenfassend ergibt sich der dringende Verdacht auf: Akute Lungenarterienembolie bei tiefer Beinvenenthrombose links (Differenzialdiagnosen: Pneumothorax, Pneumonie mit Pleuritis, Akutes Koronarsyndrom)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Frau Sabine Hoffmann, 38 Jahre alt, aktuell in der Aufnahme (Innere Medizin)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Seit ca. 6 Stunden plötzlich aufgetretene Dyspnoe und atemabhängige Thoraxschmerzen rechts. Seit 4 Tagen Schwellung und Spannungsgefühl der linken Wade. Rückflug aus Thailand vor 6 Tagen (11 Stunden). Es besteht der dringende Verdacht auf Akute Lungenarterienembolie bei tiefer Beinvenenthrombose links."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Keine relevanten Vorerkrankungen. Medikation: Kombiniertes orales Kontrazeptivum (Ethinylestradiol/Levonorgestrel) 1-0-0. Allergien: Keine bekannt."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 110/70 mmHg, HF 118 /min, Temp 37,4 °C, SpO₂ 89 % (Raumluft). Tachypnoe, Tachykardie. Pulmo: vesikuläres Atemgeräusch beidseits. Linke Wade überwärmt, Umfangsdifferenz 3 cm, Wadenkompressionsschmerz. Labor: D-Dimere: 4,8 mg/l FEU (erhöht), hs-Troponin T: 22 ng/l (leicht erhöht), BGA: pO2 58 mmHg, pCO2 30 mmHg, β-HCG: negativ"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Akute Lungenarterienembolie bei tiefer Beinvenenthrombose links sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Pneumothorax, Pneumonie mit Pleuritis, Akutes Koronarsyndrom)."
      }
    ]
  },
  {
    "id": "ambulant-erworbene-pneumonie",
    "title": "Ambulant erworbene Pneumonie",
    "specialty": "Innere Medizin",
    "category": "Innere Medizin",
    "difficulty": "B1",
    "patientName": "Herr Wolfgang Richter",
    "patientAge": 71,
    "chiefComplaint": "Ich hab seit drei Tagen hohes Fieber und huste so gelbgrünes Zeug ab. Ich bin total schlapp und krieg beim Treppensteigen kaum Luft.",
    "patient": {
      "name": "Herr Wolfgang Richter",
      "age": 71,
      "gender": "m",
      "occupation": "Rentner, ehem. Schlosser",
      "chiefComplaint": "Ich hab seit drei Tagen hohes Fieber und huste so gelbgrünes Zeug ab. Ich bin total schlapp und krieg beim Treppensteigen kaum Luft.",
      "vitalSigns": {
        "bp": "105/65 mmHg",
        "hr": "104 /min",
        "temp": "39,2 °C",
        "spo2": "91 % (Raumluft)"
      },
      "historyDetails": "Seit 3 Tagen Fieber bis 39,5 °C mit Schüttelfrost, produktiver Husten mit gelb-grünem Auswurf, Belastungsdyspnoe, rechtsseitige atemabhängige Thoraxschmerzen. Vorerkrankungen: Arterielle Hypertonie, Benigne Prostatahyperplasie. Medikation: Candesartan 8 mg 1-0-0, Tamsulosin 0,4 mg 0-0-1. Allergien: Keine bekannt. Sozialanamnese: Ex-Raucher (20 pack years, seit 10 Jahren abstinent). Lebt mit Ehefrau, selbstständig. Familienanamnese: Unauffällig. Körperliche Untersuchung: Pulmo: rechts basal ohrnahe feinblasige Rasselgeräusche, Klopfschalldämpfung, verstärkter Stimmfremitus. Labor: Leukozyten: 16,8 /nl (erhöht), CRP: 186 mg/l (erhöht), Procalcitonin: 1,9 ng/ml (erhöht), Harnstoff: 52 mg/dl (erhöht)."
    },
    "anamneseQuestions": [
      {
        "id": "ambulant-erworbene-pneumonie-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Herr Wolfgang Richter, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Ambulant erworbene Pneumonie im rechten Unterlappen (CRB-65: 2 Punkte) vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Ich hab seit drei Tagen hohes Fieber und huste so gelbgrünes Zeug ab. Ich bin total schlapp und krieg beim Treppensteigen kaum Luft."
      },
      {
        "id": "ambulant-erworbene-pneumonie-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Arterielle Hypertonie, Benigne Prostatahyperplasie. Meine Medikamente sind: Candesartan 8 mg 1-0-0, Tamsulosin 0,4 mg 0-0-1."
      },
      {
        "id": "ambulant-erworbene-pneumonie-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Keine bekannt. Zu meinem Alltag: Ex-Raucher (20 pack years, seit 10 Jahren abstinent). Lebt mit Ehefrau, selbstständig. In der Familie: Unauffällig."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Herr Wolfgang Richter (71 J.) mit Verdacht auf Ambulant erworbene Pneumonie im rechten Unterlappen (CRB-65: 2 Punkte) im C1-Fachstil.",
      "requiredTerms": [
        "Ambulant erworbene Pneumonie im rechten Unterlappen (CRB-65: 2 Punkte)",
        "Arterielle",
        "Akute Bronchitis",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Herr Wolfgang Richter (71 J., Rentner, ehem. Schlosser) stellte sich mit folgender aktueller Anamnese vor: Seit 3 Tagen Fieber bis 39,5 °C mit Schüttelfrost, produktiver Husten mit gelb-grünem Auswurf, Belastungsdyspnoe, rechtsseitige atemabhängige Thoraxschmerzen. An Vorerkrankungen seien bekannt: Arterielle Hypertonie, Benigne Prostatahyperplasie. Die Dauermedikation umfasse: Candesartan 8 mg 1-0-0, Tamsulosin 0,4 mg 0-0-1. Allergien: Keine bekannt. Sozial- und Familienanamnese: Ex-Raucher (20 pack years, seit 10 Jahren abstinent). Lebt mit Ehefrau, selbstständig. Unauffällig. Klinische Untersuchung: Pulmo: rechts basal ohrnahe feinblasige Rasselgeräusche, Klopfschalldämpfung, verstärkter Stimmfremitus. Zusammenfassend ergibt sich der dringende Verdacht auf: Ambulant erworbene Pneumonie im rechten Unterlappen (CRB-65: 2 Punkte) (Differenzialdiagnosen: Akute Bronchitis, Exazerbierte COPD, Lungenarterienembolie)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Herr Wolfgang Richter, 71 Jahre alt, aktuell in der Aufnahme (Innere Medizin)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Seit 3 Tagen Fieber bis 39,5 °C mit Schüttelfrost, produktiver Husten mit gelb-grünem Auswurf, Belastungsdyspnoe, rechtsseitige atemabhängige Thoraxschmerzen. Es besteht der dringende Verdacht auf Ambulant erworbene Pneumonie im rechten Unterlappen (CRB-65: 2 Punkte)."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Arterielle Hypertonie, Benigne Prostatahyperplasie. Medikation: Candesartan 8 mg 1-0-0, Tamsulosin 0,4 mg 0-0-1. Allergien: Keine bekannt."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 105/65 mmHg, HF 104 /min, Temp 39,2 °C, SpO₂ 91 % (Raumluft). Pulmo: rechts basal ohrnahe feinblasige Rasselgeräusche, Klopfschalldämpfung, verstärkter Stimmfremitus. Labor: Leukozyten: 16,8 /nl (erhöht), CRP: 186 mg/l (erhöht), Procalcitonin: 1,9 ng/ml (erhöht), Harnstoff: 52 mg/dl (erhöht)"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Ambulant erworbene Pneumonie im rechten Unterlappen (CRB-65: 2 Punkte) sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Akute Bronchitis, Exazerbierte COPD, Lungenarterienembolie)."
      }
    ]
  },
  {
    "id": "dekompensierte-herzinsuffizienz",
    "title": "Dekompensierte Herzinsuffizienz",
    "specialty": "Kardiologie",
    "category": "Kardiologie",
    "difficulty": "B2",
    "patientName": "Frau Gertrud Wagner",
    "patientAge": 79,
    "chiefComplaint": "Ich kann nachts nicht mehr flach liegen, ich muss mit drei Kissen schlafen. Und meine Beine sind so dick geworden, die Schuhe passen nicht mehr.",
    "patient": {
      "name": "Frau Gertrud Wagner",
      "age": 79,
      "gender": "w",
      "occupation": "Rentnerin",
      "chiefComplaint": "Ich kann nachts nicht mehr flach liegen, ich muss mit drei Kissen schlafen. Und meine Beine sind so dick geworden, die Schuhe passen nicht mehr.",
      "vitalSigns": {
        "bp": "150/90 mmHg",
        "hr": "96 /min",
        "temp": "36,7 °C",
        "spo2": "88 % (Raumluft)"
      },
      "historyDetails": "Seit ca. 10 Tagen zunehmende Belastungsdyspnoe, jetzt Ruhedyspnoe, Orthopnoe (3 Kissen), nächtliche Hustenattacken, Gewichtszunahme um 4 kg, beidseitige Beinödeme. Hat die Wassertabletten vor 2 Wochen abgesetzt, weil sie nachts so oft auf die Toilette musste. Vorerkrankungen: KHK, Z. n. Myokardinfarkt 2018 mit Stent-Implantation (RIVA), Herzinsuffizienz mit reduzierter EF (35 %), Arterielle Hypertonie, Chronische Niereninsuffizienz Stadium G3a. Medikation: Torasemid 10 mg 1-0-0 (eigenständig abgesetzt), Sacubitril/Valsartan 49/51 mg 1-0-1, Bisoprolol 5 mg 1-0-0, ASS 100 mg 1-0-0, Atorvastatin 40 mg 0-0-1. Allergien: Keine bekannt. Sozialanamnese: Verwitwet, lebt allein, Pflegegrad 1, Tochter kommt täglich. Nichtraucherin. Familienanamnese: Unauffällig. Körperliche Untersuchung: Halsvenenstauung, beidseits basale feuchte Rasselgeräusche, prätibiale Ödeme beidseits (dellbar), 3. Herzton. Labor: NT-proBNP: 8.400 pg/ml (deutlich erhöht), Kreatinin: 1,6 mg/dl (erhöht), Natrium: 132 mmol/l (erniedrigt), Kalium: 4,9 mmol/l, hs-Troponin T: 18 ng/l."
    },
    "anamneseQuestions": [
      {
        "id": "dekompensierte-herzinsuffizienz-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Frau Gertrud Wagner, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Akut dekompensierte Herzinsuffizienz (NYHA IV) bei ischämischer Kardiomyopathie, Auslöser: Medikamenten-Non-Adhärenz vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Ich kann nachts nicht mehr flach liegen, ich muss mit drei Kissen schlafen. Und meine Beine sind so dick geworden, die Schuhe passen nicht mehr."
      },
      {
        "id": "dekompensierte-herzinsuffizienz-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: KHK, Z. n. Myokardinfarkt 2018 mit Stent-Implantation (RIVA), Herzinsuffizienz mit reduzierter EF (35 %), Arterielle Hypertonie, Chronische Niereninsuffizienz Stadium G3a. Meine Medikamente sind: Torasemid 10 mg 1-0-0 (eigenständig abgesetzt), Sacubitril/Valsartan 49/51 mg 1-0-1, Bisoprolol 5 mg 1-0-0, ASS 100 mg 1-0-0, Atorvastatin 40 mg 0-0-1."
      },
      {
        "id": "dekompensierte-herzinsuffizienz-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Keine bekannt. Zu meinem Alltag: Verwitwet, lebt allein, Pflegegrad 1, Tochter kommt täglich. Nichtraucherin. In der Familie: Unauffällig."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Frau Gertrud Wagner (79 J.) mit Verdacht auf Akut dekompensierte Herzinsuffizienz (NYHA IV) bei ischämischer Kardiomyopathie, Auslöser: Medikamenten-Non-Adhärenz im C1-Fachstil.",
      "requiredTerms": [
        "Akut dekompensierte Herzinsuffizienz (NYHA IV) bei ischämischer Kardiomyopathie, Auslöser: Medikamenten-Non-Adhärenz",
        "KHK,",
        "Akutes Koronarsyndrom",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Frau Gertrud Wagner (79 J., Rentnerin) stellte sich mit folgender aktueller Anamnese vor: Seit ca. 10 Tagen zunehmende Belastungsdyspnoe, jetzt Ruhedyspnoe, Orthopnoe (3 Kissen), nächtliche Hustenattacken, Gewichtszunahme um 4 kg, beidseitige Beinödeme. Hat die Wassertabletten vor 2 Wochen abgesetzt, weil sie nachts so oft auf die Toilette musste. An Vorerkrankungen seien bekannt: KHK, Z. n. Myokardinfarkt 2018 mit Stent-Implantation (RIVA), Herzinsuffizienz mit reduzierter EF (35 %), Arterielle Hypertonie, Chronische Niereninsuffizienz Stadium G3a. Die Dauermedikation umfasse: Torasemid 10 mg 1-0-0 (eigenständig abgesetzt), Sacubitril/Valsartan 49/51 mg 1-0-1, Bisoprolol 5 mg 1-0-0, ASS 100 mg 1-0-0, Atorvastatin 40 mg 0-0-1. Allergien: Keine bekannt. Sozial- und Familienanamnese: Verwitwet, lebt allein, Pflegegrad 1, Tochter kommt täglich. Nichtraucherin. Unauffällig. Klinische Untersuchung: Halsvenenstauung, beidseits basale feuchte Rasselgeräusche, prätibiale Ödeme beidseits (dellbar), 3. Herzton. Zusammenfassend ergibt sich der dringende Verdacht auf: Akut dekompensierte Herzinsuffizienz (NYHA IV) bei ischämischer Kardiomyopathie, Auslöser: Medikamenten-Non-Adhärenz (Differenzialdiagnosen: Akutes Koronarsyndrom, Pneumonie, Lungenarterienembolie)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Frau Gertrud Wagner, 79 Jahre alt, aktuell in der Aufnahme (Kardiologie)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Seit ca. 10 Tagen zunehmende Belastungsdyspnoe, jetzt Ruhedyspnoe, Orthopnoe (3 Kissen), nächtliche Hustenattacken, Gewichtszunahme um 4 kg, beidseitige Beinödeme. Hat die Wassertabletten vor 2 Wochen abgesetzt, weil sie nachts so oft auf die Toilette musste. Es besteht der dringende Verdacht auf Akut dekompensierte Herzinsuffizienz (NYHA IV) bei ischämischer Kardiomyopathie, Auslöser: Medikamenten-Non-Adhärenz."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: KHK, Z. n. Myokardinfarkt 2018 mit Stent-Implantation (RIVA), Herzinsuffizienz mit reduzierter EF (35 %), Arterielle Hypertonie, Chronische Niereninsuffizienz Stadium G3a. Medikation: Torasemid 10 mg 1-0-0 (eigenständig abgesetzt), Sacubitril/Valsartan 49/51 mg 1-0-1, Bisoprolol 5 mg 1-0-0, ASS 100 mg 1-0-0, Atorvastatin 40 mg 0-0-1. Allergien: Keine bekannt."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 150/90 mmHg, HF 96 /min, Temp 36,7 °C, SpO₂ 88 % (Raumluft). Halsvenenstauung, beidseits basale feuchte Rasselgeräusche, prätibiale Ödeme beidseits (dellbar), 3. Herzton. Labor: NT-proBNP: 8.400 pg/ml (deutlich erhöht), Kreatinin: 1,6 mg/dl (erhöht), Natrium: 132 mmol/l (erniedrigt), Kalium: 4,9 mmol/l, hs-Troponin T: 18 ng/l"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Akut dekompensierte Herzinsuffizienz (NYHA IV) bei ischämischer Kardiomyopathie, Auslöser: Medikamenten-Non-Adhärenz sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Akutes Koronarsyndrom, Pneumonie, Lungenarterienembolie)."
      }
    ]
  },
  {
    "id": "tachykardes-vorhofflimmern",
    "title": "Tachykardes Vorhofflimmern",
    "specialty": "Kardiologie",
    "category": "Kardiologie",
    "difficulty": "B2",
    "patientName": "Herr Jürgen Neumann",
    "patientAge": 66,
    "chiefComplaint": "Seit gestern Abend stolpert mein Herz total unregelmäßig und rast. Mir ist ein bisschen schwindelig, und ich hab so ein Flattern in der Brust.",
    "patient": {
      "name": "Herr Jürgen Neumann",
      "age": 66,
      "gender": "m",
      "occupation": "Steuerberater",
      "chiefComplaint": "Seit gestern Abend stolpert mein Herz total unregelmäßig und rast. Mir ist ein bisschen schwindelig, und ich hab so ein Flattern in der Brust.",
      "vitalSigns": {
        "bp": "135/85 mmHg",
        "hr": "142 /min",
        "temp": "36,6 °C",
        "spo2": "96 % (Raumluft)"
      },
      "historyDetails": "Seit ca. 16 Stunden Palpitationen, unregelmäßiger schneller Herzschlag, leichter Schwindel, keine Synkope, keine Thoraxschmerzen. Am Vorabend Geburtstagsfeier mit reichlich Alkohol. Vorerkrankungen: Arterielle Hypertonie, Obstruktives Schlafapnoe-Syndrom (CPAP). Medikation: Ramipril 5 mg 1-0-0. Allergien: Jod-haltiges Kontrastmittel (Urtikaria). Sozialanamnese: Alkohol ca. 2 Gläser Wein/Tag, Nichtraucher. Verheiratet. Familienanamnese: Bruder hat Vorhofflimmern. Körperliche Untersuchung: Arrhythmia absoluta, Pulsdefizit ca. 20/min. Pulmo frei. Keine Ödeme. Labor: TSH: 1,8 mU/l, Kalium: 3,6 mmol/l, Magnesium: 0,72 mmol/l, hs-Troponin T: 12 ng/l."
    },
    "anamneseQuestions": [
      {
        "id": "tachykardes-vorhofflimmern-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Herr Jürgen Neumann, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Erstdiagnose Vorhofflimmern mit tachykarder Überleitung (CHA2DS2-VASc: 2 Punkte) vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Seit gestern Abend stolpert mein Herz total unregelmäßig und rast. Mir ist ein bisschen schwindelig, und ich hab so ein Flattern in der Brust."
      },
      {
        "id": "tachykardes-vorhofflimmern-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Arterielle Hypertonie, Obstruktives Schlafapnoe-Syndrom (CPAP). Meine Medikamente sind: Ramipril 5 mg 1-0-0."
      },
      {
        "id": "tachykardes-vorhofflimmern-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Jod-haltiges Kontrastmittel (Urtikaria). Zu meinem Alltag: Alkohol ca. 2 Gläser Wein/Tag, Nichtraucher. Verheiratet. In der Familie: Bruder hat Vorhofflimmern."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Herr Jürgen Neumann (66 J.) mit Verdacht auf Erstdiagnose Vorhofflimmern mit tachykarder Überleitung (CHA2DS2-VASc: 2 Punkte) im C1-Fachstil.",
      "requiredTerms": [
        "Erstdiagnose Vorhofflimmern mit tachykarder Überleitung (CHA2DS2-VASc: 2 Punkte)",
        "Arterielle",
        "Vorhofflattern",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Herr Jürgen Neumann (66 J., Steuerberater) stellte sich mit folgender aktueller Anamnese vor: Seit ca. 16 Stunden Palpitationen, unregelmäßiger schneller Herzschlag, leichter Schwindel, keine Synkope, keine Thoraxschmerzen. Am Vorabend Geburtstagsfeier mit reichlich Alkohol. An Vorerkrankungen seien bekannt: Arterielle Hypertonie, Obstruktives Schlafapnoe-Syndrom (CPAP). Die Dauermedikation umfasse: Ramipril 5 mg 1-0-0. Allergien: Jod-haltiges Kontrastmittel (Urtikaria). Sozial- und Familienanamnese: Alkohol ca. 2 Gläser Wein/Tag, Nichtraucher. Verheiratet. Bruder hat Vorhofflimmern. Klinische Untersuchung: Arrhythmia absoluta, Pulsdefizit ca. 20/min. Pulmo frei. Keine Ödeme. Zusammenfassend ergibt sich der dringende Verdacht auf: Erstdiagnose Vorhofflimmern mit tachykarder Überleitung (CHA2DS2-VASc: 2 Punkte) (Differenzialdiagnosen: Vorhofflattern, Hyperthyreose, Akutes Koronarsyndrom)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Herr Jürgen Neumann, 66 Jahre alt, aktuell in der Aufnahme (Kardiologie)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Seit ca. 16 Stunden Palpitationen, unregelmäßiger schneller Herzschlag, leichter Schwindel, keine Synkope, keine Thoraxschmerzen. Am Vorabend Geburtstagsfeier mit reichlich Alkohol. Es besteht der dringende Verdacht auf Erstdiagnose Vorhofflimmern mit tachykarder Überleitung (CHA2DS2-VASc: 2 Punkte)."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Arterielle Hypertonie, Obstruktives Schlafapnoe-Syndrom (CPAP). Medikation: Ramipril 5 mg 1-0-0. Allergien: Jod-haltiges Kontrastmittel (Urtikaria)."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 135/85 mmHg, HF 142 /min, Temp 36,6 °C, SpO₂ 96 % (Raumluft). Arrhythmia absoluta, Pulsdefizit ca. 20/min. Pulmo frei. Keine Ödeme. Labor: TSH: 1,8 mU/l, Kalium: 3,6 mmol/l, Magnesium: 0,72 mmol/l, hs-Troponin T: 12 ng/l"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Erstdiagnose Vorhofflimmern mit tachykarder Überleitung (CHA2DS2-VASc: 2 Punkte) sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Vorhofflattern, Hyperthyreose, Akutes Koronarsyndrom)."
      }
    ]
  },
  {
    "id": "hypertensive-entgleisung",
    "title": "Hypertensiver Notfall",
    "specialty": "Innere Medizin",
    "category": "Innere Medizin",
    "difficulty": "B2",
    "patientName": "Herr Dragan Petrović",
    "patientAge": 55,
    "chiefComplaint": "Mir brummt seit heute Mittag der Schädel wie verrückt, und ich seh so verschwommen. Mein Blutdruckgerät hat 230 angezeigt.",
    "patient": {
      "name": "Herr Dragan Petrović",
      "age": 55,
      "gender": "m",
      "occupation": "Lkw-Fahrer",
      "chiefComplaint": "Mir brummt seit heute Mittag der Schädel wie verrückt, und ich seh so verschwommen. Mein Blutdruckgerät hat 230 angezeigt.",
      "vitalSigns": {
        "bp": "230/130 mmHg",
        "hr": "92 /min",
        "temp": "36,8 °C",
        "spo2": "97 % (Raumluft)"
      },
      "historyDetails": "Seit ca. 5 Stunden okzipitale Kopfschmerzen, Sehstörungen (verschwommen), Übelkeit. Blutdruckmedikamente seit 3 Wochen nicht genommen (Rezept abgelaufen). Keine Paresen. Vorerkrankungen: Arterielle Hypertonie seit 10 Jahren, Adipositas (BMI 34), Hyperurikämie. Medikation: Amlodipin 10 mg 1-0-0 (pausiert), Hydrochlorothiazid 25 mg 1-0-0 (pausiert), Allopurinol 300 mg 1-0-0. Allergien: Keine bekannt. Sozialanamnese: Raucher, 25 pack years. Alkohol am Wochenende. Viel unterwegs, unregelmäßige Mahlzeiten. Familienanamnese: Mutter Hypertonie, Vater Schlaganfall mit 63 Jahren. Körperliche Untersuchung: Neurologisch grob orientierend unauffällig. Fundoskopie: Papillenödem, streifige Blutungen. Labor: Kreatinin: 1,4 mg/dl (erhöht), Urinstatus: Protein ++, hs-Troponin T: 16 ng/l."
    },
    "anamneseQuestions": [
      {
        "id": "hypertensive-entgleisung-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Herr Dragan Petrović, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Hypertensiver Notfall mit hypertensiver Retinopathie und Enzephalopathie-Zeichen vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Mir brummt seit heute Mittag der Schädel wie verrückt, und ich seh so verschwommen. Mein Blutdruckgerät hat 230 angezeigt."
      },
      {
        "id": "hypertensive-entgleisung-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Arterielle Hypertonie seit 10 Jahren, Adipositas (BMI 34), Hyperurikämie. Meine Medikamente sind: Amlodipin 10 mg 1-0-0 (pausiert), Hydrochlorothiazid 25 mg 1-0-0 (pausiert), Allopurinol 300 mg 1-0-0."
      },
      {
        "id": "hypertensive-entgleisung-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Keine bekannt. Zu meinem Alltag: Raucher, 25 pack years. Alkohol am Wochenende. Viel unterwegs, unregelmäßige Mahlzeiten. In der Familie: Mutter Hypertonie, Vater Schlaganfall mit 63 Jahren."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Herr Dragan Petrović (55 J.) mit Verdacht auf Hypertensiver Notfall mit hypertensiver Retinopathie und Enzephalopathie-Zeichen im C1-Fachstil.",
      "requiredTerms": [
        "Hypertensiver Notfall mit hypertensiver Retinopathie und Enzephalopathie-Zeichen",
        "Arterielle",
        "Intrazerebrale Blutung",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Herr Dragan Petrović (55 J., Lkw-Fahrer) stellte sich mit folgender aktueller Anamnese vor: Seit ca. 5 Stunden okzipitale Kopfschmerzen, Sehstörungen (verschwommen), Übelkeit. Blutdruckmedikamente seit 3 Wochen nicht genommen (Rezept abgelaufen). Keine Paresen. An Vorerkrankungen seien bekannt: Arterielle Hypertonie seit 10 Jahren, Adipositas (BMI 34), Hyperurikämie. Die Dauermedikation umfasse: Amlodipin 10 mg 1-0-0 (pausiert), Hydrochlorothiazid 25 mg 1-0-0 (pausiert), Allopurinol 300 mg 1-0-0. Allergien: Keine bekannt. Sozial- und Familienanamnese: Raucher, 25 pack years. Alkohol am Wochenende. Viel unterwegs, unregelmäßige Mahlzeiten. Mutter Hypertonie, Vater Schlaganfall mit 63 Jahren. Klinische Untersuchung: Neurologisch grob orientierend unauffällig. Fundoskopie: Papillenödem, streifige Blutungen. Zusammenfassend ergibt sich der dringende Verdacht auf: Hypertensiver Notfall mit hypertensiver Retinopathie und Enzephalopathie-Zeichen (Differenzialdiagnosen: Intrazerebrale Blutung, Subarachnoidalblutung, Apoplex)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Herr Dragan Petrović, 55 Jahre alt, aktuell in der Aufnahme (Innere Medizin)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Seit ca. 5 Stunden okzipitale Kopfschmerzen, Sehstörungen (verschwommen), Übelkeit. Blutdruckmedikamente seit 3 Wochen nicht genommen (Rezept abgelaufen). Keine Paresen. Es besteht der dringende Verdacht auf Hypertensiver Notfall mit hypertensiver Retinopathie und Enzephalopathie-Zeichen."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Arterielle Hypertonie seit 10 Jahren, Adipositas (BMI 34), Hyperurikämie. Medikation: Amlodipin 10 mg 1-0-0 (pausiert), Hydrochlorothiazid 25 mg 1-0-0 (pausiert), Allopurinol 300 mg 1-0-0. Allergien: Keine bekannt."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 230/130 mmHg, HF 92 /min, Temp 36,8 °C, SpO₂ 97 % (Raumluft). Neurologisch grob orientierend unauffällig. Fundoskopie: Papillenödem, streifige Blutungen. Labor: Kreatinin: 1,4 mg/dl (erhöht), Urinstatus: Protein ++, hs-Troponin T: 16 ng/l"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Hypertensiver Notfall mit hypertensiver Retinopathie und Enzephalopathie-Zeichen sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Intrazerebrale Blutung, Subarachnoidalblutung, Apoplex)."
      }
    ]
  },
  {
    "id": "asthma-anfall",
    "title": "Akuter Asthmaanfall",
    "specialty": "Pneumologie",
    "category": "Pneumologie",
    "difficulty": "B1",
    "patientName": "Frau Ayşe Demir",
    "patientAge": 27,
    "chiefComplaint": "Ich krieg keine Luft, meine Brust ist ganz eng. Mein Spray hab ich schon dreimal genommen, aber es wird nicht besser.",
    "patient": {
      "name": "Frau Ayşe Demir",
      "age": 27,
      "gender": "w",
      "occupation": "Erzieherin",
      "chiefComplaint": "Ich krieg keine Luft, meine Brust ist ganz eng. Mein Spray hab ich schon dreimal genommen, aber es wird nicht besser.",
      "vitalSigns": {
        "bp": "130/80 mmHg",
        "hr": "124 /min",
        "temp": "36,9 °C",
        "spo2": "90 % (Raumluft)"
      },
      "historyDetails": "Seit ca. 2 Stunden zunehmende Atemnot, Engegefühl in der Brust, trockener Husten. Am Abend bei einer Freundin mit zwei Katzen. Spricht nur in kurzen Sätzen. Vorerkrankungen: Allergisches Asthma bronchiale seit Kindheit, Allergische Rhinokonjunktivitis (Gräser, Katzenhaare). Medikation: Budesonid/Formoterol 160/4,5 µg 1 Hub 1-0-1 und bei Bedarf, Cetirizin 10 mg bei Bedarf. Allergien: Katzenhaare, Gräserpollen, Ibuprofen (Atemnot). Sozialanamnese: Nichtraucherin, kein Alkohol. Lebt mit Partner. Familienanamnese: Mutter hat Neurodermitis. Körperliche Untersuchung: Sitzende Position, Sprechdyspnoe. Pulmo: ubiquitäres exspiratorisches Giemen, verlängertes Exspirium. Peak-Flow 40 % des persönlichen Bestwerts. Labor: BGA: pH 7,46, pCO2 33 mmHg, pO2 62 mmHg, Eosinophile: 8 % (erhöht)."
    },
    "anamneseQuestions": [
      {
        "id": "asthma-anfall-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Frau Ayşe Demir, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Schwerer akuter Asthmaanfall bei allergischem Asthma bronchiale, Auslöser Katzenhaarexposition vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Ich krieg keine Luft, meine Brust ist ganz eng. Mein Spray hab ich schon dreimal genommen, aber es wird nicht besser."
      },
      {
        "id": "asthma-anfall-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Allergisches Asthma bronchiale seit Kindheit, Allergische Rhinokonjunktivitis (Gräser, Katzenhaare). Meine Medikamente sind: Budesonid/Formoterol 160/4,5 µg 1 Hub 1-0-1 und bei Bedarf, Cetirizin 10 mg bei Bedarf."
      },
      {
        "id": "asthma-anfall-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Katzenhaare, Gräserpollen, Ibuprofen (Atemnot). Zu meinem Alltag: Nichtraucherin, kein Alkohol. Lebt mit Partner. In der Familie: Mutter hat Neurodermitis."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Frau Ayşe Demir (27 J.) mit Verdacht auf Schwerer akuter Asthmaanfall bei allergischem Asthma bronchiale, Auslöser Katzenhaarexposition im C1-Fachstil.",
      "requiredTerms": [
        "Schwerer akuter Asthmaanfall bei allergischem Asthma bronchiale, Auslöser Katzenhaarexposition",
        "Allergisches",
        "Anaphylaxie",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Frau Ayşe Demir (27 J., Erzieherin) stellte sich mit folgender aktueller Anamnese vor: Seit ca. 2 Stunden zunehmende Atemnot, Engegefühl in der Brust, trockener Husten. Am Abend bei einer Freundin mit zwei Katzen. Spricht nur in kurzen Sätzen. An Vorerkrankungen seien bekannt: Allergisches Asthma bronchiale seit Kindheit, Allergische Rhinokonjunktivitis (Gräser, Katzenhaare). Die Dauermedikation umfasse: Budesonid/Formoterol 160/4,5 µg 1 Hub 1-0-1 und bei Bedarf, Cetirizin 10 mg bei Bedarf. Allergien: Katzenhaare, Gräserpollen, Ibuprofen (Atemnot). Sozial- und Familienanamnese: Nichtraucherin, kein Alkohol. Lebt mit Partner. Mutter hat Neurodermitis. Klinische Untersuchung: Sitzende Position, Sprechdyspnoe. Pulmo: ubiquitäres exspiratorisches Giemen, verlängertes Exspirium. Peak-Flow 40 % des persönlichen Bestwerts. Zusammenfassend ergibt sich der dringende Verdacht auf: Schwerer akuter Asthmaanfall bei allergischem Asthma bronchiale, Auslöser Katzenhaarexposition (Differenzialdiagnosen: Anaphylaxie, Pneumothorax, Vocal Cord Dysfunction)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Frau Ayşe Demir, 27 Jahre alt, aktuell in der Aufnahme (Pneumologie)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Seit ca. 2 Stunden zunehmende Atemnot, Engegefühl in der Brust, trockener Husten. Am Abend bei einer Freundin mit zwei Katzen. Spricht nur in kurzen Sätzen. Es besteht der dringende Verdacht auf Schwerer akuter Asthmaanfall bei allergischem Asthma bronchiale, Auslöser Katzenhaarexposition."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Allergisches Asthma bronchiale seit Kindheit, Allergische Rhinokonjunktivitis (Gräser, Katzenhaare). Medikation: Budesonid/Formoterol 160/4,5 µg 1 Hub 1-0-1 und bei Bedarf, Cetirizin 10 mg bei Bedarf. Allergien: Katzenhaare, Gräserpollen, Ibuprofen (Atemnot)."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 130/80 mmHg, HF 124 /min, Temp 36,9 °C, SpO₂ 90 % (Raumluft). Sitzende Position, Sprechdyspnoe. Pulmo: ubiquitäres exspiratorisches Giemen, verlängertes Exspirium. Peak-Flow 40 % des persönlichen Bestwerts. Labor: BGA: pH 7,46, pCO2 33 mmHg, pO2 62 mmHg, Eosinophile: 8 % (erhöht)"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Schwerer akuter Asthmaanfall bei allergischem Asthma bronchiale, Auslöser Katzenhaarexposition sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Anaphylaxie, Pneumothorax, Vocal Cord Dysfunction)."
      }
    ]
  },
  {
    "id": "spontanpneumothorax",
    "title": "Primärer Spontanpneumothorax",
    "specialty": "Thoraxchirurgie",
    "category": "Thoraxchirurgie",
    "difficulty": "B1",
    "patientName": "Herr Lukas Braun",
    "patientAge": 21,
    "chiefComplaint": "Ich saß einfach am Schreibtisch, und plötzlich hat's links in der Brust gestochen wie ein Messer. Seitdem krieg ich schlecht Luft.",
    "patient": {
      "name": "Herr Lukas Braun",
      "age": 21,
      "gender": "m",
      "occupation": "Student (Informatik)",
      "chiefComplaint": "Ich saß einfach am Schreibtisch, und plötzlich hat's links in der Brust gestochen wie ein Messer. Seitdem krieg ich schlecht Luft.",
      "vitalSigns": {
        "bp": "125/80 mmHg",
        "hr": "102 /min",
        "temp": "36,7 °C",
        "spo2": "94 % (Raumluft)"
      },
      "historyDetails": "Seit 2 Stunden plötzlich in Ruhe aufgetretener stechender Thoraxschmerz links mit Ausstrahlung in die linke Schulter, Dyspnoe, Reizhusten. Kein Trauma. Vorerkrankungen: Keine. Medikation: Keine. Allergien: Keine bekannt. Sozialanamnese: Raucher, ca. 10 Zigaretten/Tag seit 5 Jahren, gelegentlich Cannabis. Groß und schlank (1,92 m, 68 kg). Familienanamnese: Unauffällig. Körperliche Untersuchung: Pulmo: links abgeschwächtes bis aufgehobenes Atemgeräusch, hypersonorer Klopfschall links. Trachea mittelständig. Labor: D-Dimere: 0,3 mg/l FEU (normal), hs-Troponin T: < 5 ng/l."
    },
    "anamneseQuestions": [
      {
        "id": "spontanpneumothorax-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Herr Lukas Braun, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Primärer Spontanpneumothorax links vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Ich saß einfach am Schreibtisch, und plötzlich hat's links in der Brust gestochen wie ein Messer. Seitdem krieg ich schlecht Luft."
      },
      {
        "id": "spontanpneumothorax-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Keine. Meine Medikamente sind: Keine."
      },
      {
        "id": "spontanpneumothorax-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Keine bekannt. Zu meinem Alltag: Raucher, ca. 10 Zigaretten/Tag seit 5 Jahren, gelegentlich Cannabis. Groß und schlank (1,92 m, 68 kg). In der Familie: Unauffällig."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Herr Lukas Braun (21 J.) mit Verdacht auf Primärer Spontanpneumothorax links im C1-Fachstil.",
      "requiredTerms": [
        "Primärer Spontanpneumothorax links",
        "Keine",
        "Lungenarterienembolie",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Herr Lukas Braun (21 J., Student (Informatik)) stellte sich mit folgender aktueller Anamnese vor: Seit 2 Stunden plötzlich in Ruhe aufgetretener stechender Thoraxschmerz links mit Ausstrahlung in die linke Schulter, Dyspnoe, Reizhusten. Kein Trauma. An Vorerkrankungen seien bekannt: Keine. Die Dauermedikation umfasse: Keine. Allergien: Keine bekannt. Sozial- und Familienanamnese: Raucher, ca. 10 Zigaretten/Tag seit 5 Jahren, gelegentlich Cannabis. Groß und schlank (1,92 m, 68 kg). Unauffällig. Klinische Untersuchung: Pulmo: links abgeschwächtes bis aufgehobenes Atemgeräusch, hypersonorer Klopfschall links. Trachea mittelständig. Zusammenfassend ergibt sich der dringende Verdacht auf: Primärer Spontanpneumothorax links (Differenzialdiagnosen: Lungenarterienembolie, Perikarditis, Interkostalneuralgie)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Herr Lukas Braun, 21 Jahre alt, aktuell in der Aufnahme (Thoraxchirurgie)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Seit 2 Stunden plötzlich in Ruhe aufgetretener stechender Thoraxschmerz links mit Ausstrahlung in die linke Schulter, Dyspnoe, Reizhusten. Kein Trauma. Es besteht der dringende Verdacht auf Primärer Spontanpneumothorax links."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Keine. Medikation: Keine. Allergien: Keine bekannt."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 125/80 mmHg, HF 102 /min, Temp 36,7 °C, SpO₂ 94 % (Raumluft). Pulmo: links abgeschwächtes bis aufgehobenes Atemgeräusch, hypersonorer Klopfschall links. Trachea mittelständig. Labor: D-Dimere: 0,3 mg/l FEU (normal), hs-Troponin T: < 5 ng/l"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Primärer Spontanpneumothorax links sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Lungenarterienembolie, Perikarditis, Interkostalneuralgie)."
      }
    ]
  },
  {
    "id": "bronchialkarzinom",
    "title": "Bronchialkarzinom (Erstdiagnose)",
    "specialty": "Pneumologie",
    "category": "Pneumologie",
    "difficulty": "C1",
    "patientName": "Herr Horst Lehmann",
    "patientAge": 64,
    "chiefComplaint": "Mein Raucherhusten ist seit ein paar Monaten anders, und letzte Woche war Blut im Taschentuch. Ich hab auch ganz schön abgenommen, ohne dass ich's wollte.",
    "patient": {
      "name": "Herr Horst Lehmann",
      "age": 64,
      "gender": "m",
      "occupation": "Dachdecker",
      "chiefComplaint": "Mein Raucherhusten ist seit ein paar Monaten anders, und letzte Woche war Blut im Taschentuch. Ich hab auch ganz schön abgenommen, ohne dass ich's wollte.",
      "vitalSigns": {
        "bp": "130/80 mmHg",
        "hr": "84 /min",
        "temp": "37,1 °C",
        "spo2": "94 % (Raumluft)"
      },
      "historyDetails": "Seit ca. 3 Monaten veränderter Husten, seit 1 Woche Hämoptysen (blutig tingierter Auswurf), ungewollter Gewichtsverlust von 8 kg in 3 Monaten, Nachtschweiß, zunehmende Heiserkeit. Vorerkrankungen: COPD GOLD 2, Arterielle Hypertonie. Medikation: Tiotropium 18 µg 1-0-0, Lisinopril 10 mg 1-0-0. Allergien: Keine bekannt. Sozialanamnese: Raucher, 45 pack years. Beruflich Asbestexposition in den 80er Jahren. Verheiratet, zwei erwachsene Kinder. Familienanamnese: Vater an Lungenkrebs verstorben. Körperliche Untersuchung: Kachektischer Ernährungszustand. Supraklavikulär rechts derber, nicht verschieblicher Lymphknoten (1,5 cm). Pulmo: rechts zentral abgeschwächtes Atemgeräusch. Labor: Hb: 11,2 g/dl (erniedrigt), Kalzium: 2,8 mmol/l (erhöht), CRP: 28 mg/l, LDH: 310 U/l (erhöht)."
    },
    "anamneseQuestions": [
      {
        "id": "bronchialkarzinom-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Herr Horst Lehmann, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für V. a. zentrales Bronchialkarzinom rechts (Histologie ausstehend) vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Mein Raucherhusten ist seit ein paar Monaten anders, und letzte Woche war Blut im Taschentuch. Ich hab auch ganz schön abgenommen, ohne dass ich's wollte."
      },
      {
        "id": "bronchialkarzinom-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: COPD GOLD 2, Arterielle Hypertonie. Meine Medikamente sind: Tiotropium 18 µg 1-0-0, Lisinopril 10 mg 1-0-0."
      },
      {
        "id": "bronchialkarzinom-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Keine bekannt. Zu meinem Alltag: Raucher, 45 pack years. Beruflich Asbestexposition in den 80er Jahren. Verheiratet, zwei erwachsene Kinder. In der Familie: Vater an Lungenkrebs verstorben."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Herr Horst Lehmann (64 J.) mit Verdacht auf V. a. zentrales Bronchialkarzinom rechts (Histologie ausstehend) im C1-Fachstil.",
      "requiredTerms": [
        "V. a. zentrales Bronchialkarzinom rechts (Histologie ausstehend)",
        "COPD",
        "Lungentuberkulose",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Herr Horst Lehmann (64 J., Dachdecker) stellte sich mit folgender aktueller Anamnese vor: Seit ca. 3 Monaten veränderter Husten, seit 1 Woche Hämoptysen (blutig tingierter Auswurf), ungewollter Gewichtsverlust von 8 kg in 3 Monaten, Nachtschweiß, zunehmende Heiserkeit. An Vorerkrankungen seien bekannt: COPD GOLD 2, Arterielle Hypertonie. Die Dauermedikation umfasse: Tiotropium 18 µg 1-0-0, Lisinopril 10 mg 1-0-0. Allergien: Keine bekannt. Sozial- und Familienanamnese: Raucher, 45 pack years. Beruflich Asbestexposition in den 80er Jahren. Verheiratet, zwei erwachsene Kinder. Vater an Lungenkrebs verstorben. Klinische Untersuchung: Kachektischer Ernährungszustand. Supraklavikulär rechts derber, nicht verschieblicher Lymphknoten (1,5 cm). Pulmo: rechts zentral abgeschwächtes Atemgeräusch. Zusammenfassend ergibt sich der dringende Verdacht auf: V. a. zentrales Bronchialkarzinom rechts (Histologie ausstehend) (Differenzialdiagnosen: Lungentuberkulose, Chronische Bronchitis, Bronchiektasen)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Herr Horst Lehmann, 64 Jahre alt, aktuell in der Aufnahme (Pneumologie)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Seit ca. 3 Monaten veränderter Husten, seit 1 Woche Hämoptysen (blutig tingierter Auswurf), ungewollter Gewichtsverlust von 8 kg in 3 Monaten, Nachtschweiß, zunehmende Heiserkeit. Es besteht der dringende Verdacht auf V. a. zentrales Bronchialkarzinom rechts (Histologie ausstehend)."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: COPD GOLD 2, Arterielle Hypertonie. Medikation: Tiotropium 18 µg 1-0-0, Lisinopril 10 mg 1-0-0. Allergien: Keine bekannt."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 130/80 mmHg, HF 84 /min, Temp 37,1 °C, SpO₂ 94 % (Raumluft). Kachektischer Ernährungszustand. Supraklavikulär rechts derber, nicht verschieblicher Lymphknoten (1,5 cm). Pulmo: rechts zentral abgeschwächtes Atemgeräusch. Labor: Hb: 11,2 g/dl (erniedrigt), Kalzium: 2,8 mmol/l (erhöht), CRP: 28 mg/l, LDH: 310 U/l (erhöht)"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich V. a. zentrales Bronchialkarzinom rechts (Histologie ausstehend) sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Lungentuberkulose, Chronische Bronchitis, Bronchiektasen)."
      }
    ]
  },
  {
    "id": "tiefe-beinvenenthrombose",
    "title": "Tiefe Beinvenenthrombose (TVT)",
    "specialty": "Angiologie",
    "category": "Angiologie",
    "difficulty": "B1",
    "patientName": "Frau Monika Schulz",
    "patientAge": 58,
    "chiefComplaint": "Mein rechtes Bein ist seit drei Tagen dick und tut weh, vor allem in der Wade. Das fühlt sich so warm und gespannt an.",
    "patient": {
      "name": "Frau Monika Schulz",
      "age": 58,
      "gender": "w",
      "occupation": "Verkäuferin",
      "chiefComplaint": "Mein rechtes Bein ist seit drei Tagen dick und tut weh, vor allem in der Wade. Das fühlt sich so warm und gespannt an.",
      "vitalSigns": {
        "bp": "135/80 mmHg",
        "hr": "84 /min",
        "temp": "37,2 °C",
        "spo2": "98 % (Raumluft)"
      },
      "historyDetails": "Seit 3 Tagen zunehmende Schwellung und ziehende Schmerzen im rechten Unterschenkel, Spannungsgefühl. Vor 2 Wochen Kniegelenksarthroskopie rechts mit Unterschenkelschiene, Thromboseprophylaxe nach 3 Tagen eigenständig beendet. Keine Dyspnoe. Vorerkrankungen: Adipositas (BMI 32), Varikosis beidseits, Hypothyreose. Medikation: L-Thyroxin 75 µg 1-0-0 (nüchtern). Allergien: Keine bekannt. Sozialanamnese: Nichtraucherin. Verheiratet. Arbeitet viel im Stehen. Familienanamnese: Unauffällig. Körperliche Untersuchung: Rechter Unterschenkel geschwollen, Umfangsdifferenz 4 cm, überwärmt, livide verfärbt. Payr- und Meyer-Zeichen positiv. Wells-Score: 3 Punkte. Labor: D-Dimere: 3,1 mg/l FEU (erhöht), CRP: 14 mg/l, Thrombozyten: 260 /nl."
    },
    "anamneseQuestions": [
      {
        "id": "tiefe-beinvenenthrombose-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Frau Monika Schulz, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Tiefe Beinvenenthrombose der V. poplitea und V. femoralis rechts vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Mein rechtes Bein ist seit drei Tagen dick und tut weh, vor allem in der Wade. Das fühlt sich so warm und gespannt an."
      },
      {
        "id": "tiefe-beinvenenthrombose-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Adipositas (BMI 32), Varikosis beidseits, Hypothyreose. Meine Medikamente sind: L-Thyroxin 75 µg 1-0-0 (nüchtern)."
      },
      {
        "id": "tiefe-beinvenenthrombose-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Keine bekannt. Zu meinem Alltag: Nichtraucherin. Verheiratet. Arbeitet viel im Stehen. In der Familie: Unauffällig."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Frau Monika Schulz (58 J.) mit Verdacht auf Tiefe Beinvenenthrombose der V. poplitea und V. femoralis rechts im C1-Fachstil.",
      "requiredTerms": [
        "Tiefe Beinvenenthrombose der V. poplitea und V. femoralis rechts",
        "Adipositas",
        "Baker-Zyste (rupturiert)",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Frau Monika Schulz (58 J., Verkäuferin) stellte sich mit folgender aktueller Anamnese vor: Seit 3 Tagen zunehmende Schwellung und ziehende Schmerzen im rechten Unterschenkel, Spannungsgefühl. Vor 2 Wochen Kniegelenksarthroskopie rechts mit Unterschenkelschiene, Thromboseprophylaxe nach 3 Tagen eigenständig beendet. Keine Dyspnoe. An Vorerkrankungen seien bekannt: Adipositas (BMI 32), Varikosis beidseits, Hypothyreose. Die Dauermedikation umfasse: L-Thyroxin 75 µg 1-0-0 (nüchtern). Allergien: Keine bekannt. Sozial- und Familienanamnese: Nichtraucherin. Verheiratet. Arbeitet viel im Stehen. Unauffällig. Klinische Untersuchung: Rechter Unterschenkel geschwollen, Umfangsdifferenz 4 cm, überwärmt, livide verfärbt. Payr- und Meyer-Zeichen positiv. Wells-Score: 3 Punkte. Zusammenfassend ergibt sich der dringende Verdacht auf: Tiefe Beinvenenthrombose der V. poplitea und V. femoralis rechts (Differenzialdiagnosen: Baker-Zyste (rupturiert), Erysipel, Muskelfaserriss)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Frau Monika Schulz, 58 Jahre alt, aktuell in der Aufnahme (Angiologie)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Seit 3 Tagen zunehmende Schwellung und ziehende Schmerzen im rechten Unterschenkel, Spannungsgefühl. Vor 2 Wochen Kniegelenksarthroskopie rechts mit Unterschenkelschiene, Thromboseprophylaxe nach 3 Tagen eigenständig beendet. Keine Dyspnoe. Es besteht der dringende Verdacht auf Tiefe Beinvenenthrombose der V. poplitea und V. femoralis rechts."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Adipositas (BMI 32), Varikosis beidseits, Hypothyreose. Medikation: L-Thyroxin 75 µg 1-0-0 (nüchtern). Allergien: Keine bekannt."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 135/80 mmHg, HF 84 /min, Temp 37,2 °C, SpO₂ 98 % (Raumluft). Rechter Unterschenkel geschwollen, Umfangsdifferenz 4 cm, überwärmt, livide verfärbt. Payr- und Meyer-Zeichen positiv. Wells-Score: 3 Punkte. Labor: D-Dimere: 3,1 mg/l FEU (erhöht), CRP: 14 mg/l, Thrombozyten: 260 /nl"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Tiefe Beinvenenthrombose der V. poplitea und V. femoralis rechts sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Baker-Zyste (rupturiert), Erysipel, Muskelfaserriss)."
      }
    ]
  },
  {
    "id": "bauchaortenaneurysma",
    "title": "Symptomatisches Bauchaortenaneurysma",
    "specialty": "Gefäßchirurgie",
    "category": "Gefäßchirurgie",
    "difficulty": "C1",
    "patientName": "Herr Heinz Zimmermann",
    "patientAge": 73,
    "chiefComplaint": "Ich hab seit ein paar Stunden so einen heftigen Schmerz im Bauch, der in den Rücken zieht. Und vorhin ist mir ganz kurz schwarz vor Augen geworden.",
    "patient": {
      "name": "Herr Heinz Zimmermann",
      "age": 73,
      "gender": "m",
      "occupation": "Rentner, ehem. Maurer",
      "chiefComplaint": "Ich hab seit ein paar Stunden so einen heftigen Schmerz im Bauch, der in den Rücken zieht. Und vorhin ist mir ganz kurz schwarz vor Augen geworden.",
      "vitalSigns": {
        "bp": "95/60 mmHg",
        "hr": "112 /min",
        "temp": "36,4 °C",
        "spo2": "95 % (Raumluft)"
      },
      "historyDetails": "Seit ca. 3 Stunden plötzlich aufgetretene, starke Bauch- und Flankenschmerzen links mit Ausstrahlung in den Rücken. Einmalige kurze Präsynkope. Bekanntes Aneurysma, Kontrolle seit 2 Jahren nicht wahrgenommen. Vorerkrankungen: Bauchaortenaneurysma (2022: 5,1 cm), pAVK Stadium IIa, Arterielle Hypertonie, COPD. Medikation: ASS 100 mg 1-0-0, Simvastatin 40 mg 0-0-1, Metoprololsuccinat 47,5 mg 1-0-0. Allergien: Keine bekannt. Sozialanamnese: Raucher, 55 pack years. Verheiratet. Familienanamnese: Bruder ist an einem Aneurysma verstorben. Körperliche Untersuchung: Blass, kaltschweißig. Abdomen: pulsierende, druckschmerzhafte Resistenz periumbilikal. Leistenpulse beidseits schwach tastbar. Labor: Hb: 10,1 g/dl (erniedrigt), Laktat: 3,2 mmol/l (erhöht), Kreatinin: 1,3 mg/dl."
    },
    "anamneseQuestions": [
      {
        "id": "bauchaortenaneurysma-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Herr Heinz Zimmermann, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Symptomatisches (gedeckt rupturiertes) infrarenales Bauchaortenaneurysma (6,8 cm) vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Ich hab seit ein paar Stunden so einen heftigen Schmerz im Bauch, der in den Rücken zieht. Und vorhin ist mir ganz kurz schwarz vor Augen geworden."
      },
      {
        "id": "bauchaortenaneurysma-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Bauchaortenaneurysma (2022: 5,1 cm), pAVK Stadium IIa, Arterielle Hypertonie, COPD. Meine Medikamente sind: ASS 100 mg 1-0-0, Simvastatin 40 mg 0-0-1, Metoprololsuccinat 47,5 mg 1-0-0."
      },
      {
        "id": "bauchaortenaneurysma-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Keine bekannt. Zu meinem Alltag: Raucher, 55 pack years. Verheiratet. In der Familie: Bruder ist an einem Aneurysma verstorben."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Herr Heinz Zimmermann (73 J.) mit Verdacht auf Symptomatisches (gedeckt rupturiertes) infrarenales Bauchaortenaneurysma (6,8 cm) im C1-Fachstil.",
      "requiredTerms": [
        "Symptomatisches (gedeckt rupturiertes) infrarenales Bauchaortenaneurysma (6,8 cm)",
        "Bauchaortenaneurysma",
        "Nierenkolik",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Herr Heinz Zimmermann (73 J., Rentner, ehem. Maurer) stellte sich mit folgender aktueller Anamnese vor: Seit ca. 3 Stunden plötzlich aufgetretene, starke Bauch- und Flankenschmerzen links mit Ausstrahlung in den Rücken. Einmalige kurze Präsynkope. Bekanntes Aneurysma, Kontrolle seit 2 Jahren nicht wahrgenommen. An Vorerkrankungen seien bekannt: Bauchaortenaneurysma (2022: 5,1 cm), pAVK Stadium IIa, Arterielle Hypertonie, COPD. Die Dauermedikation umfasse: ASS 100 mg 1-0-0, Simvastatin 40 mg 0-0-1, Metoprololsuccinat 47,5 mg 1-0-0. Allergien: Keine bekannt. Sozial- und Familienanamnese: Raucher, 55 pack years. Verheiratet. Bruder ist an einem Aneurysma verstorben. Klinische Untersuchung: Blass, kaltschweißig. Abdomen: pulsierende, druckschmerzhafte Resistenz periumbilikal. Leistenpulse beidseits schwach tastbar. Zusammenfassend ergibt sich der dringende Verdacht auf: Symptomatisches (gedeckt rupturiertes) infrarenales Bauchaortenaneurysma (6,8 cm) (Differenzialdiagnosen: Nierenkolik, Akute Pankreatitis, Mesenterialischämie)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Herr Heinz Zimmermann, 73 Jahre alt, aktuell in der Aufnahme (Gefäßchirurgie)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Seit ca. 3 Stunden plötzlich aufgetretene, starke Bauch- und Flankenschmerzen links mit Ausstrahlung in den Rücken. Einmalige kurze Präsynkope. Bekanntes Aneurysma, Kontrolle seit 2 Jahren nicht wahrgenommen. Es besteht der dringende Verdacht auf Symptomatisches (gedeckt rupturiertes) infrarenales Bauchaortenaneurysma (6,8 cm)."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Bauchaortenaneurysma (2022: 5,1 cm), pAVK Stadium IIa, Arterielle Hypertonie, COPD. Medikation: ASS 100 mg 1-0-0, Simvastatin 40 mg 0-0-1, Metoprololsuccinat 47,5 mg 1-0-0. Allergien: Keine bekannt."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 95/60 mmHg, HF 112 /min, Temp 36,4 °C, SpO₂ 95 % (Raumluft). Blass, kaltschweißig. Abdomen: pulsierende, druckschmerzhafte Resistenz periumbilikal. Leistenpulse beidseits schwach tastbar. Labor: Hb: 10,1 g/dl (erniedrigt), Laktat: 3,2 mmol/l (erhöht), Kreatinin: 1,3 mg/dl"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Symptomatisches (gedeckt rupturiertes) infrarenales Bauchaortenaneurysma (6,8 cm) sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Nierenkolik, Akute Pankreatitis, Mesenterialischämie)."
      }
    ]
  },
  {
    "id": "synkope",
    "title": "Synkope (rhythmogen)",
    "specialty": "Kardiologie",
    "category": "Kardiologie",
    "difficulty": "C1",
    "patientName": "Frau Elfriede König",
    "patientAge": 81,
    "chiefComplaint": "Ich stand in der Küche, und auf einmal lag ich auf dem Boden. Ich weiß gar nicht, was passiert ist. Das war schon das zweite Mal diesen Monat.",
    "patient": {
      "name": "Frau Elfriede König",
      "age": 81,
      "gender": "w",
      "occupation": "Rentnerin",
      "chiefComplaint": "Ich stand in der Küche, und auf einmal lag ich auf dem Boden. Ich weiß gar nicht, was passiert ist. Das war schon das zweite Mal diesen Monat.",
      "vitalSigns": {
        "bp": "150/60 mmHg",
        "hr": "36 /min",
        "temp": "36,5 °C",
        "spo2": "96 % (Raumluft)"
      },
      "historyDetails": "Heute Morgen plötzlicher Bewusstseinsverlust ohne Prodromi für ca. 30 Sekunden (Fremdanamnese Ehemann), danach sofort wieder orientiert. Kein Zungenbiss, kein Einnässen. Platzwunde an der Stirn. Bereits vor 2 Wochen ähnliches Ereignis. Seit Wochen Müdigkeit und Leistungsminderung. Vorerkrankungen: Arterielle Hypertonie, Diabetes mellitus Typ 2, Gonarthrose beidseits. Medikation: Bisoprolol 2,5 mg 1-0-0, Metformin 500 mg 1-0-1, Ibuprofen 400 mg bei Bedarf. Allergien: Sulfonamide (Exanthem). Sozialanamnese: Lebt mit Ehemann im Einfamilienhaus, selbstständig. Nichtraucherin. Familienanamnese: Unauffällig. Körperliche Untersuchung: Bradykarder, regelmäßiger Puls. 2 cm lange Platzwunde frontal. Neurologisch unauffällig. Kein Herzgeräusch. Labor: Blutzucker: 142 mg/dl, Kalium: 4,6 mmol/l, hs-Troponin T: 14 ng/l, TSH: 2,1 mU/l."
    },
    "anamneseQuestions": [
      {
        "id": "synkope-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Frau Elfriede König, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Rhythmogene Synkope bei AV-Block III. Grades vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Ich stand in der Küche, und auf einmal lag ich auf dem Boden. Ich weiß gar nicht, was passiert ist. Das war schon das zweite Mal diesen Monat."
      },
      {
        "id": "synkope-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Arterielle Hypertonie, Diabetes mellitus Typ 2, Gonarthrose beidseits. Meine Medikamente sind: Bisoprolol 2,5 mg 1-0-0, Metformin 500 mg 1-0-1, Ibuprofen 400 mg bei Bedarf."
      },
      {
        "id": "synkope-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Sulfonamide (Exanthem). Zu meinem Alltag: Lebt mit Ehemann im Einfamilienhaus, selbstständig. Nichtraucherin. In der Familie: Unauffällig."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Frau Elfriede König (81 J.) mit Verdacht auf Rhythmogene Synkope bei AV-Block III. Grades im C1-Fachstil.",
      "requiredTerms": [
        "Rhythmogene Synkope bei AV-Block III. Grades",
        "Arterielle",
        "Orthostatische Synkope",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Frau Elfriede König (81 J., Rentnerin) stellte sich mit folgender aktueller Anamnese vor: Heute Morgen plötzlicher Bewusstseinsverlust ohne Prodromi für ca. 30 Sekunden (Fremdanamnese Ehemann), danach sofort wieder orientiert. Kein Zungenbiss, kein Einnässen. Platzwunde an der Stirn. Bereits vor 2 Wochen ähnliches Ereignis. Seit Wochen Müdigkeit und Leistungsminderung. An Vorerkrankungen seien bekannt: Arterielle Hypertonie, Diabetes mellitus Typ 2, Gonarthrose beidseits. Die Dauermedikation umfasse: Bisoprolol 2,5 mg 1-0-0, Metformin 500 mg 1-0-1, Ibuprofen 400 mg bei Bedarf. Allergien: Sulfonamide (Exanthem). Sozial- und Familienanamnese: Lebt mit Ehemann im Einfamilienhaus, selbstständig. Nichtraucherin. Unauffällig. Klinische Untersuchung: Bradykarder, regelmäßiger Puls. 2 cm lange Platzwunde frontal. Neurologisch unauffällig. Kein Herzgeräusch. Zusammenfassend ergibt sich der dringende Verdacht auf: Rhythmogene Synkope bei AV-Block III. Grades (Differenzialdiagnosen: Orthostatische Synkope, Vasovagale Synkope, Epileptischer Anfall)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Frau Elfriede König, 81 Jahre alt, aktuell in der Aufnahme (Kardiologie)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Heute Morgen plötzlicher Bewusstseinsverlust ohne Prodromi für ca. 30 Sekunden (Fremdanamnese Ehemann), danach sofort wieder orientiert. Kein Zungenbiss, kein Einnässen. Platzwunde an der Stirn. Bereits vor 2 Wochen ähnliches Ereignis. Seit Wochen Müdigkeit und Leistungsminderung. Es besteht der dringende Verdacht auf Rhythmogene Synkope bei AV-Block III. Grades."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Arterielle Hypertonie, Diabetes mellitus Typ 2, Gonarthrose beidseits. Medikation: Bisoprolol 2,5 mg 1-0-0, Metformin 500 mg 1-0-1, Ibuprofen 400 mg bei Bedarf. Allergien: Sulfonamide (Exanthem)."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 150/60 mmHg, HF 36 /min, Temp 36,5 °C, SpO₂ 96 % (Raumluft). Bradykarder, regelmäßiger Puls. 2 cm lange Platzwunde frontal. Neurologisch unauffällig. Kein Herzgeräusch. Labor: Blutzucker: 142 mg/dl, Kalium: 4,6 mmol/l, hs-Troponin T: 14 ng/l, TSH: 2,1 mU/l"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Rhythmogene Synkope bei AV-Block III. Grades sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Orthostatische Synkope, Vasovagale Synkope, Epileptischer Anfall)."
      }
    ]
  },
  {
    "id": "subarachnoidalblutung",
    "title": "Subarachnoidalblutung (SAB)",
    "specialty": "Neurologie",
    "category": "Neurologie",
    "difficulty": "C1",
    "patientName": "Frau Julia Lange",
    "patientAge": 44,
    "chiefComplaint": "Beim Sport hat's plötzlich im Kopf geknallt, so was Schlimmes hab ich noch nie erlebt. Der ganze Nacken ist steif, und das Licht tut mir in den Augen weh.",
    "patient": {
      "name": "Frau Julia Lange",
      "age": 44,
      "gender": "w",
      "occupation": "Rechtsanwältin",
      "chiefComplaint": "Beim Sport hat's plötzlich im Kopf geknallt, so was Schlimmes hab ich noch nie erlebt. Der ganze Nacken ist steif, und das Licht tut mir in den Augen weh.",
      "vitalSigns": {
        "bp": "175/100 mmHg",
        "hr": "64 /min",
        "temp": "37,0 °C",
        "spo2": "98 % (Raumluft)"
      },
      "historyDetails": "Vor ca. 2 Stunden beim Krafttraining schlagartig einsetzende, stärkste Kopfschmerzen (\"Vernichtungskopfschmerz\"), Übelkeit, zweimaliges Erbrechen, Nackensteifigkeit, Photophobie. Keine Bewusstlosigkeit. Vorerkrankungen: Polyzystische Nierenerkrankung (ADPKD), Arterielle Hypertonie. Medikation: Ramipril 5 mg 1-0-0. Allergien: Keine bekannt. Sozialanamnese: Raucherin, 10 pack years. Alkohol gelegentlich. Verheiratet, ein Kind. Familienanamnese: Mutter ist mit 50 Jahren an einer Hirnblutung verstorben. Körperliche Untersuchung: Meningismus, Photophobie. GCS 14 (verlangsamt). Keine fokalneurologischen Defizite. Labor: Gerinnung: INR 1,0, PTT 28 s, Thrombozyten: 280 /nl, Natrium: 139 mmol/l."
    },
    "anamneseQuestions": [
      {
        "id": "subarachnoidalblutung-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Frau Julia Lange, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Aneurysmatische Subarachnoidalblutung (Hunt & Hess Grad II) vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Beim Sport hat's plötzlich im Kopf geknallt, so was Schlimmes hab ich noch nie erlebt. Der ganze Nacken ist steif, und das Licht tut mir in den Augen weh."
      },
      {
        "id": "subarachnoidalblutung-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Polyzystische Nierenerkrankung (ADPKD), Arterielle Hypertonie. Meine Medikamente sind: Ramipril 5 mg 1-0-0."
      },
      {
        "id": "subarachnoidalblutung-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Keine bekannt. Zu meinem Alltag: Raucherin, 10 pack years. Alkohol gelegentlich. Verheiratet, ein Kind. In der Familie: Mutter ist mit 50 Jahren an einer Hirnblutung verstorben."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Frau Julia Lange (44 J.) mit Verdacht auf Aneurysmatische Subarachnoidalblutung (Hunt & Hess Grad II) im C1-Fachstil.",
      "requiredTerms": [
        "Aneurysmatische Subarachnoidalblutung (Hunt & Hess Grad II)",
        "Polyzystische",
        "Migräne",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Frau Julia Lange (44 J., Rechtsanwältin) stellte sich mit folgender aktueller Anamnese vor: Vor ca. 2 Stunden beim Krafttraining schlagartig einsetzende, stärkste Kopfschmerzen (\"Vernichtungskopfschmerz\"), Übelkeit, zweimaliges Erbrechen, Nackensteifigkeit, Photophobie. Keine Bewusstlosigkeit. An Vorerkrankungen seien bekannt: Polyzystische Nierenerkrankung (ADPKD), Arterielle Hypertonie. Die Dauermedikation umfasse: Ramipril 5 mg 1-0-0. Allergien: Keine bekannt. Sozial- und Familienanamnese: Raucherin, 10 pack years. Alkohol gelegentlich. Verheiratet, ein Kind. Mutter ist mit 50 Jahren an einer Hirnblutung verstorben. Klinische Untersuchung: Meningismus, Photophobie. GCS 14 (verlangsamt). Keine fokalneurologischen Defizite. Zusammenfassend ergibt sich der dringende Verdacht auf: Aneurysmatische Subarachnoidalblutung (Hunt & Hess Grad II) (Differenzialdiagnosen: Migräne, Meningitis, Intrazerebrale Blutung)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Frau Julia Lange, 44 Jahre alt, aktuell in der Aufnahme (Neurologie)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Vor ca. 2 Stunden beim Krafttraining schlagartig einsetzende, stärkste Kopfschmerzen (\"Vernichtungskopfschmerz\"), Übelkeit, zweimaliges Erbrechen, Nackensteifigkeit, Photophobie. Keine Bewusstlosigkeit. Es besteht der dringende Verdacht auf Aneurysmatische Subarachnoidalblutung (Hunt & Hess Grad II)."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Polyzystische Nierenerkrankung (ADPKD), Arterielle Hypertonie. Medikation: Ramipril 5 mg 1-0-0. Allergien: Keine bekannt."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 175/100 mmHg, HF 64 /min, Temp 37,0 °C, SpO₂ 98 % (Raumluft). Meningismus, Photophobie. GCS 14 (verlangsamt). Keine fokalneurologischen Defizite. Labor: Gerinnung: INR 1,0, PTT 28 s, Thrombozyten: 280 /nl, Natrium: 139 mmol/l"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Aneurysmatische Subarachnoidalblutung (Hunt & Hess Grad II) sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Migräne, Meningitis, Intrazerebrale Blutung)."
      }
    ]
  },
  {
    "id": "migraene-mit-aura",
    "title": "Migräne mit Aura",
    "specialty": "Neurologie",
    "category": "Neurologie",
    "difficulty": "B1",
    "patientName": "Frau Laura Kaya",
    "patientAge": 29,
    "chiefComplaint": "Zuerst hab ich so Zickzacklinien und Flimmern gesehen, und danach kamen diese pochenden Kopfschmerzen links. Mir ist kotzübel, und jedes Geräusch ist zu viel.",
    "patient": {
      "name": "Frau Laura Kaya",
      "age": 29,
      "gender": "w",
      "occupation": "Grafikdesignerin",
      "chiefComplaint": "Zuerst hab ich so Zickzacklinien und Flimmern gesehen, und danach kamen diese pochenden Kopfschmerzen links. Mir ist kotzübel, und jedes Geräusch ist zu viel.",
      "vitalSigns": {
        "bp": "120/75 mmHg",
        "hr": "78 /min",
        "temp": "36,8 °C",
        "spo2": "99 % (Raumluft)"
      },
      "historyDetails": "Vor ca. 4 Stunden ca. 30 Minuten dauerndes Flimmerskotom, danach einseitige, pulsierende Kopfschmerzen links (NRS 8/10), Übelkeit, Photo- und Phonophobie, Verstärkung bei Bewegung. Ähnliche Episoden ca. 2x/Monat seit der Jugend, heute stärker als sonst. Vorerkrankungen: Migräne seit dem 16. Lebensjahr. Medikation: Kombiniertes orales Kontrazeptivum 1-0-0, Ibuprofen 400 mg bei Bedarf (ca. 8 Tage/Monat). Allergien: Keine bekannt. Sozialanamnese: Raucherin, 5 Zigaretten/Tag. Viel Bildschirmarbeit, Stress. Ledig. Familienanamnese: Mutter und Schwester haben Migräne. Körperliche Untersuchung: Neurologisch unauffällig, kein Meningismus. Abdunkelt den Raum. Labor: Blutbild: unauffällig, CRP: < 5 mg/l."
    },
    "anamneseQuestions": [
      {
        "id": "migraene-mit-aura-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Frau Laura Kaya, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Migräne mit Aura (visuelle Aura) vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Zuerst hab ich so Zickzacklinien und Flimmern gesehen, und danach kamen diese pochenden Kopfschmerzen links. Mir ist kotzübel, und jedes Geräusch ist zu viel."
      },
      {
        "id": "migraene-mit-aura-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Migräne seit dem 16. Lebensjahr. Meine Medikamente sind: Kombiniertes orales Kontrazeptivum 1-0-0, Ibuprofen 400 mg bei Bedarf (ca. 8 Tage/Monat)."
      },
      {
        "id": "migraene-mit-aura-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Keine bekannt. Zu meinem Alltag: Raucherin, 5 Zigaretten/Tag. Viel Bildschirmarbeit, Stress. Ledig. In der Familie: Mutter und Schwester haben Migräne."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Frau Laura Kaya (29 J.) mit Verdacht auf Migräne mit Aura (visuelle Aura) im C1-Fachstil.",
      "requiredTerms": [
        "Migräne mit Aura (visuelle Aura)",
        "Migräne",
        "TIA",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Frau Laura Kaya (29 J., Grafikdesignerin) stellte sich mit folgender aktueller Anamnese vor: Vor ca. 4 Stunden ca. 30 Minuten dauerndes Flimmerskotom, danach einseitige, pulsierende Kopfschmerzen links (NRS 8/10), Übelkeit, Photo- und Phonophobie, Verstärkung bei Bewegung. Ähnliche Episoden ca. 2x/Monat seit der Jugend, heute stärker als sonst. An Vorerkrankungen seien bekannt: Migräne seit dem 16. Lebensjahr. Die Dauermedikation umfasse: Kombiniertes orales Kontrazeptivum 1-0-0, Ibuprofen 400 mg bei Bedarf (ca. 8 Tage/Monat). Allergien: Keine bekannt. Sozial- und Familienanamnese: Raucherin, 5 Zigaretten/Tag. Viel Bildschirmarbeit, Stress. Ledig. Mutter und Schwester haben Migräne. Klinische Untersuchung: Neurologisch unauffällig, kein Meningismus. Abdunkelt den Raum. Zusammenfassend ergibt sich der dringende Verdacht auf: Migräne mit Aura (visuelle Aura) (Differenzialdiagnosen: TIA, Subarachnoidalblutung, Sinusvenenthrombose)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Frau Laura Kaya, 29 Jahre alt, aktuell in der Aufnahme (Neurologie)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Vor ca. 4 Stunden ca. 30 Minuten dauerndes Flimmerskotom, danach einseitige, pulsierende Kopfschmerzen links (NRS 8/10), Übelkeit, Photo- und Phonophobie, Verstärkung bei Bewegung. Ähnliche Episoden ca. 2x/Monat seit der Jugend, heute stärker als sonst. Es besteht der dringende Verdacht auf Migräne mit Aura (visuelle Aura)."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Migräne seit dem 16. Lebensjahr. Medikation: Kombiniertes orales Kontrazeptivum 1-0-0, Ibuprofen 400 mg bei Bedarf (ca. 8 Tage/Monat). Allergien: Keine bekannt."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 120/75 mmHg, HF 78 /min, Temp 36,8 °C, SpO₂ 99 % (Raumluft). Neurologisch unauffällig, kein Meningismus. Abdunkelt den Raum. Labor: Blutbild: unauffällig, CRP: < 5 mg/l"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Migräne mit Aura (visuelle Aura) sowie den Ausschluss der wichtigsten Differenzialdiagnosen (TIA, Subarachnoidalblutung, Sinusvenenthrombose)."
      }
    ]
  },
  {
    "id": "epileptischer-anfall",
    "title": "Erstmaliger generalisierter tonisch-klonischer Anfall",
    "specialty": "Neurologie",
    "category": "Neurologie",
    "difficulty": "B2",
    "patientName": "Herr Kevin Schneider",
    "patientAge": 34,
    "chiefComplaint": "Meine Kollegen sagen, ich bin in der Küche umgefallen und hab gezuckt. Ich weiß nur noch, dass ich danach hier aufgewacht bin. Meine Zunge tut weh.",
    "patient": {
      "name": "Herr Kevin Schneider",
      "age": 34,
      "gender": "m",
      "occupation": "Koch",
      "chiefComplaint": "Meine Kollegen sagen, ich bin in der Küche umgefallen und hab gezuckt. Ich weiß nur noch, dass ich danach hier aufgewacht bin. Meine Zunge tut weh.",
      "vitalSigns": {
        "bp": "140/90 mmHg",
        "hr": "98 /min",
        "temp": "37,3 °C",
        "spo2": "96 % (Raumluft)"
      },
      "historyDetails": "Laut Fremdanamnese plötzlicher Sturz mit Bewusstlosigkeit und rhythmischen Zuckungen aller Extremitäten für ca. 2 Minuten, danach ca. 20 Minuten verwirrt. Lateraler Zungenbiss, Einnässen. Seit 2 Nächten kaum geschlafen (Doppelschichten), am Vortag abrupter Verzicht auf Alkohol nach regelmäßigem Konsum. Vorerkrankungen: Keine. Medikation: Keine. Allergien: Keine bekannt. Sozialanamnese: Alkohol ca. 4 Bier/Tag. Raucher. Ledig. Fährt täglich Auto zur Arbeit. Familienanamnese: Cousin hat Epilepsie. Körperliche Untersuchung: Lateraler Zungenbiss rechts, Muskelkater. Neurologisch aktuell ohne Defizit, wieder voll orientiert. Labor: Blutzucker: 98 mg/dl, Natrium: 136 mmol/l, CK: 620 U/l (erhöht), Laktat: 2,8 mmol/l (leicht erhöht), Ethanol: 0,0 ‰."
    },
    "anamneseQuestions": [
      {
        "id": "epileptischer-anfall-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Herr Kevin Schneider, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Erstmaliger generalisierter tonisch-klonischer Krampfanfall, provoziert durch Schlafentzug und Alkoholentzug vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Meine Kollegen sagen, ich bin in der Küche umgefallen und hab gezuckt. Ich weiß nur noch, dass ich danach hier aufgewacht bin. Meine Zunge tut weh."
      },
      {
        "id": "epileptischer-anfall-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Keine. Meine Medikamente sind: Keine."
      },
      {
        "id": "epileptischer-anfall-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Keine bekannt. Zu meinem Alltag: Alkohol ca. 4 Bier/Tag. Raucher. Ledig. Fährt täglich Auto zur Arbeit. In der Familie: Cousin hat Epilepsie."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Herr Kevin Schneider (34 J.) mit Verdacht auf Erstmaliger generalisierter tonisch-klonischer Krampfanfall, provoziert durch Schlafentzug und Alkoholentzug im C1-Fachstil.",
      "requiredTerms": [
        "Erstmaliger generalisierter tonisch-klonischer Krampfanfall, provoziert durch Schlafentzug und Alkoholentzug",
        "Keine",
        "Konvulsive Synkope",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Herr Kevin Schneider (34 J., Koch) stellte sich mit folgender aktueller Anamnese vor: Laut Fremdanamnese plötzlicher Sturz mit Bewusstlosigkeit und rhythmischen Zuckungen aller Extremitäten für ca. 2 Minuten, danach ca. 20 Minuten verwirrt. Lateraler Zungenbiss, Einnässen. Seit 2 Nächten kaum geschlafen (Doppelschichten), am Vortag abrupter Verzicht auf Alkohol nach regelmäßigem Konsum. An Vorerkrankungen seien bekannt: Keine. Die Dauermedikation umfasse: Keine. Allergien: Keine bekannt. Sozial- und Familienanamnese: Alkohol ca. 4 Bier/Tag. Raucher. Ledig. Fährt täglich Auto zur Arbeit. Cousin hat Epilepsie. Klinische Untersuchung: Lateraler Zungenbiss rechts, Muskelkater. Neurologisch aktuell ohne Defizit, wieder voll orientiert. Zusammenfassend ergibt sich der dringende Verdacht auf: Erstmaliger generalisierter tonisch-klonischer Krampfanfall, provoziert durch Schlafentzug und Alkoholentzug (Differenzialdiagnosen: Konvulsive Synkope, Psychogener nicht-epileptischer Anfall, Hypoglykämie)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Herr Kevin Schneider, 34 Jahre alt, aktuell in der Aufnahme (Neurologie)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Laut Fremdanamnese plötzlicher Sturz mit Bewusstlosigkeit und rhythmischen Zuckungen aller Extremitäten für ca. 2 Minuten, danach ca. 20 Minuten verwirrt. Lateraler Zungenbiss, Einnässen. Seit 2 Nächten kaum geschlafen (Doppelschichten), am Vortag abrupter Verzicht auf Alkohol nach regelmäßigem Konsum. Es besteht der dringende Verdacht auf Erstmaliger generalisierter tonisch-klonischer Krampfanfall, provoziert durch Schlafentzug und Alkoholentzug."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Keine. Medikation: Keine. Allergien: Keine bekannt."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 140/90 mmHg, HF 98 /min, Temp 37,3 °C, SpO₂ 96 % (Raumluft). Lateraler Zungenbiss rechts, Muskelkater. Neurologisch aktuell ohne Defizit, wieder voll orientiert. Labor: Blutzucker: 98 mg/dl, Natrium: 136 mmol/l, CK: 620 U/l (erhöht), Laktat: 2,8 mmol/l (leicht erhöht), Ethanol: 0,0 ‰"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Erstmaliger generalisierter tonisch-klonischer Krampfanfall, provoziert durch Schlafentzug und Alkoholentzug sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Konvulsive Synkope, Psychogener nicht-epileptischer Anfall, Hypoglykämie)."
      }
    ]
  },
  {
    "id": "bakterielle-meningitis",
    "title": "Bakterielle Meningitis",
    "specialty": "Neurologie",
    "category": "Neurologie",
    "difficulty": "C1",
    "patientName": "Herr Jonas Weber",
    "patientAge": 19,
    "chiefComplaint": "Mein Kopf platzt gleich, und ich kann den Nacken nicht mehr nach vorne beugen. Seit heute Nacht hab ich hohes Fieber.",
    "patient": {
      "name": "Herr Jonas Weber",
      "age": 19,
      "gender": "m",
      "occupation": "Auszubildender",
      "chiefComplaint": "Mein Kopf platzt gleich, und ich kann den Nacken nicht mehr nach vorne beugen. Seit heute Nacht hab ich hohes Fieber.",
      "vitalSigns": {
        "bp": "100/60 mmHg",
        "hr": "122 /min",
        "temp": "39,8 °C",
        "spo2": "96 % (Raumluft)"
      },
      "historyDetails": "Seit ca. 12 Stunden starke holozephale Kopfschmerzen, Fieber bis 40 °C, Nackensteifigkeit, Erbrechen, Lichtempfindlichkeit, zunehmende Schläfrigkeit. Wohnt im Wohnheim, Mitbewohner war letzte Woche krank. Vorerkrankungen: Keine. Medikation: Keine. Allergien: Keine bekannt. Sozialanamnese: Wohnheim. Raucher. Impfstatus unklar. Familienanamnese: Unauffällig. Körperliche Untersuchung: Somnolent, Meningismus, Kernig- und Brudzinski-Zeichen positiv. Petechiale Hauteinblutungen an den Unterschenkeln. Labor: Leukozyten: 24,6 /nl (erhöht), CRP: 240 mg/l (erhöht), Procalcitonin: 8,4 ng/ml (erhöht), Liquor: trüb, 3.200 Zellen/µl (granulozytär), Glukose erniedrigt, Laktat erhöht."
    },
    "anamneseQuestions": [
      {
        "id": "bakterielle-meningitis-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Herr Jonas Weber, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Bakterielle Meningitis (V. a. Meningokokken) vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Mein Kopf platzt gleich, und ich kann den Nacken nicht mehr nach vorne beugen. Seit heute Nacht hab ich hohes Fieber."
      },
      {
        "id": "bakterielle-meningitis-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Keine. Meine Medikamente sind: Keine."
      },
      {
        "id": "bakterielle-meningitis-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Keine bekannt. Zu meinem Alltag: Wohnheim. Raucher. Impfstatus unklar. In der Familie: Unauffällig."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Herr Jonas Weber (19 J.) mit Verdacht auf Bakterielle Meningitis (V. a. Meningokokken) im C1-Fachstil.",
      "requiredTerms": [
        "Bakterielle Meningitis (V. a. Meningokokken)",
        "Keine",
        "Virale Meningitis",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Herr Jonas Weber (19 J., Auszubildender) stellte sich mit folgender aktueller Anamnese vor: Seit ca. 12 Stunden starke holozephale Kopfschmerzen, Fieber bis 40 °C, Nackensteifigkeit, Erbrechen, Lichtempfindlichkeit, zunehmende Schläfrigkeit. Wohnt im Wohnheim, Mitbewohner war letzte Woche krank. An Vorerkrankungen seien bekannt: Keine. Die Dauermedikation umfasse: Keine. Allergien: Keine bekannt. Sozial- und Familienanamnese: Wohnheim. Raucher. Impfstatus unklar. Unauffällig. Klinische Untersuchung: Somnolent, Meningismus, Kernig- und Brudzinski-Zeichen positiv. Petechiale Hauteinblutungen an den Unterschenkeln. Zusammenfassend ergibt sich der dringende Verdacht auf: Bakterielle Meningitis (V. a. Meningokokken) (Differenzialdiagnosen: Virale Meningitis, Subarachnoidalblutung, Enzephalitis (HSV))."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Herr Jonas Weber, 19 Jahre alt, aktuell in der Aufnahme (Neurologie)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Seit ca. 12 Stunden starke holozephale Kopfschmerzen, Fieber bis 40 °C, Nackensteifigkeit, Erbrechen, Lichtempfindlichkeit, zunehmende Schläfrigkeit. Wohnt im Wohnheim, Mitbewohner war letzte Woche krank. Es besteht der dringende Verdacht auf Bakterielle Meningitis (V. a. Meningokokken)."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Keine. Medikation: Keine. Allergien: Keine bekannt."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 100/60 mmHg, HF 122 /min, Temp 39,8 °C, SpO₂ 96 % (Raumluft). Somnolent, Meningismus, Kernig- und Brudzinski-Zeichen positiv. Petechiale Hauteinblutungen an den Unterschenkeln. Labor: Leukozyten: 24,6 /nl (erhöht), CRP: 240 mg/l (erhöht), Procalcitonin: 8,4 ng/ml (erhöht), Liquor: trüb, 3.200 Zellen/µl (granulozytär), Glukose erniedrigt, Laktat erhöht"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Bakterielle Meningitis (V. a. Meningokokken) sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Virale Meningitis, Subarachnoidalblutung, Enzephalitis (HSV))."
      }
    ]
  },
  {
    "id": "lumbaler-bandscheibenvorfall",
    "title": "Lumbaler Bandscheibenvorfall L5/S1",
    "specialty": "Orthopädie",
    "category": "Orthopädie",
    "difficulty": "B1",
    "patientName": "Herr Andreas Vogel",
    "patientAge": 42,
    "chiefComplaint": "Mir ist's beim Heben von einem Paket voll ins Kreuz geschossen. Jetzt zieht's bis runter in den linken Fuß, und die Zehen fühlen sich ganz pelzig an.",
    "patient": {
      "name": "Herr Andreas Vogel",
      "age": 42,
      "gender": "m",
      "occupation": "Paketzusteller",
      "chiefComplaint": "Mir ist's beim Heben von einem Paket voll ins Kreuz geschossen. Jetzt zieht's bis runter in den linken Fuß, und die Zehen fühlen sich ganz pelzig an.",
      "vitalSigns": {
        "bp": "135/85 mmHg",
        "hr": "82 /min",
        "temp": "36,6 °C",
        "spo2": "99 % (Raumluft)"
      },
      "historyDetails": "Seit 3 Tagen nach Heben eines schweren Pakets einschießende Rückenschmerzen mit Ausstrahlung über die Rückseite des linken Beins bis in die Fußsohle und Kleinzehe, Taubheitsgefühl lateraler Fußrand. Keine Blasen- oder Mastdarmstörung, keine Reithosenanästhesie. Vorerkrankungen: Rezidivierende Lumbago. Medikation: Ibuprofen 600 mg 1-1-1 seit 3 Tagen. Allergien: Keine bekannt. Sozialanamnese: Nichtraucher. Übergewichtig. Verheiratet, zwei Kinder. Familienanamnese: Unauffällig. Körperliche Untersuchung: Lasègue-Zeichen links bei 40° positiv. ASR links abgeschwächt, Hypästhesie Dermatom S1 links, Zehenstand links leicht abgeschwächt (Kraftgrad 4/5). Labor: CRP: < 5 mg/l, Leukozyten: 7,2 /nl."
    },
    "anamneseQuestions": [
      {
        "id": "lumbaler-bandscheibenvorfall-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Herr Andreas Vogel, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Lumbaler Bandscheibenvorfall L5/S1 links mit S1-Radikulopathie vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Mir ist's beim Heben von einem Paket voll ins Kreuz geschossen. Jetzt zieht's bis runter in den linken Fuß, und die Zehen fühlen sich ganz pelzig an."
      },
      {
        "id": "lumbaler-bandscheibenvorfall-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Rezidivierende Lumbago. Meine Medikamente sind: Ibuprofen 600 mg 1-1-1 seit 3 Tagen."
      },
      {
        "id": "lumbaler-bandscheibenvorfall-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Keine bekannt. Zu meinem Alltag: Nichtraucher. Übergewichtig. Verheiratet, zwei Kinder. In der Familie: Unauffällig."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Herr Andreas Vogel (42 J.) mit Verdacht auf Lumbaler Bandscheibenvorfall L5/S1 links mit S1-Radikulopathie im C1-Fachstil.",
      "requiredTerms": [
        "Lumbaler Bandscheibenvorfall L5/S1 links mit S1-Radikulopathie",
        "Rezidivierende",
        "Lumbago ohne Radikulopathie",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Herr Andreas Vogel (42 J., Paketzusteller) stellte sich mit folgender aktueller Anamnese vor: Seit 3 Tagen nach Heben eines schweren Pakets einschießende Rückenschmerzen mit Ausstrahlung über die Rückseite des linken Beins bis in die Fußsohle und Kleinzehe, Taubheitsgefühl lateraler Fußrand. Keine Blasen- oder Mastdarmstörung, keine Reithosenanästhesie. An Vorerkrankungen seien bekannt: Rezidivierende Lumbago. Die Dauermedikation umfasse: Ibuprofen 600 mg 1-1-1 seit 3 Tagen. Allergien: Keine bekannt. Sozial- und Familienanamnese: Nichtraucher. Übergewichtig. Verheiratet, zwei Kinder. Unauffällig. Klinische Untersuchung: Lasègue-Zeichen links bei 40° positiv. ASR links abgeschwächt, Hypästhesie Dermatom S1 links, Zehenstand links leicht abgeschwächt (Kraftgrad 4/5). Zusammenfassend ergibt sich der dringende Verdacht auf: Lumbaler Bandscheibenvorfall L5/S1 links mit S1-Radikulopathie (Differenzialdiagnosen: Lumbago ohne Radikulopathie, Kauda-equina-Syndrom, Spinalkanalstenose)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Herr Andreas Vogel, 42 Jahre alt, aktuell in der Aufnahme (Orthopädie)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Seit 3 Tagen nach Heben eines schweren Pakets einschießende Rückenschmerzen mit Ausstrahlung über die Rückseite des linken Beins bis in die Fußsohle und Kleinzehe, Taubheitsgefühl lateraler Fußrand. Keine Blasen- oder Mastdarmstörung, keine Reithosenanästhesie. Es besteht der dringende Verdacht auf Lumbaler Bandscheibenvorfall L5/S1 links mit S1-Radikulopathie."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Rezidivierende Lumbago. Medikation: Ibuprofen 600 mg 1-1-1 seit 3 Tagen. Allergien: Keine bekannt."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 135/85 mmHg, HF 82 /min, Temp 36,6 °C, SpO₂ 99 % (Raumluft). Lasègue-Zeichen links bei 40° positiv. ASR links abgeschwächt, Hypästhesie Dermatom S1 links, Zehenstand links leicht abgeschwächt (Kraftgrad 4/5). Labor: CRP: < 5 mg/l, Leukozyten: 7,2 /nl"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Lumbaler Bandscheibenvorfall L5/S1 links mit S1-Radikulopathie sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Lumbago ohne Radikulopathie, Kauda-equina-Syndrom, Spinalkanalstenose)."
      }
    ]
  },
  {
    "id": "diabetische-ketoazidose",
    "title": "Diabetische Ketoazidose",
    "specialty": "Endokrinologie",
    "category": "Endokrinologie",
    "difficulty": "C1",
    "patientName": "Frau Mia Hofmann",
    "patientAge": 19,
    "chiefComplaint": "Ich hab seit Tagen ständig Durst und muss dauernd aufs Klo. Jetzt tut mir der Bauch weh, ich muss brechen, und ich bin so müde.",
    "patient": {
      "name": "Frau Mia Hofmann",
      "age": 19,
      "gender": "w",
      "occupation": "Schülerin (Abitur)",
      "chiefComplaint": "Ich hab seit Tagen ständig Durst und muss dauernd aufs Klo. Jetzt tut mir der Bauch weh, ich muss brechen, und ich bin so müde.",
      "vitalSigns": {
        "bp": "100/60 mmHg",
        "hr": "118 /min",
        "temp": "37,0 °C",
        "spo2": "99 % (Raumluft)"
      },
      "historyDetails": "Seit ca. 3 Wochen Polydipsie, Polyurie, ungewollter Gewichtsverlust von 5 kg. Seit 2 Tagen diffuse Bauchschmerzen, Übelkeit, Erbrechen, zunehmende Müdigkeit. Tiefe Atmung, Mutter bemerkt \"komischen Geruch\" aus dem Mund. Vorerkrankungen: Hashimoto-Thyreoiditis. Medikation: L-Thyroxin 50 µg 1-0-0. Allergien: Keine bekannt. Sozialanamnese: Lebt bei den Eltern. Nichtraucherin. Familienanamnese: Vater hat Diabetes mellitus Typ 1. Körperliche Untersuchung: Kussmaul-Atmung, Azetongeruch, trockene Schleimhäute. Abdomen: diffuser Druckschmerz ohne Abwehrspannung (Pseudoperitonitis). Labor: Blutzucker: 512 mg/dl (deutlich erhöht), BGA: pH 7,12, HCO3- 8 mmol/l, BE -20, Ketonkörper (β-Hydroxybutyrat): 6,2 mmol/l (erhöht), Kalium: 5,6 mmol/l, HbA1c: 11,8 %."
    },
    "anamneseQuestions": [
      {
        "id": "diabetische-ketoazidose-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Frau Mia Hofmann, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Diabetische Ketoazidose bei Erstmanifestation Diabetes mellitus Typ 1 vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Ich hab seit Tagen ständig Durst und muss dauernd aufs Klo. Jetzt tut mir der Bauch weh, ich muss brechen, und ich bin so müde."
      },
      {
        "id": "diabetische-ketoazidose-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Hashimoto-Thyreoiditis. Meine Medikamente sind: L-Thyroxin 50 µg 1-0-0."
      },
      {
        "id": "diabetische-ketoazidose-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Keine bekannt. Zu meinem Alltag: Lebt bei den Eltern. Nichtraucherin. In der Familie: Vater hat Diabetes mellitus Typ 1."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Frau Mia Hofmann (19 J.) mit Verdacht auf Diabetische Ketoazidose bei Erstmanifestation Diabetes mellitus Typ 1 im C1-Fachstil.",
      "requiredTerms": [
        "Diabetische Ketoazidose bei Erstmanifestation Diabetes mellitus Typ 1",
        "Hashimoto-Thyreoiditis",
        "Akute Appendizitis",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Frau Mia Hofmann (19 J., Schülerin (Abitur)) stellte sich mit folgender aktueller Anamnese vor: Seit ca. 3 Wochen Polydipsie, Polyurie, ungewollter Gewichtsverlust von 5 kg. Seit 2 Tagen diffuse Bauchschmerzen, Übelkeit, Erbrechen, zunehmende Müdigkeit. Tiefe Atmung, Mutter bemerkt \"komischen Geruch\" aus dem Mund. An Vorerkrankungen seien bekannt: Hashimoto-Thyreoiditis. Die Dauermedikation umfasse: L-Thyroxin 50 µg 1-0-0. Allergien: Keine bekannt. Sozial- und Familienanamnese: Lebt bei den Eltern. Nichtraucherin. Vater hat Diabetes mellitus Typ 1. Klinische Untersuchung: Kussmaul-Atmung, Azetongeruch, trockene Schleimhäute. Abdomen: diffuser Druckschmerz ohne Abwehrspannung (Pseudoperitonitis). Zusammenfassend ergibt sich der dringende Verdacht auf: Diabetische Ketoazidose bei Erstmanifestation Diabetes mellitus Typ 1 (Differenzialdiagnosen: Akute Appendizitis, Gastroenteritis, Akute Pankreatitis)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Frau Mia Hofmann, 19 Jahre alt, aktuell in der Aufnahme (Endokrinologie)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Seit ca. 3 Wochen Polydipsie, Polyurie, ungewollter Gewichtsverlust von 5 kg. Seit 2 Tagen diffuse Bauchschmerzen, Übelkeit, Erbrechen, zunehmende Müdigkeit. Tiefe Atmung, Mutter bemerkt \"komischen Geruch\" aus dem Mund. Es besteht der dringende Verdacht auf Diabetische Ketoazidose bei Erstmanifestation Diabetes mellitus Typ 1."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Hashimoto-Thyreoiditis. Medikation: L-Thyroxin 50 µg 1-0-0. Allergien: Keine bekannt."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 100/60 mmHg, HF 118 /min, Temp 37,0 °C, SpO₂ 99 % (Raumluft). Kussmaul-Atmung, Azetongeruch, trockene Schleimhäute. Abdomen: diffuser Druckschmerz ohne Abwehrspannung (Pseudoperitonitis). Labor: Blutzucker: 512 mg/dl (deutlich erhöht), BGA: pH 7,12, HCO3- 8 mmol/l, BE -20, Ketonkörper (β-Hydroxybutyrat): 6,2 mmol/l (erhöht), Kalium: 5,6 mmol/l, HbA1c: 11,8 %"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Diabetische Ketoazidose bei Erstmanifestation Diabetes mellitus Typ 1 sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Akute Appendizitis, Gastroenteritis, Akute Pankreatitis)."
      }
    ]
  },
  {
    "id": "hypoglykaemie",
    "title": "Schwere Hypoglykämie unter Insulintherapie",
    "specialty": "Endokrinologie",
    "category": "Endokrinologie",
    "difficulty": "B1",
    "patientName": "Herr Friedrich Bauer",
    "patientAge": 77,
    "chiefComplaint": "Ich weiß nicht, was los war. Meine Frau hat mich ganz verschwitzt und durcheinander im Bad gefunden. Jetzt geht's wieder, aber ich zittere noch.",
    "patient": {
      "name": "Herr Friedrich Bauer",
      "age": 77,
      "gender": "m",
      "occupation": "Rentner",
      "chiefComplaint": "Ich weiß nicht, was los war. Meine Frau hat mich ganz verschwitzt und durcheinander im Bad gefunden. Jetzt geht's wieder, aber ich zittere noch.",
      "vitalSigns": {
        "bp": "150/85 mmHg",
        "hr": "102 /min",
        "temp": "36,4 °C",
        "spo2": "97 % (Raumluft)"
      },
      "historyDetails": "Heute Morgen von Ehefrau verwirrt, kaltschweißig und zitternd aufgefunden. Notarzt: Blutzucker 32 mg/dl, nach 40 ml Glukose 40 % i.v. rasche Besserung. Hat wegen Magen-Darm-Infekt seit 2 Tagen kaum gegessen, Insulin aber in gewohnter Dosis gespritzt. Vorerkrankungen: Diabetes mellitus Typ 2 seit 20 Jahren, Diabetische Nephropathie (eGFR 35 ml/min), KHK. Medikation: Insulin glargin 24 IE 0-0-1, Insulin aspart nach Schema zu den Mahlzeiten, Glimepirid 2 mg 1-0-0, ASS 100 mg 1-0-0. Allergien: Keine bekannt. Sozialanamnese: Lebt mit Ehefrau, die beim Insulin hilft. Nichtraucher. Familienanamnese: Unauffällig. Körperliche Untersuchung: Aktuell wach, orientiert, neurologisch ohne Defizit. Leichter Tremor. Labor: Blutzucker: 108 mg/dl (nach Glukosegabe), Kreatinin: 1,9 mg/dl (erhöht), HbA1c: 6,4 %, Kalium: 4,4 mmol/l."
    },
    "anamneseQuestions": [
      {
        "id": "hypoglykaemie-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Herr Friedrich Bauer, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Schwere Hypoglykämie bei Diabetes mellitus Typ 2 unter Insulin, Auslöser: verminderte Nahrungsaufnahme und eingeschränkte Nierenfunktion vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Ich weiß nicht, was los war. Meine Frau hat mich ganz verschwitzt und durcheinander im Bad gefunden. Jetzt geht's wieder, aber ich zittere noch."
      },
      {
        "id": "hypoglykaemie-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Diabetes mellitus Typ 2 seit 20 Jahren, Diabetische Nephropathie (eGFR 35 ml/min), KHK. Meine Medikamente sind: Insulin glargin 24 IE 0-0-1, Insulin aspart nach Schema zu den Mahlzeiten, Glimepirid 2 mg 1-0-0, ASS 100 mg 1-0-0."
      },
      {
        "id": "hypoglykaemie-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Keine bekannt. Zu meinem Alltag: Lebt mit Ehefrau, die beim Insulin hilft. Nichtraucher. In der Familie: Unauffällig."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Herr Friedrich Bauer (77 J.) mit Verdacht auf Schwere Hypoglykämie bei Diabetes mellitus Typ 2 unter Insulin, Auslöser: verminderte Nahrungsaufnahme und eingeschränkte Nierenfunktion im C1-Fachstil.",
      "requiredTerms": [
        "Schwere Hypoglykämie bei Diabetes mellitus Typ 2 unter Insulin, Auslöser: verminderte Nahrungsaufnahme und eingeschränkte Nierenfunktion",
        "Diabetes",
        "TIA/Apoplex",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Herr Friedrich Bauer (77 J., Rentner) stellte sich mit folgender aktueller Anamnese vor: Heute Morgen von Ehefrau verwirrt, kaltschweißig und zitternd aufgefunden. Notarzt: Blutzucker 32 mg/dl, nach 40 ml Glukose 40 % i.v. rasche Besserung. Hat wegen Magen-Darm-Infekt seit 2 Tagen kaum gegessen, Insulin aber in gewohnter Dosis gespritzt. An Vorerkrankungen seien bekannt: Diabetes mellitus Typ 2 seit 20 Jahren, Diabetische Nephropathie (eGFR 35 ml/min), KHK. Die Dauermedikation umfasse: Insulin glargin 24 IE 0-0-1, Insulin aspart nach Schema zu den Mahlzeiten, Glimepirid 2 mg 1-0-0, ASS 100 mg 1-0-0. Allergien: Keine bekannt. Sozial- und Familienanamnese: Lebt mit Ehefrau, die beim Insulin hilft. Nichtraucher. Unauffällig. Klinische Untersuchung: Aktuell wach, orientiert, neurologisch ohne Defizit. Leichter Tremor. Zusammenfassend ergibt sich der dringende Verdacht auf: Schwere Hypoglykämie bei Diabetes mellitus Typ 2 unter Insulin, Auslöser: verminderte Nahrungsaufnahme und eingeschränkte Nierenfunktion (Differenzialdiagnosen: TIA/Apoplex, Epileptischer Anfall, Synkope)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Herr Friedrich Bauer, 77 Jahre alt, aktuell in der Aufnahme (Endokrinologie)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Heute Morgen von Ehefrau verwirrt, kaltschweißig und zitternd aufgefunden. Notarzt: Blutzucker 32 mg/dl, nach 40 ml Glukose 40 % i.v. rasche Besserung. Hat wegen Magen-Darm-Infekt seit 2 Tagen kaum gegessen, Insulin aber in gewohnter Dosis gespritzt. Es besteht der dringende Verdacht auf Schwere Hypoglykämie bei Diabetes mellitus Typ 2 unter Insulin, Auslöser: verminderte Nahrungsaufnahme und eingeschränkte Nierenfunktion."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Diabetes mellitus Typ 2 seit 20 Jahren, Diabetische Nephropathie (eGFR 35 ml/min), KHK. Medikation: Insulin glargin 24 IE 0-0-1, Insulin aspart nach Schema zu den Mahlzeiten, Glimepirid 2 mg 1-0-0, ASS 100 mg 1-0-0. Allergien: Keine bekannt."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 150/85 mmHg, HF 102 /min, Temp 36,4 °C, SpO₂ 97 % (Raumluft). Aktuell wach, orientiert, neurologisch ohne Defizit. Leichter Tremor. Labor: Blutzucker: 108 mg/dl (nach Glukosegabe), Kreatinin: 1,9 mg/dl (erhöht), HbA1c: 6,4 %, Kalium: 4,4 mmol/l"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Schwere Hypoglykämie bei Diabetes mellitus Typ 2 unter Insulin, Auslöser: verminderte Nahrungsaufnahme und eingeschränkte Nierenfunktion sowie den Ausschluss der wichtigsten Differenzialdiagnosen (TIA/Apoplex, Epileptischer Anfall, Synkope)."
      }
    ]
  },
  {
    "id": "hyperthyreose-basedow",
    "title": "Hyperthyreose bei Morbus Basedow",
    "specialty": "Endokrinologie",
    "category": "Endokrinologie",
    "difficulty": "B2",
    "patientName": "Frau Nina Schwarz",
    "patientAge": 33,
    "chiefComplaint": "Ich bin ständig nervös, schwitze dauernd und mein Herz klopft wie wild. Ich esse wie ein Scheunendrescher und nehme trotzdem ab.",
    "patient": {
      "name": "Frau Nina Schwarz",
      "age": 33,
      "gender": "w",
      "occupation": "Krankenpflegerin",
      "chiefComplaint": "Ich bin ständig nervös, schwitze dauernd und mein Herz klopft wie wild. Ich esse wie ein Scheunendrescher und nehme trotzdem ab.",
      "vitalSigns": {
        "bp": "145/70 mmHg",
        "hr": "112 /min",
        "temp": "37,4 °C",
        "spo2": "99 % (Raumluft)"
      },
      "historyDetails": "Seit ca. 3 Monaten Unruhe, Schlafstörungen, Wärmeintoleranz, vermehrtes Schwitzen, Palpitationen, Gewichtsverlust von 6 kg trotz Heißhunger, häufiger weicher Stuhlgang, Haarausfall. Seit einigen Wochen Druckgefühl hinter den Augen. Vorerkrankungen: Keine. Medikation: Keine. Allergien: Keine bekannt. Sozialanamnese: Raucherin, 8 pack years. Schichtdienst. Kinderwunsch in den nächsten Jahren. Familienanamnese: Tante hat eine Schilddrüsenerkrankung. Körperliche Untersuchung: Feinschlägiger Tremor, warme feuchte Haut, diffuse Struma ohne Knoten, Exophthalmus beidseits. Labor: TSH: < 0,01 mU/l (supprimiert), fT4: 4,2 ng/dl (erhöht), fT3: 12,1 pg/ml (erhöht), TRAK: 9,8 IU/l (positiv)."
    },
    "anamneseQuestions": [
      {
        "id": "hyperthyreose-basedow-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Frau Nina Schwarz, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Hyperthyreose bei Morbus Basedow mit endokriner Orbitopathie vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Ich bin ständig nervös, schwitze dauernd und mein Herz klopft wie wild. Ich esse wie ein Scheunendrescher und nehme trotzdem ab."
      },
      {
        "id": "hyperthyreose-basedow-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Keine. Meine Medikamente sind: Keine."
      },
      {
        "id": "hyperthyreose-basedow-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Keine bekannt. Zu meinem Alltag: Raucherin, 8 pack years. Schichtdienst. Kinderwunsch in den nächsten Jahren. In der Familie: Tante hat eine Schilddrüsenerkrankung."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Frau Nina Schwarz (33 J.) mit Verdacht auf Hyperthyreose bei Morbus Basedow mit endokriner Orbitopathie im C1-Fachstil.",
      "requiredTerms": [
        "Hyperthyreose bei Morbus Basedow mit endokriner Orbitopathie",
        "Keine",
        "Autonomes Adenom",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Frau Nina Schwarz (33 J., Krankenpflegerin) stellte sich mit folgender aktueller Anamnese vor: Seit ca. 3 Monaten Unruhe, Schlafstörungen, Wärmeintoleranz, vermehrtes Schwitzen, Palpitationen, Gewichtsverlust von 6 kg trotz Heißhunger, häufiger weicher Stuhlgang, Haarausfall. Seit einigen Wochen Druckgefühl hinter den Augen. An Vorerkrankungen seien bekannt: Keine. Die Dauermedikation umfasse: Keine. Allergien: Keine bekannt. Sozial- und Familienanamnese: Raucherin, 8 pack years. Schichtdienst. Kinderwunsch in den nächsten Jahren. Tante hat eine Schilddrüsenerkrankung. Klinische Untersuchung: Feinschlägiger Tremor, warme feuchte Haut, diffuse Struma ohne Knoten, Exophthalmus beidseits. Zusammenfassend ergibt sich der dringende Verdacht auf: Hyperthyreose bei Morbus Basedow mit endokriner Orbitopathie (Differenzialdiagnosen: Autonomes Adenom, Hashimoto-Thyreoiditis (hyperthyreote Phase), Angststörung)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Frau Nina Schwarz, 33 Jahre alt, aktuell in der Aufnahme (Endokrinologie)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Seit ca. 3 Monaten Unruhe, Schlafstörungen, Wärmeintoleranz, vermehrtes Schwitzen, Palpitationen, Gewichtsverlust von 6 kg trotz Heißhunger, häufiger weicher Stuhlgang, Haarausfall. Seit einigen Wochen Druckgefühl hinter den Augen. Es besteht der dringende Verdacht auf Hyperthyreose bei Morbus Basedow mit endokriner Orbitopathie."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Keine. Medikation: Keine. Allergien: Keine bekannt."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 145/70 mmHg, HF 112 /min, Temp 37,4 °C, SpO₂ 99 % (Raumluft). Feinschlägiger Tremor, warme feuchte Haut, diffuse Struma ohne Knoten, Exophthalmus beidseits. Labor: TSH: < 0,01 mU/l (supprimiert), fT4: 4,2 ng/dl (erhöht), fT3: 12,1 pg/ml (erhöht), TRAK: 9,8 IU/l (positiv)"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Hyperthyreose bei Morbus Basedow mit endokriner Orbitopathie sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Autonomes Adenom, Hashimoto-Thyreoiditis (hyperthyreote Phase), Angststörung)."
      }
    ]
  },
  {
    "id": "hypothyreose",
    "title": "Hypothyreose bei Hashimoto-Thyreoiditis",
    "specialty": "Endokrinologie",
    "category": "Endokrinologie",
    "difficulty": "B1",
    "patientName": "Frau Brigitte Krause",
    "patientAge": 54,
    "chiefComplaint": "Ich bin nur noch müde und friere ständig, obwohl alle anderen schwitzen. Ich hab zugenommen, und meine Haut ist so trocken.",
    "patient": {
      "name": "Frau Brigitte Krause",
      "age": 54,
      "gender": "w",
      "occupation": "Buchhalterin",
      "chiefComplaint": "Ich bin nur noch müde und friere ständig, obwohl alle anderen schwitzen. Ich hab zugenommen, und meine Haut ist so trocken.",
      "vitalSigns": {
        "bp": "140/90 mmHg",
        "hr": "56 /min",
        "temp": "36,0 °C",
        "spo2": "98 % (Raumluft)"
      },
      "historyDetails": "Seit ca. 6 Monaten zunehmende Müdigkeit, Kälteintoleranz, Gewichtszunahme von 7 kg, Obstipation, trockene Haut, brüchige Haare, Konzentrationsstörungen, depressive Verstimmung. Vorerkrankungen: Diabetes mellitus Typ 2 (diätetisch eingestellt), Hypercholesterinämie. Medikation: Keine. Allergien: Keine bekannt. Sozialanamnese: Nichtraucherin. Verheiratet, zwei erwachsene Kinder. Perimenopausal. Familienanamnese: Schwester hat ebenfalls Hashimoto. Körperliche Untersuchung: Teigige Haut, periorbitale Schwellung, verlangsamte Reflexe, raue Stimme. Schilddrüse nicht vergrößert tastbar. Labor: TSH: 28,4 mU/l (deutlich erhöht), fT4: 0,5 ng/dl (erniedrigt), TPO-AK: 860 IU/ml (positiv), LDL-Cholesterin: 190 mg/dl (erhöht)."
    },
    "anamneseQuestions": [
      {
        "id": "hypothyreose-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Frau Brigitte Krause, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Manifeste Hypothyreose bei Hashimoto-Thyreoiditis vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Ich bin nur noch müde und friere ständig, obwohl alle anderen schwitzen. Ich hab zugenommen, und meine Haut ist so trocken."
      },
      {
        "id": "hypothyreose-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Diabetes mellitus Typ 2 (diätetisch eingestellt), Hypercholesterinämie. Meine Medikamente sind: Keine."
      },
      {
        "id": "hypothyreose-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Keine bekannt. Zu meinem Alltag: Nichtraucherin. Verheiratet, zwei erwachsene Kinder. Perimenopausal. In der Familie: Schwester hat ebenfalls Hashimoto."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Frau Brigitte Krause (54 J.) mit Verdacht auf Manifeste Hypothyreose bei Hashimoto-Thyreoiditis im C1-Fachstil.",
      "requiredTerms": [
        "Manifeste Hypothyreose bei Hashimoto-Thyreoiditis",
        "Diabetes",
        "Depression",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Frau Brigitte Krause (54 J., Buchhalterin) stellte sich mit folgender aktueller Anamnese vor: Seit ca. 6 Monaten zunehmende Müdigkeit, Kälteintoleranz, Gewichtszunahme von 7 kg, Obstipation, trockene Haut, brüchige Haare, Konzentrationsstörungen, depressive Verstimmung. An Vorerkrankungen seien bekannt: Diabetes mellitus Typ 2 (diätetisch eingestellt), Hypercholesterinämie. Die Dauermedikation umfasse: Keine. Allergien: Keine bekannt. Sozial- und Familienanamnese: Nichtraucherin. Verheiratet, zwei erwachsene Kinder. Perimenopausal. Schwester hat ebenfalls Hashimoto. Klinische Untersuchung: Teigige Haut, periorbitale Schwellung, verlangsamte Reflexe, raue Stimme. Schilddrüse nicht vergrößert tastbar. Zusammenfassend ergibt sich der dringende Verdacht auf: Manifeste Hypothyreose bei Hashimoto-Thyreoiditis (Differenzialdiagnosen: Depression, Eisenmangelanämie, Chronisches Fatigue-Syndrom)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Frau Brigitte Krause, 54 Jahre alt, aktuell in der Aufnahme (Endokrinologie)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Seit ca. 6 Monaten zunehmende Müdigkeit, Kälteintoleranz, Gewichtszunahme von 7 kg, Obstipation, trockene Haut, brüchige Haare, Konzentrationsstörungen, depressive Verstimmung. Es besteht der dringende Verdacht auf Manifeste Hypothyreose bei Hashimoto-Thyreoiditis."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Diabetes mellitus Typ 2 (diätetisch eingestellt), Hypercholesterinämie. Medikation: Keine. Allergien: Keine bekannt."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 140/90 mmHg, HF 56 /min, Temp 36,0 °C, SpO₂ 98 % (Raumluft). Teigige Haut, periorbitale Schwellung, verlangsamte Reflexe, raue Stimme. Schilddrüse nicht vergrößert tastbar. Labor: TSH: 28,4 mU/l (deutlich erhöht), fT4: 0,5 ng/dl (erniedrigt), TPO-AK: 860 IU/ml (positiv), LDL-Cholesterin: 190 mg/dl (erhöht)"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Manifeste Hypothyreose bei Hashimoto-Thyreoiditis sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Depression, Eisenmangelanämie, Chronisches Fatigue-Syndrom)."
      }
    ]
  },
  {
    "id": "eisenmangelanaemie",
    "title": "Eisenmangelanämie",
    "specialty": "Innere Medizin",
    "category": "Innere Medizin",
    "difficulty": "B1",
    "patientName": "Frau Fatima Al-Hassan",
    "patientAge": 36,
    "chiefComplaint": "Ich bin so schlapp, dass ich kaum die Treppe hochkomme. Mir wird schnell schwindelig, und meine Haare fallen aus.",
    "patient": {
      "name": "Frau Fatima Al-Hassan",
      "age": 36,
      "gender": "w",
      "occupation": "Reinigungskraft",
      "chiefComplaint": "Ich bin so schlapp, dass ich kaum die Treppe hochkomme. Mir wird schnell schwindelig, und meine Haare fallen aus.",
      "vitalSigns": {
        "bp": "105/65 mmHg",
        "hr": "98 /min",
        "temp": "36,6 °C",
        "spo2": "99 % (Raumluft)"
      },
      "historyDetails": "Seit ca. 4 Monaten zunehmende Müdigkeit, Belastungsdyspnoe, Schwindel, Haarausfall, brüchige Nägel. Seit 1 Jahr verstärkte und verlängerte Regelblutungen (7–8 Tage, bis zu 8 Binden/Tag). Lust auf Eiswürfel (Pagophagie). Vorerkrankungen: Uterus myomatosus (gynäkologisch bekannt), Drei Schwangerschaften. Medikation: Keine. Allergien: Keine bekannt. Sozialanamnese: Nichtraucherin. Vegetarische Ernährung. Verheiratet, drei Kinder. Familienanamnese: Unauffällig. Körperliche Untersuchung: Blasse Haut und Konjunktiven, Mundwinkelrhagaden, Hohlnägel (Koilonychie). Systolikum 2/6 über Erb. Labor: Hb: 8,6 g/dl (erniedrigt), MCV: 71 fl (erniedrigt), MCH: 22 pg (erniedrigt), Ferritin: 4 µg/l (erniedrigt), Transferrinsättigung: 6 % (erniedrigt)."
    },
    "anamneseQuestions": [
      {
        "id": "eisenmangelanaemie-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Frau Fatima Al-Hassan, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Eisenmangelanämie bei Hypermenorrhö (Uterus myomatosus) vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Ich bin so schlapp, dass ich kaum die Treppe hochkomme. Mir wird schnell schwindelig, und meine Haare fallen aus."
      },
      {
        "id": "eisenmangelanaemie-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Uterus myomatosus (gynäkologisch bekannt), Drei Schwangerschaften. Meine Medikamente sind: Keine."
      },
      {
        "id": "eisenmangelanaemie-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Keine bekannt. Zu meinem Alltag: Nichtraucherin. Vegetarische Ernährung. Verheiratet, drei Kinder. In der Familie: Unauffällig."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Frau Fatima Al-Hassan (36 J.) mit Verdacht auf Eisenmangelanämie bei Hypermenorrhö (Uterus myomatosus) im C1-Fachstil.",
      "requiredTerms": [
        "Eisenmangelanämie bei Hypermenorrhö (Uterus myomatosus)",
        "Uterus",
        "Gastrointestinale Blutung",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Frau Fatima Al-Hassan (36 J., Reinigungskraft) stellte sich mit folgender aktueller Anamnese vor: Seit ca. 4 Monaten zunehmende Müdigkeit, Belastungsdyspnoe, Schwindel, Haarausfall, brüchige Nägel. Seit 1 Jahr verstärkte und verlängerte Regelblutungen (7–8 Tage, bis zu 8 Binden/Tag). Lust auf Eiswürfel (Pagophagie). An Vorerkrankungen seien bekannt: Uterus myomatosus (gynäkologisch bekannt), Drei Schwangerschaften. Die Dauermedikation umfasse: Keine. Allergien: Keine bekannt. Sozial- und Familienanamnese: Nichtraucherin. Vegetarische Ernährung. Verheiratet, drei Kinder. Unauffällig. Klinische Untersuchung: Blasse Haut und Konjunktiven, Mundwinkelrhagaden, Hohlnägel (Koilonychie). Systolikum 2/6 über Erb. Zusammenfassend ergibt sich der dringende Verdacht auf: Eisenmangelanämie bei Hypermenorrhö (Uterus myomatosus) (Differenzialdiagnosen: Gastrointestinale Blutung, Zöliakie mit Malabsorption, Thalassämie)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Frau Fatima Al-Hassan, 36 Jahre alt, aktuell in der Aufnahme (Innere Medizin)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Seit ca. 4 Monaten zunehmende Müdigkeit, Belastungsdyspnoe, Schwindel, Haarausfall, brüchige Nägel. Seit 1 Jahr verstärkte und verlängerte Regelblutungen (7–8 Tage, bis zu 8 Binden/Tag). Lust auf Eiswürfel (Pagophagie). Es besteht der dringende Verdacht auf Eisenmangelanämie bei Hypermenorrhö (Uterus myomatosus)."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Uterus myomatosus (gynäkologisch bekannt), Drei Schwangerschaften. Medikation: Keine. Allergien: Keine bekannt."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 105/65 mmHg, HF 98 /min, Temp 36,6 °C, SpO₂ 99 % (Raumluft). Blasse Haut und Konjunktiven, Mundwinkelrhagaden, Hohlnägel (Koilonychie). Systolikum 2/6 über Erb. Labor: Hb: 8,6 g/dl (erniedrigt), MCV: 71 fl (erniedrigt), MCH: 22 pg (erniedrigt), Ferritin: 4 µg/l (erniedrigt), Transferrinsättigung: 6 % (erniedrigt)"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Eisenmangelanämie bei Hypermenorrhö (Uterus myomatosus) sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Gastrointestinale Blutung, Zöliakie mit Malabsorption, Thalassämie)."
      }
    ]
  },
  {
    "id": "pflege-sturz-im-patientenzimmer",
    "title": "Sturz im Patientenzimmer (Pflege)",
    "specialty": "Innere Medizin",
    "category": "Innere Medizin",
    "difficulty": "B1",
    "patientName": "Herr Alfred Seidel",
    "patientAge": 86,
    "chiefComplaint": "Ich wollte doch nur schnell allein aufs Klo, ich wollte niemanden wecken. Und dann sind mir die Beine weggesackt. Mein Kopf tut ein bisschen weh.",
    "patient": {
      "name": "Herr Alfred Seidel",
      "age": 86,
      "gender": "m",
      "occupation": "Rentner",
      "chiefComplaint": "Ich wollte doch nur schnell allein aufs Klo, ich wollte niemanden wecken. Und dann sind mir die Beine weggesackt. Mein Kopf tut ein bisschen weh.",
      "vitalSigns": {
        "bp": "105/60 (liegend 130/75) mmHg",
        "hr": "92 /min",
        "temp": "36,6 °C",
        "spo2": "95 % (Raumluft)"
      },
      "historyDetails": "Nachts um 2:30 Uhr neben dem Bett aufgefunden. Ist ohne Klingel und ohne Rollator aufgestanden. Kein Bewusstseinsverlust laut Patient. 2 cm Platzwunde am Hinterkopf. Vorerkrankungen: Herzinsuffizienz, Vorhofflimmern, Benigne Prostatahyperplasie (Nykturie 3–4x), Bekannte Sturzneigung. Medikation: Apixaban 2,5 mg 1-0-1, Torasemid 20 mg 1-0-0, Tamsulosin 0,4 mg 0-0-1. Allergien: Keine bekannt. Sozialanamnese: Seit 3 Tagen stationär wegen Herzinsuffizienz. Rollator, Brille, Hörgerät links. Familienanamnese: Nicht relevant. Körperliche Untersuchung: Wach, orientiert. Pupillen isokor, lichtreagibel. Bewegt alle Extremitäten, keine Beinverkürzung. Platzwunde occipital, gering blutend. Labor: Blutzucker (BZ-Stix): 118 mg/dl."
    },
    "anamneseQuestions": [
      {
        "id": "pflege-sturz-im-patientenzimmer-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Herr Alfred Seidel, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Sturzereignis bei orthostatischer Dysregulation, Kopfplatzwunde occipital, unter Antikoagulation vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Ich wollte doch nur schnell allein aufs Klo, ich wollte niemanden wecken. Und dann sind mir die Beine weggesackt. Mein Kopf tut ein bisschen weh."
      },
      {
        "id": "pflege-sturz-im-patientenzimmer-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Herzinsuffizienz, Vorhofflimmern, Benigne Prostatahyperplasie (Nykturie 3–4x), Bekannte Sturzneigung. Meine Medikamente sind: Apixaban 2,5 mg 1-0-1, Torasemid 20 mg 1-0-0, Tamsulosin 0,4 mg 0-0-1."
      },
      {
        "id": "pflege-sturz-im-patientenzimmer-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Keine bekannt. Zu meinem Alltag: Seit 3 Tagen stationär wegen Herzinsuffizienz. Rollator, Brille, Hörgerät links. In der Familie: Nicht relevant."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Herr Alfred Seidel (86 J.) mit Verdacht auf Sturzereignis bei orthostatischer Dysregulation, Kopfplatzwunde occipital, unter Antikoagulation im C1-Fachstil.",
      "requiredTerms": [
        "Sturzereignis bei orthostatischer Dysregulation, Kopfplatzwunde occipital, unter Antikoagulation",
        "Herzinsuffizienz",
        "Synkope kardialer Ursache",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Herr Alfred Seidel (86 J., Rentner) stellte sich mit folgender aktueller Anamnese vor: Nachts um 2:30 Uhr neben dem Bett aufgefunden. Ist ohne Klingel und ohne Rollator aufgestanden. Kein Bewusstseinsverlust laut Patient. 2 cm Platzwunde am Hinterkopf. An Vorerkrankungen seien bekannt: Herzinsuffizienz, Vorhofflimmern, Benigne Prostatahyperplasie (Nykturie 3–4x), Bekannte Sturzneigung. Die Dauermedikation umfasse: Apixaban 2,5 mg 1-0-1, Torasemid 20 mg 1-0-0, Tamsulosin 0,4 mg 0-0-1. Allergien: Keine bekannt. Sozial- und Familienanamnese: Seit 3 Tagen stationär wegen Herzinsuffizienz. Rollator, Brille, Hörgerät links. Nicht relevant. Klinische Untersuchung: Wach, orientiert. Pupillen isokor, lichtreagibel. Bewegt alle Extremitäten, keine Beinverkürzung. Platzwunde occipital, gering blutend. Zusammenfassend ergibt sich der dringende Verdacht auf: Sturzereignis bei orthostatischer Dysregulation, Kopfplatzwunde occipital, unter Antikoagulation (Differenzialdiagnosen: Synkope kardialer Ursache, Hypoglykämie, Delir)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Herr Alfred Seidel, 86 Jahre alt, aktuell in der Aufnahme (Innere Medizin)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Nachts um 2:30 Uhr neben dem Bett aufgefunden. Ist ohne Klingel und ohne Rollator aufgestanden. Kein Bewusstseinsverlust laut Patient. 2 cm Platzwunde am Hinterkopf. Es besteht der dringende Verdacht auf Sturzereignis bei orthostatischer Dysregulation, Kopfplatzwunde occipital, unter Antikoagulation."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Herzinsuffizienz, Vorhofflimmern, Benigne Prostatahyperplasie (Nykturie 3–4x), Bekannte Sturzneigung. Medikation: Apixaban 2,5 mg 1-0-1, Torasemid 20 mg 1-0-0, Tamsulosin 0,4 mg 0-0-1. Allergien: Keine bekannt."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 105/60 (liegend 130/75) mmHg, HF 92 /min, Temp 36,6 °C, SpO₂ 95 % (Raumluft). Wach, orientiert. Pupillen isokor, lichtreagibel. Bewegt alle Extremitäten, keine Beinverkürzung. Platzwunde occipital, gering blutend. Labor: Blutzucker (BZ-Stix): 118 mg/dl"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Sturzereignis bei orthostatischer Dysregulation, Kopfplatzwunde occipital, unter Antikoagulation sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Synkope kardialer Ursache, Hypoglykämie, Delir)."
      }
    ]
  },
  {
    "id": "pflege-dekubitus-risiko",
    "title": "Dekubitus Kategorie 2 am Sakrum (Pflege)",
    "specialty": "Geriatrie",
    "category": "Geriatrie",
    "difficulty": "B2",
    "patientName": "Frau Hedwig Albrecht",
    "patientAge": 91,
    "chiefComplaint": "Schwester, mir brennt's so am Po, ich kann gar nicht mehr richtig liegen. Und ich hab einfach keinen Hunger.",
    "patient": {
      "name": "Frau Hedwig Albrecht",
      "age": 91,
      "gender": "w",
      "occupation": "Rentnerin",
      "chiefComplaint": "Schwester, mir brennt's so am Po, ich kann gar nicht mehr richtig liegen. Und ich hab einfach keinen Hunger.",
      "vitalSigns": {
        "bp": "110/65 mmHg",
        "hr": "82 /min",
        "temp": "37,2 °C",
        "spo2": "95 % (Raumluft)"
      },
      "historyDetails": "Seit 10 Tagen stationär nach Pneumonie, überwiegend bettlägerig. Bei der Grundpflege offene, flache Hautläsion (2 x 3 cm) mit rosafarbenem Wundgrund am Sakrum, umgebende Haut gerötet und nicht wegdrückbar. Isst ca. ein Viertel der Portionen. Vorerkrankungen: Demenz vom Alzheimer-Typ (mittelgradig), Harn- und Stuhlinkontinenz, Herzinsuffizienz, Z. n. Apoplex mit Hemiparese links. Medikation: Ramipril 2,5 mg 1-0-0, Bisoprolol 2,5 mg 1-0-0, Melperon 25 mg 0-0-1. Allergien: Pflaster (Hautreizung). Sozialanamnese: Lebt im Pflegeheim, Pflegegrad 4. Gewicht 46 kg, Größe 1,60 m (BMI 18). Familienanamnese: Tochter ist Betreuerin. Körperliche Untersuchung: Braden-Skala 11 Punkte (hohes Risiko). Haut trocken, dünn. Ferse links gerötet, aber wegdrückbar. Labor: Albumin: 2,8 g/dl (erniedrigt), Hb: 10,9 g/dl."
    },
    "anamneseQuestions": [
      {
        "id": "pflege-dekubitus-risiko-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Frau Hedwig Albrecht, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Dekubitus Kategorie 2 (EPUAP) sakral bei Immobilität, Mangelernährung und Inkontinenz vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Schwester, mir brennt's so am Po, ich kann gar nicht mehr richtig liegen. Und ich hab einfach keinen Hunger."
      },
      {
        "id": "pflege-dekubitus-risiko-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Demenz vom Alzheimer-Typ (mittelgradig), Harn- und Stuhlinkontinenz, Herzinsuffizienz, Z. n. Apoplex mit Hemiparese links. Meine Medikamente sind: Ramipril 2,5 mg 1-0-0, Bisoprolol 2,5 mg 1-0-0, Melperon 25 mg 0-0-1."
      },
      {
        "id": "pflege-dekubitus-risiko-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Pflaster (Hautreizung). Zu meinem Alltag: Lebt im Pflegeheim, Pflegegrad 4. Gewicht 46 kg, Größe 1,60 m (BMI 18). In der Familie: Tochter ist Betreuerin."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Frau Hedwig Albrecht (91 J.) mit Verdacht auf Dekubitus Kategorie 2 (EPUAP) sakral bei Immobilität, Mangelernährung und Inkontinenz im C1-Fachstil.",
      "requiredTerms": [
        "Dekubitus Kategorie 2 (EPUAP) sakral bei Immobilität, Mangelernährung und Inkontinenz",
        "Demenz",
        "Inkontinenzassoziierte Dermatitis (IAD)",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Frau Hedwig Albrecht (91 J., Rentnerin) stellte sich mit folgender aktueller Anamnese vor: Seit 10 Tagen stationär nach Pneumonie, überwiegend bettlägerig. Bei der Grundpflege offene, flache Hautläsion (2 x 3 cm) mit rosafarbenem Wundgrund am Sakrum, umgebende Haut gerötet und nicht wegdrückbar. Isst ca. ein Viertel der Portionen. An Vorerkrankungen seien bekannt: Demenz vom Alzheimer-Typ (mittelgradig), Harn- und Stuhlinkontinenz, Herzinsuffizienz, Z. n. Apoplex mit Hemiparese links. Die Dauermedikation umfasse: Ramipril 2,5 mg 1-0-0, Bisoprolol 2,5 mg 1-0-0, Melperon 25 mg 0-0-1. Allergien: Pflaster (Hautreizung). Sozial- und Familienanamnese: Lebt im Pflegeheim, Pflegegrad 4. Gewicht 46 kg, Größe 1,60 m (BMI 18). Tochter ist Betreuerin. Klinische Untersuchung: Braden-Skala 11 Punkte (hohes Risiko). Haut trocken, dünn. Ferse links gerötet, aber wegdrückbar. Zusammenfassend ergibt sich der dringende Verdacht auf: Dekubitus Kategorie 2 (EPUAP) sakral bei Immobilität, Mangelernährung und Inkontinenz (Differenzialdiagnosen: Inkontinenzassoziierte Dermatitis (IAD), Intertrigo, Dekubitus Kategorie 1)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Frau Hedwig Albrecht, 91 Jahre alt, aktuell in der Aufnahme (Geriatrie)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Seit 10 Tagen stationär nach Pneumonie, überwiegend bettlägerig. Bei der Grundpflege offene, flache Hautläsion (2 x 3 cm) mit rosafarbenem Wundgrund am Sakrum, umgebende Haut gerötet und nicht wegdrückbar. Isst ca. ein Viertel der Portionen. Es besteht der dringende Verdacht auf Dekubitus Kategorie 2 (EPUAP) sakral bei Immobilität, Mangelernährung und Inkontinenz."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Demenz vom Alzheimer-Typ (mittelgradig), Harn- und Stuhlinkontinenz, Herzinsuffizienz, Z. n. Apoplex mit Hemiparese links. Medikation: Ramipril 2,5 mg 1-0-0, Bisoprolol 2,5 mg 1-0-0, Melperon 25 mg 0-0-1. Allergien: Pflaster (Hautreizung)."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 110/65 mmHg, HF 82 /min, Temp 37,2 °C, SpO₂ 95 % (Raumluft). Braden-Skala 11 Punkte (hohes Risiko). Haut trocken, dünn. Ferse links gerötet, aber wegdrückbar. Labor: Albumin: 2,8 g/dl (erniedrigt), Hb: 10,9 g/dl"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Dekubitus Kategorie 2 (EPUAP) sakral bei Immobilität, Mangelernährung und Inkontinenz sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Inkontinenzassoziierte Dermatitis (IAD), Intertrigo, Dekubitus Kategorie 1)."
      }
    ]
  },
  {
    "id": "pflege-naechtliches-delir",
    "title": "Nächtliche Unruhe und Delir nach OP (Pflege)",
    "specialty": "Chirurgie",
    "category": "Chirurgie",
    "difficulty": "C1",
    "patientName": "Herr Werner Fuchs",
    "patientAge": 79,
    "chiefComplaint": "Lassen Sie mich sofort raus hier! Die Männer da in der Ecke wollen mir was antun. Wo ist meine Frau? Ich muss zur Arbeit!",
    "patient": {
      "name": "Herr Werner Fuchs",
      "age": 79,
      "gender": "m",
      "occupation": "Rentner, ehem. Polizist",
      "chiefComplaint": "Lassen Sie mich sofort raus hier! Die Männer da in der Ecke wollen mir was antun. Wo ist meine Frau? Ich muss zur Arbeit!",
      "vitalSigns": {
        "bp": "165/90 mmHg",
        "hr": "104 /min",
        "temp": "37,8 °C",
        "spo2": "92 % (Raumluft)"
      },
      "historyDetails": "Seit ca. 23 Uhr zunehmend unruhig, desorientiert, optische Halluzinationen, versucht den ZVK und den Blasenkatheter zu ziehen. Tagsüber noch orientiert und freundlich. Hat seit der OP kaum geschlafen. Vorerkrankungen: Leichte kognitive Störung, Schwerhörigkeit beidseits, Arterielle Hypertonie, Z. n. Delir nach Knie-OP 2021. Medikation: Piritramid 3 mg i.v. bei Bedarf (zuletzt 21 Uhr), Metamizol 1 g i.v. 1-1-1-1, Enoxaparin 40 mg s.c. 0-0-1. Allergien: Keine bekannt. Sozialanamnese: Verheiratet, Ehefrau zu Hause. Alkohol laut Ehefrau 1 Glas Wein am Abend. Hörgeräte liegen in der Schublade. Familienanamnese: Nicht relevant. Körperliche Untersuchung: Desorientiert zu Zeit, Ort und Situation, Nu-DESC positiv. Brille und Hörgeräte nicht angelegt. Labor: Blutzucker (BZ-Stix): 132 mg/dl."
    },
    "anamneseQuestions": [
      {
        "id": "pflege-naechtliches-delir-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Herr Werner Fuchs, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Postoperatives hyperaktives Delir (2. Tag nach Hemikolektomie) vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Lassen Sie mich sofort raus hier! Die Männer da in der Ecke wollen mir was antun. Wo ist meine Frau? Ich muss zur Arbeit!"
      },
      {
        "id": "pflege-naechtliches-delir-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Leichte kognitive Störung, Schwerhörigkeit beidseits, Arterielle Hypertonie, Z. n. Delir nach Knie-OP 2021. Meine Medikamente sind: Piritramid 3 mg i.v. bei Bedarf (zuletzt 21 Uhr), Metamizol 1 g i.v. 1-1-1-1, Enoxaparin 40 mg s.c. 0-0-1."
      },
      {
        "id": "pflege-naechtliches-delir-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Keine bekannt. Zu meinem Alltag: Verheiratet, Ehefrau zu Hause. Alkohol laut Ehefrau 1 Glas Wein am Abend. Hörgeräte liegen in der Schublade. In der Familie: Nicht relevant."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Herr Werner Fuchs (79 J.) mit Verdacht auf Postoperatives hyperaktives Delir (2. Tag nach Hemikolektomie) im C1-Fachstil.",
      "requiredTerms": [
        "Postoperatives hyperaktives Delir (2. Tag nach Hemikolektomie)",
        "Leichte",
        "Alkoholentzugsdelir",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Herr Werner Fuchs (79 J., Rentner, ehem. Polizist) stellte sich mit folgender aktueller Anamnese vor: Seit ca. 23 Uhr zunehmend unruhig, desorientiert, optische Halluzinationen, versucht den ZVK und den Blasenkatheter zu ziehen. Tagsüber noch orientiert und freundlich. Hat seit der OP kaum geschlafen. An Vorerkrankungen seien bekannt: Leichte kognitive Störung, Schwerhörigkeit beidseits, Arterielle Hypertonie, Z. n. Delir nach Knie-OP 2021. Die Dauermedikation umfasse: Piritramid 3 mg i.v. bei Bedarf (zuletzt 21 Uhr), Metamizol 1 g i.v. 1-1-1-1, Enoxaparin 40 mg s.c. 0-0-1. Allergien: Keine bekannt. Sozial- und Familienanamnese: Verheiratet, Ehefrau zu Hause. Alkohol laut Ehefrau 1 Glas Wein am Abend. Hörgeräte liegen in der Schublade. Nicht relevant. Klinische Untersuchung: Desorientiert zu Zeit, Ort und Situation, Nu-DESC positiv. Brille und Hörgeräte nicht angelegt. Zusammenfassend ergibt sich der dringende Verdacht auf: Postoperatives hyperaktives Delir (2. Tag nach Hemikolektomie) (Differenzialdiagnosen: Alkoholentzugsdelir, Hypoxie, Harnverhalt)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Herr Werner Fuchs, 79 Jahre alt, aktuell in der Aufnahme (Chirurgie)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Seit ca. 23 Uhr zunehmend unruhig, desorientiert, optische Halluzinationen, versucht den ZVK und den Blasenkatheter zu ziehen. Tagsüber noch orientiert und freundlich. Hat seit der OP kaum geschlafen. Es besteht der dringende Verdacht auf Postoperatives hyperaktives Delir (2. Tag nach Hemikolektomie)."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Leichte kognitive Störung, Schwerhörigkeit beidseits, Arterielle Hypertonie, Z. n. Delir nach Knie-OP 2021. Medikation: Piritramid 3 mg i.v. bei Bedarf (zuletzt 21 Uhr), Metamizol 1 g i.v. 1-1-1-1, Enoxaparin 40 mg s.c. 0-0-1. Allergien: Keine bekannt."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 165/90 mmHg, HF 104 /min, Temp 37,8 °C, SpO₂ 92 % (Raumluft). Desorientiert zu Zeit, Ort und Situation, Nu-DESC positiv. Brille und Hörgeräte nicht angelegt. Labor: Blutzucker (BZ-Stix): 132 mg/dl"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Postoperatives hyperaktives Delir (2. Tag nach Hemikolektomie) sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Alkoholentzugsdelir, Hypoxie, Harnverhalt)."
      }
    ]
  },
  {
    "id": "pflege-transfusionsreaktion",
    "title": "Transfusionsreaktion während Erythrozytengabe (Pflege)",
    "specialty": "Hämatologie",
    "category": "Hämatologie",
    "difficulty": "C1",
    "patientName": "Frau Doris Schuster",
    "patientAge": 65,
    "chiefComplaint": "Mir ist auf einmal so kalt, ich zittere am ganzen Körper. Und mein Rücken tut weh. Ist das normal mit dem Blut?",
    "patient": {
      "name": "Frau Doris Schuster",
      "age": 65,
      "gender": "w",
      "occupation": "Rentnerin",
      "chiefComplaint": "Mir ist auf einmal so kalt, ich zittere am ganzen Körper. Und mein Rücken tut weh. Ist das normal mit dem Blut?",
      "vitalSigns": {
        "bp": "95/60 (vor Transfusion 125/75) mmHg",
        "hr": "118 /min",
        "temp": "38,9 °C",
        "spo2": "94 % (Raumluft)"
      },
      "historyDetails": "Erhält das 2. von 2 Erythrozytenkonzentraten bei Hb 7,1 g/dl. Ca. 15 Minuten nach Beginn Schüttelfrost, Fieber, Rückenschmerzen, Unruhe. Erstes EK gestern ohne Probleme. Vorerkrankungen: Myelodysplastisches Syndrom, Transfusionsbedürftige Anämie. Medikation: Folsäure 5 mg 1-0-0, Pantoprazol 20 mg 1-0-0. Allergien: Keine bekannt. Sozialanamnese: Verheiratet. Nichtraucherin. Familienanamnese: Nicht relevant. Körperliche Untersuchung: Schüttelfrost, kaltschweißig. Urin im Beutel rötlich-braun. Labor: Bedside-Test: wurde vor dem 1. EK durchgeführt, Dokumentation für das 2. EK fehlt."
    },
    "anamneseQuestions": [
      {
        "id": "pflege-transfusionsreaktion-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Frau Doris Schuster, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Akute Transfusionsreaktion (V. a. febrile nicht-hämolytische vs. hämolytische Reaktion) 15 Minuten nach Beginn der Transfusion vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Mir ist auf einmal so kalt, ich zittere am ganzen Körper. Und mein Rücken tut weh. Ist das normal mit dem Blut?"
      },
      {
        "id": "pflege-transfusionsreaktion-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Myelodysplastisches Syndrom, Transfusionsbedürftige Anämie. Meine Medikamente sind: Folsäure 5 mg 1-0-0, Pantoprazol 20 mg 1-0-0."
      },
      {
        "id": "pflege-transfusionsreaktion-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Keine bekannt. Zu meinem Alltag: Verheiratet. Nichtraucherin. In der Familie: Nicht relevant."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Frau Doris Schuster (65 J.) mit Verdacht auf Akute Transfusionsreaktion (V. a. febrile nicht-hämolytische vs. hämolytische Reaktion) 15 Minuten nach Beginn der Transfusion im C1-Fachstil.",
      "requiredTerms": [
        "Akute Transfusionsreaktion (V. a. febrile nicht-hämolytische vs. hämolytische Reaktion) 15 Minuten nach Beginn der Transfusion",
        "Myelodysplastisches",
        "Akute hämolytische Transfusionsreaktion (AB0-Inkompatibilität)",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Frau Doris Schuster (65 J., Rentnerin) stellte sich mit folgender aktueller Anamnese vor: Erhält das 2. von 2 Erythrozytenkonzentraten bei Hb 7,1 g/dl. Ca. 15 Minuten nach Beginn Schüttelfrost, Fieber, Rückenschmerzen, Unruhe. Erstes EK gestern ohne Probleme. An Vorerkrankungen seien bekannt: Myelodysplastisches Syndrom, Transfusionsbedürftige Anämie. Die Dauermedikation umfasse: Folsäure 5 mg 1-0-0, Pantoprazol 20 mg 1-0-0. Allergien: Keine bekannt. Sozial- und Familienanamnese: Verheiratet. Nichtraucherin. Nicht relevant. Klinische Untersuchung: Schüttelfrost, kaltschweißig. Urin im Beutel rötlich-braun. Zusammenfassend ergibt sich der dringende Verdacht auf: Akute Transfusionsreaktion (V. a. febrile nicht-hämolytische vs. hämolytische Reaktion) 15 Minuten nach Beginn der Transfusion (Differenzialdiagnosen: Akute hämolytische Transfusionsreaktion (AB0-Inkompatibilität), Bakterielle Kontamination, Allergische Reaktion)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Frau Doris Schuster, 65 Jahre alt, aktuell in der Aufnahme (Hämatologie)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Erhält das 2. von 2 Erythrozytenkonzentraten bei Hb 7,1 g/dl. Ca. 15 Minuten nach Beginn Schüttelfrost, Fieber, Rückenschmerzen, Unruhe. Erstes EK gestern ohne Probleme. Es besteht der dringende Verdacht auf Akute Transfusionsreaktion (V. a. febrile nicht-hämolytische vs. hämolytische Reaktion) 15 Minuten nach Beginn der Transfusion."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Myelodysplastisches Syndrom, Transfusionsbedürftige Anämie. Medikation: Folsäure 5 mg 1-0-0, Pantoprazol 20 mg 1-0-0. Allergien: Keine bekannt."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 95/60 (vor Transfusion 125/75) mmHg, HF 118 /min, Temp 38,9 °C, SpO₂ 94 % (Raumluft). Schüttelfrost, kaltschweißig. Urin im Beutel rötlich-braun. Labor: Bedside-Test: wurde vor dem 1. EK durchgeführt, Dokumentation für das 2. EK fehlt"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Akute Transfusionsreaktion (V. a. febrile nicht-hämolytische vs. hämolytische Reaktion) 15 Minuten nach Beginn der Transfusion sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Akute hämolytische Transfusionsreaktion (AB0-Inkompatibilität), Bakterielle Kontamination, Allergische Reaktion)."
      }
    ]
  },
  {
    "id": "pflege-aufnahme-diabetisches-fusssyndrom",
    "title": "Pflegeaufnahme bei diabetischem Fußsyndrom (Pflege)",
    "specialty": "Endokrinologie",
    "category": "Endokrinologie",
    "difficulty": "B1",
    "patientName": "Herr Ivan Popescu",
    "patientAge": 63,
    "chiefComplaint": "Ich hab da so eine Wunde unter dem Fuß, die tut gar nicht weh, aber sie geht seit Wochen nicht zu. Meine Frau sagt, die riecht komisch.",
    "patient": {
      "name": "Herr Ivan Popescu",
      "age": 63,
      "gender": "m",
      "occupation": "Busfahrer",
      "chiefComplaint": "Ich hab da so eine Wunde unter dem Fuß, die tut gar nicht weh, aber sie geht seit Wochen nicht zu. Meine Frau sagt, die riecht komisch.",
      "vitalSigns": {
        "bp": "145/85 mmHg",
        "hr": "80 /min",
        "temp": "37,6 °C",
        "spo2": "97 % (Raumluft)"
      },
      "historyDetails": "Seit ca. 6 Wochen nicht heilende, schmerzlose Wunde an der rechten Fußsohle, seit einigen Tagen übelriechende Sekretion. Barfußlaufen im Urlaub. Spürt die Füße seit Jahren kaum. Vorerkrankungen: Diabetes mellitus Typ 2 seit 15 Jahren, insulinpflichtig, Diabetische Polyneuropathie, Diabetische Retinopathie, Arterielle Hypertonie. Medikation: Insulin glargin 30 IE 0-0-1, Metformin 1000 mg 1-0-1, Empagliflozin 10 mg 1-0-0, Ramipril 10 mg 1-0-0. Allergien: Keine bekannt. Sozialanamnese: Verheiratet. Raucher, 35 pack years. Spricht gut Deutsch, liest aber schlecht (Sehschwäche). Familienanamnese: Mutter Diabetes mellitus Typ 2, Unterschenkelamputation. Körperliche Untersuchung: Ulkus 1,5 x 1,5 cm plantar MTK I rechts mit Hyperkeratoserand, belegt, übelriechend, Umgebungsrötung 1 cm. Fußpulse tastbar. Monofilament-Test beidseits pathologisch. Labor: HbA1c: 9,6 %, Blutzucker (BZ-Stix): 246 mg/dl, CRP: 38 mg/l."
    },
    "anamneseQuestions": [
      {
        "id": "pflege-aufnahme-diabetisches-fusssyndrom-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Herr Ivan Popescu, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Diabetisches Fußsyndrom mit neuropathischem Ulkus plantar Metatarsale-I-Köpfchen rechts (Wagner 2, Armstrong B) vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Ich hab da so eine Wunde unter dem Fuß, die tut gar nicht weh, aber sie geht seit Wochen nicht zu. Meine Frau sagt, die riecht komisch."
      },
      {
        "id": "pflege-aufnahme-diabetisches-fusssyndrom-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Diabetes mellitus Typ 2 seit 15 Jahren, insulinpflichtig, Diabetische Polyneuropathie, Diabetische Retinopathie, Arterielle Hypertonie. Meine Medikamente sind: Insulin glargin 30 IE 0-0-1, Metformin 1000 mg 1-0-1, Empagliflozin 10 mg 1-0-0, Ramipril 10 mg 1-0-0."
      },
      {
        "id": "pflege-aufnahme-diabetisches-fusssyndrom-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Keine bekannt. Zu meinem Alltag: Verheiratet. Raucher, 35 pack years. Spricht gut Deutsch, liest aber schlecht (Sehschwäche). In der Familie: Mutter Diabetes mellitus Typ 2, Unterschenkelamputation."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Herr Ivan Popescu (63 J.) mit Verdacht auf Diabetisches Fußsyndrom mit neuropathischem Ulkus plantar Metatarsale-I-Köpfchen rechts (Wagner 2, Armstrong B) im C1-Fachstil.",
      "requiredTerms": [
        "Diabetisches Fußsyndrom mit neuropathischem Ulkus plantar Metatarsale-I-Köpfchen rechts (Wagner 2, Armstrong B)",
        "Diabetes",
        "Ischämisches Ulkus bei pAVK",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Herr Ivan Popescu (63 J., Busfahrer) stellte sich mit folgender aktueller Anamnese vor: Seit ca. 6 Wochen nicht heilende, schmerzlose Wunde an der rechten Fußsohle, seit einigen Tagen übelriechende Sekretion. Barfußlaufen im Urlaub. Spürt die Füße seit Jahren kaum. An Vorerkrankungen seien bekannt: Diabetes mellitus Typ 2 seit 15 Jahren, insulinpflichtig, Diabetische Polyneuropathie, Diabetische Retinopathie, Arterielle Hypertonie. Die Dauermedikation umfasse: Insulin glargin 30 IE 0-0-1, Metformin 1000 mg 1-0-1, Empagliflozin 10 mg 1-0-0, Ramipril 10 mg 1-0-0. Allergien: Keine bekannt. Sozial- und Familienanamnese: Verheiratet. Raucher, 35 pack years. Spricht gut Deutsch, liest aber schlecht (Sehschwäche). Mutter Diabetes mellitus Typ 2, Unterschenkelamputation. Klinische Untersuchung: Ulkus 1,5 x 1,5 cm plantar MTK I rechts mit Hyperkeratoserand, belegt, übelriechend, Umgebungsrötung 1 cm. Fußpulse tastbar. Monofilament-Test beidseits pathologisch. Zusammenfassend ergibt sich der dringende Verdacht auf: Diabetisches Fußsyndrom mit neuropathischem Ulkus plantar Metatarsale-I-Köpfchen rechts (Wagner 2, Armstrong B) (Differenzialdiagnosen: Ischämisches Ulkus bei pAVK, Osteomyelitis, Druckulkus durch Schuhwerk)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Herr Ivan Popescu, 63 Jahre alt, aktuell in der Aufnahme (Endokrinologie)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Seit ca. 6 Wochen nicht heilende, schmerzlose Wunde an der rechten Fußsohle, seit einigen Tagen übelriechende Sekretion. Barfußlaufen im Urlaub. Spürt die Füße seit Jahren kaum. Es besteht der dringende Verdacht auf Diabetisches Fußsyndrom mit neuropathischem Ulkus plantar Metatarsale-I-Köpfchen rechts (Wagner 2, Armstrong B)."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Diabetes mellitus Typ 2 seit 15 Jahren, insulinpflichtig, Diabetische Polyneuropathie, Diabetische Retinopathie, Arterielle Hypertonie. Medikation: Insulin glargin 30 IE 0-0-1, Metformin 1000 mg 1-0-1, Empagliflozin 10 mg 1-0-0, Ramipril 10 mg 1-0-0. Allergien: Keine bekannt."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 145/85 mmHg, HF 80 /min, Temp 37,6 °C, SpO₂ 97 % (Raumluft). Ulkus 1,5 x 1,5 cm plantar MTK I rechts mit Hyperkeratoserand, belegt, übelriechend, Umgebungsrötung 1 cm. Fußpulse tastbar. Monofilament-Test beidseits pathologisch. Labor: HbA1c: 9,6 %, Blutzucker (BZ-Stix): 246 mg/dl, CRP: 38 mg/l"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Diabetisches Fußsyndrom mit neuropathischem Ulkus plantar Metatarsale-I-Köpfchen rechts (Wagner 2, Armstrong B) sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Ischämisches Ulkus bei pAVK, Osteomyelitis, Druckulkus durch Schuhwerk)."
      }
    ]
  },
  {
    "id": "nierenkolik-urolithiasis",
    "title": "Nierenkolik bei Urolithiasis",
    "specialty": "Urologie",
    "category": "Urologie",
    "difficulty": "B1",
    "patientName": "Herr Stefan Huber",
    "patientAge": 41,
    "chiefComplaint": "Ich hab so wahnsinnige Schmerzen in der rechten Flanke, die ziehen bis in die Leiste. Ich kann nicht stillsitzen, ich lauf die ganze Zeit hin und her.",
    "patient": {
      "name": "Herr Stefan Huber",
      "age": 41,
      "gender": "m",
      "occupation": "Bauingenieur",
      "chiefComplaint": "Ich hab so wahnsinnige Schmerzen in der rechten Flanke, die ziehen bis in die Leiste. Ich kann nicht stillsitzen, ich lauf die ganze Zeit hin und her.",
      "vitalSigns": {
        "bp": "155/90 mmHg",
        "hr": "104 /min",
        "temp": "36,9 °C",
        "spo2": "98 % (Raumluft)"
      },
      "historyDetails": "Seit ca. 3 Stunden wellenartige, stärkste Schmerzen in der rechten Flanke mit Ausstrahlung in die rechte Leiste und den Hoden, Bewegungsdrang, Übelkeit, Erbrechen. Rötlicher Urin. Kein Fieber. Vorerkrankungen: Z. n. Nierenkolik links 2020 (Spontanabgang), Hyperurikämie. Medikation: Keine Dauermedikation. Allergien: Keine bekannt. Sozialanamnese: Trinkt wenig (ca. 1 l/Tag), viel Fleisch. Nichtraucher. Verheiratet. Familienanamnese: Vater hatte Nierensteine. Körperliche Untersuchung: Unruhiger Patient, Nierenlager rechts klopfschmerzhaft. Abdomen weich, kein Peritonismus. Labor: Urinstatus: Erythrozyten +++, Leukozyten negativ, Nitrit negativ, Kreatinin: 1,0 mg/dl, CRP: 6 mg/l, Harnsäure: 7,8 mg/dl (erhöht)."
    },
    "anamneseQuestions": [
      {
        "id": "nierenkolik-urolithiasis-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Herr Stefan Huber, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Harnleiterkolik rechts bei distalem Harnleiterstein (5 mm) mit Harnstauung I. Grades vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Ich hab so wahnsinnige Schmerzen in der rechten Flanke, die ziehen bis in die Leiste. Ich kann nicht stillsitzen, ich lauf die ganze Zeit hin und her."
      },
      {
        "id": "nierenkolik-urolithiasis-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Z. n. Nierenkolik links 2020 (Spontanabgang), Hyperurikämie. Meine Medikamente sind: Keine Dauermedikation."
      },
      {
        "id": "nierenkolik-urolithiasis-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Keine bekannt. Zu meinem Alltag: Trinkt wenig (ca. 1 l/Tag), viel Fleisch. Nichtraucher. Verheiratet. In der Familie: Vater hatte Nierensteine."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Herr Stefan Huber (41 J.) mit Verdacht auf Harnleiterkolik rechts bei distalem Harnleiterstein (5 mm) mit Harnstauung I. Grades im C1-Fachstil.",
      "requiredTerms": [
        "Harnleiterkolik rechts bei distalem Harnleiterstein (5 mm) mit Harnstauung I. Grades",
        "Z.",
        "Akute Appendizitis",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Herr Stefan Huber (41 J., Bauingenieur) stellte sich mit folgender aktueller Anamnese vor: Seit ca. 3 Stunden wellenartige, stärkste Schmerzen in der rechten Flanke mit Ausstrahlung in die rechte Leiste und den Hoden, Bewegungsdrang, Übelkeit, Erbrechen. Rötlicher Urin. Kein Fieber. An Vorerkrankungen seien bekannt: Z. n. Nierenkolik links 2020 (Spontanabgang), Hyperurikämie. Die Dauermedikation umfasse: Keine Dauermedikation. Allergien: Keine bekannt. Sozial- und Familienanamnese: Trinkt wenig (ca. 1 l/Tag), viel Fleisch. Nichtraucher. Verheiratet. Vater hatte Nierensteine. Klinische Untersuchung: Unruhiger Patient, Nierenlager rechts klopfschmerzhaft. Abdomen weich, kein Peritonismus. Zusammenfassend ergibt sich der dringende Verdacht auf: Harnleiterkolik rechts bei distalem Harnleiterstein (5 mm) mit Harnstauung I. Grades (Differenzialdiagnosen: Akute Appendizitis, Pyelonephritis, Bauchaortenaneurysma)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Herr Stefan Huber, 41 Jahre alt, aktuell in der Aufnahme (Urologie)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Seit ca. 3 Stunden wellenartige, stärkste Schmerzen in der rechten Flanke mit Ausstrahlung in die rechte Leiste und den Hoden, Bewegungsdrang, Übelkeit, Erbrechen. Rötlicher Urin. Kein Fieber. Es besteht der dringende Verdacht auf Harnleiterkolik rechts bei distalem Harnleiterstein (5 mm) mit Harnstauung I. Grades."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Z. n. Nierenkolik links 2020 (Spontanabgang), Hyperurikämie. Medikation: Keine Dauermedikation. Allergien: Keine bekannt."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 155/90 mmHg, HF 104 /min, Temp 36,9 °C, SpO₂ 98 % (Raumluft). Unruhiger Patient, Nierenlager rechts klopfschmerzhaft. Abdomen weich, kein Peritonismus. Labor: Urinstatus: Erythrozyten +++, Leukozyten negativ, Nitrit negativ, Kreatinin: 1,0 mg/dl, CRP: 6 mg/l, Harnsäure: 7,8 mg/dl (erhöht)"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Harnleiterkolik rechts bei distalem Harnleiterstein (5 mm) mit Harnstauung I. Grades sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Akute Appendizitis, Pyelonephritis, Bauchaortenaneurysma)."
      }
    ]
  },
  {
    "id": "akute-pyelonephritis",
    "title": "Akute Pyelonephritis",
    "specialty": "Urologie",
    "category": "Urologie",
    "difficulty": "B1",
    "patientName": "Frau Anna Kowalski",
    "patientAge": 31,
    "chiefComplaint": "Erst hat's nur beim Wasserlassen gebrannt, aber seit gestern hab ich Schüttelfrost und Fieber, und links im Rücken tut's richtig weh.",
    "patient": {
      "name": "Frau Anna Kowalski",
      "age": 31,
      "gender": "w",
      "occupation": "Physiotherapeutin",
      "chiefComplaint": "Erst hat's nur beim Wasserlassen gebrannt, aber seit gestern hab ich Schüttelfrost und Fieber, und links im Rücken tut's richtig weh.",
      "vitalSigns": {
        "bp": "115/70 mmHg",
        "hr": "108 /min",
        "temp": "39,4 °C",
        "spo2": "98 % (Raumluft)"
      },
      "historyDetails": "Seit 4 Tagen Dysurie, Pollakisurie und Harndrang, seit 1 Tag Fieber bis 39,5 °C mit Schüttelfrost, Flankenschmerzen links, Übelkeit. Vorerkrankungen: Rezidivierende Zystitiden (3x im letzten Jahr). Medikation: Kein Dauermedikament. Allergien: Cotrimoxazol (Exanthem). Sozialanamnese: Nichtraucherin, sexuell aktiv, feste Partnerschaft. Letzte Regelblutung vor 10 Tagen. Familienanamnese: Unauffällig. Körperliche Untersuchung: Nierenlager links deutlich klopfschmerzhaft. Suprapubischer Druckschmerz. Abdomen sonst weich. Labor: Leukozyten: 15,8 /nl (erhöht), CRP: 128 mg/l (erhöht), Urinstatus: Leukozyten +++, Nitrit positiv, Erythrozyten +, β-HCG: negativ, Kreatinin: 0,8 mg/dl."
    },
    "anamneseQuestions": [
      {
        "id": "akute-pyelonephritis-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Frau Anna Kowalski, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Akute unkomplizierte Pyelonephritis links (E. coli) vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Erst hat's nur beim Wasserlassen gebrannt, aber seit gestern hab ich Schüttelfrost und Fieber, und links im Rücken tut's richtig weh."
      },
      {
        "id": "akute-pyelonephritis-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Rezidivierende Zystitiden (3x im letzten Jahr). Meine Medikamente sind: Kein Dauermedikament."
      },
      {
        "id": "akute-pyelonephritis-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Cotrimoxazol (Exanthem). Zu meinem Alltag: Nichtraucherin, sexuell aktiv, feste Partnerschaft. Letzte Regelblutung vor 10 Tagen. In der Familie: Unauffällig."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Frau Anna Kowalski (31 J.) mit Verdacht auf Akute unkomplizierte Pyelonephritis links (E. coli) im C1-Fachstil.",
      "requiredTerms": [
        "Akute unkomplizierte Pyelonephritis links (E. coli)",
        "Rezidivierende",
        "Nierenkolik mit Harnstau",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Frau Anna Kowalski (31 J., Physiotherapeutin) stellte sich mit folgender aktueller Anamnese vor: Seit 4 Tagen Dysurie, Pollakisurie und Harndrang, seit 1 Tag Fieber bis 39,5 °C mit Schüttelfrost, Flankenschmerzen links, Übelkeit. An Vorerkrankungen seien bekannt: Rezidivierende Zystitiden (3x im letzten Jahr). Die Dauermedikation umfasse: Kein Dauermedikament. Allergien: Cotrimoxazol (Exanthem). Sozial- und Familienanamnese: Nichtraucherin, sexuell aktiv, feste Partnerschaft. Letzte Regelblutung vor 10 Tagen. Unauffällig. Klinische Untersuchung: Nierenlager links deutlich klopfschmerzhaft. Suprapubischer Druckschmerz. Abdomen sonst weich. Zusammenfassend ergibt sich der dringende Verdacht auf: Akute unkomplizierte Pyelonephritis links (E. coli) (Differenzialdiagnosen: Nierenkolik mit Harnstau, Adnexitis, Lumbago)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Frau Anna Kowalski, 31 Jahre alt, aktuell in der Aufnahme (Urologie)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Seit 4 Tagen Dysurie, Pollakisurie und Harndrang, seit 1 Tag Fieber bis 39,5 °C mit Schüttelfrost, Flankenschmerzen links, Übelkeit. Es besteht der dringende Verdacht auf Akute unkomplizierte Pyelonephritis links (E. coli)."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Rezidivierende Zystitiden (3x im letzten Jahr). Medikation: Kein Dauermedikament. Allergien: Cotrimoxazol (Exanthem)."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 115/70 mmHg, HF 108 /min, Temp 39,4 °C, SpO₂ 98 % (Raumluft). Nierenlager links deutlich klopfschmerzhaft. Suprapubischer Druckschmerz. Abdomen sonst weich. Labor: Leukozyten: 15,8 /nl (erhöht), CRP: 128 mg/l (erhöht), Urinstatus: Leukozyten +++, Nitrit positiv, Erythrozyten +, β-HCG: negativ, Kreatinin: 0,8 mg/dl"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Akute unkomplizierte Pyelonephritis links (E. coli) sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Nierenkolik mit Harnstau, Adnexitis, Lumbago)."
      }
    ]
  },
  {
    "id": "urosepsis-delir",
    "title": "Urosepsis mit Delir bei geriatrischer Patientin",
    "specialty": "Geriatrie",
    "category": "Geriatrie",
    "difficulty": "C1",
    "patientName": "Frau Erna Schwab",
    "patientAge": 88,
    "chiefComplaint": "Fremdanamnese durch den Sohn: Meine Mutter ist seit gestern ganz verwirrt, erkennt mich manchmal nicht und will nicht mehr trinken. Das kennen wir so gar nicht von ihr.",
    "patient": {
      "name": "Frau Erna Schwab",
      "age": 88,
      "gender": "w",
      "occupation": "Rentnerin",
      "chiefComplaint": "Fremdanamnese durch den Sohn: Meine Mutter ist seit gestern ganz verwirrt, erkennt mich manchmal nicht und will nicht mehr trinken. Das kennen wir so gar nicht von ihr.",
      "vitalSigns": {
        "bp": "90/55 mmHg",
        "hr": "112 /min",
        "temp": "38,7 °C",
        "spo2": "94 % (Raumluft)"
      },
      "historyDetails": "Seit ca. 24 Stunden akute Verwirrtheit, Unruhe, nächtliches Umherlaufen, verminderte Trinkmenge, übelriechender Urin. Vorher kognitiv leicht eingeschränkt, aber im Alltag mit Hilfe selbstständig. Vorerkrankungen: Leichte kognitive Störung, Harninkontinenz (Dranginkontinenz), Arterielle Hypertonie, Osteoporose mit Z. n. Wirbelkörperfraktur. Medikation: Oxybutynin 5 mg 1-0-1, Amlodipin 5 mg 1-0-0, Alendronsäure 70 mg 1x wöchentlich, Colecalciferol 1.000 IE 1-0-0. Allergien: Penicillin (Atemnot). Sozialanamnese: Lebt allein, Pflegedienst 2x täglich, Sohn wohnt in der Nähe. Pflegegrad 2. Patientenverfügung vorhanden. Familienanamnese: Nicht relevant. Körperliche Untersuchung: Desorientiert zu Zeit und Ort, Aufmerksamkeitsstörung (CAM positiv). Trockene Schleimhäute. Suprapubischer Druckschmerz. Kein Meningismus, keine fokalen Defizite. Labor: Leukozyten: 18,4 /nl (erhöht), CRP: 168 mg/l (erhöht), Laktat: 2,9 mmol/l (erhöht), Natrium: 131 mmol/l (erniedrigt), Kreatinin: 1,7 mg/dl (erhöht), Urinstatus: Leukozyten +++, Nitrit positiv."
    },
    "anamneseQuestions": [
      {
        "id": "urosepsis-delir-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Frau Erna Schwab, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Urosepsis bei Harnwegsinfekt mit hyperaktivem Delir (qSOFA 2) vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Fremdanamnese durch den Sohn: Meine Mutter ist seit gestern ganz verwirrt, erkennt mich manchmal nicht und will nicht mehr trinken. Das kennen wir so gar nicht von ihr."
      },
      {
        "id": "urosepsis-delir-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Leichte kognitive Störung, Harninkontinenz (Dranginkontinenz), Arterielle Hypertonie, Osteoporose mit Z. n. Wirbelkörperfraktur. Meine Medikamente sind: Oxybutynin 5 mg 1-0-1, Amlodipin 5 mg 1-0-0, Alendronsäure 70 mg 1x wöchentlich, Colecalciferol 1.000 IE 1-0-0."
      },
      {
        "id": "urosepsis-delir-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Penicillin (Atemnot). Zu meinem Alltag: Lebt allein, Pflegedienst 2x täglich, Sohn wohnt in der Nähe. Pflegegrad 2. Patientenverfügung vorhanden. In der Familie: Nicht relevant."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Frau Erna Schwab (88 J.) mit Verdacht auf Urosepsis bei Harnwegsinfekt mit hyperaktivem Delir (qSOFA 2) im C1-Fachstil.",
      "requiredTerms": [
        "Urosepsis bei Harnwegsinfekt mit hyperaktivem Delir (qSOFA 2)",
        "Leichte",
        "Apoplex",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Frau Erna Schwab (88 J., Rentnerin) stellte sich mit folgender aktueller Anamnese vor: Seit ca. 24 Stunden akute Verwirrtheit, Unruhe, nächtliches Umherlaufen, verminderte Trinkmenge, übelriechender Urin. Vorher kognitiv leicht eingeschränkt, aber im Alltag mit Hilfe selbstständig. An Vorerkrankungen seien bekannt: Leichte kognitive Störung, Harninkontinenz (Dranginkontinenz), Arterielle Hypertonie, Osteoporose mit Z. n. Wirbelkörperfraktur. Die Dauermedikation umfasse: Oxybutynin 5 mg 1-0-1, Amlodipin 5 mg 1-0-0, Alendronsäure 70 mg 1x wöchentlich, Colecalciferol 1.000 IE 1-0-0. Allergien: Penicillin (Atemnot). Sozial- und Familienanamnese: Lebt allein, Pflegedienst 2x täglich, Sohn wohnt in der Nähe. Pflegegrad 2. Patientenverfügung vorhanden. Nicht relevant. Klinische Untersuchung: Desorientiert zu Zeit und Ort, Aufmerksamkeitsstörung (CAM positiv). Trockene Schleimhäute. Suprapubischer Druckschmerz. Kein Meningismus, keine fokalen Defizite. Zusammenfassend ergibt sich der dringende Verdacht auf: Urosepsis bei Harnwegsinfekt mit hyperaktivem Delir (qSOFA 2) (Differenzialdiagnosen: Apoplex, Pneumonie, Hyponatriämie)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Frau Erna Schwab, 88 Jahre alt, aktuell in der Aufnahme (Geriatrie)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Seit ca. 24 Stunden akute Verwirrtheit, Unruhe, nächtliches Umherlaufen, verminderte Trinkmenge, übelriechender Urin. Vorher kognitiv leicht eingeschränkt, aber im Alltag mit Hilfe selbstständig. Es besteht der dringende Verdacht auf Urosepsis bei Harnwegsinfekt mit hyperaktivem Delir (qSOFA 2)."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Leichte kognitive Störung, Harninkontinenz (Dranginkontinenz), Arterielle Hypertonie, Osteoporose mit Z. n. Wirbelkörperfraktur. Medikation: Oxybutynin 5 mg 1-0-1, Amlodipin 5 mg 1-0-0, Alendronsäure 70 mg 1x wöchentlich, Colecalciferol 1.000 IE 1-0-0. Allergien: Penicillin (Atemnot)."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 90/55 mmHg, HF 112 /min, Temp 38,7 °C, SpO₂ 94 % (Raumluft). Desorientiert zu Zeit und Ort, Aufmerksamkeitsstörung (CAM positiv). Trockene Schleimhäute. Suprapubischer Druckschmerz. Kein Meningismus, keine fokalen Defizite. Labor: Leukozyten: 18,4 /nl (erhöht), CRP: 168 mg/l (erhöht), Laktat: 2,9 mmol/l (erhöht), Natrium: 131 mmol/l (erniedrigt), Kreatinin: 1,7 mg/dl (erhöht), Urinstatus: Leukozyten +++, Nitrit positiv"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Urosepsis bei Harnwegsinfekt mit hyperaktivem Delir (qSOFA 2) sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Apoplex, Pneumonie, Hyponatriämie)."
      }
    ]
  },
  {
    "id": "schenkelhalsfraktur",
    "title": "Mediale Schenkelhalsfraktur nach Sturz",
    "specialty": "Unfallchirurgie",
    "category": "Unfallchirurgie",
    "difficulty": "B2",
    "patientName": "Frau Margarete Lorenz",
    "patientAge": 83,
    "chiefComplaint": "Ich bin nachts auf dem Weg zum Klo über den Teppich gestolpert und auf die linke Hüfte gefallen. Jetzt kann ich gar nicht mehr auftreten, das tut so weh.",
    "patient": {
      "name": "Frau Margarete Lorenz",
      "age": 83,
      "gender": "w",
      "occupation": "Rentnerin",
      "chiefComplaint": "Ich bin nachts auf dem Weg zum Klo über den Teppich gestolpert und auf die linke Hüfte gefallen. Jetzt kann ich gar nicht mehr auftreten, das tut so weh.",
      "vitalSigns": {
        "bp": "150/80 mmHg",
        "hr": "88 /min",
        "temp": "36,5 °C",
        "spo2": "96 % (Raumluft)"
      },
      "historyDetails": "Heute Nacht gegen 3 Uhr Sturz auf die linke Hüfte beim Gang zur Toilette (Stolpern, kein Schwindel, kein Bewusstseinsverlust). Seitdem Schmerzen in der linken Leiste, Gehunfähigkeit. Lag ca. 4 Stunden am Boden, bis die Nachbarin kam. Vorerkrankungen: Osteoporose, Vorhofflimmern, Arterielle Hypertonie, Katarakt beidseits. Medikation: Rivaroxaban 15 mg 0-0-1 (letzte Einnahme gestern 18 Uhr), Bisoprolol 2,5 mg 1-0-0, Ramipril 5 mg 1-0-0, Zopiclon 7,5 mg 0-0-1. Allergien: Keine bekannt. Sozialanamnese: Lebt allein in einer Wohnung im 2. Stock ohne Aufzug. Bisher mit Gehstock mobil. Familienanamnese: Nicht relevant. Körperliche Untersuchung: Linkes Bein verkürzt und außenrotiert. Leistendruckschmerz, Stauchungsschmerz, schmerzhafte Bewegungseinschränkung der Hüfte. pDMS intakt. Labor: Hb: 11,8 g/dl, CK: 1.450 U/l (erhöht, Liegetrauma), Kreatinin: 1,2 mg/dl, INR: 1,4."
    },
    "anamneseQuestions": [
      {
        "id": "schenkelhalsfraktur-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Frau Margarete Lorenz, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Dislozierte mediale Schenkelhalsfraktur links (Garden IV) vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Ich bin nachts auf dem Weg zum Klo über den Teppich gestolpert und auf die linke Hüfte gefallen. Jetzt kann ich gar nicht mehr auftreten, das tut so weh."
      },
      {
        "id": "schenkelhalsfraktur-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Osteoporose, Vorhofflimmern, Arterielle Hypertonie, Katarakt beidseits. Meine Medikamente sind: Rivaroxaban 15 mg 0-0-1 (letzte Einnahme gestern 18 Uhr), Bisoprolol 2,5 mg 1-0-0, Ramipril 5 mg 1-0-0, Zopiclon 7,5 mg 0-0-1."
      },
      {
        "id": "schenkelhalsfraktur-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Keine bekannt. Zu meinem Alltag: Lebt allein in einer Wohnung im 2. Stock ohne Aufzug. Bisher mit Gehstock mobil. In der Familie: Nicht relevant."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Frau Margarete Lorenz (83 J.) mit Verdacht auf Dislozierte mediale Schenkelhalsfraktur links (Garden IV) im C1-Fachstil.",
      "requiredTerms": [
        "Dislozierte mediale Schenkelhalsfraktur links (Garden IV)",
        "Osteoporose",
        "Pertrochantäre Femurfraktur",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Frau Margarete Lorenz (83 J., Rentnerin) stellte sich mit folgender aktueller Anamnese vor: Heute Nacht gegen 3 Uhr Sturz auf die linke Hüfte beim Gang zur Toilette (Stolpern, kein Schwindel, kein Bewusstseinsverlust). Seitdem Schmerzen in der linken Leiste, Gehunfähigkeit. Lag ca. 4 Stunden am Boden, bis die Nachbarin kam. An Vorerkrankungen seien bekannt: Osteoporose, Vorhofflimmern, Arterielle Hypertonie, Katarakt beidseits. Die Dauermedikation umfasse: Rivaroxaban 15 mg 0-0-1 (letzte Einnahme gestern 18 Uhr), Bisoprolol 2,5 mg 1-0-0, Ramipril 5 mg 1-0-0, Zopiclon 7,5 mg 0-0-1. Allergien: Keine bekannt. Sozial- und Familienanamnese: Lebt allein in einer Wohnung im 2. Stock ohne Aufzug. Bisher mit Gehstock mobil. Nicht relevant. Klinische Untersuchung: Linkes Bein verkürzt und außenrotiert. Leistendruckschmerz, Stauchungsschmerz, schmerzhafte Bewegungseinschränkung der Hüfte. pDMS intakt. Zusammenfassend ergibt sich der dringende Verdacht auf: Dislozierte mediale Schenkelhalsfraktur links (Garden IV) (Differenzialdiagnosen: Pertrochantäre Femurfraktur, Beckenringfraktur, Hüftprellung)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Frau Margarete Lorenz, 83 Jahre alt, aktuell in der Aufnahme (Unfallchirurgie)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Heute Nacht gegen 3 Uhr Sturz auf die linke Hüfte beim Gang zur Toilette (Stolpern, kein Schwindel, kein Bewusstseinsverlust). Seitdem Schmerzen in der linken Leiste, Gehunfähigkeit. Lag ca. 4 Stunden am Boden, bis die Nachbarin kam. Es besteht der dringende Verdacht auf Dislozierte mediale Schenkelhalsfraktur links (Garden IV)."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Osteoporose, Vorhofflimmern, Arterielle Hypertonie, Katarakt beidseits. Medikation: Rivaroxaban 15 mg 0-0-1 (letzte Einnahme gestern 18 Uhr), Bisoprolol 2,5 mg 1-0-0, Ramipril 5 mg 1-0-0, Zopiclon 7,5 mg 0-0-1. Allergien: Keine bekannt."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 150/80 mmHg, HF 88 /min, Temp 36,5 °C, SpO₂ 96 % (Raumluft). Linkes Bein verkürzt und außenrotiert. Leistendruckschmerz, Stauchungsschmerz, schmerzhafte Bewegungseinschränkung der Hüfte. pDMS intakt. Labor: Hb: 11,8 g/dl, CK: 1.450 U/l (erhöht, Liegetrauma), Kreatinin: 1,2 mg/dl, INR: 1,4"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Dislozierte mediale Schenkelhalsfraktur links (Garden IV) sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Pertrochantäre Femurfraktur, Beckenringfraktur, Hüftprellung)."
      }
    ]
  },
  {
    "id": "distale-radiusfraktur",
    "title": "Distale Radiusfraktur (Colles-Fraktur)",
    "specialty": "Unfallchirurgie",
    "category": "Unfallchirurgie",
    "difficulty": "B1",
    "patientName": "Frau Christa Busch",
    "patientAge": 67,
    "chiefComplaint": "Ich bin auf dem glatten Gehweg ausgerutscht und hab mich mit der rechten Hand abgefangen. Jetzt ist das Handgelenk ganz schief und dick.",
    "patient": {
      "name": "Frau Christa Busch",
      "age": 67,
      "gender": "w",
      "occupation": "Rentnerin",
      "chiefComplaint": "Ich bin auf dem glatten Gehweg ausgerutscht und hab mich mit der rechten Hand abgefangen. Jetzt ist das Handgelenk ganz schief und dick.",
      "vitalSigns": {
        "bp": "140/85 mmHg",
        "hr": "86 /min",
        "temp": "36,7 °C",
        "spo2": "98 % (Raumluft)"
      },
      "historyDetails": "Vor ca. 1 Stunde Sturz auf die ausgestreckte rechte Hand bei Glätte. Seitdem starke Schmerzen, Schwellung und Fehlstellung des rechten Handgelenks. Kein Kopfanprall. Kribbeln in den Fingern. Vorerkrankungen: Postmenopausale Osteoporose (unbehandelt), Hypothyreose. Medikation: L-Thyroxin 100 µg 1-0-0. Allergien: Keine bekannt. Sozialanamnese: Rechtshänderin. Lebt mit Ehemann. Nichtraucherin. Familienanamnese: Mutter hatte Schenkelhalsfraktur. Körperliche Untersuchung: Fourchette-(Bajonett-)Fehlstellung des rechten Handgelenks, Schwellung, Druckschmerz über dem distalen Radius. Tabatière nicht druckschmerzhaft. pDMS: Sensibilität N. medianus leicht vermindert. Labor: Kalzium: 2,3 mmol/l, 25-OH-Vitamin D: 14 ng/ml (erniedrigt)."
    },
    "anamneseQuestions": [
      {
        "id": "distale-radiusfraktur-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Frau Christa Busch, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Distale Radiusextensionsfraktur rechts (Colles-Fraktur, AO 23-A2) vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Ich bin auf dem glatten Gehweg ausgerutscht und hab mich mit der rechten Hand abgefangen. Jetzt ist das Handgelenk ganz schief und dick."
      },
      {
        "id": "distale-radiusfraktur-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Postmenopausale Osteoporose (unbehandelt), Hypothyreose. Meine Medikamente sind: L-Thyroxin 100 µg 1-0-0."
      },
      {
        "id": "distale-radiusfraktur-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Keine bekannt. Zu meinem Alltag: Rechtshänderin. Lebt mit Ehemann. Nichtraucherin. In der Familie: Mutter hatte Schenkelhalsfraktur."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Frau Christa Busch (67 J.) mit Verdacht auf Distale Radiusextensionsfraktur rechts (Colles-Fraktur, AO 23-A2) im C1-Fachstil.",
      "requiredTerms": [
        "Distale Radiusextensionsfraktur rechts (Colles-Fraktur, AO 23-A2)",
        "Postmenopausale",
        "Skaphoidfraktur",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Frau Christa Busch (67 J., Rentnerin) stellte sich mit folgender aktueller Anamnese vor: Vor ca. 1 Stunde Sturz auf die ausgestreckte rechte Hand bei Glätte. Seitdem starke Schmerzen, Schwellung und Fehlstellung des rechten Handgelenks. Kein Kopfanprall. Kribbeln in den Fingern. An Vorerkrankungen seien bekannt: Postmenopausale Osteoporose (unbehandelt), Hypothyreose. Die Dauermedikation umfasse: L-Thyroxin 100 µg 1-0-0. Allergien: Keine bekannt. Sozial- und Familienanamnese: Rechtshänderin. Lebt mit Ehemann. Nichtraucherin. Mutter hatte Schenkelhalsfraktur. Klinische Untersuchung: Fourchette-(Bajonett-)Fehlstellung des rechten Handgelenks, Schwellung, Druckschmerz über dem distalen Radius. Tabatière nicht druckschmerzhaft. pDMS: Sensibilität N. medianus leicht vermindert. Zusammenfassend ergibt sich der dringende Verdacht auf: Distale Radiusextensionsfraktur rechts (Colles-Fraktur, AO 23-A2) (Differenzialdiagnosen: Skaphoidfraktur, Distorsion des Handgelenks, Smith-Fraktur)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Frau Christa Busch, 67 Jahre alt, aktuell in der Aufnahme (Unfallchirurgie)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Vor ca. 1 Stunde Sturz auf die ausgestreckte rechte Hand bei Glätte. Seitdem starke Schmerzen, Schwellung und Fehlstellung des rechten Handgelenks. Kein Kopfanprall. Kribbeln in den Fingern. Es besteht der dringende Verdacht auf Distale Radiusextensionsfraktur rechts (Colles-Fraktur, AO 23-A2)."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Postmenopausale Osteoporose (unbehandelt), Hypothyreose. Medikation: L-Thyroxin 100 µg 1-0-0. Allergien: Keine bekannt."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 140/85 mmHg, HF 86 /min, Temp 36,7 °C, SpO₂ 98 % (Raumluft). Fourchette-(Bajonett-)Fehlstellung des rechten Handgelenks, Schwellung, Druckschmerz über dem distalen Radius. Tabatière nicht druckschmerzhaft. pDMS: Sensibilität N. medianus leicht vermindert. Labor: Kalzium: 2,3 mmol/l, 25-OH-Vitamin D: 14 ng/ml (erniedrigt)"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Distale Radiusextensionsfraktur rechts (Colles-Fraktur, AO 23-A2) sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Skaphoidfraktur, Distorsion des Handgelenks, Smith-Fraktur)."
      }
    ]
  },
  {
    "id": "akuter-gichtanfall",
    "title": "Akuter Gichtanfall (Podagra)",
    "specialty": "Rheumatologie",
    "category": "Rheumatologie",
    "difficulty": "B1",
    "patientName": "Herr Uwe Krämer",
    "patientAge": 52,
    "chiefComplaint": "Heute Nacht bin ich aufgewacht, weil mein großer Zeh so höllisch wehgetan hat. Nicht mal die Bettdecke konnte ich drauf ertragen. Der ist knallrot und dick.",
    "patient": {
      "name": "Herr Uwe Krämer",
      "age": 52,
      "gender": "m",
      "occupation": "Metzgermeister",
      "chiefComplaint": "Heute Nacht bin ich aufgewacht, weil mein großer Zeh so höllisch wehgetan hat. Nicht mal die Bettdecke konnte ich drauf ertragen. Der ist knallrot und dick.",
      "vitalSigns": {
        "bp": "150/95 mmHg",
        "hr": "84 /min",
        "temp": "37,6 °C",
        "spo2": "98 % (Raumluft)"
      },
      "historyDetails": "Seit heute Nacht akut einsetzende, stärkste Schmerzen im rechten Großzehengrundgelenk mit Rötung, Schwellung und Überwärmung. Am Vorabend Grillfeier mit viel Fleisch und Bier. Vorerkrankungen: Arterielle Hypertonie, Adipositas (BMI 33), Hyperurikämie (bisher unbehandelt). Medikation: Hydrochlorothiazid 25 mg 1-0-0. Allergien: Keine bekannt. Sozialanamnese: Alkohol ca. 3 Bier/Tag. Nichtraucher. Verheiratet. Familienanamnese: Vater hatte Gicht. Körperliche Untersuchung: Großzehengrundgelenk rechts gerötet, geschwollen, überwärmt, extrem berührungsempfindlich. Keine Wunde. Labor: Harnsäure: 9,6 mg/dl (erhöht), CRP: 34 mg/l (erhöht), Leukozyten: 10,8 /nl, Kreatinin: 1,2 mg/dl."
    },
    "anamneseQuestions": [
      {
        "id": "akuter-gichtanfall-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Herr Uwe Krämer, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Akute Gichtarthritis des Großzehengrundgelenks rechts (Podagra) vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Heute Nacht bin ich aufgewacht, weil mein großer Zeh so höllisch wehgetan hat. Nicht mal die Bettdecke konnte ich drauf ertragen. Der ist knallrot und dick."
      },
      {
        "id": "akuter-gichtanfall-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Arterielle Hypertonie, Adipositas (BMI 33), Hyperurikämie (bisher unbehandelt). Meine Medikamente sind: Hydrochlorothiazid 25 mg 1-0-0."
      },
      {
        "id": "akuter-gichtanfall-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Keine bekannt. Zu meinem Alltag: Alkohol ca. 3 Bier/Tag. Nichtraucher. Verheiratet. In der Familie: Vater hatte Gicht."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Herr Uwe Krämer (52 J.) mit Verdacht auf Akute Gichtarthritis des Großzehengrundgelenks rechts (Podagra) im C1-Fachstil.",
      "requiredTerms": [
        "Akute Gichtarthritis des Großzehengrundgelenks rechts (Podagra)",
        "Arterielle",
        "Septische Arthritis",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Herr Uwe Krämer (52 J., Metzgermeister) stellte sich mit folgender aktueller Anamnese vor: Seit heute Nacht akut einsetzende, stärkste Schmerzen im rechten Großzehengrundgelenk mit Rötung, Schwellung und Überwärmung. Am Vorabend Grillfeier mit viel Fleisch und Bier. An Vorerkrankungen seien bekannt: Arterielle Hypertonie, Adipositas (BMI 33), Hyperurikämie (bisher unbehandelt). Die Dauermedikation umfasse: Hydrochlorothiazid 25 mg 1-0-0. Allergien: Keine bekannt. Sozial- und Familienanamnese: Alkohol ca. 3 Bier/Tag. Nichtraucher. Verheiratet. Vater hatte Gicht. Klinische Untersuchung: Großzehengrundgelenk rechts gerötet, geschwollen, überwärmt, extrem berührungsempfindlich. Keine Wunde. Zusammenfassend ergibt sich der dringende Verdacht auf: Akute Gichtarthritis des Großzehengrundgelenks rechts (Podagra) (Differenzialdiagnosen: Septische Arthritis, Aktivierte Arthrose (Hallux rigidus), Pseudogicht (CPPD))."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Herr Uwe Krämer, 52 Jahre alt, aktuell in der Aufnahme (Rheumatologie)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Seit heute Nacht akut einsetzende, stärkste Schmerzen im rechten Großzehengrundgelenk mit Rötung, Schwellung und Überwärmung. Am Vorabend Grillfeier mit viel Fleisch und Bier. Es besteht der dringende Verdacht auf Akute Gichtarthritis des Großzehengrundgelenks rechts (Podagra)."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Arterielle Hypertonie, Adipositas (BMI 33), Hyperurikämie (bisher unbehandelt). Medikation: Hydrochlorothiazid 25 mg 1-0-0. Allergien: Keine bekannt."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 150/95 mmHg, HF 84 /min, Temp 37,6 °C, SpO₂ 98 % (Raumluft). Großzehengrundgelenk rechts gerötet, geschwollen, überwärmt, extrem berührungsempfindlich. Keine Wunde. Labor: Harnsäure: 9,6 mg/dl (erhöht), CRP: 34 mg/l (erhöht), Leukozyten: 10,8 /nl, Kreatinin: 1,2 mg/dl"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Akute Gichtarthritis des Großzehengrundgelenks rechts (Podagra) sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Septische Arthritis, Aktivierte Arthrose (Hallux rigidus), Pseudogicht (CPPD))."
      }
    ]
  },
  {
    "id": "erysipel",
    "title": "Erysipel des Unterschenkels",
    "specialty": "Dermatologie",
    "category": "Dermatologie",
    "difficulty": "B1",
    "patientName": "Frau Ursula Peters",
    "patientAge": 71,
    "chiefComplaint": "Mein linkes Bein ist seit gestern ganz rot, heiß und dick, und die Rötung wird immer größer. Heute Nacht hatte ich Schüttelfrost.",
    "patient": {
      "name": "Frau Ursula Peters",
      "age": 71,
      "gender": "w",
      "occupation": "Rentnerin",
      "chiefComplaint": "Mein linkes Bein ist seit gestern ganz rot, heiß und dick, und die Rötung wird immer größer. Heute Nacht hatte ich Schüttelfrost.",
      "vitalSigns": {
        "bp": "135/80 mmHg",
        "hr": "100 /min",
        "temp": "38,9 °C",
        "spo2": "97 % (Raumluft)"
      },
      "historyDetails": "Seit ca. 36 Stunden scharf begrenzte, zungenförmig ausgreifende Rötung am linken Unterschenkel mit Überwärmung, Schwellung und Spannungsschmerz. Fieber mit Schüttelfrost seit der Nacht. Fußpilz zwischen den Zehen seit Monaten. Vorerkrankungen: Diabetes mellitus Typ 2, Chronisch-venöse Insuffizienz, Z. n. Erysipel rechts 2021. Medikation: Metformin 1000 mg 1-0-1, Sitagliptin 100 mg 1-0-0. Allergien: Keine bekannt. Sozialanamnese: Lebt mit Ehemann. Nichtraucherin. Adipositas. Familienanamnese: Unauffällig. Körperliche Untersuchung: Scharf begrenztes, flammenförmiges Erythem am linken Unterschenkel (Markierung der Grenzen erfolgt), überwärmt, druckschmerzhaft. Mazeration interdigital 4/5 links. Leistenlymphknoten links vergrößert. Labor: Leukozyten: 14,6 /nl (erhöht), CRP: 152 mg/l (erhöht), Blutzucker: 238 mg/dl (erhöht), Kreatinin: 0,9 mg/dl."
    },
    "anamneseQuestions": [
      {
        "id": "erysipel-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Frau Ursula Peters, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Erysipel des linken Unterschenkels, Eintrittspforte Interdigitalmykose vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Mein linkes Bein ist seit gestern ganz rot, heiß und dick, und die Rötung wird immer größer. Heute Nacht hatte ich Schüttelfrost."
      },
      {
        "id": "erysipel-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Diabetes mellitus Typ 2, Chronisch-venöse Insuffizienz, Z. n. Erysipel rechts 2021. Meine Medikamente sind: Metformin 1000 mg 1-0-1, Sitagliptin 100 mg 1-0-0."
      },
      {
        "id": "erysipel-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Keine bekannt. Zu meinem Alltag: Lebt mit Ehemann. Nichtraucherin. Adipositas. In der Familie: Unauffällig."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Frau Ursula Peters (71 J.) mit Verdacht auf Erysipel des linken Unterschenkels, Eintrittspforte Interdigitalmykose im C1-Fachstil.",
      "requiredTerms": [
        "Erysipel des linken Unterschenkels, Eintrittspforte Interdigitalmykose",
        "Diabetes",
        "Tiefe Beinvenenthrombose",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Frau Ursula Peters (71 J., Rentnerin) stellte sich mit folgender aktueller Anamnese vor: Seit ca. 36 Stunden scharf begrenzte, zungenförmig ausgreifende Rötung am linken Unterschenkel mit Überwärmung, Schwellung und Spannungsschmerz. Fieber mit Schüttelfrost seit der Nacht. Fußpilz zwischen den Zehen seit Monaten. An Vorerkrankungen seien bekannt: Diabetes mellitus Typ 2, Chronisch-venöse Insuffizienz, Z. n. Erysipel rechts 2021. Die Dauermedikation umfasse: Metformin 1000 mg 1-0-1, Sitagliptin 100 mg 1-0-0. Allergien: Keine bekannt. Sozial- und Familienanamnese: Lebt mit Ehemann. Nichtraucherin. Adipositas. Unauffällig. Klinische Untersuchung: Scharf begrenztes, flammenförmiges Erythem am linken Unterschenkel (Markierung der Grenzen erfolgt), überwärmt, druckschmerzhaft. Mazeration interdigital 4/5 links. Leistenlymphknoten links vergrößert. Zusammenfassend ergibt sich der dringende Verdacht auf: Erysipel des linken Unterschenkels, Eintrittspforte Interdigitalmykose (Differenzialdiagnosen: Tiefe Beinvenenthrombose, Phlegmone, Nekrotisierende Fasziitis)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Frau Ursula Peters, 71 Jahre alt, aktuell in der Aufnahme (Dermatologie)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Seit ca. 36 Stunden scharf begrenzte, zungenförmig ausgreifende Rötung am linken Unterschenkel mit Überwärmung, Schwellung und Spannungsschmerz. Fieber mit Schüttelfrost seit der Nacht. Fußpilz zwischen den Zehen seit Monaten. Es besteht der dringende Verdacht auf Erysipel des linken Unterschenkels, Eintrittspforte Interdigitalmykose."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Diabetes mellitus Typ 2, Chronisch-venöse Insuffizienz, Z. n. Erysipel rechts 2021. Medikation: Metformin 1000 mg 1-0-1, Sitagliptin 100 mg 1-0-0. Allergien: Keine bekannt."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 135/80 mmHg, HF 100 /min, Temp 38,9 °C, SpO₂ 97 % (Raumluft). Scharf begrenztes, flammenförmiges Erythem am linken Unterschenkel (Markierung der Grenzen erfolgt), überwärmt, druckschmerzhaft. Mazeration interdigital 4/5 links. Leistenlymphknoten links vergrößert. Labor: Leukozyten: 14,6 /nl (erhöht), CRP: 152 mg/l (erhöht), Blutzucker: 238 mg/dl (erhöht), Kreatinin: 0,9 mg/dl"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Erysipel des linken Unterschenkels, Eintrittspforte Interdigitalmykose sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Tiefe Beinvenenthrombose, Phlegmone, Nekrotisierende Fasziitis)."
      }
    ]
  },
  {
    "id": "anaphylaxie",
    "title": "Anaphylaxie nach Wespenstich",
    "specialty": "Notfallmedizin",
    "category": "Notfallmedizin",
    "difficulty": "B2",
    "patientName": "Herr Markus Engel",
    "patientAge": 36,
    "chiefComplaint": "Mich hat beim Heckenschneiden eine Wespe in den Hals gestochen. Danach hat's überall gejuckt, ich hab Quaddeln gekriegt, und jetzt wird mein Hals so eng.",
    "patient": {
      "name": "Herr Markus Engel",
      "age": 36,
      "gender": "m",
      "occupation": "Gärtner",
      "chiefComplaint": "Mich hat beim Heckenschneiden eine Wespe in den Hals gestochen. Danach hat's überall gejuckt, ich hab Quaddeln gekriegt, und jetzt wird mein Hals so eng.",
      "vitalSigns": {
        "bp": "80/50 mmHg",
        "hr": "128 /min",
        "temp": "36,8 °C",
        "spo2": "91 % (Raumluft)"
      },
      "historyDetails": "Vor ca. 20 Minuten Wespenstich am Hals. Innerhalb von Minuten generalisierter Juckreiz, Urtikaria, Schwellung der Lippen, Engegefühl im Hals, Heiserkeit, Atemnot, Schwindel. Vorerkrankungen: Im letzten Sommer ausgeprägte Lokalreaktion nach Wespenstich. Medikation: Metoprolol 47,5 mg 1-0-0 (wegen Extrasystolen). Allergien: Wespengift (vermutet, nie getestet). Sozialanamnese: Nichtraucher. Verheiratet. Arbeitet im Freien. Familienanamnese: Unauffällig. Körperliche Untersuchung: Generalisierte Urtikaria, Lippen- und Lidödem, inspiratorischer Stridor, exspiratorisches Giemen. Haut kalt, Rekapillarisierung verlängert. Labor: Tryptase: 28 µg/l (erhöht, Abnahme 1 h nach Ereignis)."
    },
    "anamneseQuestions": [
      {
        "id": "anaphylaxie-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Herr Markus Engel, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Anaphylaxie Grad III nach Ring und Messmer bei Wespengiftallergie vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Mich hat beim Heckenschneiden eine Wespe in den Hals gestochen. Danach hat's überall gejuckt, ich hab Quaddeln gekriegt, und jetzt wird mein Hals so eng."
      },
      {
        "id": "anaphylaxie-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Im letzten Sommer ausgeprägte Lokalreaktion nach Wespenstich. Meine Medikamente sind: Metoprolol 47,5 mg 1-0-0 (wegen Extrasystolen)."
      },
      {
        "id": "anaphylaxie-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Wespengift (vermutet, nie getestet). Zu meinem Alltag: Nichtraucher. Verheiratet. Arbeitet im Freien. In der Familie: Unauffällig."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Herr Markus Engel (36 J.) mit Verdacht auf Anaphylaxie Grad III nach Ring und Messmer bei Wespengiftallergie im C1-Fachstil.",
      "requiredTerms": [
        "Anaphylaxie Grad III nach Ring und Messmer bei Wespengiftallergie",
        "Im",
        "Hereditäres Angioödem",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Herr Markus Engel (36 J., Gärtner) stellte sich mit folgender aktueller Anamnese vor: Vor ca. 20 Minuten Wespenstich am Hals. Innerhalb von Minuten generalisierter Juckreiz, Urtikaria, Schwellung der Lippen, Engegefühl im Hals, Heiserkeit, Atemnot, Schwindel. An Vorerkrankungen seien bekannt: Im letzten Sommer ausgeprägte Lokalreaktion nach Wespenstich. Die Dauermedikation umfasse: Metoprolol 47,5 mg 1-0-0 (wegen Extrasystolen). Allergien: Wespengift (vermutet, nie getestet). Sozial- und Familienanamnese: Nichtraucher. Verheiratet. Arbeitet im Freien. Unauffällig. Klinische Untersuchung: Generalisierte Urtikaria, Lippen- und Lidödem, inspiratorischer Stridor, exspiratorisches Giemen. Haut kalt, Rekapillarisierung verlängert. Zusammenfassend ergibt sich der dringende Verdacht auf: Anaphylaxie Grad III nach Ring und Messmer bei Wespengiftallergie (Differenzialdiagnosen: Hereditäres Angioödem, Lokale Stichreaktion, Asthmaanfall)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Herr Markus Engel, 36 Jahre alt, aktuell in der Aufnahme (Notfallmedizin)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Vor ca. 20 Minuten Wespenstich am Hals. Innerhalb von Minuten generalisierter Juckreiz, Urtikaria, Schwellung der Lippen, Engegefühl im Hals, Heiserkeit, Atemnot, Schwindel. Es besteht der dringende Verdacht auf Anaphylaxie Grad III nach Ring und Messmer bei Wespengiftallergie."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Im letzten Sommer ausgeprägte Lokalreaktion nach Wespenstich. Medikation: Metoprolol 47,5 mg 1-0-0 (wegen Extrasystolen). Allergien: Wespengift (vermutet, nie getestet)."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 80/50 mmHg, HF 128 /min, Temp 36,8 °C, SpO₂ 91 % (Raumluft). Generalisierte Urtikaria, Lippen- und Lidödem, inspiratorischer Stridor, exspiratorisches Giemen. Haut kalt, Rekapillarisierung verlängert. Labor: Tryptase: 28 µg/l (erhöht, Abnahme 1 h nach Ereignis)"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Anaphylaxie Grad III nach Ring und Messmer bei Wespengiftallergie sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Hereditäres Angioödem, Lokale Stichreaktion, Asthmaanfall)."
      }
    ]
  },
  {
    "id": "extrauteringraviditaet",
    "title": "Extrauteringravidität (Tubargravidität)",
    "specialty": "Gynäkologie",
    "category": "Gynäkologie",
    "difficulty": "C1",
    "patientName": "Frau Sarah Wolff",
    "patientAge": 29,
    "chiefComplaint": "Ich hab seit heute Morgen starke Schmerzen links im Unterbauch und ein bisschen Schmierblutung. Meine Periode ist eigentlich zwei Wochen überfällig.",
    "patient": {
      "name": "Frau Sarah Wolff",
      "age": 29,
      "gender": "w",
      "occupation": "Bankkauffrau",
      "chiefComplaint": "Ich hab seit heute Morgen starke Schmerzen links im Unterbauch und ein bisschen Schmierblutung. Meine Periode ist eigentlich zwei Wochen überfällig.",
      "vitalSigns": {
        "bp": "100/60 mmHg",
        "hr": "110 /min",
        "temp": "36,9 °C",
        "spo2": "98 % (Raumluft)"
      },
      "historyDetails": "Seit ca. 6 Stunden zunehmende, einseitige Unterbauchschmerzen links, vaginale Schmierblutung, Schwindel, Schulterschmerz rechts beim Liegen. Letzte Regelblutung vor 6 Wochen, sonst regelmäßiger Zyklus. Vorerkrankungen: Z. n. Chlamydien-Infektion mit Adnexitis 2019, Kinderwunsch. Medikation: Folsäure 0,4 mg 1-0-0. Allergien: Keine bekannt. Sozialanamnese: Nichtraucherin. Verheiratet. Gravida 1, Para 0. Familienanamnese: Unauffällig. Körperliche Untersuchung: Abdomen: Druckschmerz im linken Unterbauch mit Abwehrspannung. Portioschiebeschmerz. Vaginalsonografie: leeres Cavum uteri, freie Flüssigkeit im Douglas-Raum. Labor: β-HCG: 2.400 IU/l (positiv), Hb: 10,4 g/dl (erniedrigt), Blutgruppe: A Rh negativ."
    },
    "anamneseQuestions": [
      {
        "id": "extrauteringraviditaet-q1",
        "phase": "Aktuelle Beschwerden & Leitsymptom",
        "doctorOptions": [
          {
            "text": "Guten Tag Frau Sarah Wolff, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
            "isOptimal": true,
            "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."
          },
          {
            "text": "Liegt bei Ihnen klinisch die Symptomatik für Tubargravidität links (7. SSW) mit beginnender intraabdominaler Blutung vor?",
            "isOptimal": false,
            "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."
          }
        ],
        "patientResponse": "Ich hab seit heute Morgen starke Schmerzen links im Unterbauch und ein bisschen Schmierblutung. Meine Periode ist eigentlich zwei Wochen überfällig."
      },
      {
        "id": "extrauteringraviditaet-q2",
        "phase": "Vorerkrankungen & Dauermedikation",
        "doctorOptions": [
          {
            "text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
            "isOptimal": true,
            "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."
          },
          {
            "text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
            "isOptimal": false,
            "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."
          }
        ],
        "patientResponse": "An Vorerkrankungen habe ich: Z. n. Chlamydien-Infektion mit Adnexitis 2019, Kinderwunsch. Meine Medikamente sind: Folsäure 0,4 mg 1-0-0."
      },
      {
        "id": "extrauteringraviditaet-q3",
        "phase": "Allergien, Sozial- & Familienanamnese",
        "doctorOptions": [
          {
            "text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
            "isOptimal": true,
            "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."
          },
          {
            "text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
            "isOptimal": false,
            "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."
          }
        ],
        "patientResponse": "Allergien: Keine bekannt. Zu meinem Alltag: Nichtraucherin. Verheiratet. Gravida 1, Para 0. In der Familie: Unauffällig."
      }
    ],
    "arztbriefTemplate": {
      "prompt": "Verfassen Sie die Anamnese und Epikrise für Frau Sarah Wolff (29 J.) mit Verdacht auf Tubargravidität links (7. SSW) mit beginnender intraabdominaler Blutung im C1-Fachstil.",
      "requiredTerms": [
        "Tubargravidität links (7. SSW) mit beginnender intraabdominaler Blutung",
        "Z.",
        "Drohender Abort",
        "Anamnese",
        "Vitalparameter"
      ],
      "sampleSolution": "Frau Sarah Wolff (29 J., Bankkauffrau) stellte sich mit folgender aktueller Anamnese vor: Seit ca. 6 Stunden zunehmende, einseitige Unterbauchschmerzen links, vaginale Schmierblutung, Schwindel, Schulterschmerz rechts beim Liegen. Letzte Regelblutung vor 6 Wochen, sonst regelmäßiger Zyklus. An Vorerkrankungen seien bekannt: Z. n. Chlamydien-Infektion mit Adnexitis 2019, Kinderwunsch. Die Dauermedikation umfasse: Folsäure 0,4 mg 1-0-0. Allergien: Keine bekannt. Sozial- und Familienanamnese: Nichtraucherin. Verheiratet. Gravida 1, Para 0. Unauffällig. Klinische Untersuchung: Abdomen: Druckschmerz im linken Unterbauch mit Abwehrspannung. Portioschiebeschmerz. Vaginalsonografie: leeres Cavum uteri, freie Flüssigkeit im Douglas-Raum. Zusammenfassend ergibt sich der dringende Verdacht auf: Tubargravidität links (7. SSW) mit beginnender intraabdominaler Blutung (Differenzialdiagnosen: Drohender Abort, Ovarialtorsion, Rupturierte Ovarialzyste)."
    },
    "isbarSteps": [
      {
        "step": "I",
        "label": "Identify (Identifikation)",
        "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
        "sampleSpeech": "Ich übergebe Frau Sarah Wolff, 29 Jahre alt, aktuell in der Aufnahme (Gynäkologie)."
      },
      {
        "step": "S",
        "label": "Situation (Aktuelle Situation)",
        "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
        "sampleSpeech": "Vorstellungsgrund: Seit ca. 6 Stunden zunehmende, einseitige Unterbauchschmerzen links, vaginale Schmierblutung, Schwindel, Schulterschmerz rechts beim Liegen. Letzte Regelblutung vor 6 Wochen, sonst regelmäßiger Zyklus. Es besteht der dringende Verdacht auf Tubargravidität links (7. SSW) mit beginnender intraabdominaler Blutung."
      },
      {
        "step": "B",
        "label": "Background (Klinischer Hintergrund)",
        "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
        "sampleSpeech": "Anamnestisch bekannt sind: Z. n. Chlamydien-Infektion mit Adnexitis 2019, Kinderwunsch. Medikation: Folsäure 0,4 mg 1-0-0. Allergien: Keine bekannt."
      },
      {
        "step": "A",
        "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
        "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
        "sampleSpeech": "Vitalparameter: RR 100/60 mmHg, HF 110 /min, Temp 36,9 °C, SpO₂ 98 % (Raumluft). Abdomen: Druckschmerz im linken Unterbauch mit Abwehrspannung. Portioschiebeschmerz. Vaginalsonografie: leeres Cavum uteri, freie Flüssigkeit im Douglas-Raum. Labor: β-HCG: 2.400 IU/l (positiv), Hb: 10,4 g/dl (erniedrigt), Blutgruppe: A Rh negativ"
      },
      {
        "step": "R",
        "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
        "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
        "sampleSpeech": "Ich empfehle die zielgerichtete Weiterbehandlung bezüglich Tubargravidität links (7. SSW) mit beginnender intraabdominaler Blutung sowie den Ausschluss der wichtigsten Differenzialdiagnosen (Drohender Abort, Ovarialtorsion, Rupturierte Ovarialzyste)."
      }
    ]
  }
];

export const VOCABULARY_LIST: VocabularyItem[] = [
  {
    "id": "voc-1",
    "fachbegriff": "o.B.",
    "patientensprache": "ohne Befund („Alles in Ordnung“)",
    "category": "Klinische Abkürzungen",
    "example": "Abdomen: weich, kein Druckschmerz, Darmgeräusche o.B."
  },
  {
    "id": "voc-2",
    "fachbegriff": "o.p.B.",
    "patientensprache": "ohne pathologischen Befund („Nichts Krankhaftes“)",
    "category": "Klinische Abkürzungen",
    "example": "Röntgen-Thorax o.p.B."
  },
  {
    "id": "voc-3",
    "fachbegriff": "Z. n.",
    "patientensprache": "Zustand nach („Hatte ich schon mal“)",
    "category": "Klinische Abkürzungen",
    "example": "Z. n. Appendektomie 1998."
  },
  {
    "id": "voc-4",
    "fachbegriff": "V. a.",
    "patientensprache": "Verdacht auf („Vielleicht ist es“)",
    "category": "Klinische Abkürzungen",
    "example": "V. a. Pneumonie rechts basal."
  },
  {
    "id": "voc-5",
    "fachbegriff": "DD",
    "patientensprache": "Differenzialdiagnose („Was es sonst noch sein könnte“)",
    "category": "Klinische Abkürzungen",
    "example": "DD: Lungenarterienembolie."
  },
  {
    "id": "voc-6",
    "fachbegriff": "i.v.",
    "patientensprache": "intravenös (in die Vene) („Über die Infusion / in die Vene“)",
    "category": "Klinische Abkürzungen",
    "example": "Ceftriaxon 2 g i.v."
  },
  {
    "id": "voc-7",
    "fachbegriff": "i.m.",
    "patientensprache": "intramuskulär (in den Muskel) („Spritze in den Muskel“)",
    "category": "Klinische Abkürzungen",
    "example": "Adrenalin 0,5 mg i.m."
  },
  {
    "id": "voc-8",
    "fachbegriff": "s.c.",
    "patientensprache": "subkutan (unter die Haut) („Spritze unter die Haut“)",
    "category": "Klinische Abkürzungen",
    "example": "Enoxaparin 40 mg s.c."
  },
  {
    "id": "voc-9",
    "fachbegriff": "p.o.",
    "patientensprache": "per os (über den Mund) („Zum Schlucken“)",
    "category": "Klinische Abkürzungen",
    "example": "Paracetamol 1 g p.o."
  },
  {
    "id": "voc-10",
    "fachbegriff": "s.l.",
    "patientensprache": "sublingual (unter die Zunge) („Unter die Zunge“)",
    "category": "Klinische Abkürzungen",
    "example": "Nitroglycerin 0,4 mg s.l."
  },
  {
    "id": "voc-11",
    "fachbegriff": "b. B.",
    "patientensprache": "bei Bedarf („Nur wenn nötig“)",
    "category": "Klinische Abkürzungen",
    "example": "Ibuprofen 400 mg b. B."
  },
  {
    "id": "voc-12",
    "fachbegriff": "1-0-1",
    "patientensprache": "Morgens eine, mittags keine, abends eine („Morgens und abends“)",
    "category": "Klinische Abkürzungen",
    "example": "Metformin 1000 mg 1-0-1."
  },
  {
    "id": "voc-13",
    "fachbegriff": "St. p.",
    "patientensprache": "Status post (Zustand nach)",
    "category": "Klinische Abkürzungen",
    "example": "St. p. Myokardinfarkt 2018."
  },
  {
    "id": "voc-14",
    "fachbegriff": "AZ",
    "patientensprache": "Allgemeinzustand („Wie es Ihnen insgesamt geht“)",
    "category": "Klinische Abkürzungen",
    "example": "Patient in reduziertem AZ."
  },
  {
    "id": "voc-15",
    "fachbegriff": "EZ",
    "patientensprache": "Ernährungszustand („Gewicht / wie gut genährt“)",
    "category": "Klinische Abkürzungen",
    "example": "Adipöser EZ (BMI 34)."
  },
  {
    "id": "voc-16",
    "fachbegriff": "RR",
    "patientensprache": "Blutdruck (nach Riva-Rocci) („Blutdruck“)",
    "category": "Klinische Abkürzungen",
    "example": "RR 145/90 mmHg."
  },
  {
    "id": "voc-17",
    "fachbegriff": "HF",
    "patientensprache": "Herzfrequenz („Puls“)",
    "category": "Klinische Abkürzungen",
    "example": "HF 98/min, rhythmisch."
  },
  {
    "id": "voc-18",
    "fachbegriff": "AF",
    "patientensprache": "Atemfrequenz („Wie schnell man atmet“)",
    "category": "Klinische Abkürzungen",
    "example": "AF 24/min."
  },
  {
    "id": "voc-19",
    "fachbegriff": "SpO2",
    "patientensprache": "Sauerstoffsättigung („Sauerstoffwert“)",
    "category": "Klinische Abkürzungen",
    "example": "SpO2 92 % unter Raumluft."
  },
  {
    "id": "voc-20",
    "fachbegriff": "GCS",
    "patientensprache": "Glasgow Coma Scale",
    "category": "Klinische Abkürzungen",
    "example": "GCS 15."
  },
  {
    "id": "voc-21",
    "fachbegriff": "NRS",
    "patientensprache": "Numerische Rating-Skala (Schmerzskala 0–10) („Wie stark von 0 bis 10“)",
    "category": "Klinische Abkürzungen",
    "example": "Schmerzen NRS 7/10."
  },
  {
    "id": "voc-22",
    "fachbegriff": "VAS",
    "patientensprache": "Visuelle Analogskala (Schmerzskala) („Schmerzlineal“)",
    "category": "Klinische Abkürzungen",
    "example": "Schmerzen VAS 8."
  },
  {
    "id": "voc-23",
    "fachbegriff": "NYHA",
    "patientensprache": "Klassifikation der Herzinsuffizienz",
    "category": "Klinische Abkürzungen",
    "example": "Herzinsuffizienz NYHA III."
  },
  {
    "id": "voc-24",
    "fachbegriff": "EF",
    "patientensprache": "Ejektionsfraktion (Auswurfleistung des Herzens) („Pumpleistung“)",
    "category": "Klinische Abkürzungen",
    "example": "LVEF 35 %."
  },
  {
    "id": "voc-25",
    "fachbegriff": "ZVK",
    "patientensprache": "Zentraler Venenkatheter („Großer Zugang am Hals“)",
    "category": "Klinische Abkürzungen",
    "example": "Anlage eines ZVK über die V. jugularis interna rechts."
  },
  {
    "id": "voc-26",
    "fachbegriff": "PVK",
    "patientensprache": "Peripherer Venenkatheter („Zugang / Braunüle“)",
    "category": "Klinische Abkürzungen",
    "example": "PVK 18G am linken Handrücken."
  },
  {
    "id": "voc-27",
    "fachbegriff": "DK",
    "patientensprache": "Dauerkatheter (Blasenkatheter) („Katheter“)",
    "category": "Klinische Abkürzungen",
    "example": "Anlage eines transurethralen DK."
  },
  {
    "id": "voc-28",
    "fachbegriff": "SPK",
    "patientensprache": "Suprapubischer Katheter („Bauchdeckenkatheter“)",
    "category": "Klinische Abkürzungen",
    "example": "Versorgung mit SPK bei Harnverhalt."
  },
  {
    "id": "voc-29",
    "fachbegriff": "PEG",
    "patientensprache": "Perkutane endoskopische Gastrostomie („Magensonde durch den Bauch“)",
    "category": "Klinische Abkürzungen",
    "example": "Ernährung über PEG."
  },
  {
    "id": "voc-30",
    "fachbegriff": "NaCl",
    "patientensprache": "Kochsalzlösung („Salzwasser-Infusion“)",
    "category": "Klinische Abkürzungen",
    "example": "NaCl 0,9 % 500 ml i.v."
  },
  {
    "id": "voc-31",
    "fachbegriff": "EK",
    "patientensprache": "Erythrozytenkonzentrat („Blutkonserve“)",
    "category": "Klinische Abkürzungen",
    "example": "Gabe von 2 EK."
  },
  {
    "id": "voc-32",
    "fachbegriff": "FFP",
    "patientensprache": "Gefrorenes Frischplasma („Plasma“)",
    "category": "Klinische Abkürzungen",
    "example": "Gabe von 4 FFP bei Gerinnungsstörung."
  },
  {
    "id": "voc-33",
    "fachbegriff": "Pat.",
    "patientensprache": "Patient/Patientin",
    "category": "Klinische Abkürzungen",
    "example": "Pat. wach, orientiert."
  },
  {
    "id": "voc-34",
    "fachbegriff": "J.",
    "patientensprache": "Jahre",
    "category": "Klinische Abkürzungen",
    "example": "72 J. alte Patientin."
  },
  {
    "id": "voc-35",
    "fachbegriff": "Lj.",
    "patientensprache": "Lebensjahr",
    "category": "Klinische Abkürzungen",
    "example": "Seit dem 40. Lj. Hypertonie."
  },
  {
    "id": "voc-36",
    "fachbegriff": "SSW",
    "patientensprache": "Schwangerschaftswoche („Welche Woche“)",
    "category": "Klinische Abkürzungen",
    "example": "Patientin in der 32. SSW."
  },
  {
    "id": "voc-37",
    "fachbegriff": "KHK",
    "patientensprache": "Koronare Herzkrankheit („Verkalkte Herzadern“)",
    "category": "Klinische Abkürzungen",
    "example": "Bekannte KHK, 3-Gefäßerkrankung."
  },
  {
    "id": "voc-38",
    "fachbegriff": "HWI",
    "patientensprache": "Harnwegsinfekt („Blasenentzündung“)",
    "category": "Klinische Abkürzungen",
    "example": "Rezidivierende HWI."
  },
  {
    "id": "voc-39",
    "fachbegriff": "TVT",
    "patientensprache": "Tiefe Venenthrombose („Thrombose“)",
    "category": "Klinische Abkürzungen",
    "example": "TVT links, Antikoagulation für 3 Monate."
  },
  {
    "id": "voc-40",
    "fachbegriff": "LAE",
    "patientensprache": "Lungenarterienembolie („Lungenembolie“)",
    "category": "Klinische Abkürzungen",
    "example": "Ausschluss einer LAE mittels CT-Angiografie."
  },
  {
    "id": "voc-41",
    "fachbegriff": "SHT",
    "patientensprache": "Schädel-Hirn-Trauma („Kopfverletzung“)",
    "category": "Klinische Abkürzungen",
    "example": "Leichtes SHT nach Sturz."
  },
  {
    "id": "voc-42",
    "fachbegriff": "DM",
    "patientensprache": "Diabetes mellitus („Zucker“)",
    "category": "Klinische Abkürzungen",
    "example": "DM Typ 2 seit 2015."
  },
  {
    "id": "voc-43",
    "fachbegriff": "aHT",
    "patientensprache": "Arterielle Hypertonie („Bluthochdruck“)",
    "category": "Klinische Abkürzungen",
    "example": "aHT, medikamentös eingestellt."
  },
  {
    "id": "voc-44",
    "fachbegriff": "VHF",
    "patientensprache": "Vorhofflimmern („Herzstolpern“)",
    "category": "Klinische Abkürzungen",
    "example": "Paroxysmales VHF."
  },
  {
    "id": "voc-45",
    "fachbegriff": "AP",
    "patientensprache": "Angina pectoris (oder: alkalische Phosphatase) („Brustenge“)",
    "category": "Klinische Abkürzungen",
    "example": "Typische AP-Beschwerden unter Belastung."
  },
  {
    "id": "voc-46",
    "fachbegriff": "NSTEMI",
    "patientensprache": "Nicht-ST-Hebungsinfarkt („Herzinfarkt“)",
    "category": "Klinische Abkürzungen",
    "example": "NSTEMI, Koronarangiografie innerhalb von 24 Stunden."
  },
  {
    "id": "voc-47",
    "fachbegriff": "STEMI",
    "patientensprache": "ST-Hebungsinfarkt („Herzinfarkt“)",
    "category": "Klinische Abkürzungen",
    "example": "STEMI der Vorderwand, sofortige PCI."
  },
  {
    "id": "voc-48",
    "fachbegriff": "EKG",
    "patientensprache": "Elektrokardiogramm („Herzstromkurve“)",
    "category": "Klinische Abkürzungen",
    "example": ""
  },
  {
    "id": "voc-49",
    "fachbegriff": "CT",
    "patientensprache": "Computertomografie („CT / Röhre“)",
    "category": "Klinische Abkürzungen",
    "example": ""
  },
  {
    "id": "voc-50",
    "fachbegriff": "MRT",
    "patientensprache": "Magnetresonanztomografie („Kernspin“)",
    "category": "Klinische Abkürzungen",
    "example": ""
  },
  {
    "id": "voc-51",
    "fachbegriff": "OP",
    "patientensprache": "Operation",
    "category": "Klinische Abkürzungen",
    "example": "OP am 12.03."
  },
  {
    "id": "voc-52",
    "fachbegriff": "Bds.",
    "patientensprache": "beidseits („Auf beiden Seiten“)",
    "category": "Klinische Abkürzungen",
    "example": "Ödeme bds."
  },
  {
    "id": "voc-53",
    "fachbegriff": "re./li.",
    "patientensprache": "rechts/links",
    "category": "Klinische Abkürzungen",
    "example": "Druckschmerz re. Unterbauch."
  },
  {
    "id": "voc-54",
    "fachbegriff": "Tbl.",
    "patientensprache": "Tablette",
    "category": "Klinische Abkürzungen",
    "example": "1 Tbl. morgens."
  },
  {
    "id": "voc-55",
    "fachbegriff": "Amp.",
    "patientensprache": "Ampulle",
    "category": "Klinische Abkürzungen",
    "example": "1 Amp. Butylscopolamin i.v."
  },
  {
    "id": "voc-56",
    "fachbegriff": "Gtt.",
    "patientensprache": "Tropfen",
    "category": "Klinische Abkürzungen",
    "example": "Metamizol 40 Gtt. p.o."
  },
  {
    "id": "voc-57",
    "fachbegriff": "IE",
    "patientensprache": "Internationale Einheiten („Einheiten“)",
    "category": "Klinische Abkürzungen",
    "example": "Insulin glargin 20 IE s.c. abends."
  },
  {
    "id": "voc-58",
    "fachbegriff": "mg/kg KG",
    "patientensprache": "Milligramm pro Kilogramm Körpergewicht",
    "category": "Klinische Abkürzungen",
    "example": "Dosierung 1 mg/kg KG."
  },
  {
    "id": "voc-59",
    "fachbegriff": "NW",
    "patientensprache": "Nebenwirkung",
    "category": "Klinische Abkürzungen",
    "example": "Keine NW bekannt."
  },
  {
    "id": "voc-60",
    "fachbegriff": "KI",
    "patientensprache": "Kontraindikation („Darf nicht gegeben werden“)",
    "category": "Klinische Abkürzungen",
    "example": "KI für ASS: aktive Blutung."
  },
  {
    "id": "voc-61",
    "fachbegriff": "DRU",
    "patientensprache": "Digital-rektale Untersuchung",
    "category": "Klinische Abkürzungen",
    "example": "DRU: Ampulle leer."
  },
  {
    "id": "voc-62",
    "fachbegriff": "ÖGD",
    "patientensprache": "Ösophagogastroduodenoskopie (Magenspiegelung) („Magenspiegelung“)",
    "category": "Klinische Abkürzungen",
    "example": "ÖGD am Folgetag geplant."
  },
  {
    "id": "voc-63",
    "fachbegriff": "BZ",
    "patientensprache": "Blutzucker („Zucker“)",
    "category": "Klinische Abkürzungen",
    "example": "BZ 89 mg/dl."
  },
  {
    "id": "voc-64",
    "fachbegriff": "BGA",
    "patientensprache": "Blutgasanalyse",
    "category": "Klinische Abkürzungen",
    "example": "BGA arteriell unauffällig."
  },
  {
    "id": "voc-65",
    "fachbegriff": "BB",
    "patientensprache": "Blutbild",
    "category": "Klinische Abkürzungen",
    "example": "Kleines BB unauffällig."
  },
  {
    "id": "voc-66",
    "fachbegriff": "Hb",
    "patientensprache": "Hämoglobin („Blutwert“)",
    "category": "Klinische Abkürzungen",
    "example": "Hb-Abfall auf 7,9 g/dl."
  },
  {
    "id": "voc-67",
    "fachbegriff": "Leukos",
    "patientensprache": "Leukozyten („Entzündungswerte“)",
    "category": "Klinische Abkürzungen",
    "example": "Leukos 14,2 /nl."
  },
  {
    "id": "voc-68",
    "fachbegriff": "OSG",
    "patientensprache": "Oberes Sprunggelenk („Knöchel“)",
    "category": "Klinische Abkürzungen",
    "example": "Distorsion des OSG rechts."
  },
  {
    "id": "voc-69",
    "fachbegriff": "HWS/BWS/LWS",
    "patientensprache": "Hals-/Brust-/Lendenwirbelsäule („Nacken / Rücken / Kreuz“)",
    "category": "Klinische Abkürzungen",
    "example": "LWS klopfschmerzhaft."
  },
  {
    "id": "voc-70",
    "fachbegriff": "ED",
    "patientensprache": "Erstdiagnose („Zum ersten Mal festgestellt“)",
    "category": "Klinische Abkürzungen",
    "example": "ED Diabetes mellitus Typ 1."
  },
  {
    "id": "voc-71",
    "fachbegriff": "Rö",
    "patientensprache": "Röntgen",
    "category": "Klinische Abkürzungen",
    "example": "Rö-Thorax in 2 Ebenen."
  },
  {
    "id": "voc-72",
    "fachbegriff": "TEP",
    "patientensprache": "Totalendoprothese („Künstliches Gelenk“)",
    "category": "Klinische Abkürzungen",
    "example": "Knie-TEP links 2021."
  },
  {
    "id": "voc-73",
    "fachbegriff": "PONV",
    "patientensprache": "Postoperative Übelkeit und Erbrechen („Übelkeit nach der Narkose“)",
    "category": "Klinische Abkürzungen",
    "example": "PONV-Prophylaxe mit Ondansetron."
  },
  {
    "id": "voc-74",
    "fachbegriff": "AO",
    "patientensprache": "Ärztliche Anordnung („Was der Arzt angeordnet hat“)",
    "category": "Klinische Abkürzungen",
    "example": "Bedarfsmedikation laut AO."
  },
  {
    "id": "voc-75",
    "fachbegriff": "ASS",
    "patientensprache": "Acetylsalicylsäure („Aspirin“)",
    "category": "Klinische Abkürzungen",
    "example": "ASS 100 mg 1-0-0."
  },
  {
    "id": "voc-76",
    "fachbegriff": "NPO / nüchtern",
    "patientensprache": "Nichts essen und trinken („Nüchtern bleiben“)",
    "category": "Klinische Abkürzungen",
    "example": "Pat. ab 0 Uhr nüchtern."
  },
  {
    "id": "voc-77",
    "fachbegriff": "Cranium",
    "patientensprache": "Schädel („Birne / Rübe“)",
    "category": "Anatomie",
    "example": "Der Patient erlitt eine Prellung des Craniums."
  },
  {
    "id": "voc-78",
    "fachbegriff": "Cervix",
    "patientensprache": "Hals",
    "category": "Anatomie",
    "example": "Die Lymphknoten zervikal sind nicht vergrößert."
  },
  {
    "id": "voc-79",
    "fachbegriff": "Nuchal",
    "patientensprache": "Den Nacken betreffend („Genick“)",
    "category": "Anatomie",
    "example": "Es bestehen nuchale Schmerzen."
  },
  {
    "id": "voc-80",
    "fachbegriff": "Sternum",
    "patientensprache": "Brustbein",
    "category": "Anatomie",
    "example": "Der Schmerz ist retrosternal lokalisiert."
  },
  {
    "id": "voc-81",
    "fachbegriff": "Klavikula",
    "patientensprache": "Schlüsselbein",
    "category": "Anatomie",
    "example": "Röntgenologisch zeigt sich eine Klavikulafraktur links."
  },
  {
    "id": "voc-82",
    "fachbegriff": "Skapula",
    "patientensprache": "Schulterblatt",
    "category": "Anatomie",
    "example": "Der Schmerz strahlt zwischen die Skapulae aus."
  },
  {
    "id": "voc-83",
    "fachbegriff": "Kostae",
    "patientensprache": "Rippen",
    "category": "Anatomie",
    "example": "Es besteht ein Druckschmerz über den Kostae 5–7 rechts."
  },
  {
    "id": "voc-84",
    "fachbegriff": "Pulmo",
    "patientensprache": "Lunge",
    "category": "Anatomie",
    "example": "Pulmo: vesikuläres Atemgeräusch beidseits."
  },
  {
    "id": "voc-85",
    "fachbegriff": "Bronchien",
    "patientensprache": "Atemwege der Lunge („Luftröhren“)",
    "category": "Anatomie",
    "example": "Die Bronchien sind entzündlich verändert."
  },
  {
    "id": "voc-86",
    "fachbegriff": "Trachea",
    "patientensprache": "Luftröhre",
    "category": "Anatomie",
    "example": "Die Trachea ist mittelständig."
  },
  {
    "id": "voc-87",
    "fachbegriff": "Larynx",
    "patientensprache": "Kehlkopf („Adamsapfel“)",
    "category": "Anatomie",
    "example": "Bei der Laryngoskopie zeigte sich ein Larynxödem."
  },
  {
    "id": "voc-88",
    "fachbegriff": "Pharynx",
    "patientensprache": "Rachen („Hals / Rachen“)",
    "category": "Anatomie",
    "example": "Der Pharynx ist gerötet."
  },
  {
    "id": "voc-89",
    "fachbegriff": "Ösophagus",
    "patientensprache": "Speiseröhre",
    "category": "Anatomie",
    "example": "Endoskopisch zeigt sich eine Refluxösophagitis."
  },
  {
    "id": "voc-90",
    "fachbegriff": "Pleura",
    "patientensprache": "Brustfell („Rippenfell“)",
    "category": "Anatomie",
    "example": "Es besteht ein Pleuraerguss rechts."
  },
  {
    "id": "voc-91",
    "fachbegriff": "Zwerchfell (Diaphragma)",
    "patientensprache": "Zwerchfell",
    "category": "Anatomie",
    "example": "Das Diaphragma steht rechts höher."
  },
  {
    "id": "voc-92",
    "fachbegriff": "Cor",
    "patientensprache": "Herz („Pumpe“)",
    "category": "Anatomie",
    "example": "Cor: Herztöne rein, rhythmisch, keine pathologischen Geräusche."
  },
  {
    "id": "voc-93",
    "fachbegriff": "Myokard",
    "patientensprache": "Herzmuskel",
    "category": "Anatomie",
    "example": "Es handelt sich um eine Myokardischämie."
  },
  {
    "id": "voc-94",
    "fachbegriff": "Perikard",
    "patientensprache": "Herzbeutel",
    "category": "Anatomie",
    "example": "Sonografisch zeigt sich ein Perikarderguss."
  },
  {
    "id": "voc-95",
    "fachbegriff": "Koronararterien",
    "patientensprache": "Herzkranzgefäße („Herzadern“)",
    "category": "Anatomie",
    "example": "Die Koronarangiografie zeigt eine Stenose des RIVA."
  },
  {
    "id": "voc-96",
    "fachbegriff": "Aorta",
    "patientensprache": "Hauptschlagader",
    "category": "Anatomie",
    "example": "Die Aorta abdominalis ist auf 6 cm erweitert."
  },
  {
    "id": "voc-97",
    "fachbegriff": "Vena cava",
    "patientensprache": "Hohlvene",
    "category": "Anatomie",
    "example": "Der ZVK liegt in der Vena cava superior."
  },
  {
    "id": "voc-98",
    "fachbegriff": "Arterie",
    "patientensprache": "Schlagader („Ader“)",
    "category": "Anatomie",
    "example": "Die A. radialis ist gut tastbar."
  },
  {
    "id": "voc-99",
    "fachbegriff": "Vene",
    "patientensprache": "Blutader („Ader / Krampfader“)",
    "category": "Anatomie",
    "example": "Der Zugang wurde in eine Vene am Handrücken gelegt."
  },
  {
    "id": "voc-100",
    "fachbegriff": "Kapillaren",
    "patientensprache": "Haargefäße",
    "category": "Anatomie",
    "example": "Die kapilläre Rekapillarisierung ist verlängert."
  },
  {
    "id": "voc-101",
    "fachbegriff": "Gaster",
    "patientensprache": "Magen",
    "category": "Anatomie",
    "example": "Gaster: Schleimhaut gerötet, kein Ulkus."
  },
  {
    "id": "voc-102",
    "fachbegriff": "Duodenum",
    "patientensprache": "Zwölffingerdarm",
    "category": "Anatomie",
    "example": "Es zeigt sich ein Ulcus duodeni."
  },
  {
    "id": "voc-103",
    "fachbegriff": "Jejunum und Ileum",
    "patientensprache": "Dünndarm („Darm“)",
    "category": "Anatomie",
    "example": "Der Dünndarm ist distendiert."
  },
  {
    "id": "voc-104",
    "fachbegriff": "Kolon",
    "patientensprache": "Dickdarm („Darm“)",
    "category": "Anatomie",
    "example": "Das Kolon ist mit Divertikeln durchsetzt."
  },
  {
    "id": "voc-105",
    "fachbegriff": "Sigma",
    "patientensprache": "S-förmiger Dickdarmabschnitt („Darm unten links“)",
    "category": "Anatomie",
    "example": "Es zeigt sich eine Sigmadivertikulitis."
  },
  {
    "id": "voc-106",
    "fachbegriff": "Rektum",
    "patientensprache": "Mastdarm („Enddarm / Po“)",
    "category": "Anatomie",
    "example": "Bei der rektal-digitalen Untersuchung ist die Ampulle leer."
  },
  {
    "id": "voc-107",
    "fachbegriff": "Anus",
    "patientensprache": "After („Po / Hintern“)",
    "category": "Anatomie",
    "example": "Perianal zeigt sich eine Fissur."
  },
  {
    "id": "voc-108",
    "fachbegriff": "Appendix vermiformis",
    "patientensprache": "Wurmfortsatz („Blinddarm“)",
    "category": "Anatomie",
    "example": "Die Appendix ist entzündlich verdickt."
  },
  {
    "id": "voc-109",
    "fachbegriff": "Hepar",
    "patientensprache": "Leber",
    "category": "Anatomie",
    "example": "Hepar: glatt begrenzt, nicht vergrößert."
  },
  {
    "id": "voc-110",
    "fachbegriff": "Vesica fellea",
    "patientensprache": "Gallenblase („Galle“)",
    "category": "Anatomie",
    "example": "Die Gallenblase ist wandverdickt."
  },
  {
    "id": "voc-111",
    "fachbegriff": "Ductus choledochus",
    "patientensprache": "Hauptgallengang („Gallengang“)",
    "category": "Anatomie",
    "example": "Der Ductus choledochus ist auf 10 mm erweitert."
  },
  {
    "id": "voc-112",
    "fachbegriff": "Pankreas",
    "patientensprache": "Bauchspeicheldrüse",
    "category": "Anatomie",
    "example": "Das Pankreas ist ödematös aufgetrieben."
  },
  {
    "id": "voc-113",
    "fachbegriff": "Lien",
    "patientensprache": "Milz",
    "category": "Anatomie",
    "example": "Es besteht eine Splenomegalie."
  },
  {
    "id": "voc-114",
    "fachbegriff": "Peritoneum",
    "patientensprache": "Bauchfell",
    "category": "Anatomie",
    "example": "Es zeigen sich Zeichen einer Peritonitis."
  },
  {
    "id": "voc-115",
    "fachbegriff": "Ren",
    "patientensprache": "Niere",
    "category": "Anatomie",
    "example": "Nierenlager beidseits frei."
  },
  {
    "id": "voc-116",
    "fachbegriff": "Ureter",
    "patientensprache": "Harnleiter",
    "category": "Anatomie",
    "example": "Im distalen Ureter rechts zeigt sich ein Konkrement."
  },
  {
    "id": "voc-117",
    "fachbegriff": "Vesica urinaria",
    "patientensprache": "Harnblase („Blase“)",
    "category": "Anatomie",
    "example": "Die Harnblase ist prall gefüllt."
  },
  {
    "id": "voc-118",
    "fachbegriff": "Urethra",
    "patientensprache": "Harnröhre",
    "category": "Anatomie",
    "example": "Die Urethra ist nicht verletzt."
  },
  {
    "id": "voc-119",
    "fachbegriff": "Prostata",
    "patientensprache": "Vorsteherdrüse („Prostata“)",
    "category": "Anatomie",
    "example": "Die Prostata ist vergrößert und glatt."
  },
  {
    "id": "voc-120",
    "fachbegriff": "Testis",
    "patientensprache": "Hoden („Eier“)",
    "category": "Anatomie",
    "example": "Der linke Testis ist geschwollen."
  },
  {
    "id": "voc-121",
    "fachbegriff": "Uterus",
    "patientensprache": "Gebärmutter",
    "category": "Anatomie",
    "example": "Der Uterus ist myomatös vergrößert."
  },
  {
    "id": "voc-122",
    "fachbegriff": "Ovar",
    "patientensprache": "Eierstock",
    "category": "Anatomie",
    "example": "Es zeigt sich eine Ovarialzyste rechts."
  },
  {
    "id": "voc-123",
    "fachbegriff": "Tuba uterina",
    "patientensprache": "Eileiter",
    "category": "Anatomie",
    "example": "Es handelt sich um eine Tubargravidität."
  },
  {
    "id": "voc-124",
    "fachbegriff": "Mamma",
    "patientensprache": "Brust („Brust / Busen“)",
    "category": "Anatomie",
    "example": "In der linken Mamma tastet sich ein Knoten."
  },
  {
    "id": "voc-125",
    "fachbegriff": "Glandula thyreoidea",
    "patientensprache": "Schilddrüse",
    "category": "Anatomie",
    "example": "Die Schilddrüse ist diffus vergrößert."
  },
  {
    "id": "voc-126",
    "fachbegriff": "Nebenniere",
    "patientensprache": "Nebenniere",
    "category": "Anatomie",
    "example": "Es zeigt sich ein Nebennierenadenom."
  },
  {
    "id": "voc-127",
    "fachbegriff": "Cerebrum",
    "patientensprache": "Großhirn („Gehirn“)",
    "category": "Anatomie",
    "example": "In der Bildgebung zeigt sich ein Infarkt im Cerebrum."
  },
  {
    "id": "voc-128",
    "fachbegriff": "Cerebellum",
    "patientensprache": "Kleinhirn",
    "category": "Anatomie",
    "example": "Es bestehen Kleinhirnzeichen."
  },
  {
    "id": "voc-129",
    "fachbegriff": "Medulla spinalis",
    "patientensprache": "Rückenmark",
    "category": "Anatomie",
    "example": "Es besteht der V. a. eine Kompression der Medulla spinalis."
  },
  {
    "id": "voc-130",
    "fachbegriff": "Vertebra",
    "patientensprache": "Wirbel",
    "category": "Anatomie",
    "example": "Es zeigt sich eine Fraktur des 1. Lendenwirbels."
  },
  {
    "id": "voc-131",
    "fachbegriff": "Discus intervertebralis",
    "patientensprache": "Bandscheibe",
    "category": "Anatomie",
    "example": "Es besteht ein Bandscheibenvorfall L5/S1."
  },
  {
    "id": "voc-132",
    "fachbegriff": "Os sacrum",
    "patientensprache": "Kreuzbein („Steiß / Kreuz“)",
    "category": "Anatomie",
    "example": "Am Os sacrum zeigt sich ein Dekubitus."
  },
  {
    "id": "voc-133",
    "fachbegriff": "Os coccygis",
    "patientensprache": "Steißbein",
    "category": "Anatomie",
    "example": "Nach dem Sturz besteht ein Druckschmerz über dem Os coccygis."
  },
  {
    "id": "voc-134",
    "fachbegriff": "Pelvis",
    "patientensprache": "Becken",
    "category": "Anatomie",
    "example": "Es besteht eine Beckenringfraktur."
  },
  {
    "id": "voc-135",
    "fachbegriff": "Femur",
    "patientensprache": "Oberschenkelknochen („Oberschenkel“)",
    "category": "Anatomie",
    "example": "Es zeigt sich eine Schenkelhalsfraktur des Femurs."
  },
  {
    "id": "voc-136",
    "fachbegriff": "Patella",
    "patientensprache": "Kniescheibe",
    "category": "Anatomie",
    "example": "Die Patella ist luxiert."
  },
  {
    "id": "voc-137",
    "fachbegriff": "Tibia",
    "patientensprache": "Schienbein",
    "category": "Anatomie",
    "example": "Über der Tibia besteht ein Hämatom."
  },
  {
    "id": "voc-138",
    "fachbegriff": "Fibula",
    "patientensprache": "Wadenbein",
    "category": "Anatomie",
    "example": "Es zeigt sich eine Fibulafraktur."
  },
  {
    "id": "voc-139",
    "fachbegriff": "Malleolus",
    "patientensprache": "Knöchel",
    "category": "Anatomie",
    "example": "Der Malleolus lateralis ist druckschmerzhaft."
  },
  {
    "id": "voc-140",
    "fachbegriff": "Kalkaneus",
    "patientensprache": "Fersenbein („Ferse“)",
    "category": "Anatomie",
    "example": "Es besteht eine Kalkaneusfraktur nach Sturz aus der Höhe."
  },
  {
    "id": "voc-141",
    "fachbegriff": "Humerus",
    "patientensprache": "Oberarmknochen („Oberarm“)",
    "category": "Anatomie",
    "example": "Es zeigt sich eine subkapitale Humerusfraktur."
  },
  {
    "id": "voc-142",
    "fachbegriff": "Radius",
    "patientensprache": "Speiche („Unterarm“)",
    "category": "Anatomie",
    "example": "Es besteht eine distale Radiusfraktur."
  },
  {
    "id": "voc-143",
    "fachbegriff": "Ulna",
    "patientensprache": "Elle („Unterarm“)",
    "category": "Anatomie",
    "example": "Die Ulna ist intakt."
  },
  {
    "id": "voc-144",
    "fachbegriff": "Os scaphoideum",
    "patientensprache": "Kahnbein",
    "category": "Anatomie",
    "example": "Bei Druckschmerz in der Tabatière besteht V. a. Skaphoidfraktur."
  },
  {
    "id": "voc-145",
    "fachbegriff": "Phalanx",
    "patientensprache": "Finger- oder Zehenglied („Finger / Zeh“)",
    "category": "Anatomie",
    "example": "Es zeigt sich eine Fraktur der Endphalanx."
  },
  {
    "id": "voc-146",
    "fachbegriff": "Axilla",
    "patientensprache": "Achselhöhle („Achsel“)",
    "category": "Anatomie",
    "example": "Die axillären Lymphknoten sind vergrößert."
  },
  {
    "id": "voc-147",
    "fachbegriff": "Inguinal",
    "patientensprache": "Die Leiste betreffend („Leiste“)",
    "category": "Anatomie",
    "example": "Es besteht eine Leistenhernie rechts."
  },
  {
    "id": "voc-148",
    "fachbegriff": "Umbilikus",
    "patientensprache": "Bauchnabel („Nabel“)",
    "category": "Anatomie",
    "example": "Der Schmerz begann periumbilikal."
  },
  {
    "id": "voc-149",
    "fachbegriff": "Epigastrium",
    "patientensprache": "Oberbauch Mitte („Magengrube“)",
    "category": "Anatomie",
    "example": "Es besteht ein Druckschmerz im Epigastrium."
  },
  {
    "id": "voc-150",
    "fachbegriff": "Hypochondrium",
    "patientensprache": "Oberbauch seitlich unter dem Rippenbogen („Unter den Rippen“)",
    "category": "Anatomie",
    "example": "Der Schmerz ist im rechten Hypochondrium lokalisiert."
  },
  {
    "id": "voc-151",
    "fachbegriff": "Flanke",
    "patientensprache": "Seitliche Rumpfregion („Seite“)",
    "category": "Anatomie",
    "example": "Der Schmerz strahlt in die rechte Flanke aus."
  },
  {
    "id": "voc-152",
    "fachbegriff": "Glutealregion",
    "patientensprache": "Gesäß („Po / Hintern“)",
    "category": "Anatomie",
    "example": "Die Injektion erfolgte ventrogluteal."
  },
  {
    "id": "voc-153",
    "fachbegriff": "Kutis",
    "patientensprache": "Haut",
    "category": "Anatomie",
    "example": "Kutis: warm, trocken, keine Effloreszenzen."
  },
  {
    "id": "voc-154",
    "fachbegriff": "Lymphknoten",
    "patientensprache": "Lymphknoten („Drüsen“)",
    "category": "Anatomie",
    "example": "Zervikal tasten sich vergrößerte Lymphknoten."
  },
  {
    "id": "voc-155",
    "fachbegriff": "Tonsillen",
    "patientensprache": "Gaumenmandeln („Mandeln“)",
    "category": "Anatomie",
    "example": "Die Tonsillen sind gerötet und belegt."
  },
  {
    "id": "voc-156",
    "fachbegriff": "Retina",
    "patientensprache": "Netzhaut",
    "category": "Anatomie",
    "example": "Es besteht eine Netzhautablösung."
  },
  {
    "id": "voc-157",
    "fachbegriff": "Konjunktiva",
    "patientensprache": "Bindehaut",
    "category": "Anatomie",
    "example": "Die Konjunktiven sind blass."
  },
  {
    "id": "voc-158",
    "fachbegriff": "Sklera",
    "patientensprache": "Lederhaut des Auges („Das Weiße im Auge“)",
    "category": "Anatomie",
    "example": "Die Skleren sind ikterisch."
  },
  {
    "id": "voc-159",
    "fachbegriff": "Membrana tympani",
    "patientensprache": "Trommelfell",
    "category": "Anatomie",
    "example": "Das Trommelfell ist gerötet und vorgewölbt."
  },
  {
    "id": "voc-160",
    "fachbegriff": "Myokardinfarkt",
    "patientensprache": "Herzinfarkt („Herzkasper“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Der Patient erlitt 2018 einen Myokardinfarkt."
  },
  {
    "id": "voc-161",
    "fachbegriff": "Herzinsuffizienz",
    "patientensprache": "Herzschwäche („Mein Herz ist schwach / Wasser in den Beinen“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es besteht eine Herzinsuffizienz NYHA III."
  },
  {
    "id": "voc-162",
    "fachbegriff": "Vorhofflimmern",
    "patientensprache": "Herzrhythmusstörung der Vorhöfe („Herzstolpern“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Bekanntes permanentes Vorhofflimmern unter Antikoagulation."
  },
  {
    "id": "voc-163",
    "fachbegriff": "Bradykardie",
    "patientensprache": "Zu langsamer Herzschlag („Mein Puls ist ganz langsam“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Unter Betablockern zeigt sich eine Bradykardie von 45/min."
  },
  {
    "id": "voc-164",
    "fachbegriff": "Tachykardie",
    "patientensprache": "Zu schneller Herzschlag („Herzrasen“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Bei Aufnahme besteht eine Tachykardie von 130/min."
  },
  {
    "id": "voc-165",
    "fachbegriff": "Arrhythmie",
    "patientensprache": "Herzrhythmusstörung („Herzstolpern“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Im EKG zeigt sich eine absolute Arrhythmie."
  },
  {
    "id": "voc-166",
    "fachbegriff": "Koronare Herzkrankheit (KHK)",
    "patientensprache": "Verengung der Herzkranzgefäße („Verkalkte Herzadern“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Bekannte KHK, Z. n. Stent-Implantation 2020."
  },
  {
    "id": "voc-167",
    "fachbegriff": "Aortenklappenstenose",
    "patientensprache": "Verengung der Aortenklappe („Herzklappenfehler“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es besteht eine hochgradige Aortenklappenstenose."
  },
  {
    "id": "voc-168",
    "fachbegriff": "Endokarditis",
    "patientensprache": "Herzinnenhautentzündung („Entzündung am Herzen“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Bei Fieber und neuem Herzgeräusch besteht V. a. Endokarditis."
  },
  {
    "id": "voc-169",
    "fachbegriff": "Perikarditis",
    "patientensprache": "Herzbeutelentzündung",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Die Perikarditis zeigt sich mit atemabhängigen Thoraxschmerzen."
  },
  {
    "id": "voc-170",
    "fachbegriff": "Myokarditis",
    "patientensprache": "Herzmuskelentzündung („Verschleppte Grippe aufs Herz“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Nach dem Infekt trat eine Myokarditis auf."
  },
  {
    "id": "voc-171",
    "fachbegriff": "Aortendissektion",
    "patientensprache": "Einriss der Hauptschlagaderwand",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Bei reißendem Rückenschmerz muss eine Aortendissektion ausgeschlossen werden."
  },
  {
    "id": "voc-172",
    "fachbegriff": "Aneurysma",
    "patientensprache": "Gefäßaussackung („Ausgebeulte Ader“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es besteht ein infrarenales Bauchaortenaneurysma."
  },
  {
    "id": "voc-173",
    "fachbegriff": "Periphere arterielle Verschlusskrankheit (pAVK)",
    "patientensprache": "Durchblutungsstörung der Beine („Schaufensterkrankheit / Raucherbein“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Bekannte pAVK Stadium IIb."
  },
  {
    "id": "voc-174",
    "fachbegriff": "Varikosis",
    "patientensprache": "Krampfadern",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es besteht eine ausgeprägte Varikosis beidseits."
  },
  {
    "id": "voc-175",
    "fachbegriff": "Thrombose",
    "patientensprache": "Blutgerinnsel in einer Vene („Thrombose / Blutpfropf“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Duplexsonografisch bestätigt sich eine Thrombose der V. poplitea."
  },
  {
    "id": "voc-176",
    "fachbegriff": "Lungenarterienembolie (LAE)",
    "patientensprache": "Verschluss einer Lungenarterie („Lungenembolie“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Die CT-Angiografie zeigt eine zentrale LAE."
  },
  {
    "id": "voc-177",
    "fachbegriff": "Hypotonie",
    "patientensprache": "Niedriger Blutdruck („Zu niedriger Druck / Kreislauf“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Die Patientin neigt zu Hypotonie."
  },
  {
    "id": "voc-178",
    "fachbegriff": "Orthostatische Hypotonie",
    "patientensprache": "Blutdruckabfall beim Aufstehen („Kreislauf beim Aufstehen“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Im Schellong-Test zeigt sich eine orthostatische Hypotonie."
  },
  {
    "id": "voc-179",
    "fachbegriff": "Schock",
    "patientensprache": "Lebensbedrohliches Kreislaufversagen („Kreislaufzusammenbruch“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Der Patient befindet sich im hypovolämischen Schock."
  },
  {
    "id": "voc-180",
    "fachbegriff": "Pneumonie",
    "patientensprache": "Lungenentzündung",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es besteht eine ambulant erworbene Pneumonie."
  },
  {
    "id": "voc-181",
    "fachbegriff": "Bronchitis",
    "patientensprache": "Entzündung der Bronchien („Bronchitis / Husten“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Die akute Bronchitis ist meist viral bedingt."
  },
  {
    "id": "voc-182",
    "fachbegriff": "Asthma bronchiale",
    "patientensprache": "Anfallsweise Atemwegsverengung („Asthma“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Die Patientin hat seit der Kindheit Asthma bronchiale."
  },
  {
    "id": "voc-183",
    "fachbegriff": "COPD",
    "patientensprache": "Chronisch obstruktive Lungenerkrankung („Raucherlunge“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Bekannte COPD GOLD 3."
  },
  {
    "id": "voc-184",
    "fachbegriff": "Lungenemphysem",
    "patientensprache": "Überblähung der Lunge",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Radiologisch zeigt sich ein Lungenemphysem."
  },
  {
    "id": "voc-185",
    "fachbegriff": "Pneumothorax",
    "patientensprache": "Luft im Brustfellraum („Lunge zusammengefallen“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es zeigt sich ein Spontanpneumothorax links."
  },
  {
    "id": "voc-186",
    "fachbegriff": "Pleuraerguss",
    "patientensprache": "Flüssigkeit im Brustfellraum („Wasser in der Lunge“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Sonografisch besteht ein Pleuraerguss rechts."
  },
  {
    "id": "voc-187",
    "fachbegriff": "Lungenödem",
    "patientensprache": "Wasser in der Lunge („Wasser auf der Lunge“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Bei kardialer Dekompensation entwickelte sich ein Lungenödem."
  },
  {
    "id": "voc-188",
    "fachbegriff": "Tuberkulose",
    "patientensprache": "Tuberkulose („Schwindsucht (veraltet)“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Bei Nachtschweiß und Husten muss an eine Tuberkulose gedacht werden."
  },
  {
    "id": "voc-189",
    "fachbegriff": "Bronchialkarzinom",
    "patientensprache": "Lungenkrebs",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es besteht der V. a. ein zentrales Bronchialkarzinom."
  },
  {
    "id": "voc-190",
    "fachbegriff": "Schlafapnoe-Syndrom",
    "patientensprache": "Atemaussetzer im Schlaf („Schnarchen mit Atempausen“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Bekanntes Schlafapnoe-Syndrom mit CPAP-Therapie."
  },
  {
    "id": "voc-191",
    "fachbegriff": "Gastritis",
    "patientensprache": "Magenschleimhautentzündung („Magenentzündung“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Unter NSAR entwickelte sich eine erosive Gastritis."
  },
  {
    "id": "voc-192",
    "fachbegriff": "Ulcus ventriculi",
    "patientensprache": "Magengeschwür",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Endoskopisch zeigt sich ein Ulcus ventriculi."
  },
  {
    "id": "voc-193",
    "fachbegriff": "Gastroösophageale Refluxkrankheit (GERD)",
    "patientensprache": "Rückfluss von Magensäure („Sodbrennen“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es besteht eine Refluxkrankheit."
  },
  {
    "id": "voc-194",
    "fachbegriff": "Gastroenteritis",
    "patientensprache": "Magen-Darm-Entzündung („Magen-Darm-Grippe“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es handelt sich um eine virale Gastroenteritis."
  },
  {
    "id": "voc-195",
    "fachbegriff": "Cholezystolithiasis",
    "patientensprache": "Gallensteine",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Sonografisch zeigt sich eine Cholezystolithiasis."
  },
  {
    "id": "voc-196",
    "fachbegriff": "Choledocholithiasis",
    "patientensprache": "Stein im Hauptgallengang („Gallenstein im Gang“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Bei Ikterus besteht V. a. Choledocholithiasis."
  },
  {
    "id": "voc-197",
    "fachbegriff": "Cholangitis",
    "patientensprache": "Gallengangsentzündung",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Charcot-Trias: Fieber, Ikterus, Oberbauchschmerz bei Cholangitis."
  },
  {
    "id": "voc-198",
    "fachbegriff": "Pankreatitis",
    "patientensprache": "Bauchspeicheldrüsenentzündung",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es besteht eine akute biliäre Pankreatitis."
  },
  {
    "id": "voc-199",
    "fachbegriff": "Hepatitis",
    "patientensprache": "Leberentzündung („Gelbsucht“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Serologisch bestätigt sich eine Hepatitis B."
  },
  {
    "id": "voc-200",
    "fachbegriff": "Leberzirrhose",
    "patientensprache": "Schrumpfleber („Kaputte Leber / Säuferleber“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Bekannte äthyltoxische Leberzirrhose Child B."
  },
  {
    "id": "voc-201",
    "fachbegriff": "Steatosis hepatis",
    "patientensprache": "Fettleber",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Sonografisch zeigt sich eine Steatosis hepatis."
  },
  {
    "id": "voc-202",
    "fachbegriff": "Divertikulitis",
    "patientensprache": "Entzündung von Darmausstülpungen („Darmentzündung links“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es besteht eine akute Sigmadivertikulitis."
  },
  {
    "id": "voc-203",
    "fachbegriff": "Ileus",
    "patientensprache": "Darmverschluss",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Klinisch und radiologisch besteht ein mechanischer Ileus."
  },
  {
    "id": "voc-204",
    "fachbegriff": "Morbus Crohn",
    "patientensprache": "Chronisch-entzündliche Darmerkrankung",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Bekannter Morbus Crohn mit Ileumbefall."
  },
  {
    "id": "voc-205",
    "fachbegriff": "Colitis ulcerosa",
    "patientensprache": "Chronische Dickdarmentzündung",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Die Colitis ulcerosa ist derzeit in Remission."
  },
  {
    "id": "voc-206",
    "fachbegriff": "Kolorektales Karzinom",
    "patientensprache": "Darmkrebs",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es besteht der V. a. ein Sigmakarzinom."
  },
  {
    "id": "voc-207",
    "fachbegriff": "Hämorrhoiden",
    "patientensprache": "Hämorrhoiden",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Die Blutung ist am ehesten auf Hämorrhoiden zurückzuführen."
  },
  {
    "id": "voc-208",
    "fachbegriff": "Hernie",
    "patientensprache": "Bruch („Bruch / Weichteilbruch“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es besteht eine Narbenhernie."
  },
  {
    "id": "voc-209",
    "fachbegriff": "Leistenhernie",
    "patientensprache": "Leistenbruch",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Die Leistenhernie rechts ist reponibel."
  },
  {
    "id": "voc-210",
    "fachbegriff": "Peritonitis",
    "patientensprache": "Bauchfellentzündung",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Bei Perforation entwickelte sich eine diffuse Peritonitis."
  },
  {
    "id": "voc-211",
    "fachbegriff": "Zöliakie",
    "patientensprache": "Glutenunverträglichkeit („Glutenallergie“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Serologisch bestätigt sich eine Zöliakie."
  },
  {
    "id": "voc-212",
    "fachbegriff": "Laktoseintoleranz",
    "patientensprache": "Milchzuckerunverträglichkeit („Ich vertrag keine Milch“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": ""
  },
  {
    "id": "voc-213",
    "fachbegriff": "Diabetes mellitus Typ 1",
    "patientensprache": "Insulinmangel-Diabetes („Zucker / Jugenddiabetes“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Diabetes mellitus Typ 1 seit dem 12. Lebensjahr."
  },
  {
    "id": "voc-214",
    "fachbegriff": "Diabetes mellitus Typ 2",
    "patientensprache": "Altersdiabetes („Zucker / Alterszucker“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Diabetes mellitus Typ 2, oral eingestellt."
  },
  {
    "id": "voc-215",
    "fachbegriff": "Hypoglykämie",
    "patientensprache": "Unterzuckerung („Unterzucker“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Der Patient wurde mit schwerer Hypoglykämie aufgefunden."
  },
  {
    "id": "voc-216",
    "fachbegriff": "Hyperglykämie",
    "patientensprache": "Überzuckerung („Zu hoher Zucker“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Bei Aufnahme besteht eine Hyperglykämie von 420 mg/dl."
  },
  {
    "id": "voc-217",
    "fachbegriff": "Ketoazidose",
    "patientensprache": "Übersäuerung bei Insulinmangel",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es besteht eine diabetische Ketoazidose."
  },
  {
    "id": "voc-218",
    "fachbegriff": "Hyperthyreose",
    "patientensprache": "Schilddrüsenüberfunktion („Schilddrüse zu schnell“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Laborchemisch zeigt sich eine manifeste Hyperthyreose."
  },
  {
    "id": "voc-219",
    "fachbegriff": "Hypothyreose",
    "patientensprache": "Schilddrüsenunterfunktion („Schilddrüse zu langsam“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Bekannte Hypothyreose unter L-Thyroxin."
  },
  {
    "id": "voc-220",
    "fachbegriff": "Struma",
    "patientensprache": "Kropf („Kropf / dicker Hals“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es tastet sich eine Struma nodosa."
  },
  {
    "id": "voc-221",
    "fachbegriff": "Adipositas",
    "patientensprache": "Fettleibigkeit („Übergewicht“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es besteht eine Adipositas Grad II (BMI 37)."
  },
  {
    "id": "voc-222",
    "fachbegriff": "Hypercholesterinämie",
    "patientensprache": "Erhöhte Blutfettwerte („Zu hohes Cholesterin“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Bekannte Hypercholesterinämie unter Statin."
  },
  {
    "id": "voc-223",
    "fachbegriff": "Hyperurikämie",
    "patientensprache": "Erhöhte Harnsäure („Zu viel Harnsäure“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Die Hyperurikämie ist bislang unbehandelt."
  },
  {
    "id": "voc-224",
    "fachbegriff": "Gicht",
    "patientensprache": "Gicht („Zipperlein (veraltet)“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es besteht ein akuter Gichtanfall."
  },
  {
    "id": "voc-225",
    "fachbegriff": "Osteoporose",
    "patientensprache": "Knochenschwund („Brüchige Knochen“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Die Patientin hat eine postmenopausale Osteoporose."
  },
  {
    "id": "voc-226",
    "fachbegriff": "Anämie",
    "patientensprache": "Blutarmut („Blutarmut / zu wenig Blut“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es besteht eine Eisenmangelanämie."
  },
  {
    "id": "voc-227",
    "fachbegriff": "Leukämie",
    "patientensprache": "Blutkrebs",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es wurde eine akute myeloische Leukämie diagnostiziert."
  },
  {
    "id": "voc-228",
    "fachbegriff": "Lymphom",
    "patientensprache": "Lymphdrüsenkrebs",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es besteht der V. a. ein malignes Lymphom."
  },
  {
    "id": "voc-229",
    "fachbegriff": "Sepsis",
    "patientensprache": "Blutvergiftung",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Der Patient entwickelte eine Urosepsis."
  },
  {
    "id": "voc-230",
    "fachbegriff": "Harnwegsinfekt (HWI)",
    "patientensprache": "Harnwegsentzündung („Blasenentzündung“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es besteht ein unkomplizierter Harnwegsinfekt."
  },
  {
    "id": "voc-231",
    "fachbegriff": "Zystitis",
    "patientensprache": "Blasenentzündung",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Die Patientin hat eine akute Zystitis."
  },
  {
    "id": "voc-232",
    "fachbegriff": "Pyelonephritis",
    "patientensprache": "Nierenbeckenentzündung („Nierenentzündung“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es besteht eine akute Pyelonephritis links."
  },
  {
    "id": "voc-233",
    "fachbegriff": "Urolithiasis",
    "patientensprache": "Harnsteinleiden („Nierensteine“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Bekannte rezidivierende Urolithiasis."
  },
  {
    "id": "voc-234",
    "fachbegriff": "Niereninsuffizienz",
    "patientensprache": "Nierenschwäche („Die Nieren arbeiten nicht richtig“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es besteht eine chronische Niereninsuffizienz Stadium G3b."
  },
  {
    "id": "voc-235",
    "fachbegriff": "Akutes Nierenversagen",
    "patientensprache": "Plötzlicher Ausfall der Nierenfunktion („Nieren versagen“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Bei Exsikkose kam es zu einem prärenalen akuten Nierenversagen."
  },
  {
    "id": "voc-236",
    "fachbegriff": "Benigne Prostatahyperplasie (BPH)",
    "patientensprache": "Gutartige Prostatavergrößerung („Prostata“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Bekannte BPH mit Nykturie."
  },
  {
    "id": "voc-237",
    "fachbegriff": "Prostatakarzinom",
    "patientensprache": "Prostatakrebs",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es besteht ein lokal begrenztes Prostatakarzinom."
  },
  {
    "id": "voc-238",
    "fachbegriff": "Epilepsie",
    "patientensprache": "Anfallsleiden („Fallsucht (veraltet) / Anfälle“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Bekannte fokale Epilepsie."
  },
  {
    "id": "voc-239",
    "fachbegriff": "Transitorische ischämische Attacke (TIA)",
    "patientensprache": "Vorübergehende Durchblutungsstörung des Gehirns („Kleiner Schlaganfall / Schlägle“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Die Symptome bildeten sich innerhalb von 30 Minuten zurück, am ehesten TIA."
  },
  {
    "id": "voc-240",
    "fachbegriff": "Intrazerebrale Blutung",
    "patientensprache": "Hirnblutung",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Im CT zeigt sich eine intrazerebrale Blutung."
  },
  {
    "id": "voc-241",
    "fachbegriff": "Subarachnoidalblutung",
    "patientensprache": "Blutung unter die Spinnwebenhaut („Hirnblutung“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Bei Vernichtungskopfschmerz muss eine Subarachnoidalblutung ausgeschlossen werden."
  },
  {
    "id": "voc-242",
    "fachbegriff": "Meningitis",
    "patientensprache": "Hirnhautentzündung",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es besteht der V. a. bakterielle Meningitis."
  },
  {
    "id": "voc-243",
    "fachbegriff": "Migräne",
    "patientensprache": "Migräne",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Bekannte Migräne ohne Aura."
  },
  {
    "id": "voc-244",
    "fachbegriff": "Morbus Parkinson",
    "patientensprache": "Schüttellähmung („Parkinson“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Bekannter Morbus Parkinson seit 2019."
  },
  {
    "id": "voc-245",
    "fachbegriff": "Demenz",
    "patientensprache": "Fortschreitender Abbau geistiger Fähigkeiten („Er wird tüdelig / vergesslich“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es besteht eine mittelgradige Demenz."
  },
  {
    "id": "voc-246",
    "fachbegriff": "Delir",
    "patientensprache": "Akuter Verwirrtheitszustand („Durchgangssyndrom“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Postoperativ entwickelte sich ein Delir."
  },
  {
    "id": "voc-247",
    "fachbegriff": "Multiple Sklerose (MS)",
    "patientensprache": "Entzündliche Erkrankung des Nervensystems („MS“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Die Patientin hat eine schubförmige MS."
  },
  {
    "id": "voc-248",
    "fachbegriff": "Polyneuropathie",
    "patientensprache": "Erkrankung mehrerer Nerven („Taube Füße“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es besteht eine diabetische Polyneuropathie."
  },
  {
    "id": "voc-249",
    "fachbegriff": "Bandscheibenvorfall (Prolaps)",
    "patientensprache": "Bandscheibenvorfall („Bandscheibe raus“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es besteht ein Prolaps L4/5."
  },
  {
    "id": "voc-250",
    "fachbegriff": "Arthrose",
    "patientensprache": "Gelenkverschleiß („Verschleiß“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Bekannte Gonarthrose beidseits."
  },
  {
    "id": "voc-251",
    "fachbegriff": "Arthritis",
    "patientensprache": "Gelenkentzündung („Entzündetes Gelenk“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es besteht eine reaktive Arthritis."
  },
  {
    "id": "voc-252",
    "fachbegriff": "Rheumatoide Arthritis",
    "patientensprache": "Chronische Polyarthritis („Rheuma“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Bekannte rheumatoide Arthritis unter MTX."
  },
  {
    "id": "voc-253",
    "fachbegriff": "Fraktur",
    "patientensprache": "Knochenbruch („Bruch“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es zeigt sich eine distale Radiusfraktur."
  },
  {
    "id": "voc-254",
    "fachbegriff": "Luxation",
    "patientensprache": "Verrenkung („Ausgerenkt / rausgesprungen“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es besteht eine Schulterluxation rechts."
  },
  {
    "id": "voc-255",
    "fachbegriff": "Distorsion",
    "patientensprache": "Verstauchung („Umgeknickt“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es besteht eine Distorsion des oberen Sprunggelenks."
  },
  {
    "id": "voc-256",
    "fachbegriff": "Kontusion",
    "patientensprache": "Prellung",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Der Patient erlitt eine Thoraxkontusion."
  },
  {
    "id": "voc-257",
    "fachbegriff": "Commotio cerebri",
    "patientensprache": "Gehirnerschütterung",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Nach dem Sturz besteht eine Commotio cerebri."
  },
  {
    "id": "voc-258",
    "fachbegriff": "Schädel-Hirn-Trauma (SHT)",
    "patientensprache": "Verletzung von Schädel und Gehirn („Kopfverletzung“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es handelt sich um ein leichtes SHT."
  },
  {
    "id": "voc-259",
    "fachbegriff": "Erysipel",
    "patientensprache": "Wundrose",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es besteht ein Erysipel am linken Unterschenkel."
  },
  {
    "id": "voc-260",
    "fachbegriff": "Abszess",
    "patientensprache": "Eiteransammlung („Eiterbeule“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es zeigt sich ein perianaler Abszess."
  },
  {
    "id": "voc-261",
    "fachbegriff": "Phlegmone",
    "patientensprache": "Flächige eitrige Entzündung",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Die Phlegmone am Unterarm wurde chirurgisch versorgt."
  },
  {
    "id": "voc-262",
    "fachbegriff": "Herpes zoster",
    "patientensprache": "Gürtelrose",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es besteht ein Herpes zoster im Dermatom Th6."
  },
  {
    "id": "voc-263",
    "fachbegriff": "Psoriasis",
    "patientensprache": "Schuppenflechte",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Bekannte Psoriasis vulgaris."
  },
  {
    "id": "voc-264",
    "fachbegriff": "Neurodermitis (atopische Dermatitis)",
    "patientensprache": "Neurodermitis („Ekzem“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Das Kind leidet an Neurodermitis."
  },
  {
    "id": "voc-265",
    "fachbegriff": "Melanom",
    "patientensprache": "Schwarzer Hautkrebs („Hautkrebs“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es besteht ein malignes Melanom am Rücken."
  },
  {
    "id": "voc-266",
    "fachbegriff": "Anaphylaxie",
    "patientensprache": "Schwere allergische Reaktion („Allergischer Schock“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Nach dem Wespenstich kam es zu einer Anaphylaxie."
  },
  {
    "id": "voc-267",
    "fachbegriff": "Depression",
    "patientensprache": "Depression („Ich bin total down“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Bekannte rezidivierende depressive Störung."
  },
  {
    "id": "voc-268",
    "fachbegriff": "Angststörung",
    "patientensprache": "Angsterkrankung („Panik“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es besteht eine generalisierte Angststörung."
  },
  {
    "id": "voc-269",
    "fachbegriff": "Alkoholabhängigkeit",
    "patientensprache": "Alkoholsucht („Er trinkt zu viel“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Bekannte Alkoholabhängigkeit, seit 6 Monaten abstinent."
  },
  {
    "id": "voc-270",
    "fachbegriff": "Extrauteringravidität",
    "patientensprache": "Eileiterschwangerschaft („Schwangerschaft außerhalb der Gebärmutter“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es besteht der V. a. eine Extrauteringravidität."
  },
  {
    "id": "voc-271",
    "fachbegriff": "Präeklampsie",
    "patientensprache": "Schwangerschaftsvergiftung",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Bei Hypertonie und Proteinurie besteht V. a. Präeklampsie."
  },
  {
    "id": "voc-272",
    "fachbegriff": "Endometriose",
    "patientensprache": "Gebärmutterschleimhaut außerhalb der Gebärmutter",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Die Patientin leidet unter Endometriose."
  },
  {
    "id": "voc-273",
    "fachbegriff": "Mammakarzinom",
    "patientensprache": "Brustkrebs",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Z. n. Mammakarzinom links 2018."
  },
  {
    "id": "voc-274",
    "fachbegriff": "Otitis media",
    "patientensprache": "Mittelohrentzündung",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Das Kind hat eine akute Otitis media."
  },
  {
    "id": "voc-275",
    "fachbegriff": "Tonsillitis",
    "patientensprache": "Mandelentzündung („Angina / Mandelentzündung“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es besteht eine eitrige Tonsillitis."
  },
  {
    "id": "voc-276",
    "fachbegriff": "Sinusitis",
    "patientensprache": "Nasennebenhöhlenentzündung („Stirnhöhlenvereiterung“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es besteht eine akute Sinusitis maxillaris."
  },
  {
    "id": "voc-277",
    "fachbegriff": "Konjunktivitis",
    "patientensprache": "Bindehautentzündung („Rotes Auge“)",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Es besteht eine bakterielle Konjunktivitis."
  },
  {
    "id": "voc-278",
    "fachbegriff": "Katarakt",
    "patientensprache": "Grauer Star",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Z. n. Kataraktoperation beidseits."
  },
  {
    "id": "voc-279",
    "fachbegriff": "Glaukom",
    "patientensprache": "Grüner Star",
    "category": "Diagnosen & Krankheitsbilder",
    "example": "Bekanntes Glaukom unter Augentropfen."
  },
  {
    "id": "voc-280",
    "fachbegriff": "Cholezystektomie",
    "patientensprache": "Gallenblasenentfernung („Galle rausgenommen“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Z. n. laparoskopischer Cholezystektomie 2015."
  },
  {
    "id": "voc-281",
    "fachbegriff": "Hysterektomie",
    "patientensprache": "Gebärmutterentfernung („Gebärmutter rausgenommen“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Z. n. Hysterektomie wegen Myomen."
  },
  {
    "id": "voc-282",
    "fachbegriff": "Tonsillektomie",
    "patientensprache": "Mandelentfernung („Mandeln raus“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Z. n. Tonsillektomie im Kindesalter."
  },
  {
    "id": "voc-283",
    "fachbegriff": "Thyreoidektomie",
    "patientensprache": "Schilddrüsenentfernung („Schilddrüse raus“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Z. n. Thyreoidektomie, seitdem L-Thyroxin."
  },
  {
    "id": "voc-284",
    "fachbegriff": "Mastektomie",
    "patientensprache": "Brustentfernung („Brust abgenommen“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Z. n. Mastektomie links."
  },
  {
    "id": "voc-285",
    "fachbegriff": "Splenektomie",
    "patientensprache": "Milzentfernung („Milz raus“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Nach dem Unfall erfolgte eine Splenektomie."
  },
  {
    "id": "voc-286",
    "fachbegriff": "Nephrektomie",
    "patientensprache": "Nierenentfernung („Niere raus“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Z. n. Nephrektomie rechts bei Nierenzellkarzinom."
  },
  {
    "id": "voc-287",
    "fachbegriff": "Gastrektomie",
    "patientensprache": "Magenentfernung („Magen raus“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Z. n. Gastrektomie bei Magenkarzinom."
  },
  {
    "id": "voc-288",
    "fachbegriff": "Amputation",
    "patientensprache": "Abtrennung eines Körperteils („Bein abgenommen“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Z. n. Unterschenkelamputation rechts bei pAVK."
  },
  {
    "id": "voc-289",
    "fachbegriff": "Laparoskopie",
    "patientensprache": "Bauchspiegelung („Schlüssellochoperation“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Die Operation erfolgte laparoskopisch."
  },
  {
    "id": "voc-290",
    "fachbegriff": "Laparotomie",
    "patientensprache": "Bauchschnitt („Bauch aufgeschnitten“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Es erfolgte eine mediane Laparotomie."
  },
  {
    "id": "voc-291",
    "fachbegriff": "Osteosynthese",
    "patientensprache": "Operative Knochenbruchversorgung („Schrauben und Platten“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Die Fraktur wurde mittels Plattenosteosynthese versorgt."
  },
  {
    "id": "voc-292",
    "fachbegriff": "Totalendoprothese (TEP)",
    "patientensprache": "Künstliches Gelenk („Neue Hüfte / neues Knie“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Z. n. Hüft-TEP rechts 2022."
  },
  {
    "id": "voc-293",
    "fachbegriff": "Bypass-Operation",
    "patientensprache": "Umgehung eines verschlossenen Gefäßes („Bypass“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Z. n. aortokoronarem Bypass (ACVB) 2017."
  },
  {
    "id": "voc-294",
    "fachbegriff": "Stent-Implantation",
    "patientensprache": "Einsetzen einer Gefäßstütze („Röhrchen ins Herz“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Es erfolgte eine Stent-Implantation im RIVA."
  },
  {
    "id": "voc-295",
    "fachbegriff": "Herzkatheteruntersuchung (Koronarangiografie)",
    "patientensprache": "Herzkatheter",
    "category": "Eingriffe & Untersuchungen",
    "example": "Die Koronarangiografie zeigte eine Dreigefäßerkrankung."
  },
  {
    "id": "voc-296",
    "fachbegriff": "Perkutane Koronarintervention (PCI)",
    "patientensprache": "Aufdehnung der Herzkranzgefäße („Ballon und Stent“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Es erfolgte eine PCI mit Stent-Implantation."
  },
  {
    "id": "voc-297",
    "fachbegriff": "Herzschrittmacher-Implantation",
    "patientensprache": "Einsetzen eines Herzschrittmachers („Schrittmacher“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Bei AV-Block III° erfolgte eine Schrittmacher-Implantation."
  },
  {
    "id": "voc-298",
    "fachbegriff": "Kardioversion",
    "patientensprache": "Wiederherstellung des normalen Herzrhythmus („Herz wieder in den Takt bringen“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Es erfolgte eine elektrische Kardioversion."
  },
  {
    "id": "voc-299",
    "fachbegriff": "Defibrillation",
    "patientensprache": "Elektroschock bei Kammerflimmern („Schocken“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Nach Defibrillation zeigte sich ein Sinusrhythmus."
  },
  {
    "id": "voc-300",
    "fachbegriff": "Reanimation",
    "patientensprache": "Wiederbelebung",
    "category": "Eingriffe & Untersuchungen",
    "example": "Es erfolgte eine kardiopulmonale Reanimation über 10 Minuten."
  },
  {
    "id": "voc-301",
    "fachbegriff": "Intubation",
    "patientensprache": "Einführen eines Beatmungsschlauchs („Schlauch in den Hals“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Bei GCS 6 erfolgte die Intubation."
  },
  {
    "id": "voc-302",
    "fachbegriff": "Tracheotomie",
    "patientensprache": "Luftröhrenschnitt („Loch im Hals“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Bei Langzeitbeatmung erfolgte eine Tracheotomie."
  },
  {
    "id": "voc-303",
    "fachbegriff": "Thoraxdrainage",
    "patientensprache": "Schlauch in den Brustkorb („Drainage“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Bei Pneumothorax wurde eine Thoraxdrainage angelegt."
  },
  {
    "id": "voc-304",
    "fachbegriff": "Pleurapunktion",
    "patientensprache": "Punktion des Brustfellraums („Wasser aus der Lunge abgelassen“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Es wurden 1.200 ml Erguss abpunktiert."
  },
  {
    "id": "voc-305",
    "fachbegriff": "Aszitespunktion (Parazentese)",
    "patientensprache": "Bauchwasserpunktion („Wasser aus dem Bauch geholt“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Es erfolgte eine diagnostische Aszitespunktion."
  },
  {
    "id": "voc-306",
    "fachbegriff": "Lumbalpunktion",
    "patientensprache": "Nervenwasserentnahme („Rückenmarkspunktion“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Zum Ausschluss einer Meningitis erfolgte eine Lumbalpunktion."
  },
  {
    "id": "voc-307",
    "fachbegriff": "Knochenmarkpunktion",
    "patientensprache": "Entnahme von Knochenmark",
    "category": "Eingriffe & Untersuchungen",
    "example": "Die Knochenmarkpunktion bestätigte die Leukämie."
  },
  {
    "id": "voc-308",
    "fachbegriff": "Biopsie",
    "patientensprache": "Gewebeentnahme („Probe entnehmen“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Die Biopsie ergab ein Adenokarzinom."
  },
  {
    "id": "voc-309",
    "fachbegriff": "Gastroskopie (ÖGD)",
    "patientensprache": "Magenspiegelung („Schlauch schlucken“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Die Gastroskopie zeigte ein Ulcus duodeni."
  },
  {
    "id": "voc-310",
    "fachbegriff": "Koloskopie",
    "patientensprache": "Darmspiegelung",
    "category": "Eingriffe & Untersuchungen",
    "example": "Die Vorsorgekoloskopie war unauffällig."
  },
  {
    "id": "voc-311",
    "fachbegriff": "ERCP",
    "patientensprache": "Spiegelung der Gallen- und Pankreasgänge",
    "category": "Eingriffe & Untersuchungen",
    "example": "Per ERCP wurde der Stein aus dem Choledochus entfernt."
  },
  {
    "id": "voc-312",
    "fachbegriff": "Bronchoskopie",
    "patientensprache": "Lungenspiegelung",
    "category": "Eingriffe & Untersuchungen",
    "example": "Bronchoskopisch zeigte sich ein zentraler Tumor."
  },
  {
    "id": "voc-313",
    "fachbegriff": "Zystoskopie",
    "patientensprache": "Blasenspiegelung",
    "category": "Eingriffe & Untersuchungen",
    "example": "Bei Hämaturie erfolgte eine Zystoskopie."
  },
  {
    "id": "voc-314",
    "fachbegriff": "Sonografie",
    "patientensprache": "Ultraschalluntersuchung („Ultraschall“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Die Abdomensonografie zeigte eine Cholezystolithiasis."
  },
  {
    "id": "voc-315",
    "fachbegriff": "Echokardiografie",
    "patientensprache": "Herzultraschall („Herzecho“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "In der Echokardiografie zeigt sich eine EF von 35 %."
  },
  {
    "id": "voc-316",
    "fachbegriff": "Transösophageale Echokardiografie (TEE)",
    "patientensprache": "Herzultraschall über die Speiseröhre („Schluckecho“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Vor der Kardioversion erfolgte ein TEE."
  },
  {
    "id": "voc-317",
    "fachbegriff": "Duplexsonografie",
    "patientensprache": "Gefäßultraschall („Ultraschall der Adern“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Die Duplexsonografie bestätigte die TVT."
  },
  {
    "id": "voc-318",
    "fachbegriff": "Elektrokardiogramm (EKG)",
    "patientensprache": "Herzstromkurve („EKG“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Im EKG zeigen sich ST-Hebungen in V1–V4."
  },
  {
    "id": "voc-319",
    "fachbegriff": "Langzeit-EKG",
    "patientensprache": "24-Stunden-Herzstromkurve („Holter“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Im Langzeit-EKG zeigten sich Pausen bis 4 Sekunden."
  },
  {
    "id": "voc-320",
    "fachbegriff": "Belastungs-EKG (Ergometrie)",
    "patientensprache": "Herzstromkurve unter Belastung („Fahrradtest“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Das Belastungs-EKG war bis 150 Watt unauffällig."
  },
  {
    "id": "voc-321",
    "fachbegriff": "Elektroenzephalogramm (EEG)",
    "patientensprache": "Hirnstrommessung („Hirnströme messen“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Im EEG zeigten sich epilepsietypische Potenziale."
  },
  {
    "id": "voc-322",
    "fachbegriff": "Computertomografie (CT)",
    "patientensprache": "Schichtröntgen („CT / Röhre“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Das native CT des Schädels zeigte keine Blutung."
  },
  {
    "id": "voc-323",
    "fachbegriff": "Magnetresonanztomografie (MRT)",
    "patientensprache": "Kernspintomografie („Kernspin / Röhre“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Im MRT zeigt sich ein Bandscheibenvorfall."
  },
  {
    "id": "voc-324",
    "fachbegriff": "Röntgen-Thorax",
    "patientensprache": "Röntgenaufnahme der Lunge („Lunge röntgen“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Im Röntgen-Thorax zeigt sich ein Infiltrat rechts basal."
  },
  {
    "id": "voc-325",
    "fachbegriff": "Spirometrie (Lungenfunktionsprüfung)",
    "patientensprache": "Messung der Lungenfunktion („Pusten“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Die Spirometrie zeigte eine obstruktive Ventilationsstörung."
  },
  {
    "id": "voc-326",
    "fachbegriff": "Blutgasanalyse (BGA)",
    "patientensprache": "Messung von Blutgasen („Blut aus der Arterie“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Die BGA zeigte eine respiratorische Azidose."
  },
  {
    "id": "voc-327",
    "fachbegriff": "Auskultation",
    "patientensprache": "Abhören („Abhorchen“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Bei der Auskultation der Lunge hört man feuchte Rasselgeräusche."
  },
  {
    "id": "voc-328",
    "fachbegriff": "Palpation",
    "patientensprache": "Abtasten",
    "category": "Eingriffe & Untersuchungen",
    "example": "Bei der Palpation zeigt sich ein Druckschmerz im rechten Unterbauch."
  },
  {
    "id": "voc-329",
    "fachbegriff": "Perkussion",
    "patientensprache": "Abklopfen",
    "category": "Eingriffe & Untersuchungen",
    "example": "Perkutorisch zeigt sich eine Dämpfung rechts basal."
  },
  {
    "id": "voc-330",
    "fachbegriff": "Inspektion",
    "patientensprache": "Betrachtung („Anschauen“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Bei der Inspektion zeigt sich eine Rötung."
  },
  {
    "id": "voc-331",
    "fachbegriff": "Rektal-digitale Untersuchung (DRU)",
    "patientensprache": "Tastuntersuchung des Enddarms („Mit dem Finger in den Po“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Die DRU ergab Teerstuhl am Fingerling."
  },
  {
    "id": "voc-332",
    "fachbegriff": "Schellong-Test",
    "patientensprache": "Kreislauftest im Liegen und Stehen („Kreislauftest“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Der Schellong-Test war pathologisch."
  },
  {
    "id": "voc-333",
    "fachbegriff": "Lasègue-Zeichen",
    "patientensprache": "Nervendehnungstest am Bein",
    "category": "Eingriffe & Untersuchungen",
    "example": "Das Lasègue-Zeichen ist links bei 40° positiv."
  },
  {
    "id": "voc-334",
    "fachbegriff": "Murphy-Zeichen",
    "patientensprache": "Gallenblasen-Druckschmerztest",
    "category": "Eingriffe & Untersuchungen",
    "example": "Das Murphy-Zeichen ist positiv."
  },
  {
    "id": "voc-335",
    "fachbegriff": "McBurney-Punkt",
    "patientensprache": "Druckpunkt bei Blinddarmentzündung",
    "category": "Eingriffe & Untersuchungen",
    "example": "Es besteht ein Druckschmerz am McBurney-Punkt."
  },
  {
    "id": "voc-336",
    "fachbegriff": "Loslassschmerz (Blumberg-Zeichen)",
    "patientensprache": "Schmerz beim Loslassen der Bauchdecke",
    "category": "Eingriffe & Untersuchungen",
    "example": "Der kontralaterale Loslassschmerz ist positiv."
  },
  {
    "id": "voc-337",
    "fachbegriff": "Abwehrspannung",
    "patientensprache": "Reflektorische Anspannung der Bauchmuskeln („Bretthart“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Es besteht eine lokale Abwehrspannung im rechten Unterbauch."
  },
  {
    "id": "voc-338",
    "fachbegriff": "Glasgow Coma Scale (GCS)",
    "patientensprache": "Bewusstseinsskala",
    "category": "Eingriffe & Untersuchungen",
    "example": "Der Patient hat einen GCS von 14."
  },
  {
    "id": "voc-339",
    "fachbegriff": "NIHSS",
    "patientensprache": "Schlaganfallskala",
    "category": "Eingriffe & Untersuchungen",
    "example": "Bei Aufnahme beträgt der NIHSS 8 Punkte."
  },
  {
    "id": "voc-340",
    "fachbegriff": "Bluttransfusion",
    "patientensprache": "Blutübertragung („Blutkonserve bekommen“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Es wurden zwei Erythrozytenkonzentrate transfundiert."
  },
  {
    "id": "voc-341",
    "fachbegriff": "Dialyse",
    "patientensprache": "Blutwäsche",
    "category": "Eingriffe & Untersuchungen",
    "example": "Der Patient ist dreimal wöchentlich an der Dialyse."
  },
  {
    "id": "voc-342",
    "fachbegriff": "Lysetherapie (Thrombolyse)",
    "patientensprache": "Medikamentöse Auflösung eines Blutgerinnsels („Blutgerinnsel auflösen“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Innerhalb des Zeitfensters erfolgte eine Lysetherapie mit Alteplase."
  },
  {
    "id": "voc-343",
    "fachbegriff": "Thrombektomie",
    "patientensprache": "Entfernung eines Blutgerinnsels („Gerinnsel rausholen“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Es erfolgte eine mechanische Thrombektomie."
  },
  {
    "id": "voc-344",
    "fachbegriff": "Narkose (Allgemeinanästhesie)",
    "patientensprache": "Vollnarkose („Schlafen gelegt werden“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Der Eingriff erfolgte in Allgemeinanästhesie."
  },
  {
    "id": "voc-345",
    "fachbegriff": "Lokalanästhesie",
    "patientensprache": "Örtliche Betäubung („Spritze zum Betäuben“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Die Wundversorgung erfolgte in Lokalanästhesie."
  },
  {
    "id": "voc-346",
    "fachbegriff": "Periduralanästhesie (PDA)",
    "patientensprache": "Rückenmarksnahe Betäubung („Rückenspritze“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Unter der Geburt erhielt die Patientin eine PDA."
  },
  {
    "id": "voc-347",
    "fachbegriff": "Wunddébridement",
    "patientensprache": "Wundreinigung („Wunde sauber machen“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Es erfolgte ein chirurgisches Débridement."
  },
  {
    "id": "voc-348",
    "fachbegriff": "Naht",
    "patientensprache": "Wundverschluss mit Faden („Genäht“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Die Platzwunde wurde mit drei Einzelknopfnähten versorgt."
  },
  {
    "id": "voc-349",
    "fachbegriff": "Reposition",
    "patientensprache": "Einrichten („Wieder einrenken“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Die Luxation wurde geschlossen reponiert."
  },
  {
    "id": "voc-350",
    "fachbegriff": "Ruhigstellung",
    "patientensprache": "Immobilisation („Gips / Schiene“)",
    "category": "Eingriffe & Untersuchungen",
    "example": "Es erfolgte eine Ruhigstellung im Unterarmgips."
  },
  {
    "id": "voc-351",
    "fachbegriff": "Sectio caesarea",
    "patientensprache": "Kaiserschnitt",
    "category": "Eingriffe & Untersuchungen",
    "example": "Die Entbindung erfolgte per Sectio caesarea."
  },
  {
    "id": "voc-352",
    "fachbegriff": "Kürettage (Abrasio)",
    "patientensprache": "Ausschabung",
    "category": "Eingriffe & Untersuchungen",
    "example": "Nach dem Abort erfolgte eine Kürettage."
  },
  {
    "id": "voc-353",
    "fachbegriff": "Hämoglobin (Hb)",
    "patientensprache": "Roter Blutfarbstoff („Blutwert / Eisenwert“)",
    "category": "Labor & Diagnostik",
    "example": "Das Hb liegt bei 8,2 g/dl."
  },
  {
    "id": "voc-354",
    "fachbegriff": "Hämatokrit (Hkt)",
    "patientensprache": "Anteil der Blutzellen am Blutvolumen",
    "category": "Labor & Diagnostik",
    "example": "Der Hämatokrit ist bei Exsikkose erhöht."
  },
  {
    "id": "voc-355",
    "fachbegriff": "Erythrozyten",
    "patientensprache": "Rote Blutkörperchen",
    "category": "Labor & Diagnostik",
    "example": "Die Erythrozyten sind vermindert."
  },
  {
    "id": "voc-356",
    "fachbegriff": "Leukozyten",
    "patientensprache": "Weiße Blutkörperchen („Entzündungswerte“)",
    "category": "Labor & Diagnostik",
    "example": "Die Leukozyten sind auf 15,4 /nl erhöht."
  },
  {
    "id": "voc-357",
    "fachbegriff": "Leukozytose",
    "patientensprache": "Erhöhte Zahl weißer Blutkörperchen („Entzündungswerte hoch“)",
    "category": "Labor & Diagnostik",
    "example": "Es besteht eine Leukozytose."
  },
  {
    "id": "voc-358",
    "fachbegriff": "Leukopenie",
    "patientensprache": "Verminderte Zahl weißer Blutkörperchen",
    "category": "Labor & Diagnostik",
    "example": "Unter Chemotherapie trat eine Leukopenie auf."
  },
  {
    "id": "voc-359",
    "fachbegriff": "Thrombozyten",
    "patientensprache": "Blutplättchen",
    "category": "Labor & Diagnostik",
    "example": "Die Thrombozyten liegen bei 45 /nl."
  },
  {
    "id": "voc-360",
    "fachbegriff": "Thrombozytopenie",
    "patientensprache": "Mangel an Blutplättchen („Zu wenig Blutplättchen“)",
    "category": "Labor & Diagnostik",
    "example": "Es besteht eine heparininduzierte Thrombozytopenie."
  },
  {
    "id": "voc-361",
    "fachbegriff": "Differenzialblutbild",
    "patientensprache": "Genaue Aufschlüsselung der weißen Blutkörperchen",
    "category": "Labor & Diagnostik",
    "example": "Im Differenzialblutbild zeigt sich eine Linksverschiebung."
  },
  {
    "id": "voc-362",
    "fachbegriff": "Mittleres korpuskuläres Volumen (MCV)",
    "patientensprache": "Durchschnittliche Größe der roten Blutkörperchen",
    "category": "Labor & Diagnostik",
    "example": "Das MCV ist mit 72 fl erniedrigt (mikrozytär)."
  },
  {
    "id": "voc-363",
    "fachbegriff": "Ferritin",
    "patientensprache": "Eisenspeicherwert („Eisenwert“)",
    "category": "Labor & Diagnostik",
    "example": "Das Ferritin ist mit 6 µg/l deutlich erniedrigt."
  },
  {
    "id": "voc-364",
    "fachbegriff": "C-reaktives Protein (CRP)",
    "patientensprache": "Entzündungswert",
    "category": "Labor & Diagnostik",
    "example": "Das CRP ist auf 145 mg/l erhöht."
  },
  {
    "id": "voc-365",
    "fachbegriff": "Procalcitonin (PCT)",
    "patientensprache": "Marker für bakterielle Infektionen",
    "category": "Labor & Diagnostik",
    "example": "Das PCT spricht für eine bakterielle Genese."
  },
  {
    "id": "voc-366",
    "fachbegriff": "Blutsenkungsgeschwindigkeit (BSG)",
    "patientensprache": "Blutsenkung",
    "category": "Labor & Diagnostik",
    "example": "Die BSG ist beschleunigt."
  },
  {
    "id": "voc-367",
    "fachbegriff": "Kreatinin",
    "patientensprache": "Nierenwert",
    "category": "Labor & Diagnostik",
    "example": "Das Kreatinin ist auf 2,1 mg/dl gestiegen."
  },
  {
    "id": "voc-368",
    "fachbegriff": "Glomeruläre Filtrationsrate (eGFR)",
    "patientensprache": "Maß für die Nierenfunktion („Nierenleistung“)",
    "category": "Labor & Diagnostik",
    "example": "Die eGFR beträgt 38 ml/min."
  },
  {
    "id": "voc-369",
    "fachbegriff": "Harnstoff",
    "patientensprache": "Nierenwert",
    "category": "Labor & Diagnostik",
    "example": "Der Harnstoff ist bei Exsikkose erhöht."
  },
  {
    "id": "voc-370",
    "fachbegriff": "Kalium",
    "patientensprache": "Kalium",
    "category": "Labor & Diagnostik",
    "example": "Das Kalium liegt bei 5,9 mmol/l (Hyperkaliämie)."
  },
  {
    "id": "voc-371",
    "fachbegriff": "Natrium",
    "patientensprache": "Natrium (Salz) („Salzwert“)",
    "category": "Labor & Diagnostik",
    "example": "Es besteht eine Hyponatriämie von 126 mmol/l."
  },
  {
    "id": "voc-372",
    "fachbegriff": "Kalzium",
    "patientensprache": "Kalzium („Kalziumwert“)",
    "category": "Labor & Diagnostik",
    "example": "Das Kalzium ist bei Knochenmetastasen erhöht."
  },
  {
    "id": "voc-373",
    "fachbegriff": "Magnesium",
    "patientensprache": "Magnesium",
    "category": "Labor & Diagnostik",
    "example": "Das Magnesium wurde substituiert."
  },
  {
    "id": "voc-374",
    "fachbegriff": "Hyperkaliämie",
    "patientensprache": "Erhöhter Kaliumwert („Zu viel Kalium“)",
    "category": "Labor & Diagnostik",
    "example": "Bei Hyperkaliämie zeigen sich zeltförmige T-Wellen."
  },
  {
    "id": "voc-375",
    "fachbegriff": "Hypokaliämie",
    "patientensprache": "Erniedrigter Kaliumwert („Zu wenig Kalium“)",
    "category": "Labor & Diagnostik",
    "example": "Unter Diuretika entwickelte sich eine Hypokaliämie."
  },
  {
    "id": "voc-376",
    "fachbegriff": "Hyponatriämie",
    "patientensprache": "Erniedrigter Natriumwert („Zu wenig Salz im Blut“)",
    "category": "Labor & Diagnostik",
    "example": "Die Hyponatriämie ist am ehesten medikamentös bedingt."
  },
  {
    "id": "voc-377",
    "fachbegriff": "Glukose (Blutzucker)",
    "patientensprache": "Blutzucker („Zuckerwert“)",
    "category": "Labor & Diagnostik",
    "example": "Der Nüchternblutzucker liegt bei 168 mg/dl."
  },
  {
    "id": "voc-378",
    "fachbegriff": "HbA1c",
    "patientensprache": "Langzeitblutzucker („Langzeitzucker“)",
    "category": "Labor & Diagnostik",
    "example": "Der HbA1c beträgt 8,4 %."
  },
  {
    "id": "voc-379",
    "fachbegriff": "Troponin",
    "patientensprache": "Herzmuskelenzym („Herzwert“)",
    "category": "Labor & Diagnostik",
    "example": "Das hochsensitive Troponin T ist dynamisch ansteigend."
  },
  {
    "id": "voc-380",
    "fachbegriff": "Kreatinkinase (CK)",
    "patientensprache": "Muskelenzym („Muskelwert“)",
    "category": "Labor & Diagnostik",
    "example": "Die CK ist nach dem Sturz erhöht."
  },
  {
    "id": "voc-381",
    "fachbegriff": "NT-proBNP",
    "patientensprache": "Herzinsuffizienzmarker („Herzwert“)",
    "category": "Labor & Diagnostik",
    "example": "Das NT-proBNP ist deutlich erhöht."
  },
  {
    "id": "voc-382",
    "fachbegriff": "D-Dimere",
    "patientensprache": "Gerinnungsabbauprodukte („Thrombosewert“)",
    "category": "Labor & Diagnostik",
    "example": "Die D-Dimere sind erhöht."
  },
  {
    "id": "voc-383",
    "fachbegriff": "International Normalized Ratio (INR)",
    "patientensprache": "Gerinnungswert („Quick / Marcumarwert“)",
    "category": "Labor & Diagnostik",
    "example": "Der INR liegt im Zielbereich von 2–3."
  },
  {
    "id": "voc-384",
    "fachbegriff": "Quick-Wert",
    "patientensprache": "Gerinnungswert („Quickwert“)",
    "category": "Labor & Diagnostik",
    "example": "Der Quick ist unter Marcumar auf 25 % gesenkt."
  },
  {
    "id": "voc-385",
    "fachbegriff": "Partielle Thromboplastinzeit (PTT)",
    "patientensprache": "Gerinnungswert",
    "category": "Labor & Diagnostik",
    "example": "Die PTT ist unter Heparin verlängert."
  },
  {
    "id": "voc-386",
    "fachbegriff": "Bilirubin",
    "patientensprache": "Gallenfarbstoff („Gelbsuchtwert“)",
    "category": "Labor & Diagnostik",
    "example": "Das Bilirubin ist auf 4,2 mg/dl erhöht."
  },
  {
    "id": "voc-387",
    "fachbegriff": "Transaminasen (GOT/GPT)",
    "patientensprache": "Leberwerte",
    "category": "Labor & Diagnostik",
    "example": "Die Transaminasen sind auf das Dreifache erhöht."
  },
  {
    "id": "voc-388",
    "fachbegriff": "Gamma-GT (γ-GT)",
    "patientensprache": "Leber- und Gallenwert („Leberwert“)",
    "category": "Labor & Diagnostik",
    "example": "Die γ-GT ist bei Alkoholkonsum erhöht."
  },
  {
    "id": "voc-389",
    "fachbegriff": "Alkalische Phosphatase (AP)",
    "patientensprache": "Gallen- und Knochenwert",
    "category": "Labor & Diagnostik",
    "example": "Die AP ist bei Cholestase erhöht."
  },
  {
    "id": "voc-390",
    "fachbegriff": "Lipase",
    "patientensprache": "Bauchspeicheldrüsenenzym („Bauchspeicheldrüsenwert“)",
    "category": "Labor & Diagnostik",
    "example": "Die Lipase ist auf das Dreifache des Normwerts erhöht."
  },
  {
    "id": "voc-391",
    "fachbegriff": "Albumin",
    "patientensprache": "Bluteiweiß („Eiweißwert“)",
    "category": "Labor & Diagnostik",
    "example": "Das Albumin ist bei Leberzirrhose erniedrigt."
  },
  {
    "id": "voc-392",
    "fachbegriff": "Laktat",
    "patientensprache": "Milchsäure",
    "category": "Labor & Diagnostik",
    "example": "Das Laktat ist bei Sepsis auf 4,1 mmol/l erhöht."
  },
  {
    "id": "voc-393",
    "fachbegriff": "Laktatdehydrogenase (LDH)",
    "patientensprache": "Zellzerfallsenzym",
    "category": "Labor & Diagnostik",
    "example": "Die LDH ist bei Hämolyse erhöht."
  },
  {
    "id": "voc-394",
    "fachbegriff": "Thyreoidea-stimulierendes Hormon (TSH)",
    "patientensprache": "Schilddrüsenwert",
    "category": "Labor & Diagnostik",
    "example": "Das TSH ist supprimiert."
  },
  {
    "id": "voc-395",
    "fachbegriff": "Freies Thyroxin (fT4)",
    "patientensprache": "Schilddrüsenhormon („Schilddrüsenwert“)",
    "category": "Labor & Diagnostik",
    "example": "Das fT4 ist erhöht."
  },
  {
    "id": "voc-396",
    "fachbegriff": "Harnsäure",
    "patientensprache": "Harnsäure („Gichtwert“)",
    "category": "Labor & Diagnostik",
    "example": "Die Harnsäure liegt bei 9,2 mg/dl."
  },
  {
    "id": "voc-397",
    "fachbegriff": "Cholesterin (LDL/HDL)",
    "patientensprache": "Blutfette („Cholesterin“)",
    "category": "Labor & Diagnostik",
    "example": "Das LDL-Cholesterin beträgt 165 mg/dl."
  },
  {
    "id": "voc-398",
    "fachbegriff": "Triglyzeride",
    "patientensprache": "Blutfette",
    "category": "Labor & Diagnostik",
    "example": "Die Triglyzeride sind deutlich erhöht."
  },
  {
    "id": "voc-399",
    "fachbegriff": "Beta-HCG (β-HCG)",
    "patientensprache": "Schwangerschaftshormon („Schwangerschaftstest“)",
    "category": "Labor & Diagnostik",
    "example": "Das β-HCG im Serum ist positiv."
  },
  {
    "id": "voc-400",
    "fachbegriff": "Urinstatus (U-Stix)",
    "patientensprache": "Urinschnelltest („Urinteststreifen“)",
    "category": "Labor & Diagnostik",
    "example": "Im U-Stix zeigen sich Leukozyten und Nitrit."
  },
  {
    "id": "voc-401",
    "fachbegriff": "Urinkultur",
    "patientensprache": "Bakterienanzucht aus dem Urin („Urinprobe ins Labor“)",
    "category": "Labor & Diagnostik",
    "example": "Die Urinkultur ergab E. coli > 10^5 KBE/ml."
  },
  {
    "id": "voc-402",
    "fachbegriff": "Blutkultur",
    "patientensprache": "Bakterienanzucht aus dem Blut („Blutprobe auf Bakterien“)",
    "category": "Labor & Diagnostik",
    "example": "Vor Antibiotikagabe wurden zwei Blutkulturpaare abgenommen."
  },
  {
    "id": "voc-403",
    "fachbegriff": "Antibiogramm",
    "patientensprache": "Resistenztestung („Welches Antibiotikum hilft“)",
    "category": "Labor & Diagnostik",
    "example": "Laut Antibiogramm ist der Erreger sensibel auf Ceftriaxon."
  },
  {
    "id": "voc-404",
    "fachbegriff": "Abstrich",
    "patientensprache": "Probenentnahme von Schleimhaut oder Wunde („Abstrich“)",
    "category": "Labor & Diagnostik",
    "example": "Es wurde ein Wundabstrich auf MRSA entnommen."
  },
  {
    "id": "voc-405",
    "fachbegriff": "Proteinurie",
    "patientensprache": "Eiweiß im Urin",
    "category": "Labor & Diagnostik",
    "example": "Es besteht eine Proteinurie bei diabetischer Nephropathie."
  },
  {
    "id": "voc-406",
    "fachbegriff": "Glukosurie",
    "patientensprache": "Zucker im Urin",
    "category": "Labor & Diagnostik",
    "example": "Unter SGLT2-Hemmern tritt eine Glukosurie auf."
  },
  {
    "id": "voc-407",
    "fachbegriff": "Azidose",
    "patientensprache": "Übersäuerung des Blutes („Übersäuerung“)",
    "category": "Labor & Diagnostik",
    "example": "Die BGA zeigt eine metabolische Azidose."
  },
  {
    "id": "voc-408",
    "fachbegriff": "Alkalose",
    "patientensprache": "Basenüberschuss im Blut",
    "category": "Labor & Diagnostik",
    "example": "Bei Hyperventilation entsteht eine respiratorische Alkalose."
  },
  {
    "id": "voc-409",
    "fachbegriff": "Normwert",
    "patientensprache": "Referenzbereich („Normal“)",
    "category": "Labor & Diagnostik",
    "example": "Die Werte liegen im Normbereich."
  },
  {
    "id": "voc-410",
    "fachbegriff": "Liquordiagnostik",
    "patientensprache": "Untersuchung des Nervenwassers („Nervenwasseruntersuchung“)",
    "category": "Labor & Diagnostik",
    "example": "Die Liquordiagnostik zeigt eine Pleozytose."
  },
  {
    "id": "voc-411",
    "fachbegriff": "Tumormarker",
    "patientensprache": "Laborwerte bei Krebserkrankungen („Krebswert“)",
    "category": "Labor & Diagnostik",
    "example": "Tumormarker eignen sich vor allem zur Verlaufskontrolle."
  },
  {
    "id": "voc-412",
    "fachbegriff": "Antibiotikum",
    "patientensprache": "Medikament gegen Bakterien („Antibiotika“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Es wurde eine kalkulierte Antibiotikatherapie mit Ceftriaxon begonnen."
  },
  {
    "id": "voc-413",
    "fachbegriff": "Antipyretikum",
    "patientensprache": "Fiebersenkendes Mittel („Fiebermittel“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Paracetamol wirkt analgetisch und antipyretisch."
  },
  {
    "id": "voc-414",
    "fachbegriff": "Antiemetikum",
    "patientensprache": "Mittel gegen Übelkeit („Was gegen das Spucken“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Bei Übelkeit erhielt die Patientin ein Antiemetikum."
  },
  {
    "id": "voc-415",
    "fachbegriff": "Antihypertensivum",
    "patientensprache": "Blutdrucksenker („Blutdrucktablette“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Die antihypertensive Therapie wurde intensiviert."
  },
  {
    "id": "voc-416",
    "fachbegriff": "Antidiabetikum",
    "patientensprache": "Mittel gegen Diabetes („Zuckertablette“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Das orale Antidiabetikum wurde vor der OP pausiert."
  },
  {
    "id": "voc-417",
    "fachbegriff": "Diuretikum",
    "patientensprache": "Harntreibendes Mittel („Wassertablette“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Das Diuretikum wurde wegen Exsikkose pausiert."
  },
  {
    "id": "voc-418",
    "fachbegriff": "Thrombozytenaggregationshemmer",
    "patientensprache": "Mittel gegen das Verklumpen von Blutplättchen („Blutverdünner (ASS)“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Nach Stent-Implantation erhält der Patient zwei Thrombozytenaggregationshemmer."
  },
  {
    "id": "voc-419",
    "fachbegriff": "Direkte orale Antikoagulanzien (DOAK)",
    "patientensprache": "Neue Blutverdünner („Blutverdünner“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Die Patientin nimmt ein DOAK bei Vorhofflimmern."
  },
  {
    "id": "voc-420",
    "fachbegriff": "Vitamin-K-Antagonist",
    "patientensprache": "Älterer Blutverdünner (Marcumar) („Marcumar“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Unter Vitamin-K-Antagonisten muss der INR regelmäßig kontrolliert werden."
  },
  {
    "id": "voc-421",
    "fachbegriff": "Heparin",
    "patientensprache": "Gerinnungshemmer zur Spritze („Thrombosespritze“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Zur Thromboseprophylaxe erhält der Patient niedermolekulares Heparin s.c."
  },
  {
    "id": "voc-422",
    "fachbegriff": "Betablocker",
    "patientensprache": "Herzfrequenz- und Blutdrucksenker („Betablocker“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Der Betablocker wurde wegen Bradykardie reduziert."
  },
  {
    "id": "voc-423",
    "fachbegriff": "ACE-Hemmer",
    "patientensprache": "Blutdrucksenker („Blutdrucktablette“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Unter dem ACE-Hemmer trat ein trockener Reizhusten auf."
  },
  {
    "id": "voc-424",
    "fachbegriff": "Angiotensin-Rezeptorblocker (Sartan)",
    "patientensprache": "Blutdrucksenker („Blutdrucktablette“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Wegen Reizhusten wurde auf ein Sartan umgestellt."
  },
  {
    "id": "voc-425",
    "fachbegriff": "Kalziumantagonist",
    "patientensprache": "Blutdrucksenker („Blutdrucktablette“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Unter dem Kalziumantagonisten traten Knöchelödeme auf."
  },
  {
    "id": "voc-426",
    "fachbegriff": "Statin",
    "patientensprache": "Cholesterinsenker („Cholesterintablette“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Die Statintherapie wird fortgeführt."
  },
  {
    "id": "voc-427",
    "fachbegriff": "Nitrat",
    "patientensprache": "Gefäßerweiterndes Mittel bei Angina pectoris („Nitrospray“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Nach zwei Hüben Nitrospray besserten sich die Beschwerden."
  },
  {
    "id": "voc-428",
    "fachbegriff": "Antiarrhythmikum",
    "patientensprache": "Mittel gegen Herzrhythmusstörungen",
    "category": "Medikamente & Pharmakologie",
    "example": "Amiodaron ist ein Antiarrhythmikum der Klasse III."
  },
  {
    "id": "voc-429",
    "fachbegriff": "Digitalis (Herzglykosid)",
    "patientensprache": "Herzstärkungsmittel („Digitalis“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Unter Digitalis zeigt sich eine muldenförmige ST-Senkung."
  },
  {
    "id": "voc-430",
    "fachbegriff": "Protonenpumpeninhibitor (PPI)",
    "patientensprache": "Magensäureblocker („Magenschutz“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Unter NSAR sollte ein PPI als Magenschutz gegeben werden."
  },
  {
    "id": "voc-431",
    "fachbegriff": "Laxans",
    "patientensprache": "Abführmittel",
    "category": "Medikamente & Pharmakologie",
    "example": "Bei Opioidtherapie erhält der Patient ein Laxans."
  },
  {
    "id": "voc-432",
    "fachbegriff": "Antidiarrhoikum",
    "patientensprache": "Mittel gegen Durchfall („Stopfmittel“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Loperamid ist ein Antidiarrhoikum."
  },
  {
    "id": "voc-433",
    "fachbegriff": "Spasmolytikum",
    "patientensprache": "Krampflösendes Mittel („Was gegen Krämpfe“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Bei Koliken wird Butylscopolamin als Spasmolytikum gegeben."
  },
  {
    "id": "voc-434",
    "fachbegriff": "Nichtsteroidales Antirheumatikum (NSAR)",
    "patientensprache": "Entzündungshemmendes Schmerzmittel („Ibu“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Ibuprofen gehört zu den NSAR."
  },
  {
    "id": "voc-435",
    "fachbegriff": "Opioid",
    "patientensprache": "Starkes Schmerzmittel („Morphium“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Bei starken Tumorschmerzen wird ein Opioid eingesetzt."
  },
  {
    "id": "voc-436",
    "fachbegriff": "Glukokortikoid",
    "patientensprache": "Kortison",
    "category": "Medikamente & Pharmakologie",
    "example": "Bei der Exazerbation erhält der Patient Prednisolon 40 mg."
  },
  {
    "id": "voc-437",
    "fachbegriff": "Bronchodilatator",
    "patientensprache": "Atemwegserweiterndes Mittel („Asthmaspray“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Salbutamol ist ein kurzwirksamer Bronchodilatator."
  },
  {
    "id": "voc-438",
    "fachbegriff": "Inhalatives Kortikosteroid (ICS)",
    "patientensprache": "Kortisonspray zum Inhalieren („Kortisonspray“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Das ICS wird morgens und abends inhaliert."
  },
  {
    "id": "voc-439",
    "fachbegriff": "Antihistaminikum",
    "patientensprache": "Antiallergikum („Allergietablette“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Gegen den Juckreiz erhielt die Patientin ein Antihistaminikum."
  },
  {
    "id": "voc-440",
    "fachbegriff": "Adrenalin (Epinephrin)",
    "patientensprache": "Notfallmedikament bei Anaphylaxie („Adrenalinspritze“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Bei Anaphylaxie wird Adrenalin 0,5 mg i.m. verabreicht."
  },
  {
    "id": "voc-441",
    "fachbegriff": "Insulin",
    "patientensprache": "Blutzuckersenkendes Hormon („Insulin / Spritze“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Das Basalinsulin wird abends gespritzt."
  },
  {
    "id": "voc-442",
    "fachbegriff": "Metformin",
    "patientensprache": "Orales Antidiabetikum („Zuckertablette“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Metformin muss vor Kontrastmittelgabe ggf. pausiert werden."
  },
  {
    "id": "voc-443",
    "fachbegriff": "L-Thyroxin (Levothyroxin)",
    "patientensprache": "Schilddrüsenhormon („Schilddrüsentablette“)",
    "category": "Medikamente & Pharmakologie",
    "example": "L-Thyroxin wird morgens nüchtern eingenommen."
  },
  {
    "id": "voc-444",
    "fachbegriff": "Thyreostatikum",
    "patientensprache": "Mittel gegen Schilddrüsenüberfunktion",
    "category": "Medikamente & Pharmakologie",
    "example": "Thiamazol ist ein Thyreostatikum."
  },
  {
    "id": "voc-445",
    "fachbegriff": "Antidepressivum",
    "patientensprache": "Mittel gegen Depression („Stimmungsaufheller“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Unter dem Antidepressivum hat sich die Stimmung gebessert."
  },
  {
    "id": "voc-446",
    "fachbegriff": "Antipsychotikum (Neuroleptikum)",
    "patientensprache": "Mittel gegen Psychosen („Beruhigungsmittel“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Bei Delir wurde niedrig dosiert ein Antipsychotikum gegeben."
  },
  {
    "id": "voc-447",
    "fachbegriff": "Benzodiazepin",
    "patientensprache": "Beruhigungs- und Schlafmittel („Beruhigungstablette“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Benzodiazepine erhöhen bei älteren Patienten das Sturzrisiko."
  },
  {
    "id": "voc-448",
    "fachbegriff": "Hypnotikum",
    "patientensprache": "Schlafmittel („Schlaftablette“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Das Hypnotikum wurde wegen Sturzgefahr abgesetzt."
  },
  {
    "id": "voc-449",
    "fachbegriff": "Antikonvulsivum (Antiepileptikum)",
    "patientensprache": "Mittel gegen Krampfanfälle („Anfallstablette“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Levetiracetam ist ein Antiepileptikum."
  },
  {
    "id": "voc-450",
    "fachbegriff": "Sedativum",
    "patientensprache": "Beruhigungsmittel",
    "category": "Medikamente & Pharmakologie",
    "example": "Vor der Endoskopie erhielt der Patient ein Sedativum."
  },
  {
    "id": "voc-451",
    "fachbegriff": "Virostatikum",
    "patientensprache": "Mittel gegen Viren",
    "category": "Medikamente & Pharmakologie",
    "example": "Bei Herpes zoster wird ein Virostatikum gegeben."
  },
  {
    "id": "voc-452",
    "fachbegriff": "Antimykotikum",
    "patientensprache": "Mittel gegen Pilze („Pilzsalbe“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Der Fußpilz wird mit einem Antimykotikum behandelt."
  },
  {
    "id": "voc-453",
    "fachbegriff": "Zytostatikum",
    "patientensprache": "Chemotherapeutikum („Chemo“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Unter dem Zytostatikum kam es zu Haarausfall."
  },
  {
    "id": "voc-454",
    "fachbegriff": "Immunsuppressivum",
    "patientensprache": "Mittel zur Unterdrückung des Immunsystems",
    "category": "Medikamente & Pharmakologie",
    "example": "Nach Nierentransplantation erhält der Patient Immunsuppressiva."
  },
  {
    "id": "voc-455",
    "fachbegriff": "Bisphosphonat",
    "patientensprache": "Mittel gegen Knochenschwund („Osteoporosetablette“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Das Bisphosphonat wird einmal wöchentlich nüchtern mit Wasser eingenommen."
  },
  {
    "id": "voc-456",
    "fachbegriff": "Kaliumpräparat",
    "patientensprache": "Kaliumersatz („Kaliumtablette“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Bei Hypokaliämie wurde ein Kaliumpräparat verordnet."
  },
  {
    "id": "voc-457",
    "fachbegriff": "Eisenpräparat",
    "patientensprache": "Eisenersatz („Eisentablette“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Unter dem Eisenpräparat ist der Stuhl schwarz gefärbt."
  },
  {
    "id": "voc-458",
    "fachbegriff": "Vollelektrolytlösung",
    "patientensprache": "Infusion mit Salzen („Tropf“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Es wurden 1.000 ml Vollelektrolytlösung i.v. gegeben."
  },
  {
    "id": "voc-459",
    "fachbegriff": "Kristalloide Infusion",
    "patientensprache": "Infusionslösung („Tropf / Infusion“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Zur Volumensubstitution erhält der Patient kristalloide Lösungen."
  },
  {
    "id": "voc-460",
    "fachbegriff": "Analgosedierung",
    "patientensprache": "Schmerz- und Beruhigungsmedikation („Künstliches Koma“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Der Patient ist analgosediert und beatmet."
  },
  {
    "id": "voc-461",
    "fachbegriff": "Lokalanästhetikum",
    "patientensprache": "Örtliches Betäubungsmittel („Betäubungsspritze“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Vor der Naht wurde ein Lokalanästhetikum infiltriert."
  },
  {
    "id": "voc-462",
    "fachbegriff": "Kontrastmittel",
    "patientensprache": "Mittel zur besseren Darstellung im Röntgen („Kontrastmittel“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Vor der CT mit Kontrastmittel muss die Nierenfunktion bekannt sein."
  },
  {
    "id": "voc-463",
    "fachbegriff": "Placebo",
    "patientensprache": "Scheinmedikament („Zuckerpille“)",
    "category": "Medikamente & Pharmakologie",
    "example": ""
  },
  {
    "id": "voc-464",
    "fachbegriff": "Generikum",
    "patientensprache": "Nachahmerpräparat („Billigmittel / gleiches Mittel von einer anderen Firma“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Die Apotheke hat ein Generikum ausgegeben."
  },
  {
    "id": "voc-465",
    "fachbegriff": "Retardpräparat",
    "patientensprache": "Medikament mit verzögerter Wirkstofffreisetzung („Langzeittablette“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Retardtabletten dürfen nicht geteilt werden."
  },
  {
    "id": "voc-466",
    "fachbegriff": "Bedarfsmedikation",
    "patientensprache": "Medikament nur bei Bedarf („Nur wenn nötig“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Als Bedarfsmedikation ist Metamizol 1 g i.v. angeordnet."
  },
  {
    "id": "voc-467",
    "fachbegriff": "Dauermedikation",
    "patientensprache": "Regelmäßig einzunehmende Medikamente („Meine Tabletten“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Die Dauermedikation wird unverändert fortgeführt."
  },
  {
    "id": "voc-468",
    "fachbegriff": "Unerwünschte Arzneimittelwirkung (UAW)",
    "patientensprache": "Nebenwirkung",
    "category": "Medikamente & Pharmakologie",
    "example": "Als UAW trat eine Hyponatriämie auf."
  },
  {
    "id": "voc-469",
    "fachbegriff": "Kontraindikation",
    "patientensprache": "Gegenanzeige („Darf nicht gegeben werden“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Eine Kontraindikation für die Lyse besteht nicht."
  },
  {
    "id": "voc-470",
    "fachbegriff": "Indikation",
    "patientensprache": "Grund für eine Behandlung („Warum das gemacht wird“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Die Indikation zur Operation ist gegeben."
  },
  {
    "id": "voc-471",
    "fachbegriff": "Applikation",
    "patientensprache": "Verabreichung („Geben“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Die Applikation erfolgt intravenös."
  },
  {
    "id": "voc-472",
    "fachbegriff": "Compliance (Adhärenz)",
    "patientensprache": "Therapietreue („Ob man die Tabletten nimmt“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Die Adhärenz ist bei komplexem Medikationsplan eingeschränkt."
  },
  {
    "id": "voc-473",
    "fachbegriff": "Medikationsplan",
    "patientensprache": "Liste aller Medikamente („Tablettenzettel“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Bitte bringen Sie Ihren Medikationsplan mit."
  },
  {
    "id": "voc-474",
    "fachbegriff": "Polypharmazie",
    "patientensprache": "Einnahme vieler Medikamente gleichzeitig („Tabletten-Cocktail“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Bei Polypharmazie steigt das Risiko für Wechselwirkungen."
  },
  {
    "id": "voc-475",
    "fachbegriff": "Wechselwirkung (Interaktion)",
    "patientensprache": "Gegenseitige Beeinflussung von Medikamenten („Die Tabletten vertragen sich nicht“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Zwischen Clarithromycin und Simvastatin besteht eine relevante Interaktion."
  },
  {
    "id": "voc-476",
    "fachbegriff": "Paracetamol",
    "patientensprache": "Schmerz- und Fiebermittel („Paracetamol“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Paracetamol 1 g p.o. bis zu viermal täglich."
  },
  {
    "id": "voc-477",
    "fachbegriff": "Ibuprofen",
    "patientensprache": "Schmerz- und Entzündungshemmer („Ibu“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Ibuprofen 400 mg bei Bedarf, max. 3x täglich."
  },
  {
    "id": "voc-478",
    "fachbegriff": "Metamizol",
    "patientensprache": "Starkes Nicht-Opioid-Schmerzmittel („Novalgin-Tropfen“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Metamizol kann selten eine Agranulozytose auslösen."
  },
  {
    "id": "voc-479",
    "fachbegriff": "Acetylsalicylsäure (ASS)",
    "patientensprache": "Thrombozytenaggregationshemmer und Schmerzmittel („Aspirin“)",
    "category": "Medikamente & Pharmakologie",
    "example": "ASS 100 mg 1-0-0 zur Sekundärprophylaxe."
  },
  {
    "id": "voc-480",
    "fachbegriff": "Morphin",
    "patientensprache": "Starkes Opioid („Morphium“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Bei Dyspnoe in der Palliativsituation erhält die Patientin Morphin s.c."
  },
  {
    "id": "voc-481",
    "fachbegriff": "Furosemid",
    "patientensprache": "Schleifendiuretikum („Wassertablette / Lasix“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Furosemid 40 mg i.v. bei Lungenödem."
  },
  {
    "id": "voc-482",
    "fachbegriff": "Prednisolon",
    "patientensprache": "Glukokortikoid („Kortison“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Prednisolon 50 mg p.o. für 5 Tage."
  },
  {
    "id": "voc-483",
    "fachbegriff": "Salbutamol",
    "patientensprache": "Kurzwirksames Beta-2-Sympathomimetikum („Notfallspray“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Salbutamol 2 Hübe bei Bedarf."
  },
  {
    "id": "voc-484",
    "fachbegriff": "Amoxicillin",
    "patientensprache": "Antibiotikum (Aminopenicillin) („Penicillin-Antibiotikum“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Amoxicillin 1 g p.o. 1-1-1 für 7 Tage."
  },
  {
    "id": "voc-485",
    "fachbegriff": "Ceftriaxon",
    "patientensprache": "Antibiotikum (Cephalosporin) („Antibiotikum-Infusion“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Ceftriaxon 2 g i.v. 1x täglich."
  },
  {
    "id": "voc-486",
    "fachbegriff": "Piperacillin/Tazobactam",
    "patientensprache": "Breitspektrum-Antibiotikum („Antibiotikum-Infusion“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Bei Sepsis wurde mit Piperacillin/Tazobactam begonnen."
  },
  {
    "id": "voc-487",
    "fachbegriff": "Enoxaparin",
    "patientensprache": "Niedermolekulares Heparin („Thrombosespritze“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Enoxaparin 40 mg s.c. 1x täglich zur Prophylaxe."
  },
  {
    "id": "voc-488",
    "fachbegriff": "Pantoprazol",
    "patientensprache": "Protonenpumpeninhibitor („Magenschutz“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Pantoprazol 40 mg 1-0-0 vor dem Frühstück."
  },
  {
    "id": "voc-489",
    "fachbegriff": "Ondansetron",
    "patientensprache": "Antiemetikum („Mittel gegen Übelkeit“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Bei PONV erhielt der Patient Ondansetron 4 mg i.v."
  },
  {
    "id": "voc-490",
    "fachbegriff": "Butylscopolamin",
    "patientensprache": "Spasmolytikum („Buscopan“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Bei Kolik Butylscopolamin 20 mg i.v."
  },
  {
    "id": "voc-491",
    "fachbegriff": "Glukose 40 %",
    "patientensprache": "Konzentrierte Zuckerlösung („Zucker in die Vene“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Bei Hypoglykämie wurden 40 ml Glukose 40 % i.v. gegeben."
  },
  {
    "id": "voc-492",
    "fachbegriff": "Naloxon",
    "patientensprache": "Gegenmittel bei Opioidüberdosierung („Gegengift“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Bei Atemdepression nach Opioidgabe wird Naloxon gegeben."
  },
  {
    "id": "voc-493",
    "fachbegriff": "Alteplase (rtPA)",
    "patientensprache": "Medikament zur Thrombolyse („Lyse“)",
    "category": "Medikamente & Pharmakologie",
    "example": "Die Thrombolyse mit Alteplase erfolgte 2 Stunden nach Symptombeginn."
  },
  {
    "id": "voc-494",
    "fachbegriff": "Mobilisation",
    "patientensprache": "Aktivierung zur Bewegung („Aufstehen / rausholen“)",
    "category": "Pflege & Klinikalltag",
    "example": "Die Erstmobilisation an die Bettkante erfolgte am 1. postoperativen Tag."
  },
  {
    "id": "voc-495",
    "fachbegriff": "Immobilität",
    "patientensprache": "Bewegungsunfähigkeit („Bettlägerig“)",
    "category": "Pflege & Klinikalltag",
    "example": "Bei Immobilität besteht ein erhöhtes Dekubitus- und Thromboserisiko."
  },
  {
    "id": "voc-496",
    "fachbegriff": "Prophylaxe",
    "patientensprache": "Vorbeugung („Vorbeugen“)",
    "category": "Pflege & Klinikalltag",
    "example": "Pneumonie-, Thrombose- und Dekubitusprophylaxe werden durchgeführt."
  },
  {
    "id": "voc-497",
    "fachbegriff": "Thromboseprophylaxe",
    "patientensprache": "Vorbeugung von Blutgerinnseln („Thrombosespritze / Stützstrümpfe“)",
    "category": "Pflege & Klinikalltag",
    "example": "Medizinische Thromboseprophylaxestrümpfe wurden angepasst."
  },
  {
    "id": "voc-498",
    "fachbegriff": "Pneumonieprophylaxe",
    "patientensprache": "Vorbeugung von Lungenentzündung („Atemübungen“)",
    "category": "Pflege & Klinikalltag",
    "example": "Zur Pneumonieprophylaxe wird ein Atemtrainer eingesetzt."
  },
  {
    "id": "voc-499",
    "fachbegriff": "Sturzprophylaxe",
    "patientensprache": "Vorbeugung von Stürzen („Aufpassen, dass er nicht hinfällt“)",
    "category": "Pflege & Klinikalltag",
    "example": "Nach Sturzrisikoeinschätzung wurden Maßnahmen zur Sturzprophylaxe eingeleitet."
  },
  {
    "id": "voc-500",
    "fachbegriff": "Kontrakturenprophylaxe",
    "patientensprache": "Vorbeugung von Gelenkversteifungen („Gelenke bewegen“)",
    "category": "Pflege & Klinikalltag",
    "example": "Passive Bewegungsübungen dienen der Kontrakturenprophylaxe."
  },
  {
    "id": "voc-501",
    "fachbegriff": "Aspirationsprophylaxe",
    "patientensprache": "Vorbeugung des Verschluckens in die Lunge („Aufpassen beim Essen“)",
    "category": "Pflege & Klinikalltag",
    "example": "Bei Dysphagie wird eine Aspirationsprophylaxe mit Oberkörperhochlagerung durchgeführt."
  },
  {
    "id": "voc-502",
    "fachbegriff": "Obstipationsprophylaxe",
    "patientensprache": "Vorbeugung von Verstopfung („Gegen Verstopfung vorbeugen“)",
    "category": "Pflege & Klinikalltag",
    "example": "Ausreichende Flüssigkeitszufuhr ist Teil der Obstipationsprophylaxe."
  },
  {
    "id": "voc-503",
    "fachbegriff": "Intertrigoprophylaxe",
    "patientensprache": "Vorbeugung von Hautentzündungen in Hautfalten („Wundsein in den Falten verhindern“)",
    "category": "Pflege & Klinikalltag",
    "example": "Unter der Brust wird eine Intertrigoprophylaxe mit Kompressen durchgeführt."
  },
  {
    "id": "voc-504",
    "fachbegriff": "Soor- und Parotitisprophylaxe",
    "patientensprache": "Mundpflege zur Infektionsvorbeugung („Mundpflege“)",
    "category": "Pflege & Klinikalltag",
    "example": "Die Mundpflege dient der Soor- und Parotitisprophylaxe."
  },
  {
    "id": "voc-505",
    "fachbegriff": "Braden-Skala",
    "patientensprache": "Einschätzungsinstrument für das Dekubitusrisiko",
    "category": "Pflege & Klinikalltag",
    "example": "Die Braden-Skala ergab 12 Punkte, hohes Risiko."
  },
  {
    "id": "voc-506",
    "fachbegriff": "Lagerung",
    "patientensprache": "Positionierung im Bett („Umlagern / Umdrehen“)",
    "category": "Pflege & Klinikalltag",
    "example": "Der Patient wird alle zwei Stunden umgelagert."
  },
  {
    "id": "voc-507",
    "fachbegriff": "30°-Lagerung",
    "patientensprache": "Schräglagerung zur Druckentlastung („Leicht auf die Seite legen“)",
    "category": "Pflege & Klinikalltag",
    "example": "Zur Druckentlastung wird die 30°-Lagerung angewendet."
  },
  {
    "id": "voc-508",
    "fachbegriff": "Oberkörperhochlagerung",
    "patientensprache": "Erhöhte Lagerung des Oberkörpers („Kopfteil hoch“)",
    "category": "Pflege & Klinikalltag",
    "example": "Bei Dyspnoe erfolgt eine Oberkörperhochlagerung von 45°."
  },
  {
    "id": "voc-509",
    "fachbegriff": "Kutschersitz",
    "patientensprache": "Atemerleichternde Sitzhaltung („Vornübergebeugt sitzen mit Armen auf den Knien“)",
    "category": "Pflege & Klinikalltag",
    "example": "Der Patient wird zum Kutschersitz angeleitet."
  },
  {
    "id": "voc-510",
    "fachbegriff": "Lippenbremse",
    "patientensprache": "Atemtechnik mit gespitzten Lippen („Langsam durch die Lippen ausatmen“)",
    "category": "Pflege & Klinikalltag",
    "example": "Die Lippenbremse erleichtert die Ausatmung bei COPD."
  },
  {
    "id": "voc-511",
    "fachbegriff": "Grundpflege",
    "patientensprache": "Körperpflege („Waschen und Anziehen“)",
    "category": "Pflege & Klinikalltag",
    "example": "Die Grundpflege erfolgt mit Teilübernahme."
  },
  {
    "id": "voc-512",
    "fachbegriff": "Behandlungspflege",
    "patientensprache": "Medizinische Pflegemaßnahmen („Verbände, Spritzen, Medikamente“)",
    "category": "Pflege & Klinikalltag",
    "example": "Zur Behandlungspflege gehören Verbandswechsel und Injektionen."
  },
  {
    "id": "voc-513",
    "fachbegriff": "Ganzkörperwaschung",
    "patientensprache": "Waschen des ganzen Körpers („Ganz gewaschen werden“)",
    "category": "Pflege & Klinikalltag",
    "example": "Die Ganzkörperwaschung erfolgt im Bett."
  },
  {
    "id": "voc-514",
    "fachbegriff": "Verbandswechsel (VW)",
    "patientensprache": "Wechsel des Wundverbands („Pflaster wechseln“)",
    "category": "Pflege & Klinikalltag",
    "example": "Der VW erfolgt täglich unter aseptischen Bedingungen."
  },
  {
    "id": "voc-515",
    "fachbegriff": "Wundheilungsstörung",
    "patientensprache": "Gestörte Wundheilung („Die Wunde heilt nicht“)",
    "category": "Pflege & Klinikalltag",
    "example": "Es zeigt sich eine Wundheilungsstörung mit Sekretion."
  },
  {
    "id": "voc-516",
    "fachbegriff": "Wundsekret",
    "patientensprache": "Wundflüssigkeit („Die Wunde nässt“)",
    "category": "Pflege & Klinikalltag",
    "example": "Das Wundsekret ist seröses und geruchlos."
  },
  {
    "id": "voc-517",
    "fachbegriff": "Exsudat",
    "patientensprache": "Entzündliche Wundflüssigkeit („Eiter / Flüssigkeit“)",
    "category": "Pflege & Klinikalltag",
    "example": "Die Wunde zeigt mäßig Exsudat."
  },
  {
    "id": "voc-518",
    "fachbegriff": "Nekrose",
    "patientensprache": "Abgestorbenes Gewebe („Schwarzes Gewebe“)",
    "category": "Pflege & Klinikalltag",
    "example": "Am Fersendekubitus zeigt sich eine trockene Nekrose."
  },
  {
    "id": "voc-519",
    "fachbegriff": "Asepsis",
    "patientensprache": "Keimfreiheit („Steril“)",
    "category": "Pflege & Klinikalltag",
    "example": "Der Verbandswechsel erfolgt unter aseptischen Bedingungen."
  },
  {
    "id": "voc-520",
    "fachbegriff": "Händedesinfektion",
    "patientensprache": "Desinfektion der Hände („Hände desinfizieren“)",
    "category": "Pflege & Klinikalltag",
    "example": "Vor Patientenkontakt erfolgt eine hygienische Händedesinfektion."
  },
  {
    "id": "voc-521",
    "fachbegriff": "Isolation",
    "patientensprache": "Räumliche Trennung bei Infektionsgefahr („Isolierzimmer“)",
    "category": "Pflege & Klinikalltag",
    "example": "Wegen MRSA wird der Patient isoliert."
  },
  {
    "id": "voc-522",
    "fachbegriff": "Multiresistente Erreger (MRE/MRSA)",
    "patientensprache": "Keime, gegen die viele Antibiotika nicht wirken („Krankenhauskeim“)",
    "category": "Pflege & Klinikalltag",
    "example": "Der Patient ist MRSA-positiv."
  },
  {
    "id": "voc-523",
    "fachbegriff": "Nosokomiale Infektion",
    "patientensprache": "Krankenhausinfektion („Im Krankenhaus angesteckt“)",
    "category": "Pflege & Klinikalltag",
    "example": "Die Pneumonie ist nosokomial erworben."
  },
  {
    "id": "voc-524",
    "fachbegriff": "Vitalzeichen",
    "patientensprache": "Lebenszeichen (Puls, Blutdruck, Atmung, Temperatur) („Werte“)",
    "category": "Pflege & Klinikalltag",
    "example": "Die Vitalzeichen werden stündlich kontrolliert."
  },
  {
    "id": "voc-525",
    "fachbegriff": "Bilanzierung",
    "patientensprache": "Ein- und Ausfuhrkontrolle („Wie viel man trinkt und ausscheidet“)",
    "category": "Pflege & Klinikalltag",
    "example": "Bei Herzinsuffizienz wird eine Flüssigkeitsbilanz geführt."
  },
  {
    "id": "voc-526",
    "fachbegriff": "Ein- und Ausfuhr",
    "patientensprache": "Flüssigkeitsaufnahme und -ausscheidung („Trinkmenge und Urin“)",
    "category": "Pflege & Klinikalltag",
    "example": "Ein- und Ausfuhr werden protokolliert."
  },
  {
    "id": "voc-527",
    "fachbegriff": "Trinkprotokoll",
    "patientensprache": "Aufzeichnung der Trinkmenge („Trinkzettel“)",
    "category": "Pflege & Klinikalltag",
    "example": "Bei Exsikkose wird ein Trinkprotokoll geführt."
  },
  {
    "id": "voc-528",
    "fachbegriff": "Ernährungsprotokoll",
    "patientensprache": "Aufzeichnung der Nahrungsaufnahme („Essenszettel“)",
    "category": "Pflege & Klinikalltag",
    "example": "Das Ernährungsprotokoll zeigt eine Aufnahme von ca. 25 %."
  },
  {
    "id": "voc-529",
    "fachbegriff": "Nüchternheit",
    "patientensprache": "Verzicht auf Essen und Trinken („Nüchtern“)",
    "category": "Pflege & Klinikalltag",
    "example": "Vor der OP muss der Patient 6 Stunden nüchtern sein."
  },
  {
    "id": "voc-530",
    "fachbegriff": "Kostform",
    "patientensprache": "Art der Ernährung („Diät / Essen“)",
    "category": "Pflege & Klinikalltag",
    "example": "Die Kostform wird auf passierte Kost umgestellt."
  },
  {
    "id": "voc-531",
    "fachbegriff": "Sondenernährung (enterale Ernährung)",
    "patientensprache": "Ernährung über eine Sonde („Essen über den Schlauch“)",
    "category": "Pflege & Klinikalltag",
    "example": "Die Sondenernährung läuft mit 50 ml/h."
  },
  {
    "id": "voc-532",
    "fachbegriff": "Parenterale Ernährung",
    "patientensprache": "Ernährung über die Vene („Ernährung per Infusion“)",
    "category": "Pflege & Klinikalltag",
    "example": "Bei Ileus erhält der Patient parenterale Ernährung."
  },
  {
    "id": "voc-533",
    "fachbegriff": "Inkontinenzversorgung",
    "patientensprache": "Versorgung bei Inkontinenz („Windeln / Vorlagen“)",
    "category": "Pflege & Klinikalltag",
    "example": "Die Inkontinenzversorgung erfolgt mit Vorlagen."
  },
  {
    "id": "voc-534",
    "fachbegriff": "Transurethraler Blasenkatheter",
    "patientensprache": "Katheter über die Harnröhre („Katheter“)",
    "category": "Pflege & Klinikalltag",
    "example": "Der transurethrale Katheter wurde am 3. Tag entfernt."
  },
  {
    "id": "voc-535",
    "fachbegriff": "Restharn",
    "patientensprache": "In der Blase verbleibender Urin nach dem Wasserlassen („Blase nicht ganz leer“)",
    "category": "Pflege & Klinikalltag",
    "example": "Sonografisch zeigt sich ein Restharn von 300 ml."
  },
  {
    "id": "voc-536",
    "fachbegriff": "Stuhlgang (Defäkation)",
    "patientensprache": "Stuhlentleerung („Großes Geschäft“)",
    "category": "Pflege & Klinikalltag",
    "example": "Letzter Stuhlgang vor drei Tagen."
  },
  {
    "id": "voc-537",
    "fachbegriff": "Miktion",
    "patientensprache": "Wasserlassen („Pinkeln / kleines Geschäft“)",
    "category": "Pflege & Klinikalltag",
    "example": "Die Miktion ist spontan und schmerzfrei."
  },
  {
    "id": "voc-538",
    "fachbegriff": "Schmerzassessment",
    "patientensprache": "Schmerzeinschätzung („Wie stark die Schmerzen sind“)",
    "category": "Pflege & Klinikalltag",
    "example": "Das Schmerzassessment erfolgt dreimal täglich mittels NRS."
  },
  {
    "id": "voc-539",
    "fachbegriff": "Bewusstseinskontrolle",
    "patientensprache": "Überprüfung des Bewusstseins („Ist er wach?“)",
    "category": "Pflege & Klinikalltag",
    "example": "Nach dem Sturz erfolgt eine engmaschige Bewusstseinskontrolle."
  },
  {
    "id": "voc-540",
    "fachbegriff": "Pupillenkontrolle",
    "patientensprache": "Prüfung der Pupillen („In die Augen leuchten“)",
    "category": "Pflege & Klinikalltag",
    "example": "Die Pupillenkontrolle ergab isokore, lichtreagible Pupillen."
  },
  {
    "id": "voc-541",
    "fachbegriff": "Freiheitsentziehende Maßnahme (FEM)",
    "patientensprache": "Fixierung oder Bettgitter gegen den Willen („Festbinden / Gitter hoch“)",
    "category": "Pflege & Klinikalltag",
    "example": "Für FEM ist eine richterliche Genehmigung erforderlich."
  },
  {
    "id": "voc-542",
    "fachbegriff": "Pflegeanamnese",
    "patientensprache": "Pflegerisches Aufnahmegespräch („Aufnahmegespräch“)",
    "category": "Pflege & Klinikalltag",
    "example": "Die Pflegeanamnese wurde mit der Tochter erhoben."
  },
  {
    "id": "voc-543",
    "fachbegriff": "Pflegeplanung",
    "patientensprache": "Planung der Pflegemaßnahmen („Pflegeplan“)",
    "category": "Pflege & Klinikalltag",
    "example": "Die Pflegeplanung wird täglich evaluiert."
  },
  {
    "id": "voc-544",
    "fachbegriff": "Pflegebericht",
    "patientensprache": "Pflegedokumentation über den Verlauf („Pflegeeintrag“)",
    "category": "Pflege & Klinikalltag",
    "example": "Im Pflegebericht wird die nächtliche Unruhe dokumentiert."
  },
  {
    "id": "voc-545",
    "fachbegriff": "Pflegegrad",
    "patientensprache": "Einstufung der Pflegebedürftigkeit („Pflegestufe“)",
    "category": "Pflege & Klinikalltag",
    "example": "Die Patientin hat Pflegegrad 3."
  },
  {
    "id": "voc-546",
    "fachbegriff": "Entlassmanagement",
    "patientensprache": "Planung der Entlassung („Wie es nach dem Krankenhaus weitergeht“)",
    "category": "Pflege & Klinikalltag",
    "example": "Das Entlassmanagement organisiert einen ambulanten Pflegedienst."
  },
  {
    "id": "voc-547",
    "fachbegriff": "Aktivitäten des täglichen Lebens (ATL)",
    "patientensprache": "Alltägliche Tätigkeiten („Was man im Alltag allein schafft“)",
    "category": "Pflege & Klinikalltag",
    "example": "Die Patientin ist in den ATL weitgehend selbstständig."
  },
  {
    "id": "voc-548",
    "fachbegriff": "Hilfsmittel",
    "patientensprache": "Unterstützende Geräte („Rollator, Brille, Hörgerät“)",
    "category": "Pflege & Klinikalltag",
    "example": "Hilfsmittel: Rollator, Brille, Hörgerät links."
  },
  {
    "id": "voc-549",
    "fachbegriff": "Rollator",
    "patientensprache": "Gehwagen („Rollator / Gehwagen“)",
    "category": "Pflege & Klinikalltag",
    "example": "Der Patient ist mit Rollator auf Stationsebene mobil."
  },
  {
    "id": "voc-550",
    "fachbegriff": "Inhalation",
    "patientensprache": "Einatmen von Medikamenten („Inhalieren“)",
    "category": "Pflege & Klinikalltag",
    "example": "Die Inhalation erfolgt viermal täglich."
  },
  {
    "id": "voc-551",
    "fachbegriff": "Sauerstoffgabe",
    "patientensprache": "Verabreichung von Sauerstoff („Sauerstoff über die Brille“)",
    "category": "Pflege & Klinikalltag",
    "example": "Sauerstoffgabe 2 l/min über Nasenbrille."
  },
  {
    "id": "voc-552",
    "fachbegriff": "Absaugen",
    "patientensprache": "Entfernen von Sekret aus den Atemwegen („Schleim absaugen“)",
    "category": "Pflege & Klinikalltag",
    "example": "Der Patient wird bei Bedarf oral abgesaugt."
  },
  {
    "id": "voc-553",
    "fachbegriff": "Palliativpflege",
    "patientensprache": "Pflege am Lebensende („Pflege, damit es ihm gut geht“)",
    "category": "Pflege & Klinikalltag",
    "example": "Die Palliativpflege zielt auf Symptomlinderung."
  },
  {
    "id": "voc-554",
    "fachbegriff": "Patientenverfügung",
    "patientensprache": "Schriftliche Erklärung über gewünschte Behandlung („Was ich will, wenn ich nicht mehr entscheiden kann“)",
    "category": "Pflege & Klinikalltag",
    "example": "Laut Patientenverfügung wird keine Reanimation gewünscht."
  },
  {
    "id": "voc-555",
    "fachbegriff": "Vorsorgevollmacht",
    "patientensprache": "Vollmacht für eine Vertrauensperson („Meine Tochter darf entscheiden“)",
    "category": "Pflege & Klinikalltag",
    "example": "Der Sohn hat eine Vorsorgevollmacht."
  },
  {
    "id": "voc-556",
    "fachbegriff": "Übergabe",
    "patientensprache": "Informationsweitergabe beim Schichtwechsel („Übergabe“)",
    "category": "Pflege & Klinikalltag",
    "example": "Bei der Übergabe wird der Sturz in der Nacht berichtet."
  },
  {
    "id": "voc-557",
    "fachbegriff": "Frühdienst / Spätdienst / Nachtdienst",
    "patientensprache": "Arbeitsschichten in der Pflege („Früh / Spät / Nacht“)",
    "category": "Pflege & Klinikalltag",
    "example": "Der Nachtdienst meldet einen Blutdruckabfall."
  },
  {
    "id": "voc-558",
    "fachbegriff": "Visite",
    "patientensprache": "Arztbesuch am Krankenbett („Wenn die Ärzte kommen“)",
    "category": "Pflege & Klinikalltag",
    "example": "Bei der Visite wird die Entlassung besprochen."
  },
  {
    "id": "voc-559",
    "fachbegriff": "Bedside-Test",
    "patientensprache": "Blutgruppenbestimmung am Krankenbett („Test vor der Bluttransfusion“)",
    "category": "Pflege & Klinikalltag",
    "example": "Vor jeder EK-Gabe muss ein Bedside-Test durchgeführt werden."
  },
  {
    "id": "voc-560",
    "fachbegriff": "Infusionspumpe (Perfusor)",
    "patientensprache": "Gerät zur genauen Medikamentengabe („Pumpe / Spritzenpumpe“)",
    "category": "Pflege & Klinikalltag",
    "example": "Das Noradrenalin läuft über den Perfusor mit 4 ml/h."
  },
  {
    "id": "voc-561",
    "fachbegriff": "Paravasat",
    "patientensprache": "Austritt von Infusion ins Gewebe („Die Infusion läuft daneben“)",
    "category": "Pflege & Klinikalltag",
    "example": "Am Handrücken zeigt sich ein Paravasat."
  },
  {
    "id": "voc-562",
    "fachbegriff": "Phlebitis",
    "patientensprache": "Venenentzündung („Entzündete Vene am Zugang“)",
    "category": "Pflege & Klinikalltag",
    "example": "An der Einstichstelle zeigt sich eine Phlebitis, der PVK wurde entfernt."
  },
  {
    "id": "voc-563",
    "fachbegriff": "Schluckscreening",
    "patientensprache": "Prüfung des Schluckens („Schlucktest“)",
    "category": "Pflege & Klinikalltag",
    "example": "Vor der ersten Mahlzeit nach Schlaganfall erfolgt ein Schluckscreening."
  },
  {
    "id": "voc-564",
    "fachbegriff": "Delirscreening",
    "patientensprache": "Prüfung auf akute Verwirrtheit",
    "category": "Pflege & Klinikalltag",
    "example": "Das Delirscreening (Nu-DESC) war positiv."
  },
  {
    "id": "voc-565",
    "fachbegriff": "Sturzprotokoll",
    "patientensprache": "Dokumentation eines Sturzes („Sturzbericht“)",
    "category": "Pflege & Klinikalltag",
    "example": "Nach dem Sturz wird ein Sturzprotokoll ausgefüllt."
  },
  {
    "id": "voc-566",
    "fachbegriff": "Expertenstandard",
    "patientensprache": "Pflegerische Leitlinie",
    "category": "Pflege & Klinikalltag",
    "example": "Gemäß Expertenstandard Dekubitusprophylaxe wird ein Bewegungsplan erstellt."
  },
  {
    "id": "voc-567",
    "fachbegriff": "Thorakale Schmerzen",
    "patientensprache": "Brustschmerzen („Es drückt auf der Brust“)",
    "category": "Symptome & Beschwerden",
    "example": "Der Patient stellt sich mit seit zwei Stunden bestehenden thorakalen Schmerzen vor."
  },
  {
    "id": "voc-568",
    "fachbegriff": "Palpitationen",
    "patientensprache": "Herzklopfen („Mein Herz rast / stolpert“)",
    "category": "Symptome & Beschwerden",
    "example": "Die Patientin berichtet über anfallsartige Palpitationen in Ruhe."
  },
  {
    "id": "voc-569",
    "fachbegriff": "Orthopnoe",
    "patientensprache": "Atemnot im Liegen („Ich muss nachts mit drei Kissen schlafen“)",
    "category": "Symptome & Beschwerden",
    "example": "Es besteht eine Orthopnoe, die Patientin schläft mit erhöhtem Oberkörper."
  },
  {
    "id": "voc-570",
    "fachbegriff": "Hämoptyse",
    "patientensprache": "Bluthusten („Ich hab Blut gehustet“)",
    "category": "Symptome & Beschwerden",
    "example": "Seit einer Woche bestehen rezidivierende Hämoptysen."
  },
  {
    "id": "voc-571",
    "fachbegriff": "Expektoration",
    "patientensprache": "Auswurf („Schleim abhusten“)",
    "category": "Symptome & Beschwerden",
    "example": "Der Patient klagt über gelblich-grüne Expektoration."
  },
  {
    "id": "voc-572",
    "fachbegriff": "Tussis",
    "patientensprache": "Husten („Bellen / Raucherhusten“)",
    "category": "Symptome & Beschwerden",
    "example": "Seit drei Wochen besteht eine trockene Tussis."
  },
  {
    "id": "voc-573",
    "fachbegriff": "Febris",
    "patientensprache": "Fieber („Hohes Fieber“)",
    "category": "Symptome & Beschwerden",
    "example": "Der Patient ist seit drei Tagen febril."
  },
  {
    "id": "voc-574",
    "fachbegriff": "Subfebrile Temperaturen",
    "patientensprache": "Leicht erhöhte Temperatur („Ein bisschen Temperatur“)",
    "category": "Symptome & Beschwerden",
    "example": "Abends bestehen subfebrile Temperaturen bis 37,9 °C."
  },
  {
    "id": "voc-575",
    "fachbegriff": "Schüttelfrost",
    "patientensprache": "Kältezittern mit Fieber („Ich hab am ganzen Körper gebibbert“)",
    "category": "Symptome & Beschwerden",
    "example": "Die Patientin hatte heute Nacht Schüttelfrost."
  },
  {
    "id": "voc-576",
    "fachbegriff": "Nachtschweiß",
    "patientensprache": "Starkes Schwitzen in der Nacht („Ich wach klatschnass auf“)",
    "category": "Symptome & Beschwerden",
    "example": "Der Patient berichtet über Nachtschweiß mit Wechsel der Bettwäsche."
  },
  {
    "id": "voc-577",
    "fachbegriff": "B-Symptomatik",
    "patientensprache": "Fieber, Nachtschweiß und Gewichtsverlust",
    "category": "Symptome & Beschwerden",
    "example": "Eine B-Symptomatik wird verneint."
  },
  {
    "id": "voc-578",
    "fachbegriff": "Gewichtsverlust",
    "patientensprache": "Abnahme des Körpergewichts („Ich hab ganz schön abgenommen“)",
    "category": "Symptome & Beschwerden",
    "example": "Es besteht ein ungewollter Gewichtsverlust von 8 kg in drei Monaten."
  },
  {
    "id": "voc-579",
    "fachbegriff": "Inappetenz",
    "patientensprache": "Appetitlosigkeit („Ich hab keinen Hunger / krieg nichts runter“)",
    "category": "Symptome & Beschwerden",
    "example": "Der Patient klagt über Inappetenz seit zwei Wochen."
  },
  {
    "id": "voc-580",
    "fachbegriff": "Adynamie",
    "patientensprache": "Kraftlosigkeit („Ich bin total schlapp“)",
    "category": "Symptome & Beschwerden",
    "example": "Die Patientin beschreibt eine zunehmende Adynamie."
  },
  {
    "id": "voc-581",
    "fachbegriff": "Fatigue",
    "patientensprache": "Erschöpfung („Ich bin dauernd k.o.“)",
    "category": "Symptome & Beschwerden",
    "example": "Seit der Chemotherapie besteht eine ausgeprägte Fatigue."
  },
  {
    "id": "voc-582",
    "fachbegriff": "Abgeschlagenheit",
    "patientensprache": "Müdigkeit und Schwäche („Ich bin total kaputt“)",
    "category": "Symptome & Beschwerden",
    "example": "Die Patientin klagt über Abgeschlagenheit seit Wochen."
  },
  {
    "id": "voc-583",
    "fachbegriff": "Präsynkope",
    "patientensprache": "Beinahe-Ohnmacht („Mir wurde schwarz vor Augen“)",
    "category": "Symptome & Beschwerden",
    "example": "Der Patient berichtet über eine Präsynkope beim Aufstehen."
  },
  {
    "id": "voc-584",
    "fachbegriff": "Vertigo",
    "patientensprache": "Schwindel („Mir ist ganz drehig“)",
    "category": "Symptome & Beschwerden",
    "example": "Der Patient beschreibt einen Schwankschwindel."
  },
  {
    "id": "voc-585",
    "fachbegriff": "Drehschwindel",
    "patientensprache": "Schwindel mit Drehgefühl („Alles dreht sich wie im Karussell“)",
    "category": "Symptome & Beschwerden",
    "example": "Es tritt ein lageabhängiger Drehschwindel auf."
  },
  {
    "id": "voc-586",
    "fachbegriff": "Tinnitus",
    "patientensprache": "Ohrgeräusche („Es pfeift im Ohr“)",
    "category": "Symptome & Beschwerden",
    "example": "Seit dem Konzert besteht ein Tinnitus links."
  },
  {
    "id": "voc-587",
    "fachbegriff": "Diplopie",
    "patientensprache": "Doppeltsehen („Ich seh alles doppelt“)",
    "category": "Symptome & Beschwerden",
    "example": "Der Patient klagt über plötzlich aufgetretene Diplopie."
  },
  {
    "id": "voc-588",
    "fachbegriff": "Visusminderung",
    "patientensprache": "Verschlechterung der Sehschärfe („Ich seh nur noch verschwommen“)",
    "category": "Symptome & Beschwerden",
    "example": "Es besteht eine akute Visusminderung rechts."
  },
  {
    "id": "voc-589",
    "fachbegriff": "Photophobie",
    "patientensprache": "Lichtempfindlichkeit („Das Licht tut mir in den Augen weh“)",
    "category": "Symptome & Beschwerden",
    "example": "Begleitend bestehen Photophobie und Phonophobie."
  },
  {
    "id": "voc-590",
    "fachbegriff": "Phonophobie",
    "patientensprache": "Geräuschempfindlichkeit („Jedes Geräusch ist zu viel“)",
    "category": "Symptome & Beschwerden",
    "example": "Die Patientin gibt eine ausgeprägte Phonophobie an."
  },
  {
    "id": "voc-591",
    "fachbegriff": "Parästhesien",
    "patientensprache": "Missempfindungen („Kribbeln / Ameisenlaufen“)",
    "category": "Symptome & Beschwerden",
    "example": "Der Patient berichtet über Parästhesien in beiden Füßen."
  },
  {
    "id": "voc-592",
    "fachbegriff": "Hypästhesie",
    "patientensprache": "Verminderte Berührungsempfindlichkeit („Das fühlt sich taub / pelzig an“)",
    "category": "Symptome & Beschwerden",
    "example": "Es besteht eine Hypästhesie im Dermatom L5 links."
  },
  {
    "id": "voc-593",
    "fachbegriff": "Tremor",
    "patientensprache": "Zittern („Ich zittere so“)",
    "category": "Symptome & Beschwerden",
    "example": "Es zeigt sich ein feinschlägiger Ruhetremor der rechten Hand."
  },
  {
    "id": "voc-594",
    "fachbegriff": "Konvulsionen",
    "patientensprache": "Krampfanfälle („Er hat gekrampft / gezuckt“)",
    "category": "Symptome & Beschwerden",
    "example": "Laut Fremdanamnese kam es zu generalisierten Konvulsionen."
  },
  {
    "id": "voc-595",
    "fachbegriff": "Somnolenz",
    "patientensprache": "Krankhafte Schläfrigkeit („Er ist ganz benommen und schläft dauernd ein“)",
    "category": "Symptome & Beschwerden",
    "example": "Der Patient ist somnolent, aber erweckbar."
  },
  {
    "id": "voc-596",
    "fachbegriff": "Sopor",
    "patientensprache": "Tiefe Bewusstseinsstörung („Sie reagiert kaum noch“)",
    "category": "Symptome & Beschwerden",
    "example": "Die Patientin ist soporös und reagiert nur auf Schmerzreize."
  },
  {
    "id": "voc-597",
    "fachbegriff": "Koma",
    "patientensprache": "Bewusstlosigkeit („Er ist nicht ansprechbar“)",
    "category": "Symptome & Beschwerden",
    "example": "Der Patient wurde komatös aufgefunden."
  },
  {
    "id": "voc-598",
    "fachbegriff": "Desorientiertheit",
    "patientensprache": "Verwirrtheit („Sie ist total durcheinander“)",
    "category": "Symptome & Beschwerden",
    "example": "Die Patientin ist zu Zeit und Ort desorientiert."
  },
  {
    "id": "voc-599",
    "fachbegriff": "Amnesie",
    "patientensprache": "Gedächtnisverlust („Ich weiß nichts mehr davon“)",
    "category": "Symptome & Beschwerden",
    "example": "Es besteht eine retrograde Amnesie für das Unfallereignis."
  },
  {
    "id": "voc-600",
    "fachbegriff": "Aphasie",
    "patientensprache": "Sprachstörung („Er findet die Worte nicht / redet komisch“)",
    "category": "Symptome & Beschwerden",
    "example": "Es zeigt sich eine motorische Aphasie."
  },
  {
    "id": "voc-601",
    "fachbegriff": "Dysarthrie",
    "patientensprache": "Sprechstörung („Er lallt“)",
    "category": "Symptome & Beschwerden",
    "example": "Die Patientin spricht mit verwaschener Sprache im Sinne einer Dysarthrie."
  },
  {
    "id": "voc-602",
    "fachbegriff": "Meningismus",
    "patientensprache": "Nackensteifigkeit („Ich krieg den Kopf nicht nach vorne“)",
    "category": "Symptome & Beschwerden",
    "example": "Klinisch besteht ein deutlicher Meningismus."
  },
  {
    "id": "voc-603",
    "fachbegriff": "Dysphonie",
    "patientensprache": "Heiserkeit („Meine Stimme ist weg / ganz kratzig“)",
    "category": "Symptome & Beschwerden",
    "example": "Seit vier Wochen besteht eine Dysphonie."
  },
  {
    "id": "voc-604",
    "fachbegriff": "Odynophagie",
    "patientensprache": "Schmerzen beim Schlucken („Das Schlucken tut weh“)",
    "category": "Symptome & Beschwerden",
    "example": "Die Patientin klagt über Odynophagie und Fieber."
  },
  {
    "id": "voc-605",
    "fachbegriff": "Sodbrennen",
    "patientensprache": "Saures Aufstoßen mit Brennen („Es brennt hinter dem Brustbein hoch“)",
    "category": "Symptome & Beschwerden",
    "example": "Der Patient leidet nach dem Essen unter Sodbrennen."
  },
  {
    "id": "voc-606",
    "fachbegriff": "Dyspepsie",
    "patientensprache": "Verdauungsbeschwerden („Mein Magen ist verstimmt“)",
    "category": "Symptome & Beschwerden",
    "example": "Es bestehen unspezifische dyspeptische Beschwerden."
  },
  {
    "id": "voc-607",
    "fachbegriff": "Meteorismus",
    "patientensprache": "Blähungen („Mein Bauch ist aufgebläht wie ein Ballon“)",
    "category": "Symptome & Beschwerden",
    "example": "Der Patient berichtet über Meteorismus nach Milchprodukten."
  },
  {
    "id": "voc-608",
    "fachbegriff": "Flatulenz",
    "patientensprache": "Abgang von Darmgasen („Pupsen“)",
    "category": "Symptome & Beschwerden",
    "example": "Die Patientin klagt über vermehrte Flatulenz."
  },
  {
    "id": "voc-609",
    "fachbegriff": "Hämatochezie",
    "patientensprache": "Frisches Blut im Stuhl („Da war rotes Blut am Klopapier“)",
    "category": "Symptome & Beschwerden",
    "example": "Es kam zu einmaliger Hämatochezie."
  },
  {
    "id": "voc-610",
    "fachbegriff": "Ikterus",
    "patientensprache": "Gelbsucht („Ich bin ganz gelb geworden“)",
    "category": "Symptome & Beschwerden",
    "example": "Es zeigt sich ein Sklerenikterus."
  },
  {
    "id": "voc-611",
    "fachbegriff": "Aszites",
    "patientensprache": "Bauchwassersucht („Mein Bauch wird immer dicker“)",
    "category": "Symptome & Beschwerden",
    "example": "Sonografisch zeigt sich ausgeprägter Aszites."
  },
  {
    "id": "voc-612",
    "fachbegriff": "Tenesmen",
    "patientensprache": "Schmerzhafter Stuhldrang („Ich muss dauernd, aber es kommt nichts“)",
    "category": "Symptome & Beschwerden",
    "example": "Die Patientin klagt über Tenesmen."
  },
  {
    "id": "voc-613",
    "fachbegriff": "Stuhlinkontinenz",
    "patientensprache": "Unkontrollierter Stuhlabgang („Ich schaff's nicht mehr bis zur Toilette“)",
    "category": "Symptome & Beschwerden",
    "example": "Seit der Geburt besteht eine leichte Stuhlinkontinenz."
  },
  {
    "id": "voc-614",
    "fachbegriff": "Dysurie",
    "patientensprache": "Schmerzen beim Wasserlassen („Es brennt beim Pinkeln“)",
    "category": "Symptome & Beschwerden",
    "example": "Die Patientin klagt über Dysurie seit zwei Tagen."
  },
  {
    "id": "voc-615",
    "fachbegriff": "Pollakisurie",
    "patientensprache": "Häufiges Wasserlassen kleiner Mengen („Ich muss ständig aufs Klo“)",
    "category": "Symptome & Beschwerden",
    "example": "Es bestehen Pollakisurie und Harndrang."
  },
  {
    "id": "voc-616",
    "fachbegriff": "Nykturie",
    "patientensprache": "Nächtliches Wasserlassen („Ich muss nachts dreimal raus“)",
    "category": "Symptome & Beschwerden",
    "example": "Der Patient berichtet über Nykturie 3–4x."
  },
  {
    "id": "voc-617",
    "fachbegriff": "Polyurie",
    "patientensprache": "Vermehrte Urinausscheidung („Ich pinkel literweise“)",
    "category": "Symptome & Beschwerden",
    "example": "Es besteht eine Polyurie mit Polydipsie."
  },
  {
    "id": "voc-618",
    "fachbegriff": "Polydipsie",
    "patientensprache": "Krankhaft gesteigerter Durst („Ich hab ständig Durst“)",
    "category": "Symptome & Beschwerden",
    "example": "Die Patientin trinkt seit Wochen über 5 Liter täglich."
  },
  {
    "id": "voc-619",
    "fachbegriff": "Oligurie",
    "patientensprache": "Verminderte Urinausscheidung („Es kommt kaum noch was“)",
    "category": "Symptome & Beschwerden",
    "example": "Postoperativ besteht eine Oligurie."
  },
  {
    "id": "voc-620",
    "fachbegriff": "Anurie",
    "patientensprache": "Fehlende Urinausscheidung („Ich kann gar nicht mehr Wasser lassen“)",
    "category": "Symptome & Beschwerden",
    "example": "Seit 12 Stunden besteht eine Anurie."
  },
  {
    "id": "voc-621",
    "fachbegriff": "Hämaturie",
    "patientensprache": "Blut im Urin („Mein Urin ist rot“)",
    "category": "Symptome & Beschwerden",
    "example": "Es zeigt sich eine schmerzlose Makrohämaturie."
  },
  {
    "id": "voc-622",
    "fachbegriff": "Harnverhalt",
    "patientensprache": "Unfähigkeit, die Blase zu entleeren („Ich muss, aber es geht nicht“)",
    "category": "Symptome & Beschwerden",
    "example": "Bei Harnverhalt wurde ein Blasenkatheter gelegt."
  },
  {
    "id": "voc-623",
    "fachbegriff": "Harninkontinenz",
    "patientensprache": "Unwillkürlicher Urinverlust („Ich verlier Urin / es geht in die Hose“)",
    "category": "Symptome & Beschwerden",
    "example": "Die Patientin leidet unter einer Belastungsinkontinenz."
  },
  {
    "id": "voc-624",
    "fachbegriff": "Ödeme",
    "patientensprache": "Wassereinlagerungen („Meine Beine sind ganz dick“)",
    "category": "Symptome & Beschwerden",
    "example": "Es bestehen prätibiale Ödeme beidseits."
  },
  {
    "id": "voc-625",
    "fachbegriff": "Claudicatio intermittens",
    "patientensprache": "Schaufensterkrankheit („Ich muss nach 100 Metern stehen bleiben“)",
    "category": "Symptome & Beschwerden",
    "example": "Der Patient berichtet über Claudicatio intermittens nach 200 m Gehstrecke."
  },
  {
    "id": "voc-626",
    "fachbegriff": "Arthralgie",
    "patientensprache": "Gelenkschmerzen („Mir tun alle Gelenke weh“)",
    "category": "Symptome & Beschwerden",
    "example": "Die Patientin klagt über Arthralgien der Fingergelenke."
  },
  {
    "id": "voc-627",
    "fachbegriff": "Myalgie",
    "patientensprache": "Muskelschmerzen („Ich hab Muskelkater am ganzen Körper“)",
    "category": "Symptome & Beschwerden",
    "example": "Unter Statintherapie traten Myalgien auf."
  },
  {
    "id": "voc-628",
    "fachbegriff": "Lumbalgie",
    "patientensprache": "Kreuzschmerzen („Hexenschuss / Rücken“)",
    "category": "Symptome & Beschwerden",
    "example": "Der Patient klagt über akute Lumbalgie nach dem Heben."
  },
  {
    "id": "voc-629",
    "fachbegriff": "Morgensteifigkeit",
    "patientensprache": "Steifheit der Gelenke am Morgen („Morgens bin ich ganz eingerostet“)",
    "category": "Symptome & Beschwerden",
    "example": "Es besteht eine Morgensteifigkeit von über einer Stunde."
  },
  {
    "id": "voc-630",
    "fachbegriff": "Exanthem",
    "patientensprache": "Hautausschlag („Ich hab Pusteln / rote Flecken bekommen“)",
    "category": "Symptome & Beschwerden",
    "example": "Nach Amoxicillin trat ein makulopapulöses Exanthem auf."
  },
  {
    "id": "voc-631",
    "fachbegriff": "Urtikaria",
    "patientensprache": "Nesselsucht („Quaddeln“)",
    "category": "Symptome & Beschwerden",
    "example": "Es zeigt sich eine generalisierte Urtikaria."
  },
  {
    "id": "voc-632",
    "fachbegriff": "Erythem",
    "patientensprache": "Hautrötung („Das ist ganz rot“)",
    "category": "Symptome & Beschwerden",
    "example": "Am Unterschenkel zeigt sich ein scharf begrenztes Erythem."
  },
  {
    "id": "voc-633",
    "fachbegriff": "Petechien",
    "patientensprache": "Punktförmige Hautblutungen („Kleine rote Pünktchen“)",
    "category": "Symptome & Beschwerden",
    "example": "An den Unterschenkeln finden sich Petechien."
  },
  {
    "id": "voc-634",
    "fachbegriff": "Alopezie",
    "patientensprache": "Haarausfall („Mir gehen die Haare büschelweise aus“)",
    "category": "Symptome & Beschwerden",
    "example": "Es besteht eine diffuse Alopezie."
  },
  {
    "id": "voc-635",
    "fachbegriff": "Hyperhidrose",
    "patientensprache": "Übermäßiges Schwitzen („Ich schwitz wie verrückt“)",
    "category": "Symptome & Beschwerden",
    "example": "Die Patientin berichtet über Hyperhidrose und Wärmeintoleranz."
  },
  {
    "id": "voc-636",
    "fachbegriff": "Kaltschweißigkeit",
    "patientensprache": "Kalter Schweiß („Ich bin klatschnass und kalt“)",
    "category": "Symptome & Beschwerden",
    "example": "Der Patient ist blass und kaltschweißig."
  },
  {
    "id": "voc-637",
    "fachbegriff": "Blässe",
    "patientensprache": "Blasse Hautfarbe („Ich bin ganz käsig“)",
    "category": "Symptome & Beschwerden",
    "example": "Die Patientin wirkt blass."
  },
  {
    "id": "voc-638",
    "fachbegriff": "Epistaxis",
    "patientensprache": "Nasenbluten („Meine Nase blutet“)",
    "category": "Symptome & Beschwerden",
    "example": "Es kam zu rezidivierender Epistaxis unter Antikoagulation."
  },
  {
    "id": "voc-639",
    "fachbegriff": "Rhinorrhö",
    "patientensprache": "Laufende Nase („Mir läuft die Nase“)",
    "category": "Symptome & Beschwerden",
    "example": "Die Patientin klagt über Rhinorrhö und Niesreiz."
  },
  {
    "id": "voc-640",
    "fachbegriff": "Otalgie",
    "patientensprache": "Ohrenschmerzen („Mein Ohr tut weh“)",
    "category": "Symptome & Beschwerden",
    "example": "Das Kind hat seit gestern Otalgie links."
  },
  {
    "id": "voc-641",
    "fachbegriff": "Gingivitis",
    "patientensprache": "Zahnfleischentzündung („Mein Zahnfleisch blutet“)",
    "category": "Symptome & Beschwerden",
    "example": ""
  },
  {
    "id": "voc-642",
    "fachbegriff": "Xerostomie",
    "patientensprache": "Mundtrockenheit („Mein Mund ist ganz trocken“)",
    "category": "Symptome & Beschwerden",
    "example": "Unter der Therapie besteht eine Xerostomie."
  },
  {
    "id": "voc-643",
    "fachbegriff": "Singultus",
    "patientensprache": "Schluckauf („Hicksen“)",
    "category": "Symptome & Beschwerden",
    "example": "Der Patient leidet seit zwei Tagen unter Singultus."
  },
  {
    "id": "voc-644",
    "fachbegriff": "Insomnie",
    "patientensprache": "Schlaflosigkeit („Ich kann nicht schlafen“)",
    "category": "Symptome & Beschwerden",
    "example": "Die Patientin berichtet über Ein- und Durchschlafstörungen."
  },
  {
    "id": "voc-645",
    "fachbegriff": "Libidoverlust",
    "patientensprache": "Verminderte sexuelle Lust („Ich hab keine Lust mehr“)",
    "category": "Symptome & Beschwerden",
    "example": "Unter dem Antidepressivum trat Libidoverlust auf."
  },
  {
    "id": "voc-646",
    "fachbegriff": "Dysmenorrhö",
    "patientensprache": "Schmerzhafte Regelblutung („Ich hab ganz schlimme Regelschmerzen“)",
    "category": "Symptome & Beschwerden",
    "example": "Die Patientin leidet unter primärer Dysmenorrhö."
  },
  {
    "id": "voc-647",
    "fachbegriff": "Hypermenorrhö",
    "patientensprache": "Verstärkte Regelblutung („Ich blute bei der Periode sehr stark“)",
    "category": "Symptome & Beschwerden",
    "example": "Es besteht eine Hypermenorrhö mit Eisenmangel."
  },
  {
    "id": "voc-648",
    "fachbegriff": "Amenorrhö",
    "patientensprache": "Ausbleiben der Regelblutung („Meine Tage sind ausgeblieben“)",
    "category": "Symptome & Beschwerden",
    "example": "Die Patientin hat seit drei Monaten eine sekundäre Amenorrhö."
  },
  {
    "id": "voc-649",
    "fachbegriff": "Pruritus ani",
    "patientensprache": "Juckreiz am After („Es juckt am Po“)",
    "category": "Symptome & Beschwerden",
    "example": ""
  },
  {
    "id": "voc-650",
    "fachbegriff": "Kachexie",
    "patientensprache": "Starke Abmagerung („Er ist nur noch Haut und Knochen“)",
    "category": "Symptome & Beschwerden",
    "example": "Der Patient wirkt kachektisch."
  },
  {
    "id": "voc-651",
    "fachbegriff": "Exsikkose",
    "patientensprache": "Austrocknung („Sie hat zu wenig getrunken“)",
    "category": "Symptome & Beschwerden",
    "example": "Die Patientin wurde mit ausgeprägter Exsikkose aufgenommen."
  },
  {
    "id": "voc-652",
    "fachbegriff": "Agitation",
    "patientensprache": "Unruhe („Er ist total zappelig / aufgedreht“)",
    "category": "Symptome & Beschwerden",
    "example": "Nachts zeigte sich der Patient agitiert."
  },
  {
    "id": "voc-653",
    "fachbegriff": "Halluzinationen",
    "patientensprache": "Sinnestäuschungen („Er sieht Sachen, die nicht da sind“)",
    "category": "Symptome & Beschwerden",
    "example": "Der Patient berichtet über optische Halluzinationen."
  }
];
