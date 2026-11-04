/**
 * Database types for the DeutschMed Supabase schema.
 *
 * Hand-written to match supabase/migrations. Once the project is linked,
 * regenerate with:
 *   npx supabase gen types typescript --linked > lib/database.types.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type MedicalRole = "doctor" | "nurse";
export type LanguageLevel = "B1" | "B2" | "C1";
export type ScenarioType = "anamnese" | "arztbrief" | "uebergabe";
/** Draft content has not been clinically reviewed yet; see supabase/content/README.md. */
export type ContentStatus = "draft" | "reviewed";

type Timestamp = string;

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          updated_at: Timestamp;
          full_name: string;
          role: MedicalRole;
          target_level: LanguageLevel;
          hospital_specialty: string | null;
          daily_goal_minutes: number | null;
          created_at: Timestamp;
        };
        Insert: {
          id: string;
          updated_at?: Timestamp;
          full_name: string;
          role?: MedicalRole;
          target_level?: LanguageLevel;
          hospital_specialty?: string | null;
          daily_goal_minutes?: number | null;
          created_at?: Timestamp;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      medical_scenarios: {
        Row: {
          id: string;
          title: string;
          difficulty: LanguageLevel;
          target_role: MedicalRole;
          specialty: string;
          patient_demographics: Json;
          chief_complaint: string;
          clinical_facts: Json;
          content_status: ContentStatus;
          created_at: Timestamp;
        };
        Insert: {
          id?: string;
          title: string;
          difficulty?: LanguageLevel;
          target_role?: MedicalRole;
          specialty: string;
          patient_demographics: Json;
          chief_complaint: string;
          clinical_facts: Json;
          content_status?: ContentStatus;
          created_at?: Timestamp;
        };
        Update: Partial<Database["public"]["Tables"]["medical_scenarios"]["Insert"]>;
        Relationships: [];
      };
      simulation_sessions: {
        Row: {
          id: string;
          user_id: string;
          scenario_id: string | null;
          type: ScenarioType;
          chat_history: Json | null;
          user_documentation: string | null;
          ai_feedback: Json | null;
          is_completed: boolean | null;
          score: number | null;
          started_at: Timestamp;
          completed_at: Timestamp | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          scenario_id?: string | null;
          type: ScenarioType;
          chat_history?: Json | null;
          user_documentation?: string | null;
          ai_feedback?: Json | null;
          is_completed?: boolean | null;
          score?: number | null;
          started_at?: Timestamp;
          completed_at?: Timestamp | null;
        };
        Update: Partial<Database["public"]["Tables"]["simulation_sessions"]["Insert"]>;
        Relationships: [];
      };
      vocabulary_dictionary: {
        Row: {
          id: string;
          fachbegriff: string;
          gemeinsprache: string;
          umgangssprache: string | null;
          example_sentence: string | null;
          audio_url: string | null;
          category: string;
          content_status: ContentStatus;
        };
        Insert: {
          id?: string;
          fachbegriff: string;
          gemeinsprache: string;
          umgangssprache?: string | null;
          example_sentence?: string | null;
          audio_url?: string | null;
          category: string;
          content_status?: ContentStatus;
        };
        Update: Partial<Database["public"]["Tables"]["vocabulary_dictionary"]["Insert"]>;
        Relationships: [];
      };
      user_flashcards: {
        Row: {
          id: string;
          user_id: string;
          vocab_id: string;
          box: number;
          easiness_factor: number;
          repetitions: number;
          next_review_due: Timestamp;
          created_at: Timestamp;
        };
        Insert: {
          id?: string;
          user_id: string;
          vocab_id: string;
          box?: number;
          easiness_factor?: number;
          repetitions?: number;
          next_review_due?: Timestamp;
          created_at?: Timestamp;
        };
        Update: Partial<Database["public"]["Tables"]["user_flashcards"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: {
      medical_role: MedicalRole;
      language_level: LanguageLevel;
      scenario_type: ScenarioType;
    };
    CompositeTypes: { [_ in never]: never };
  };
};

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
