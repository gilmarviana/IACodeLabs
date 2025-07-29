CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'planning',
  client_name TEXT,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view their own projects."
  ON projects FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can create projects."
  ON projects FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can update their own projects."
  ON projects FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can delete their own projects."
  ON projects FOR DELETE USING (auth.uid() = user_id);
