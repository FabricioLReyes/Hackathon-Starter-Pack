"use client";

import * as React from "react";
import Link from "next/link";
import { FiMail, FiLock, FiAlertCircle, FiCheckCircle } from "./Icons";
import { createClient, isSupabaseConfigured } from "@/lib/supabase";
import { Button } from "./Button";
import { Input } from "./Input";
import { GoogleAuthButton } from "./GoogleAuthButton";

export function RegisterForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      if (!isSupabaseConfigured()) {
        setError("Supabase no está configurado. Añade NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local.");
        setLoading(false);
        return;
      }

      const supabase = createClient();
      const origin = window.location.origin;

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${origin}/auth/callback?next=/dashboard`,
        },
      });

      if (signUpError) {
        throw signUpError;
      }

      // If Supabase has email confirmation enabled
      if (data.user && data.session === null) {
        setSuccess(true);
      } else {
        window.location.href = "/dashboard";
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error al registrar la cuenta";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="space-y-4 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <FiCheckCircle className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-bold">¡Revisa tu bandeja de entrada!</h3>
        <p className="text-xs text-muted-foreground">
          Hemos enviado un correo de verificación a <span className="font-semibold text-foreground">{email}</span>. Haz clic en el enlace para activar tu cuenta.
        </p>
        <div className="pt-2">
          <Link href="/login">
            <Button variant="outline" className="w-full">
              Volver al inicio de sesión
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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

        <Input
          label="Contraseña"
          type="password"
          autoComplete="new-password"
          required
          placeholder="Mínimo 6 caracteres"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<FiLock className="h-4 w-4" />}
        />

        <Input
          label="Confirmar contraseña"
          type="password"
          autoComplete="new-password"
          required
          placeholder="Repite tu contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          icon={<FiLock className="h-4 w-4" />}
        />

        <Button type="submit" className="w-full" isLoading={loading}>
          Crear Cuenta
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

      <GoogleAuthButton redirectTo="/dashboard" onAuthError={(msg) => setError(msg)} />

      <p className="text-center text-xs text-muted-foreground">
        ¿Ya tienes una cuenta?{" "}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}
