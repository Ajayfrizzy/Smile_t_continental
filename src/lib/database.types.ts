export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          role: 'super_admin' | 'supervisor' | 'receptionist' | 'barman';
          name: string;
          staff_id: string;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          role: 'super_admin' | 'supervisor' | 'receptionist' | 'barman';
          name: string;
          staff_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          role?: 'super_admin' | 'supervisor' | 'receptionist' | 'barman';
          name?: string;
          staff_id?: string;
          created_at?: string;
        };
      };
      rooms: {
        Row: {
          id: string;
          name: string;
          description: string;
          price: number;
          max_guests: number;
          amenities: string[];
          images: string[];
          is_available: boolean;
          room_number: string;
          created_at: string;
        };
      };
      bookings: {
        Row: {
          id: string;
          guest_name: string;
          guest_email: string;
          guest_phone: string;
          room_id: string;
          check_in: string;
          check_out: string;
          total_amount: number;
          status: 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';
          payment_status: 'pending' | 'paid' | 'failed';
          reference: string;
          created_at: string;
        };
      };
      drinks: {
        Row: {
          id: string;
          name: string;
          price: number;
          stock_quantity: number;
          category: string;
          image_url: string | null;
          created_at: string;
        };
      };
      drink_sales: {
        Row: {
          id: string;
          drink_id: string;
          quantity: number;
          total_amount: number;
          barman_id: string;
          created_at: string;
        };
      };
      gallery: {
        Row: {
          id: string;
          title: string;
          description: string;
          image_url: string;
          category: 'rooms' | 'facilities' | 'exterior' | 'restaurant' | 'events';
          is_featured: boolean;
          created_at: string;
        };
      };
      social_media: {
        Row: {
          id: string;
          platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'youtube';
          url: string;
          handle: string;
          is_active: boolean;
          created_at: string;
        };
      };
    };
  };
};