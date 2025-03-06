/*
  # Initial Schema Setup

  1. New Tables
    - `subjects`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `slide_link` (text, optional)
      - `test_bank_link` (text, optional)
      - `created_at` (timestamp)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on `subjects` table
    - Add policies for:
      - Users can read all subjects
      - Users can only modify their own subjects
*/

CREATE TABLE IF NOT EXISTS subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  slide_link text,
  test_bank_link text,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) NOT NULL
);

ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to read subjects
CREATE POLICY "Users can read all subjects"
  ON subjects
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow users to insert their own subjects
CREATE POLICY "Users can insert their own subjects"
  ON subjects
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own subjects
CREATE POLICY "Users can update their own subjects"
  ON subjects
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own subjects
CREATE POLICY "Users can delete their own subjects"
  ON subjects
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);