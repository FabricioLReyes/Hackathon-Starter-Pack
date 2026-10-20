import { type NextRequest, NextResponse } from "next/server";

const getSupabaseCredentials = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return { url, key };
};

/**
 * Checks if real Supabase credentials have been configured in environment variables.
 */
export function isSupabaseConfigured(): boolean {
  const { url, key } = getSupabaseCredentials();
  return Boolean(
    url &&
    key &&
    !url.includes("placeholder-project") &&
    !key.includes("placeholder-anon-key")
  );
}

/**
 * Creates a Supabase client for client-side components (runs in browser).
 */
export function createClient() {
  const { createBrowserClient } = require("@supabase/ssr");
  const { url, key } = getSupabaseCredentials();
  const supabaseUrl = url || "https://placeholder-project.supabase.co";
  const supabaseKey = key || "placeholder-anon-key";

  return createBrowserClient(supabaseUrl, supabaseKey);
}

/**
 * Creates a Supabase client for Server Components, Server Actions, and Route Handlers (Next.js App Router).
 */
export async function createServerSupabaseClient() {
  const [{ cookies }, { createServerClient }] = await Promise.all([
    import("next/headers"),
    import("@supabase/ssr"),
  ]);
  const cookieStore = await cookies();
  const { url, key } = getSupabaseCredentials();
  const supabaseUrl = url || "https://placeholder-project.supabase.co";
  const supabaseKey = key || "placeholder-anon-key";

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing user sessions.
        }
      },
    },
  });
}

/**
 * Helper to update and refresh user session in Next.js Middleware.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const { url: supabaseUrl, key: supabaseKey } = getSupabaseCredentials();

  if (!isSupabaseConfigured() || !supabaseUrl || !supabaseKey) {
    return { supabaseResponse, user: null, configured: false };
  }

  const { createServerClient } = await import("@supabase/ssr");
  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { supabaseResponse, user, configured: true };
}
