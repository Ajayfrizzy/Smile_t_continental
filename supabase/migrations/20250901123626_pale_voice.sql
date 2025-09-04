/*
  # Hotel Management System Database Schema

  1. New Tables
    - `profiles` - Staff user profiles with roles and authentication
    - `rooms` - Hotel rooms with details, pricing, and availability
    - `bookings` - Guest bookings with payment and status tracking
    - `drinks` - Bar inventory with stock management
    - `drink_sales` - Bar sales transactions
    - `gallery` - Hotel gallery images with categories
    - `social_media` - Social media platform links and handles

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access control
    - Authenticated users can only access data based on their role
    - Super admin has full access, other roles have restricted access

  3. Features
    - UUID primary keys for all tables
    - Automatic timestamps for audit trails
    - JSON arrays for amenities and images
    - Comprehensive room and booking management
    - Bar inventory and sales tracking
    - Gallery management with categories
    - Social media integration
*/

-- Profiles table for staff authentication and roles
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  role text NOT NULL CHECK (role IN ('super_admin', 'supervisor', 'receptionist', 'barman')),
  name text NOT NULL,
  staff_id text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Super admin can manage all profiles"
  ON profiles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- Rooms table
CREATE TABLE IF NOT EXISTS rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price decimal(10,2) NOT NULL DEFAULT 0,
  max_guests integer NOT NULL DEFAULT 2,
  amenities text[] DEFAULT '{}',
  images text[] DEFAULT '{}',
  is_available boolean DEFAULT true,
  room_number text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;

-- Rooms policies
CREATE POLICY "Anyone can view rooms"
  ON rooms
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Super admin can manage rooms"
  ON rooms
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name text NOT NULL,
  guest_email text NOT NULL,
  guest_phone text NOT NULL,
  room_id uuid REFERENCES rooms(id) ON DELETE CASCADE,
  check_in timestamptz NOT NULL,
  check_out timestamptz NOT NULL,
  total_amount decimal(10,2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled')),
  payment_status text NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  reference text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Bookings policies
CREATE POLICY "Anyone can create bookings"
  ON bookings
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

CREATE POLICY "Staff can view bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('super_admin', 'supervisor', 'receptionist')
    )
  );

CREATE POLICY "Super admin and receptionist can manage bookings"
  ON bookings
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('super_admin', 'receptionist')
    )
  );

-- Drinks table for bar inventory
CREATE TABLE IF NOT EXISTS drinks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price decimal(10,2) NOT NULL DEFAULT 0,
  stock_quantity integer NOT NULL DEFAULT 0,
  category text NOT NULL DEFAULT 'beverage',
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE drinks ENABLE ROW LEVEL SECURITY;

-- Drinks policies
CREATE POLICY "Staff can view drinks"
  ON drinks
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Super admin can manage drinks"
  ON drinks
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- Drink sales table
CREATE TABLE IF NOT EXISTS drink_sales (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  drink_id uuid REFERENCES drinks(id) ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 1,
  total_amount decimal(10,2) NOT NULL DEFAULT 0,
  barman_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE drink_sales ENABLE ROW LEVEL SECURITY;

-- Drink sales policies
CREATE POLICY "Staff can view drink sales"
  ON drink_sales
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('super_admin', 'supervisor', 'barman')
    )
  );

CREATE POLICY "Barman can create sales"
  ON drink_sales
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('super_admin', 'barman')
    )
  );

 Gallery table for hotel images
 CREATE TABLE IF NOT EXISTS gallery (
   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
   description text NOT NULL,
  image_url text NOT NULL,
 category text NOT NULL DEFAULT 'general' CHECK (category IN ('rooms', 'facilities', 'exterior', 'restaurant', 'events')),
   is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
); 

 ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Gallery policies
 CREATE POLICY "Anyone can view gallery"
   ON gallery
   FOR SELECT
  TO authenticated, anon
   USING (true);

 CREATE POLICY "Super admin can manage gallery"
   ON gallery
   FOR ALL
   TO authenticated
   USING (
    EXISTS (
       SELECT 1 FROM profiles 
       WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- Social media table
CREATE TABLE IF NOT EXISTS social_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL CHECK (platform IN ('facebook', 'instagram', 'twitter', 'linkedin', 'youtube')),
  url text NOT NULL,
  handle text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE social_media ENABLE ROW LEVEL SECURITY;

-- Social media policies
CREATE POLICY "Anyone can view social media"
  ON social_media
  FOR SELECT
  TO authenticated, anon
  USING (is_active = true);

CREATE POLICY "Super admin can manage social media"
  ON social_media
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- Insert sample data

-- Sample rooms
INSERT INTO rooms (name, description, price, max_guests, amenities, images, room_number) VALUES
('Deluxe Suite', 'Luxurious suite with city view and premium amenities', 450.00, 2, '["King Bed", "City View", "Mini Bar", "WiFi", "Air Conditioning", "Room Service"]', '["https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"]', 'DS001'),
('Executive Room', 'Spacious room perfect for business travelers', 320.00, 2, '["Queen Bed", "Work Desk", "WiFi", "Air Conditioning", "Coffee Machine"]', '["https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg"]', 'EX002'),
('Standard Room', 'Comfortable room with all essential amenities', 180.00, 2, '["Double Bed", "WiFi", "Air Conditioning", "TV"]', '["https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg"]', 'ST003'),
('Family Suite', 'Perfect for families with connecting rooms', 550.00, 4, '["Two Queen Beds", "Living Area", "Kitchenette", "WiFi", "Air Conditioning"]', '["https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg"]', 'FS004');

-- Sample gallery items
INSERT INTO gallery (title, description, image_url, category, is_featured) VALUES
('Luxury Suite Interior', 'Elegant and spacious luxury suite with modern furnishing', 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg', 'rooms', true),
('Hotel Exterior Night', 'Beautiful exterior view of Hotel Grandeur at night', 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg', 'exterior', true),
('Fine Dining Restaurant', 'Exquisite dining experience with panoramic views', 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg', 'restaurant', true),
('Rooftop Pool', 'Infinity pool with stunning city skyline views', 'https://images.pexels.com/photos/271694/pexels-photo-271694.jpeg', 'facilities', true),
('Spa & Wellness Center', 'Relaxing spa treatments and wellness facilities', 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg', 'facilities', false),
('Wedding Venue', 'Perfect setting for weddings and special events', 'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg', 'events', false);

-- Sample social media links
INSERT INTO social_media (platform, url, handle, is_active) VALUES
('instagram', 'https://instagram.com/hotelgrandeur', '@hotelgrandeur', true),
('facebook', 'https://facebook.com/hotelgrandeur', 'Hotel Grandeur', true),
('twitter', 'https://twitter.com/grandeurhotel', '@grandeurhotel', true),
('linkedin', 'https://linkedin.com/company/hotelgrandeur', 'Hotel Grandeur', true),
('youtube', 'https://youtube.com/hotelgrandeur', 'Hotel Grandeur', true);

-- Sample drinks inventory
INSERT INTO drinks (name, price, stock_quantity, category, image_url) VALUES
('Beer', 8.50, 150, 'alcoholic', 'https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg'),
('Wine (Glass)', 12.00, 80, 'alcoholic', 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg'),
('Whiskey', 25.00, 45, 'alcoholic', 'https://images.pexels.com/photos/602750/pexels-photo-602750.jpeg'),
('Cocktail', 15.00, 100, 'alcoholic', 'https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg'),
('Coffee', 4.50, 200, 'non-alcoholic', 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg'),
('Soft Drink', 3.50, 300, 'non-alcoholic', 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg');

-- Sample staff profiles will be created when users sign up through auth