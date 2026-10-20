"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from "./Icons";
import { createClient, isSupabaseConfigured } from "@/lib/supabase";
import { Button } from "./Button";
import { Input } from "./Input";
import { GoogleAuthButton } from "./GoogleAuthButton";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/dashboard";

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!isSupabaseConfigured()) {
        // Developer guidance if credentials are missing
        setError("Supabase no está configurado. Añade NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local para habilitar la autenticación.");
        setLoading(false);
        return;
      }

      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        throw signInError;
      }

      router.push(next);
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error al iniciar sesión";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {error && (
        <div className="flex items-start gap-3 rounded-lg border border-destructive/20 bg-destructive/10 p-3.5 text-xs text-destructive">
          <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <div className="flex-1 font-medium">{error}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Correo electrónico"
          type="email"
          autoComplete="email"
          required
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<FiMail className="h-4 w-4" />}
        />

        <div className="space-y-1.5">
          <div className="relative">
            <Input
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<FiLock className="h-4 w-4" />}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
              className="absolute right-3 top-[34px] text-muted-foreground hover:text-foreground focus:outline-none"
            >
              {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <Button type="submit" className="w-full" isLoading={loading}>
          Iniciar Sesión
        </Button>
      </form>

      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative bg-card px-3 text-xs uppercase tracking-wider text-muted-foreground">
          O continúa con
        </div>
      </div>

      <GoogleAuthButton redirectTo={next} onAuthError={(msg) => setError(msg)} />

      <p className="text-center text-xs text-muted-foreground">
        ¿No tienes una cuenta?{" "}
        <Link href="/register" className="font-semibold text-primary hover:underline">
          Regístrate gratis
        </Link>
      </p>
    </div>
  );
}
