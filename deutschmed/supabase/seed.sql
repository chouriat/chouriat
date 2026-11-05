-- =====================================================================
-- DeutschMed training data (Taha's script, corrected)
-- Run once in the Supabase SQL Editor after the two schema migrations.
-- Fixes vs. the original are marked "FIX".
-- =====================================================================

-- =====================================================================
-- 1. SEED DATA FOR MEDICAL SCENARIOS (High-Yield FSP Cases)
-- =====================================================================
INSERT INTO public.medical_scenarios (title, difficulty, target_role, specialty, patient_demographics, chief_complaint, clinical_facts)
VALUES
(
    'Akutes Koronarsyndrom (ACS)',
    'B2',
    'doctor',
    'Kardiologie',
    '{"name": "Heinrich Weber", "age": 64, "gender": "M", "profession": "Rentner"}',
    -- FIX: "und ich kaltschweißig" -> "und ich bin kaltschweißig"
    'Ich habe seit einer Stunde so ein massives Engegefühl und brennende Schmerzen hinter dem Brustbein. Es strahlt irgendwie in den linken Arm aus. Mir ist auch total übel und ich bin kaltschweißig.',
    '{"diagnosis": "STEMI (Vorderwandinfarkt)", "vitals": {"bp": "155/95", "hr": 92, "spo2": "93%"}, "history": "Hypertonie, Hypercholesterinämie, Raucher (40 pack-years)", "allergies": "Keine bekannt", "medication": "Ramipril 5mg, Atorvastatin 20mg"}'
),
(
    'Akute Appendizitis',
    'B2',
    'doctor',
    'Viszeralchirurgie',
    '{"name": "Lena Meyer", "age": 23, "gender": "W", "profession": "Studentin"}',
    'Mein Bauch tut tierisch weh. Erst fing es gestern Abend so um den Bauchnabel herum an, aber jetzt ist das total in den rechten Unterbauch gewandert. Jeder Schritt tut höllisch weh und mir ist kotzübel.',
    '{"diagnosis": "Akute Appendizitis", "vitals": {"bp": "115/75", "hr": 88, "temp": "38.2 °C (subfebril)"}, "local_status": "Druckschmerz im rechten Unterbauch, McBurney-Punkt positiv, Loslassschmerz positiv", "last_meal": "Gestern um 20:00 Uhr"}'
),
(
    'Apoplektischer Insult (Schlaganfall)',
    'C1',
    'doctor',
    'Neurologie',
    '{"name": "Renate Fischer", "age": 72, "gender": "W", "profession": "Pensionärin"}',
    -- FIX: removed the "App-Ebene/Begleitperson:" prefix and inner quotes; the speaker is the daughter (fremdanamnese).
    'Meine Mutter saß am Frühstückstisch und plötzlich fiel ihr die Kaffeetasse aus der Hand. Sie lallt total und ihr rechter Mundwinkel hängt herab. Sie versteht mich kaum.',
    -- FIX: "Rechtseitige" -> "Rechtsseitige"; added "speaker" so the AI plays the daughter
    '{"diagnosis": "Ischämischer Schlaganfall (Verdacht auf Verschluss der ACM links)", "speaker": "Tochter (Fremdanamnese)", "vitals": {"bp": "180/100", "hr": 78, "spo2": "96%"}, "onset_time": "Vor ca. 45 Minuten (Time is Brain - Lysefenster offen)", "status": "Rechtsseitige Hemiparese, motorische Aphasie"}'
),
(
    'Postoperative Mobilisation & Schmerzmanagement',
    'B2',
    'nurse',
    'Unfallchirurgie',
    '{"name": "Gerd Müller", "age": 58, "gender": "M", "profession": "Handwerker"}',
    'Ich kann mich unmöglich aufsetzen. Sobald ich das Bein nur einen Millimeter bewege, schießt ein messerscharfer Schmerz durch die Hüfte. Das halte ich nicht aus, geben Sie mir bitte was Echtes gegen die Schmerzen.',
    '{"context": "Zustand nach Totalendoprothese (TEP) der rechten Hüfte gestern", "vitals": {"bp": "130/80", "hr": 84, "spo2": "98%"}, "nursing_goals": "Schmerzevaluation via VAS (aktuell VAS 8), Verabreichung von Bedarfsmedikation laut AO, schmerzarme Mobilisation an die Bettkante"}'
),
(
    'Akute Exazerbation einer COPD',
    'C1',
    'nurse',
    'Pneumologie',
    '{"name": "Walter Wagner", "age": 69, "gender": "M", "profession": "ehem. Bergarbeiter"}',
    'Ich... kriege... keine... Luft mehr. Der Husten... bringt mich um... Schleim sitzt... ganz fest... (Patient schnappt sichtbar nach Luft, zyanotische Lippen).',
    -- FIX: "exspiratorischer Stridor" -> "exspiratorisches Giemen und Brummen" (stridor is an upper-airway sign; COPD gives wheezing)
    '{"diagnosis": "AECOPD", "vitals": {"bp": "140/90", "hr": 105, "spo2": "87% unter Raumluft", "rr": 26}, "clinical_features": "Einsatz der Atemhilfsmuskulatur, exspiratorisches Giemen und Brummen, verlängertes Exspirium, produktiver Husten mit gelblich-grünem Sputum", "intervention": "O2-Gabe restriktiv (max 2L/min via Brille), Kutschersitz anleiten, Arzt verständigen"}'
);

-- =====================================================================
-- 2. SEED DATA FOR VOCABULARY DICTIONARY (The 3-Tier Medical Language)
-- =====================================================================
-- FIX: column name "gemeinsamprache" -> "gemeinsprache" (the original fails here)
INSERT INTO public.vocabulary_dictionary (fachbegriff, gemeinsprache, umgangssprache, example_sentence, category)
VALUES
-- Cardiovascular / Kardiologie
('Akutes Koronarsyndrom (ACS)', 'Herzinfarkt / akute Herzdurchblutungsstörung', 'Herzkasper / schwere Herzattacke', 'Der Patient wurde mit Verdacht auf ein ACS prähospital erstversorgt.', 'Kardiologie'),
('Angina Pectoris', 'Brustenge / Herzschmerz', 'Drücken oder Stechen in der Brust', 'Eine stabile Angina Pectoris tritt typischerweise unter körperlicher Belastung auf.', 'Kardiologie'),
('Synkope', 'Ohnmacht / Kreislaufkollaps', 'Schwarzwerden vor den Augen / Umkippen', 'Nach dem schnellen Aufstehen erlitt der Patient eine vasovagale Synkope.', 'Kardiologie'),
('Hypertonie', 'Bluthochdruck', 'Zu hoher Blutdruck', 'Die arterielle Hypertonie ist ein Hauptrisikofaktor für kardiovaskuläre Erkrankungen.', 'Kardiologie'),

-- Gastrointestinal / Viszeralchirurgie
-- FIX: Appendizitis is the inflammation, not the removal (that is Appendektomie);
--      patients say "Blinddarmentzündung", "Wurmfortsatzentzündung" is the formal standard term.
('Appendizitis', 'Wurmfortsatzentzündung', 'Blinddarmentzündung / Blinddarm', 'Der klassische Wanderungsschmerz spricht für eine akute Appendizitis.', 'Gastroenterologie'),
-- FIX: "Rechtseitige" -> "Rechtsseitige"
('Cholezystitis', 'Gallenblasenentzündung', 'Gallenkolik / Gallenprobleme', 'Rechtsseitige Oberbauchschmerzen nach fettreichem Essen deuten auf eine Cholezystitis hin.', 'Gastroenterologie'),
('Nausea und Emesis', 'Übelkeit und Erbrechen', 'Kotzen / Spucken / flau im Magen sein', 'Der Patient leidet postoperativ unter ausgeprägter Nausea und Emesis.', 'Gastroenterologie'),
('Meläna', 'Teerstuhl', 'Schwarzer, übelriechender Stuhlgang', 'Meläna ist ein Leitsymptom für eine obere Gastrointestinalblutung.', 'Gastroenterologie'),

-- Neurology / Neurologie
('Apoplektischer Insult', 'Schlaganfall', 'Gehirnschlag / Schlag', 'Beim apoplektischen Insult zählt jede Minute, um bleibende Schäden zu verhindern.', 'Neurologie'),
('Cephalgie', 'Kopfschmerzen', 'Schädelbrummen / Brummschädel', 'Die Patientin klagt über eine therapierefraktäre Cephalgie im Frontalbereich.', 'Neurologie'),
('Hemiparese', 'Halbseitenlähmung', 'Eine Seite ist wie gelähmt / taub', 'Nach dem Schlaganfall zeigte sich eine linksseitige, schlaffe Hemiparese.', 'Neurologie'),
('Dysphagie', 'Schluckstörung', 'Probleme beim Schlucken / Verschlucken', 'Wegen der ausgeprägten Dysphagie muss der Patient zunächst nüchtern bleiben.', 'Neurologie'),

-- Nursing Terminology & Symptoms / Pflege
('Dyspnoe', 'Atemnot', 'Keine Luft kriegen / Japsen', 'Der Patient weist eine Ruhedyspnoe auf und benötigt eine Oberkörperhochlagerung.', 'Symptome'),
('Zyanose', 'Blaufärbung der Haut/Lippen', 'Blau anlaufen', 'Die periphere Zyanose war an den Fingern und Lippen deutlich sichtbar.', 'Symptome'),
('Hämatom', 'Bluterguss', 'Blauer Fleck', 'Nach der i.v.-Injektion bildete sich ein ausgedehntes Hämatom in der Ellenbeuge.', 'Allgemein'),
('Obstipation', 'Verstopfung', 'Keinen Stuhlgang haben / verstopft sein', 'Nach tagelanger Opioideinnahme klagt der Patient über eine schmerzhafte Obstipation.', 'Allgemein'),
('Dekubitus', 'Druckgeschwür', 'Wundliegen', 'Zur Vermeidung eines Dekubitus ist ein engmaschiger Lagerungsplan erforderlich.', 'Pflege');
