-- Create a table for sidebar settings
CREATE TABLE sidebar_settings (
  id INT PRIMARY KEY DEFAULT 1, -- Assuming a single row for global sidebar settings
  background_color TEXT DEFAULT '#171717',
  text_color TEXT DEFAULT '#F9FAFB',
  active_bg_color TEXT DEFAULT '#9333EA',
  active_text_color TEXT DEFAULT '#FFFFFF',
  menu_items JSONB DEFAULT '[
    {"id": "1", "label": "Visão Geral", "icon": "LayoutDashboard", "url": "overview"},
    {"id": "2", "label": "Contatos", "icon": "Mail", "url": "contacts"},
    {"id": "3", "label": "Chat", "icon": "MessageCircle", "url": "chat"},
    {"id": "4", "label": "Financeiro", "icon": "DollarSign", "url": "financial"},
    {"id": "5", "label": "Clientes", "icon": "Users", "url": "clients"},
    {"id": "6", "label": "Projetos", "icon": "FolderOpen", "url": "projects"},
    {"id": "7", "label": "Tarefas", "icon": "ListChecks", "url": "tasks"},
    {"id": "8", "label": "Agenda", "icon": "CalendarDays", "url": "agenda"}
  ]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert a default row if it doesn't exist
INSERT INTO sidebar_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- Set up Row Level Security (RLS)
ALTER TABLE sidebar_settings ENABLE ROW LEVEL SECURITY;

-- Policy to allow authenticated admins to view and update sidebar settings
CREATE POLICY "Admins can manage sidebar settings."
ON sidebar_settings FOR ALL
USING ((auth.jwt() ->> 'role') = 'admin')
WITH CHECK ((auth.jwt() ->> 'role') = 'admin');

-- Policy to allow authenticated clients to view sidebar settings (for rendering their dashboard sidebar)
CREATE POLICY "Clients can view sidebar settings."
ON sidebar_settings FOR SELECT
USING ((auth.jwt() ->> 'role') = 'client');
