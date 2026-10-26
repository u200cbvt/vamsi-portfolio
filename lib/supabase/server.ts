import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
// Uses the logged-in user's session + the public anon key, so Row Level Security enforces admin-only writes.
export function supabaseServer() {
  const store = cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list: { name: string; value: string; options?: any }[]) => { try { list.forEach(({ name, value, options }) => store.set(name, value, options)); } catch { /* read-only in server components */ } },
    },
  });
}
