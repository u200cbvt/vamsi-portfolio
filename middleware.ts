import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
export async function middleware(req: NextRequest) {
  let res = NextResponse.next({ request: req });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL, key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return NextResponse.redirect(new URL("/", req.url));
  const s = createServerClient(url, key, { cookies: {
    getAll: () => req.cookies.getAll(),
    setAll: (list: { name: string; value: string; options?: any }[]) => { list.forEach(({ name, value }) => req.cookies.set(name, value)); res = NextResponse.next({ request: req }); list.forEach(({ name, value, options }) => res.cookies.set(name, value, options)); },
  } });
  const { data: { user } } = await s.auth.getUser();
  if (!user && req.nextUrl.pathname !== "/admin/login") return NextResponse.redirect(new URL("/admin/login", req.url));
  return res;
}
export const config = { matcher: ["/admin/:path*"] };
