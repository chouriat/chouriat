-- Starter content for local development (`npx supabase db reset` runs this).
-- On a hosted project, paste it into the SQL editor once.
-- Cases mirror lib/medical-cases.ts.

INSERT INTO public.medical_scenarios
    (title, difficulty, target_role, specialty, patient_demographics, chief_complaint, clinical_facts)
VALUES
(
    'Akutes Koronarsyndrom (ACS)', 'B2', 'doctor', 'Kardiologie',
    '{"name": "Herr Klaus Schmidt", "age": 62, "gender": "M", "occupation": "Busfahrer"}',
    'Herr Doktor, mir drückt''s seit heute Morgen so auf der Brust, als ob ein Elefant drauf sitzt. Und es zieht bis in den linken Arm.',
    '{
        "diagnosis": "NSTEMI",
        "differentials": ["Lungenarterienembolie", "Aortendissektion", "Perikarditis", "Refluxösophagitis"],
        "vitals": {"rr": "160/95", "hf": 98, "af": 20, "temp": 36.8, "spo2": 95},
        "history": {
            "current": "Seit ca. 3 Stunden retrosternaler Druckschmerz mit Ausstrahlung in den linken Arm, Kaltschweißigkeit und Übelkeit. Schmerz in Ruhe aufgetreten.",
            "previous": ["Arterielle Hypertonie", "Diabetes mellitus Typ 2", "Hypercholesterinämie"],
            "medication": ["Ramipril 5 mg 1-0-0", "Metformin 1000 mg 1-0-1", "Simvastatin 20 mg 0-0-1"],
            "allergies": ["Penicillin (Exanthem)"],
            "social": "Raucher, 30 pack years. Alkohol gelegentlich. Verheiratet, zwei Kinder.",
            "family": "Vater mit 58 Jahren an Herzinfarkt verstorben."
        },
        "labs": {"hs-Troponin T": "84 ng/l (erhöht)", "CK-MB": "leicht erhöht", "Kalium": "4,1 mmol/l"}
    }'
),
(
    'Akute Appendizitis', 'B2', 'doctor', 'Chirurgie',
    '{"name": "Frau Lena Weber", "age": 24, "gender": "W", "occupation": "Studentin"}',
    'Gestern Abend hat''s erst so um den Bauchnabel rum wehgetan, und jetzt sticht es richtig doll unten rechts. Mir ist auch total übel.',
    '{
        "diagnosis": "Akute Appendizitis",
        "differentials": ["Extrauteringravidität", "Ovarialtorsion", "Adnexitis", "Gastroenteritis", "Harnwegsinfekt"],
        "vitals": {"rr": "120/75", "hf": 104, "af": 18, "temp": 38.4, "spo2": 98},
        "history": {
            "current": "Seit ca. 18 Stunden Bauchschmerzen, initial periumbilikal, jetzt im rechten Unterbauch lokalisiert. Übelkeit, einmaliges Erbrechen, Appetitlosigkeit.",
            "previous": ["Keine"],
            "medication": ["Orale Kontrazeption"],
            "allergies": ["Keine bekannt"],
            "social": "Nichtraucherin, Alkohol am Wochenende. Letzte Regelblutung vor 2 Wochen.",
            "family": "Unauffällig."
        },
        "labs": {"Leukozyten": "14,2 /nl (erhöht)", "CRP": "48 mg/l (erhöht)", "β-HCG": "negativ"}
    }'
),
(
    'Apoplex (ischämischer Schlaganfall)', 'C1', 'doctor', 'Neurologie',
    '{"name": "Frau Ingrid Becker", "age": 74, "gender": "W", "occupation": "Rentnerin"}',
    'Meine Tochter sagt, ich red so komisch. Und mein rechter Arm, der will einfach nicht mehr so wie ich.',
    '{
        "diagnosis": "Ischämischer Schlaganfall im Stromgebiet der A. cerebri media links",
        "differentials": ["Intrazerebrale Blutung", "Hypoglykämie", "Todd-Parese nach Krampfanfall", "Migräne mit Aura"],
        "vitals": {"rr": "185/100", "hf": 88, "af": 16, "temp": 36.6, "spo2": 96},
        "history": {
            "current": "Seit ca. 90 Minuten (Symptombeginn beobachtet durch Tochter) Armparese rechts und Wortfindungsstörungen. Keine Kopfschmerzen, kein Trauma.",
            "previous": ["Vorhofflimmern", "Arterielle Hypertonie"],
            "medication": ["Bisoprolol 5 mg 1-0-0", "Amlodipin 5 mg 1-0-0", "Apixaban vor 1 Woche eigenständig abgesetzt"],
            "allergies": ["Keine bekannt"],
            "social": "Verwitwet, lebt allein, selbstständig. Nichtraucherin.",
            "family": "Mutter hatte einen Schlaganfall."
        },
        "labs": {"Blutzucker": "128 mg/dl", "INR": "1,0", "Thrombozyten": "245 /nl"}
    }'
);

INSERT INTO public.vocabulary_dictionary
    (fachbegriff, gemeinsprache, umgangssprache, example_sentence, category)
VALUES
    ('Cephalgie', 'Kopfschmerzen', 'Schädelbrummen', 'Die Patientin klagt seit drei Tagen über eine holozephale Cephalgie.', 'Symptome'),
    ('Dyspnoe', 'Atemnot', 'Ich krieg keine Luft', 'Der Patient berichtet über eine Belastungsdyspnoe nach einem Stockwerk.', 'Symptome'),
    ('Nausea', 'Übelkeit', 'Mir ist kotzübel', 'Begleitend bestehen Nausea und einmaliges Erbrechen.', 'Symptome'),
    ('Emesis', 'Erbrechen', 'Ich musste spucken', 'Es kam zu dreimaliger Emesis seit dem Vorabend.', 'Symptome'),
    ('Diarrhö', 'Durchfall', 'Dünnpfiff', 'Seit zwei Tagen bestehen wässrige Diarrhöen ohne Blutbeimengung.', 'Symptome'),
    ('Obstipation', 'Verstopfung', 'Ich kann nicht', 'Die Patientin gibt eine seit Jahren bestehende Obstipation an.', 'Symptome'),
    ('Vertigo', 'Schwindel', 'Mir ist ganz duselig', 'Der Patient beschreibt einen Drehschwindel beim Aufstehen.', 'Symptome'),
    ('Pruritus', 'Juckreiz', 'Es juckt wie verrückt', 'Seit Beginn der Antibiose besteht ein generalisierter Pruritus.', 'Symptome'),
    ('Hämatemesis', 'Bluterbrechen', 'Ich hab Blut gespuckt', 'Bei Aufnahme berichtet der Patient über Hämatemesis.', 'Symptome'),
    ('Thorax', 'Brustkorb', 'Brust', 'Der Thorax ist symmetrisch, die Atemexkursion seitengleich.', 'Anatomie'),
    ('Abdomen', 'Bauch', 'Plauze', 'Das Abdomen ist weich, kein Druckschmerz, keine Abwehrspannung.', 'Anatomie'),
    ('Kolektomie', 'Dickdarmentfernung', 'Plauze aufgeschnitten', 'Z. n. Hemikolektomie rechts 2019 bei Kolonkarzinom.', 'Eingriffe'),
    ('Appendektomie', 'Blinddarmentfernung', 'Blinddarm rausgenommen', 'Z. n. Appendektomie im Kindesalter.', 'Eingriffe'),
    ('Hypertonie', 'Bluthochdruck', 'Zu hoher Druck', 'Bekannte arterielle Hypertonie, medikamentös eingestellt.', 'Diagnosen'),
    ('Diabetes mellitus', 'Zuckerkrankheit', 'Zucker', 'Diabetes mellitus Typ 2, insulinpflichtig seit 2020.', 'Diagnosen'),
    ('Analgetikum', 'Schmerzmittel', 'Schmerztablette', 'Bei Bedarf erhält der Patient ein Analgetikum i.v.', 'Medikamente'),
    ('Antikoagulans', 'Blutverdünner', 'Blutverdünner', 'Die Patientin nimmt dauerhaft ein orales Antikoagulans ein.', 'Medikamente');
