-- This script is intended to set a specific user as 'admin' in the profiles table.
-- This should be run manually after a user has registered and their profile is created.

-- IMPORTANT: Replace 'your_user_email@example.com' with the actual email of the user
-- you want to promote to admin.

DO $$
DECLARE
  user_uuid UUID;
BEGIN
  -- Get the user's UUID from the auth.users table using their email
  SELECT id INTO user_uuid FROM auth.users WHERE email = 'admin@example.com';

  -- Check if the user exists
  IF user_uuid IS NOT NULL THEN
    -- Update the role of the corresponding profile
    UPDATE profiles
    SET role = 'admin'
    WHERE id = user_uuid;

    RAISE NOTICE 'User % has been set as admin.', 'admin@example.com';
  ELSE
    RAISE NOTICE 'User % not found in auth.users table.', 'admin@example.com';
  END IF;
END $$;
