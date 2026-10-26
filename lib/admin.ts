import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
// Server-side authorisation: signed in AND listed in public.admins. Called by every admin page and action.
export async function requireAdmin() {
  const s = supabaseServer();
  const { data: { user } } = await s.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data } = await s.from("admins").select("user_id").eq("user_id", user.id).maybeSingle();
  if (!data) redirect("/admin/login?error=" + encodeURIComponent("This account is not an administrator."));
  return s;
}
