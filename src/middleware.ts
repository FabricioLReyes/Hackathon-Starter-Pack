import { type NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured, updateSession } from "@/lib/supabase";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Immediately bypass Next.js internal chunks, static files, and public assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 2. If Supabase is not configured yet, skip session validation entirely
  if (!isSupabaseConfigured()) {
    return NextResponse.next();
  }

  // 3. Refresh Supabase session
  const { supabaseResponse, user, configured } = await updateSession(request);

  const isAuthRoute = pathname === "/login" || pathname === "/register";
  const isDashboardRoute = pathname.startsWith("/dashboard");

  // 4. If Supabase is configured and user is logged in, redirect away from login/register to dashboard
  if (configured && user && isAuthRoute) {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = "/dashboard";
    return NextResponse.redirect(dashboardUrl);
  }

  // 5. If Supabase is configured and user is NOT logged in, protect /dashboard
  if (configured && !user && isDashboardRoute) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Only execute middleware on routes that require authentication checking.
     * Prevents unnecessary middleware compilation and processing on public pages.
     */
    "/dashboard/:path*",
    "/login",
    "/register",
  ],
};
