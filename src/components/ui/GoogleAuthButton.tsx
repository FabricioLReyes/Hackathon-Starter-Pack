"use client";

import * as React from "react";
import { FcGoogle, FiLoader } from "./Icons";
import { createClient, isSupabaseConfigured } from "@/lib/supabase";
import { cn } from "@/lib/utils";

interface GoogleAuthButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onError"> {
  redirectTo?: string;
  onAuthError?: (error: string) => void;
}

export function GoogleAuthButton({
  className,
  redirectTo = "/dashboard",
  onAuthError,
  children = "Continuar con Google",
  disabled,
  ...props
}: GoogleAuthButtonProps) {
  const [loading, setLoading] = React.useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);

      if (!isSupabaseConfigured()) {
        const errorMsg = "Supabase no está configurado. Añade tus credenciales en .env.local";
        if (onAuthError) onAuthError(errorMsg);
        else alert(errorMsg);
        return;
      }

      const supabase = createClient();
      const origin = window.location.origin;
      const callbackUrl = `${origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: callbackUrl,
        },
      });

      if (error) {
        throw error;
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error al iniciar sesión con Google";
      onAuthError?.(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      disabled={disabled || loading}
      className={cn(
        "relative flex h-10 w-full items-center justify-center gap-3 rounded-lg border border-border bg-card px-4 text-sm font-medium text-card-foreground shadow-sm transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {loading ? (
        <FiLoader className="h-4 w-4 animate-spin text-muted-foreground" />
      ) : (
        <FcGoogle className="h-5 w-5 shrink-0" />
      )}
      <span>{children}</span>
    </button>
  );
}
