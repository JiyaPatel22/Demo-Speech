export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      exercise_completions: {
        Row: {
          completed_at: string
          duration_minutes: number
          exercise_name: string
          id: string
          patient_id: string
          success_rate: number
        }
        Insert: {
          completed_at?: string
          duration_minutes: number
          exercise_name: string
          id?: string
          patient_id: string
          success_rate: number
        }
        Update: {
          completed_at?: string
          duration_minutes?: number
          exercise_name?: string
          id?: string
          patient_id?: string
          success_rate?: number
        }
        Relationships: [
          {
            foreignKeyName: "exercise_completions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_goals: {
        Row: {
          current_value: number
          goal_type: string
          id: string
          patient_id: string
          start_date: string
          status: string | null
          target_date: string
          target_value: number
        }
        Insert: {
          current_value: number
          goal_type: string
          id?: string
          patient_id: string
          start_date?: string
          status?: string | null
          target_date: string
          target_value: number
        }
        Update: {
          current_value?: number
          goal_type?: string
          id?: string
          patient_id?: string
          start_date?: string
          status?: string | null
          target_date?: string
          target_value?: number
        }
        Relationships: [
          {
            foreignKeyName: "patient_goals_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      session_attachments: {
        Row: {
          created_at: string
          file_name: string
          file_path: string
          file_type: string
          id: string
          session_id: string
        }
        Insert: {
          created_at?: string
          file_name: string
          file_path: string
          file_type: string
          id?: string
          session_id: string
        }
        Update: {
          created_at?: string
          file_name?: string
          file_path?: string
          file_type?: string
          id?: string
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_attachments_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "session_notes"
            referencedColumns: ["id"]
          },
        ]
      }
      session_notes: {
        Row: {
          created_at: string
          id: string
          next_session_goals: string[] | null
          patient_id: string
          real_time_notes: string[] | null
          recommendations: string[] | null
          session_date: string
          status: string | null
          summary: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          next_session_goals?: string[] | null
          patient_id: string
          real_time_notes?: string[] | null
          recommendations?: string[] | null
          session_date?: string
          status?: string | null
          summary?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          next_session_goals?: string[] | null
          patient_id?: string
          real_time_notes?: string[] | null
          recommendations?: string[] | null
          session_date?: string
          status?: string | null
          summary?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_notes_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      speech_metrics: {
        Row: {
          id: string
          metric_type: string
          patient_id: string
          recorded_at: string
          score: number
          session_id: string
        }
        Insert: {
          id?: string
          metric_type: string
          patient_id: string
          recorded_at?: string
          score: number
          session_id: string
        }
        Update: {
          id?: string
          metric_type?: string
          patient_id?: string
          recorded_at?: string
          score?: number
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "speech_metrics_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "speech_metrics_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "session_notes"
            referencedColumns: ["id"]
          },
        ]
      }
      treatment_milestones: {
        Row: {
          achieved_date: string
          created_at: string
          description: string | null
          id: string
          patient_id: string
          title: string
        }
        Insert: {
          achieved_date?: string
          created_at?: string
          description?: string | null
          id?: string
          patient_id: string
          title: string
        }
        Update: {
          achieved_date?: string
          created_at?: string
          description?: string | null
          id?: string
          patient_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "treatment_milestones_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
