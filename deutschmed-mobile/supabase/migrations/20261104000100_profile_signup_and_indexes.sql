-- =====================================================================
-- Follow-up fixes to the initial schema
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. Create a profile row automatically when a user signs up.
--    profiles has RLS with no INSERT policy, so the app cannot create the
--    row itself. Every other table references profiles(id), so without
--    this a new user could not start a session or save a flashcard.
--    full_name is NOT NULL: we take it from the sign-up metadata
--    (supabase.auth.signUp({ options: { data: { full_name } } })) and
--    fall back to the email prefix so sign-up never fails.
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name)
    VALUES (
        NEW.id,
        COALESCE(
            NULLIF(TRIM(NEW.raw_user_meta_data ->> 'full_name'), ''),
            SPLIT_PART(COALESCE(NEW.email, ''), '@', 1),
            ''
        )
    );
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ---------------------------------------------------------------------
-- 2. Pin the search_path of the timestamp trigger function
--    (silences Supabase's "function_search_path_mutable" advisor warning).
-- ---------------------------------------------------------------------
ALTER FUNCTION public.update_modified_column() SET search_path = '';

-- ---------------------------------------------------------------------
-- 3. Indexes for the queries the app will run most.
-- ---------------------------------------------------------------------
-- "Which cards are due for me now?"
CREATE INDEX IF NOT EXISTS user_flashcards_user_due_idx
    ON public.user_flashcards (user_id, next_review_due);

-- "My recent sessions" on the dashboard
CREATE INDEX IF NOT EXISTS simulation_sessions_user_started_idx
    ON public.simulation_sessions (user_id, started_at DESC);
