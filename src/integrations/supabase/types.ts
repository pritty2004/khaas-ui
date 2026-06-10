export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: number
          name: string
          price: number
          original_price: number | null
          image_url: string | null
          tag: string | null
          description: string | null
          created_at: string | null
        }
        Insert: {
          id?: number
          name: string
          price: number
          original_price?: number | null
          image_url?: string | null
          tag?: string | null
          description?: string | null
          created_at?: string | null
        }
        Update: {
          id?: number
          name?: string
          price?: number
          original_price?: number | null
          image_url?: string | null
          tag?: string | null
          description?: string | null
          created_at?: string | null
        }
      }
      cart: {
        Row: {
          id: number
          product_id: number
          quantity: number
          user_id: string | null
          created_at: string | null
        }
        Insert: {
          id?: number
          product_id: number
          quantity?: number
          user_id?: string | null
          created_at?: string | null
        }
        Update: {
          id?: number
          product_id?: number
          quantity?: number
          user_id?: string | null
          created_at?: string | null
        }
      }
      orders: {
        Row: {
          id: number
          full_name: string
          email: string
          phone: string | null
          address: string | null
          total_amount: number
          items_count: number
          status: string
          created_at: string | null
        }
        Insert: {
          id?: number
          full_name: string
          email: string
          phone?: string | null
          address?: string | null
          total_amount: number
          items_count: number
          status?: string
          created_at?: string | null
        }
        Update: {
          id?: number
          full_name?: string
          email?: string
          phone?: string | null
          address?: string | null
          total_amount?: number
          items_count?: number
          status?: string
          created_at?: string | null
        }
      }
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: { [_ in never]: never }
    CompositeTypes: { [_ in never]: never }
  }
}

export const Constants = {
  public: {
    Enums: {},
  },
} as const
