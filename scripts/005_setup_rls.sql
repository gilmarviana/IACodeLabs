-- Ensure RLS is enabled for profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they conflict or are being replaced
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile." ON profiles;
DROP POLICY IF EXISTS "Users can update own profile." ON profiles;

-- Policy to allow authenticated users to view their own profile and admin to view all
CREATE POLICY "Allow authenticated users to view their own profile and admin to view all."
ON profiles FOR SELECT
USING (
  auth.uid() = id OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- Policy to allow authenticated users to insert their own profile
CREATE POLICY "Allow authenticated users to insert their own profile."
ON profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- Policy to allow authenticated users to update their own profile
CREATE POLICY "Allow authenticated users to update their own profile."
ON profiles FOR UPDATE
USING (auth.uid() = id);

-- Policy to allow admins to update any profile
CREATE POLICY "Admins can update any profile."
ON profiles FOR UPDATE
USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Policy to allow admins to delete any profile
CREATE POLICY "Admins can delete any profile."
ON profiles FOR DELETE
USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
