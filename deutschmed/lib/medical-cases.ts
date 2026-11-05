// deutschmed/lib/medical-cases.ts

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
  difficulty: 'Leicht' | 'Mittel' | 'Schwer' | string;
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
    id: 'acs-1',
    title: 'Akuter Thoraxschmerz (V.a. Akutes Koronarsyndrom)',
    specialty: 'Innere Medizin / Kardiologie',
    category: 'Kardiologie',
    difficulty: 'Mittel',
    patientName: 'Hans-Peter Müller',
    patientAge: 58,
    chiefComplaint: 'Seit 2 Stunden starke, drückende Brustschmerzen mit Ausstrahlung in den linken Arm.',
    patient: {
      name: 'Hans-Peter Müller',
      age: 58,
      gender: 'm',
      occupation: 'Bauingenieur',
      chiefComplaint:
        'Seit 2 Stunden starke, drückende Brustschmerzen mit Ausstrahlung in den linken Arm.',
      vitalSigns: {
        bp: '165/95 mmHg',
        hr: '98 /min',
        temp: '36,8 °C',
        spo2: '94 % (Raumluft)',
      },
      historyDetails:
        'Schmerzbeginn vor 2 Stunden beim Treppensteigen, Intensität 8/10 auf der NRS, Engegefühl wie ein schwerer Stein auf der Brust, Kaltschweißigkeit und leichte Luftnot (Dyspnoe). Bekannte arterielle Hypertonie (Ramipril 5 mg 1-0-0, unregelmäßig eingenommen) und Hypercholesterinämie. Nikotinabusus: 30 Packungsjahre (1 Schachtel/Tag seit 30 Jahren). Vater mit 62 Jahren an Myokardinfarkt verstorben. Keine Allergien.',
    },
    anamneseQuestions: [
      {
        id: 'q1',
        phase: 'Aktuelle Beschwerden (Schmerzcharakter)',
        doctorOptions: [
          {
            text: 'Guten Tag Herr Müller, mein Name ist Dr. [Name]. Was führt Sie heute zu uns, und wie genau fühlen sich Ihre Schmerzen an?',
            isOptimal: true,
            feedback:
              'Sehr gut! Höfliche Vorstellung und offene Einstiegsfrage in klarer, empathischer Patientensprache.',
          },
          {
            text: 'Haben Sie eine retrosternale Angina pectoris mit linksthorakaler Radiation?',
            isOptimal: false,
            feedback:
              'Achtung FSP-Fehler: Vermeiden Sie im Patientengespräch medizinischen Fachjargon wie „retrosternal“ oder „Angina pectoris“.',
          },
        ],
        patientResponse:
          'Guten Tag Doktor! Seit etwa zwei Stunden habe ich so einen furchtbaren Druck mitten auf der Brust, als ob mir jemand einen schweren Stein draufgelegt hätte. Es zieht auch in meinen linken Arm und bis in den Unterkiefer.',
      },
      {
        id: 'q2',
        phase: 'Vegetative Begleitsymptome',
        doctorOptions: [
          {
            text: 'Bemerken Sie zusätzlich Luftnot, Übelkeit oder starkes Schwitzen?',
            isOptimal: true,
            feedback:
              'Exzellent! Sie prüfen wichtige Begleitsymptome (Luftnot, Übelkeit, Kaltschweißigkeit) verständlich ab.',
          },
          {
            text: 'Bestehen Dyspnoe, Nausea oder vegetative Diaphorese?',
            isOptimal: false,
            feedback:
              'Zu viel Fachsprache! Der Patient versteht Begriffe wie „Dyspnoe“, „Nausea“ oder „Diaphorese“ meist nicht.',
          },
        ],
        patientResponse:
          'Ja, mir ist tatsächlich ziemlich übel, das Hemd ist komplett nassgeschwitzt und ich bekomme beim Sprechen schwer Luft.',
      },
      {
        id: 'q3',
        phase: 'Vorerkrankungen, Medikamente & Risikofaktoren',
        doctorOptions: [
          {
            text: 'Sind bei Ihnen Vorerkrankungen wie Bluthochdruck bekannt, nehmen Sie regelmäßig Medikamente ein und rauchen Sie?',
            isOptimal: true,
            feedback:
              'Sehr strukturiert! Kardiovaskuläre Risikofaktoren und Medikamentenadhärenz werden klar erfragt.',
          },
          {
            text: 'Welche kardiovaskuläre Komorbidität und Pharmakotherapie liegt vor?',
            isOptimal: false,
            feedback:
              'Verwenden Sie im Arzt-Patienten-Gespräch „Vorerkrankungen“ und „Medikamente“ statt „Komorbidität“ und „Pharmakotherapie“.',
          },
        ],
        patientResponse:
          'Ich habe seit fünf Jahren Bluthochdruck und nehme morgens Ramipril 5 mg, vergesse die Tablette aber manchmal. Außerdem rauche ich seit 30 Jahren etwa eine Schachtel Zigaretten am Tag. Mein Vater hatte mit 62 Jahren einen Herzinfarkt.',
      },
    ],
    arztbriefTemplate: {
      prompt:
        'Verfassen Sie die aktuelle Anamnese und Epikrise für Herrn Hans-Peter Müller (58 J.) im medizinischen Fachstil (C1 / Konjunktiv I für Patientenangaben).',
      requiredTerms: [
        'retrosternal',
        'Dyspnoe',
        'arterielle Hypertonie',
        'Nikotinabusus',
        'Akutes Koronarsyndrom',
      ],
      sampleSolution:
        'Herr Hans-Peter Müller, ein 58-jähriger Patient, stellte sich heute aufgrund seit zwei Stunden bestehender, akut nach körperlicher Belastung aufgetretener, drückender retrosternaler Thoraxschmerzen (NRS 8/10) mit Ausstrahlung in den linken Arm sowie die Mandibula in unserer Notaufnahme vor. Begleitend berichtete der Patient über Belastungs- und Ruhedyspnoe, Nausea sowie Kaltschweißigkeit. An Vorerkrankungen sei eine arterielle Hypertonie bekannt, die mit Ramipril 5 mg (1-0-0) bei jedoch unregelmäßiger Medikamentenadhärenz behandelt werde. Zudem bestehe ein Nikotinabusus von ca. 30 Packungsjahren sowie eine positive Familienanamnese (Myokardinfarkt des Vaters mit 62 Jahren). Zusammenfassend ergibt sich der dringende Verdacht auf ein Akutes Koronarsyndrom (ACS), sodass wir umgehend ein 12-Kanal-EKG sowie eine Troponin-Bestimmung veranlassten.',
    },
    isbarSteps: [
      {
        step: 'I',
        label: 'Identify (Identifikation)',
        guidance: 'Nennen Sie Ihren Namen, Ihre Funktion sowie Name, Alter und Aufenthaltsort des Patienten.',
        sampleSpeech:
          'Ich übergebe Herrn Hans-Peter Müller, 58 Jahre alt, aktuell in der Notaufnahme Kabine 2.',
      },
      {
        step: 'S',
        label: 'Situation (Aktuelle Situation)',
        guidance: 'Fassen Sie den Vorstellungsgrund und die Arbeitsdiagnose in einem prägnanten Satz zusammen.',
        sampleSpeech:
          'Der Patient stellte sich mit seit zwei Stunden bestehenden, vernichtenden retrosternalen Thoraxschmerzen (NRS 8/10) mit Ausstrahlung in den linken Arm bei dringendem Verdacht auf ein Akutes Koronarsyndrom vor.',
      },
      {
        step: 'B',
        label: 'Background (Klinischer Hintergrund)',
        guidance: 'Nennen Sie relevante Begleitsymptome, Vorerkrankungen, Medikation und Risikofaktoren.',
        sampleSpeech:
          'Begleitend bestehen Ruhedyspnoe, Nausea und Kaltschweißigkeit. Anamnestisch sind eine arterielle Hypertonie unter unregelmäßiger Einnahme von Ramipril 5 mg, ein Nikotinabusus von 30 Packungsjahren sowie eine positive Familienanamnese für Myokardinfarkt bekannt.',
      },
      {
        step: 'A',
        label: 'Assessment (Aktuelle Einschätzung & Vitalparameter)',
        guidance: 'Berichten Sie über die aktuellen Vitalparameter und Ihre klinische Gesamteinschätzung.',
        sampleSpeech:
          'Klinisch präsentiert sich der Patient akut kardial gefährdet mit einem Blutdruck von 165/95 mmHg, einer Herzfrequenz von 98/min und einer Sauerstoffsättigung von 94 % unter Raumluft.',
      },
      {
        step: 'R',
        label: 'Recommendation (Empfehlung & weiteres Vorgehen)',
        guidance: 'Formulieren Sie die nächsten diagnostischen und therapeutischen Sofortmaßnahmen.',
        sampleSpeech:
          'Ich empfehle ein sofortiges 12-Kanal-EKG innerhalb von 10 Minuten, venösen Zugang mit Labor inklusive hochsensitivem Troponin, Monitoring sowie Bereitschaft zur Herzkatheter-Intervention.',
      },
    ],
  },
  {
    id: 'appendizitis-1',
    title: 'Akutes Abdomen (V.a. Akute Appendizitis)',
    specialty: 'Allgemein- und Viszeralchirurgie',
    category: 'Chirurgie',
    difficulty: 'Leicht',
    patientName: 'Laura Schneider',
    patientAge: 24,
    chiefComplaint: 'Seit gestern zunehmende Bauchschmerzen, jetzt stechend im rechten Unterbauch.',
    patient: {
      name: 'Laura Schneider',
      age: 24,
      gender: 'w',
      occupation: 'Lehramtsstudentin',
      chiefComplaint:
        'Seit gestern zunehmende Bauchschmerzen, jetzt stechend im rechten Unterbauch.',
      vitalSigns: {
        bp: '120/75 mmHg',
        hr: '92 /min',
        temp: '38,4 °C',
        spo2: '99 % (Raumluft)',
      },
      historyDetails:
        'Schmerzbeginn gestern Morgen zunächst dumpf um den Bauchnabel (periumbilikal), seit heute Nacht Verlagerung in den rechten Unterbauch (stechend, NRS 7/10, Verschlimmerung beim Gehen und Husten). Einmaliges Erbrechen heute Morgen, Appetitlosigkeit (Inappetenz) und leichtes Fieber (38,4 °C). Keine Vorerkrankungen, keine Dauermedikation. Allergie gegen Penicillin (Hautausschlag). Letzte Regelblutung vor 2 Wochen unauffällig.',
    },
    anamneseQuestions: [
      {
        id: 'app-q1',
        phase: 'Schmerzlokalisation & Schmerzwanderung',
        doctorOptions: [
          {
            text: 'Wo genau haben die Bauchschmerzen gestern begonnen, und hat sich der Schmerzort seitdem verändert?',
            isOptimal: true,
            feedback:
              'Sehr gut! Sie fragen gezielt und verständlich nach der klassischen Schmerzwanderung bei Appendizitis.',
          },
          {
            text: 'Lag initial eine periumbilikale Viszeralgie mit Migration in die Fossa iliaca dextra vor?',
            isOptimal: false,
            feedback:
              'Vermeiden Sie im Patientengespräch lateinische Anatomiebegriffe wie „periumbilikal“ oder „Fossa iliaca dextra“.',
          },
        ],
        patientResponse:
          'Gestern Morgen hat es eher dumpf rund um den Bauchnabel angefangen. Seit heute Nacht ist der Schmerz aber nach rechts unten gewandert und sticht jetzt richtig stark, besonders wenn ich auftrete oder huste.',
      },
      {
        id: 'app-q2',
        phase: 'Begleitsymptome & Gynäkologische Anamnese',
        doctorOptions: [
          {
            text: 'Haben Sie Fieber, Übelkeit oder Erbrechen bemerkt, und wann war Ihre letzte Regelblutung?',
            isOptimal: true,
            feedback:
              'Wichtige Differenzialdiagnostik! Vegetative Symptome und gynäkologische Anamnese wurden respektvoll erfragt.',
          },
          {
            text: 'Bestehen Emesis, Inappetenz, Pyrexie oder eine Gravidität?',
            isOptimal: false,
            feedback:
              'Nutzen Sie gegenüber der Patientin „Erbrechen“, „Appetitlosigkeit“, „Fieber“ und „Schwangerschaft“.',
          },
        ],
        patientResponse:
          'Heute Morgen musste ich mich einmal übergeben und ich habe überhaupt keinen Appetit. Vorhin hatte ich 38,4 Grad Fieber. Meine letzte Periode war vor zwei Wochen ganz normal, schwanger bin ich nicht.',
      },
      {
        id: 'app-q3',
        phase: 'Allergien & Medikamente',
        doctorOptions: [
          {
            text: 'Nehmen Sie regelmäßig Medikamente ein oder reagieren Sie allergisch auf bestimmte Arzneimittel wie Antibiotika?',
            isOptimal: true,
            feedback:
              'Sehr wichtig vor einer möglichen Operation oder Antibiotikagabe!',
          },
          {
            text: 'Besteht eine Medikamenten-Hypersensitivität gegenüber Beta-Laktam-Antibiotika?',
            isOptimal: false,
            feedback:
              'Fragen Sie schlicht nach „Allergien gegen Medikamente oder Penicillin“.',
          },
        ],
        patientResponse:
          'Regelmäßig nehme ich keine Medikamente, aber ich bin allergisch gegen Penicillin – davon bekomme ich am ganzen Körper einen roten Hautausschlag.',
      },
    ],
    arztbriefTemplate: {
      prompt:
        'Verfassen Sie den Anamnese- und Befundabschnitt für Frau Laura Schneider (24 J.) mit Verdacht auf akute Appendizitis.',
      requiredTerms: [
        'periumbilikal',
        'rechter Unterbauch',
        'Emesis',
        'Inappetenz',
        'Appendizitis',
      ],
      sampleSolution:
        'Die 24-jährige Patientin Frau Laura Schneider stellte sich mit seit dem Vortag progredienten Abdominalschmerzen vor. Anamnestisch habe der Schmerz initial dumpf periumbilikal begonnen und habe sich im Verlauf der Nacht in den rechten Unterbauch verlagert (aktuell stechend, NRS 7/10, Erschütterungsschmerz beim Gehen). Begleitend berichtete die Patientin über einmalige Emesis am Morgen, ausgeprägte Inappetenz sowie subfebrile bis febrile Temperaturen bis 38,4 °C. Gynäkologisch sei die letzte Menstruation vor zwei Wochen regelrecht verlaufen. Vorerkrankungen bestünden nicht, jedoch sei eine Penicillinallergie (Exanthem) bekannt. In der Zusammenschau besteht der dringende Verdacht auf eine akute Appendizitis.',
    },
    isbarSteps: [
      {
        step: 'I',
        label: 'Identify (Identifikation)',
        guidance: 'Stellen Sie die Patientin mit Name und Alter vor.',
        sampleSpeech:
          'Ich übergebe Frau Laura Schneider, eine 24-jährige Patientin in der chirurgischen Notaufnahme.',
      },
      {
        step: 'S',
        label: 'Situation (Aktuelle Situation)',
        guidance: 'Benennen Sie das Leitsymptom und die Verdachtsdiagnose.',
        sampleSpeech:
          'Die Patientin stellt sich mit akuten, rechtsseitigen Unterbauchschmerzen und Fieber bei dringendem Verdacht auf eine akute Appendizitis vor.',
      },
      {
        step: 'B',
        label: 'Background (Klinischer Hintergrund)',
        guidance: 'Schildern Sie die typische Schmerzwanderung, Begleitsymptome und Allergien.',
        sampleSpeech:
          'Die Schmerzen begannen gestern periumbilikal und wanderten heute Nacht in den rechten Unterbauch. Begleitend bestehen Inappetenz, einmalige Emesis sowie Temperaturerhöhung auf 38,4 °C. Wichtig: Es besteht eine Penicillinallergie mit Exanthem.',
      },
      {
        step: 'A',
        label: 'Assessment (Aktuelle Einschätzung & Vitalparameter)',
        guidance: 'Fassen Sie Vitalparameter und klinischen Eindruck zusammen.',
        sampleSpeech:
          'Die Patientin ist kreislaufstabil (RR 120/75 mmHg, HF 92/min), febril mit 38,4 °C und zeigt klinisch einen deutlichen Erschütterungsschmerz im rechten Unterbauch.',
      },
      {
        step: 'R',
        label: 'Recommendation (Empfehlung & weiteres Vorgehen)',
        guidance: 'Schlagen Sie Labor, Sonographie und chirurgisches Vorgehen vor.',
        sampleSpeech:
          'Ich empfehle eine Blutentnahme (Leukozyten, CRP, Beta-HCG), eine Abdomensonographie sowie die Vorstellung beim chirurgischen Hintergrunddienst zur Indikationsstellung einer laparoskopischen Appendektomie.',
      },
    ],
  },
];

export const VOCABULARY_LIST: VocabularyItem[] = [
  {
    id: 'voc-1',
    fachbegriff: 'Dyspnoe',
    patientensprache: 'Atemnot / Luftnot',
    category: 'Kardiologie & Pneumologie',
    example: 'Der Patient klagt über belastungsabhängige Dyspnoe.',
  },
  {
    id: 'voc-2',
    fachbegriff: 'Thoraxschmerz (retrosternal)',
    patientensprache: 'Brustschmerzen hinter dem Brustbein',
    category: 'Kardiologie & Pneumologie',
    example: 'Seit zwei Stunden bestehen drückende retrosternale Thoraxschmerzen.',
  },
  {
    id: 'voc-3',
    fachbegriff: 'Emesis / Vomitus',
    patientensprache: 'Erbrechen',
    category: 'Gastroenterologie',
    example: 'Anamnestisch wird zweimalige Emesis angegeben.',
  },
  {
    id: 'voc-4',
    fachbegriff: 'Nausea',
    patientensprache: 'Übelkeit',
    category: 'Gastroenterologie',
    example: 'Begleitend besteht ausgeprägte Nausea ohne Vomitus.',
  },
  {
    id: 'voc-5',
    fachbegriff: 'Cephalgie',
    patientensprache: 'Kopfschmerzen',
    category: 'Neurologie',
    example: 'Die Patientin berichtet über akut einsetzende Cephalgien.',
  },
  {
    id: 'voc-6',
    fachbegriff: 'Vertigo',
    patientensprache: 'Schwindel',
    category: 'Neurologie',
    example: 'Es besteht ein gerichteter Drehschwindel (Vertigo).',
  },
  {
    id: 'voc-7',
    fachbegriff: 'Pyrexie / Febris',
    patientensprache: 'Fieber',
    category: 'Allgemeinmedizin & Infektiologie',
    example: 'Klinisch zeigt sich Febris bis 39,2 °C.',
  },
  {
    id: 'voc-8',
    fachbegriff: 'Appendizitis',
    patientensprache: 'Blinddarmentzündung (Wurmfortsatzentzündung)',
    category: 'Chirurgie',
    example: 'Sonographisch erhärtet sich der Verdacht auf eine akute Appendizitis.',
  },
  {
    id: 'voc-9',
    fachbegriff: 'Inappetenz',
    patientensprache: 'Appetitlosigkeit',
    category: 'Gastroenterologie',
    example: 'Seit Symptombeginn besteht eine ausgeprägte Inappetenz.',
  },
  {
    id: 'voc-10',
    fachbegriff: 'Arterielle Hypertonie',
    patientensprache: 'Bluthochdruck',
    category: 'Kardiologie & Pneumologie',
    example: 'Als Vorerkrankung ist eine arterielle Hypertonie bekannt.',
  },
];
