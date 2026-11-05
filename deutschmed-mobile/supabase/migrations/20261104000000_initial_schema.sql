-- =====================================================================
-- 1. ENUMS & EXTENSIONS
-- =====================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Define user professions to tailor medical scenarios
CREATE TYPE medical_role AS ENUM ('doctor', 'nurse');

-- Track user proficiency levels
CREATE TYPE language_level AS ENUM ('B1', 'B2', 'C1');

-- Type of training simulation
CREATE TYPE scenario_type AS ENUM ('anamnese', 'arztbrief', 'uebergabe');

-- =====================================================================
-- 2. USERS & PROFILES
-- =====================================================================
-- Links directly to Supabase Auth (auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    full_name TEXT NOT NULL,
    role medical_role NOT NULL DEFAULT 'doctor',
    target_level language_level NOT NULL DEFAULT 'B2',
    hospital_specialty TEXT DEFAULT 'Allgemeinmedizin', -- e.g., Innere Medizin, Chirurgie
    daily_goal_minutes INT DEFAULT 15,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =====================================================================
-- 3. MEDICAL SCENARIOS (CMS/CONTENT)
-- =====================================================================
-- Seed cases for simulations (e.g., Appendizitis, Herzinfarkt)
CREATE TABLE public.medical_scenarios (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL, -- e.g., "Akutes Koronarsyndrom (ACS)"
    difficulty language_level NOT NULL DEFAULT 'B2',
    target_role medical_role NOT NULL DEFAULT 'doctor',
    specialty TEXT NOT NULL, -- e.g., "Kardiologie"
    patient_demographics JSONB NOT NULL, -- e.g., { name: "Herr Schmidt", age: 62, gender: "M" }
    chief_complaint TEXT NOT NULL, -- What the patient says in colloquial German
    clinical_facts JSONB NOT NULL, -- Ground truth for AI (vitals, true diagnosis, lab data)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =====================================================================
-- 4. SIMULATION SESSIONS & PROGRESS TRACKING
-- =====================================================================
-- Tracks interactive AI-Patient chat histories
CREATE TABLE public.simulation_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    scenario_id UUID REFERENCES public.medical_scenarios(id) ON DELETE SET NULL,
    type scenario_type NOT NULL,
    chat_history JSONB DEFAULT '[]'::jsonb, -- Array of messages: {role: "patient/user", content: "...", corrections: {}}
    user_documentation TEXT, -- The Arztbrief or Pflegebericht written by the user
    ai_feedback JSONB, -- Evaluation metrics: {grammar_score: 85, medical_jargon_score: 90, feedback_text: "..."}
    is_completed BOOLEAN DEFAULT FALSE,
    score INT CHECK (score >= 0 AND score <= 100),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- =====================================================================
-- 5. SPACED REPETITION VOCABULARY DECK
-- =====================================================================
-- Global dictionary covering the 3 layers of German Medical Language
CREATE TABLE public.vocabulary_dictionary (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    fachbegriff TEXT NOT NULL, -- Medical/Latin term (e.g., "Cephalgie", "Kolektomie")
    gemeinsprache TEXT NOT NULL, -- Standard German (e.g., "Kopfschmerzen", "Dickdarmentfernung")
    umgangssprache TEXT, -- What the patient says (e.g., "Schädelbrummen", "Plauze aufgeschnitten")
    example_sentence TEXT, -- Contextual clinical sentence
    audio_url TEXT, -- URL to pronunciation file
    category TEXT NOT NULL -- e.g., "Anatomie", "Symptome", "Medikamente"
);

-- User-specific card tracking for Spaced Repetition (SuperMemo-2 algorithm style)
CREATE TABLE public.user_flashcards (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    vocab_id UUID REFERENCES public.vocabulary_dictionary(id) ON DELETE CASCADE NOT NULL,
    box INT DEFAULT 1 NOT NULL, -- Leitner system box system or interval tracker
    easiness_factor REAL DEFAULT 2.5 NOT NULL,
    repetitions INT DEFAULT 0 NOT NULL,
    next_review_due TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id, vocab_id)
);

-- =====================================================================
-- 6. AUTOMATION & TRIGGERS (Auto-manage Timestamps)
-- =====================================================================
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_modtime
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

-- =====================================================================
-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================================
-- Enable RLS on all tables to protect user privacy
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.simulation_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vocabulary_dictionary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_flashcards ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can view and manage only their own profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Medical Scenarios: Read-only for all authenticated app users
CREATE POLICY "Authenticated users can view scenarios" ON public.medical_scenarios FOR SELECT TO authenticated USING (true);

-- Simulation Sessions: Users can interact only with their own study sessions
CREATE POLICY "Users can manage own sessions" ON public.simulation_sessions FOR ALL USING (auth.uid() = user_id);

-- Vocabulary Dictionary: Read-only for all authenticated app users
CREATE POLICY "Authenticated users can view vocabulary" ON public.vocabulary_dictionary FOR SELECT TO authenticated USING (true);

-- User Flashcards: Users can manage their personal review scheduling data
CREATE POLICY "Users can manage own flashcards" ON public.user_flashcards FOR ALL USING (auth.uid() = user_id);
