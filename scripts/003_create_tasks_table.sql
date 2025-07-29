CREATE TABLE tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'todo',
  priority TEXT DEFAULT 'medium',
  due_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view tasks associated with their projects
CREATE POLICY "Authenticated users can view tasks of their projects."
  ON tasks FOR SELECT USING (
    EXISTS (SELECT 1 FROM projects WHERE projects.id = tasks.project_id AND projects.user_id = auth.uid())
  );

-- Allow authenticated users to create tasks for their projects
CREATE POLICY "Authenticated users can create tasks for their projects."
  ON tasks FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM projects WHERE projects.id = tasks.project_id AND projects.user_id = auth.uid())
  );

-- Allow authenticated users to update tasks of their projects
CREATE POLICY "Authenticated users can update tasks of their projects."
  ON tasks FOR UPDATE USING (
    EXISTS (SELECT 1 FROM projects WHERE projects.id = tasks.project_id AND projects.user_id = auth.uid())
  );

-- Allow authenticated users to delete tasks of their projects
CREATE POLICY "Authenticated users can delete tasks of their projects."
  ON tasks FOR DELETE USING (
    EXISTS (SELECT 1 FROM projects WHERE projects.id = tasks.project_id AND projects.user_id = auth.uid())
  );
