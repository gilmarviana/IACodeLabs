-- Remove a política problemática que causa recursão infinita
DROP POLICY IF EXISTS "Admins can view all profiles." ON public.profiles;

-- Recria a política para permitir que administradores vejam todos os perfis,
-- verificando o papel diretamente do token JWT do usuário.
CREATE POLICY "Admins can view all profiles." ON public.profiles
  FOR SELECT USING ((auth.jwt() ->> 'role') = 'admin');

-- Opcional: Revise outras políticas se houverem padrões semelhantes
-- Por exemplo, para UPDATE, INSERT, DELETE se também usarem subconsultas recursivas.
-- As políticas existentes para INSERT, UPDATE, DELETE na tabela profiles já usam auth.uid() = id
-- ou a subconsulta para 'admin' que também precisaria ser atualizada se fosse o caso.
-- Vamos verificar as outras políticas para garantir que não haja o mesmo problema:
-- CREATE POLICY "Users can update their own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id); -- OK
-- CREATE POLICY "Admins can update all profiles." ON public.profiles FOR UPDATE USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'); -- PROBLEMA AQUI TAMBÉM
-- CREATE POLICY "Admins can delete profiles." ON public.profiles FOR DELETE USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'); -- PROBLEMA AQUI TAMBÉM

-- Corrigindo as políticas de UPDATE e DELETE para administradores na tabela 'profiles'
DROP POLICY IF EXISTS "Admins can update all profiles." ON public.profiles;
CREATE POLICY "Admins can update all profiles." ON public.profiles
  FOR UPDATE USING ((auth.jwt() ->> 'role') = 'admin');

DROP POLICY IF EXISTS "Admins can delete profiles." ON public.profiles;
CREATE POLICY "Admins can delete profiles." ON public.profiles
  FOR DELETE USING ((auth.jwt() ->> 'role') = 'admin');

-- As políticas para 'projects' e 'tasks' também precisam ser revisadas se usarem o mesmo padrão
-- Exemplo para projects:
-- CREATE POLICY "Admins can view all projects." ON public.projects FOR SELECT USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'); -- PROBLEMA
-- CREATE POLICY "Admins can update all projects." ON public.projects FOR UPDATE USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'); -- PROBLEMA
-- CREATE POLICY "Admins can delete projects." ON public.projects FOR DELETE USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'); -- PROBLEMA

-- Corrigindo as políticas de RLS para 'projects'
DROP POLICY IF EXISTS "Admins can view all projects." ON public.projects;
CREATE POLICY "Admins can view all projects." ON public.projects
  FOR SELECT USING ((auth.jwt() ->> 'role') = 'admin');

DROP POLICY IF EXISTS "Admins can update all projects." ON public.projects;
CREATE POLICY "Admins can update all projects." ON public.projects
  FOR UPDATE USING ((auth.jwt() ->> 'role') = 'admin');

DROP POLICY IF EXISTS "Admins can delete projects." ON public.projects;
CREATE POLICY "Admins can delete projects." ON public.projects
  FOR DELETE USING ((auth.jwt() ->> 'role') = 'admin');

-- Exemplo para tasks:
-- CREATE POLICY "Admins can view all tasks." ON public.tasks FOR SELECT USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'); -- PROBLEMA
-- CREATE POLICY "Admins can update all tasks." ON public.tasks FOR UPDATE USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'); -- PROBLEMA
-- CREATE POLICY "Admins can delete tasks." ON public.tasks FOR DELETE USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'); -- PROBLEMA

-- Corrigindo as políticas de RLS para 'tasks'
DROP POLICY IF EXISTS "Admins can view all tasks." ON public.tasks;
CREATE POLICY "Admins can view all tasks." ON public.tasks
  FOR SELECT USING ((auth.jwt() ->> 'role') = 'admin');

DROP POLICY IF EXISTS "Admins can update all tasks." ON public.tasks;
CREATE POLICY "Admins can update all tasks." ON public.tasks
  FOR UPDATE USING ((auth.jwt() ->> 'role') = 'admin');

DROP POLICY IF EXISTS "Admins can delete tasks." ON public.tasks;
CREATE POLICY "Admins can delete tasks." ON public.tasks
  FOR DELETE USING ((auth.jwt() ->> 'role') = 'admin');

-- Este script corrige a política RLS para a tabela `profiles`
-- para garantir que os administradores possam ver todos os perfis,
-- enquanto os usuários normais (clientes) só podem ver o seu próprio.

-- Primeiro, removemos a política existente para evitar conflitos
DROP POLICY IF EXISTS "Users can view their own profile." ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Política para permitir que usuários autenticados vejam seus próprios perfis
CREATE POLICY "Users can view their own profile." ON public.profiles FOR
SELECT
  TO authenticated USING (auth.uid() = id);

-- Política para permitir que administradores vejam todos os perfis
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR
SELECT
  TO authenticated USING (
    EXISTS (
      SELECT
        1
      FROM
        public.profiles
      WHERE
        profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Fix for RLS policy on profiles table to ensure new users can create their profile
-- This script ensures the 'Users can insert their own profile.' policy is correctly defined
-- and that the handle_new_user trigger is in place.

-- Drop existing policy if it exists to avoid conflicts
DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;

-- Recreate the policy to allow authenticated users to insert their own profile
CREATE POLICY "Users can insert their own profile."
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- Ensure the handle_new_user function and trigger exist
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
begin
  insert into public.profiles (id, full_name, avatar_url, role)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', 'client');
  return new;
end;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists to avoid duplicates
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Recreate the trigger to automatically create a profile entry when a new user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Nota: As políticas INSERT e UPDATE para `profiles` (permitindo que usuários
-- insiram/atualizem apenas seus próprios perfis) já estão corretas no script 001
-- e não precisam ser alteradas, pois a lógica de "admin pode fazer tudo"
-- geralmente se aplica a SELECT/UPDATE/DELETE em dados de outros usuários,
-- mas não a INSERIR um perfil para outro usuário (isso é feito pelo trigger).

-- This script ensures that the 'role' column in the 'profiles' table is correctly handled by RLS policies.
-- It adds a policy to allow authenticated users to update their own role, but only if they are an admin.
-- This prevents regular users from elevating their own privileges.

-- Policy to allow authenticated users to update their own profile (excluding role changes for non-admins)
-- This policy is already in 005_setup_rls.sql, but we might need to refine it if role changes are allowed.
-- For now, we assume role changes are restricted to admins only.

-- Add a policy to allow admins to update the 'role' column for any profile.
-- This assumes that the 'Admins can update any profile.' policy in 005_setup_rls.sql
-- already covers all columns. If not, a more specific policy might be needed.

-- Let's ensure the 'Admins can update any profile.' policy covers the 'role' column.
-- The existing policy:
-- CREATE POLICY "Admins can update any profile."
-- ON profiles FOR UPDATE
-- USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
-- This policy already allows admins to update any column, including 'role', for any user.
-- No further changes are strictly needed if this policy is active and correct.

-- However, if we want to prevent non-admins from changing their own role,
-- while still allowing them to update other profile fields, we need a more granular approach.
-- This is typically handled by having two UPDATE policies:
-- 1. Users can update their own profile (excluding 'role' column).
-- 2. Admins can update any profile (including 'role' column).

-- Let's refine the policies to explicitly handle the 'role' column.
-- First, remove the broad 'Users can update own profile.' policy if it exists and doesn't exclude 'role'.
DROP POLICY IF EXISTS "Users can update own profile." ON profiles;

-- New policy: Users can update their own profile, but NOT the 'role' column.
CREATE POLICY "Users can update own non-role profile fields."
ON profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id AND OLD.role = NEW.role); -- Ensures role cannot be changed by non-admins

-- The "Admins can update any profile." policy from 005_setup_rls.sql already allows admins
-- to change any field, including 'role', for any user. So it remains as is.
-- CREATE POLICY "Admins can update any profile."
-- ON profiles FOR UPDATE
-- USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- This setup ensures:
-- - Regular users can update their own profile data (full_name, username, etc.) but cannot change their 'role'.
-- - Admin users can update any field, including 'role', for any user.
