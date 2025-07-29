import { createBrowserClient } from "@supabase/ssr"
import { createClient } from "@supabase/supabase-js"

// Client-side Supabase client (singleton pattern)
let browserSupabaseClient: ReturnType<typeof createBrowserClient> | null = null

export function getSupabaseClient() {
  if (!browserSupabaseClient) {
    browserSupabaseClient = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
  }
  return browserSupabaseClient
}

// Server-side Supabase client (for Server Components, Route Handlers, Server Actions)
// This is a simplified version. For full SSR with cookies, you'd use createServerClient from @supabase/ssr
export function getSupabaseServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // Use service role key if available, otherwise anon
  )
}

