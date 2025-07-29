-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  username text unique,
  avatar_url text,
  website text,
  role text default 'client'
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

-- Allow authenticated users to select their own profile
create policy "Public profiles are viewable by everyone."
  on profiles for select using (true);

-- Allow authenticated users to insert their own profile
create policy "Users can insert their own profile."
  on profiles for insert with check (auth.uid() = id);

-- Allow authenticated users to update their own profile
create policy "Users can update own profile."
  on profiles for update using (auth.uid() = id);

-- This trigger automatically creates a profile entry when a new user signs up
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, role)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', 'client');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
