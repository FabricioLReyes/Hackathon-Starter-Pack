import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { FiCheckCircle, FiDatabase, FiLock, FiShield, FiZap, FiArrowRight } from "@/components/ui/Icons";
import { isSupabaseConfigured } from "@/lib/supabase";

export default function Home() {
  const supabaseReady = isSupabaseConfigured();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-12">
      <div className="w-full max-w-4xl space-y-8">
        {/* Navigation / Header */}
        <header className="flex items-center justify-between border-b border-border pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <FiZap className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Hackathon Starter Pack</h1>
              <p className="text-xs text-muted-foreground">Next.js App Router • Tailwind CSS • Supabase Ready</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Iniciar Sesión
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Registrarse</Button>
            </Link>
            <ThemeToggle />
          </div>
        </header>

        {/* Hero Banner */}
        <section className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <FiCheckCircle className="h-3.5 w-3.5" /> Fase 1: Cimientos y Theming
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <FiCheckCircle className="h-3.5 w-3.5" /> Fase 2: Supabase y Auth Ready
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
            Infraestructura de Datos y Autenticación Lista
          </h2>
          <p className="mt-2 text-base text-muted-foreground">
            Clientes de Supabase SSR (browser/server), middleware de protección para <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">(dashboard)</code>, componentes modulares de Login/Registro y soporte para Google OAuth.
          </p>

          {/* Quick Action CTAs */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/login">
              <Button className="gap-2">
                Probar Flujo de Login <FiArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" className="gap-2">
                Probar Registro
              </Button>
            </Link>
          </div>

          {/* Supabase Status Banner */}
          <div className="mt-8 flex items-center justify-between rounded-xl border border-border bg-muted/50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-card text-foreground shadow-sm">
                <FiDatabase className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">Estado de Conexión Supabase</p>
                <p className="text-xs text-muted-foreground">
                  {supabaseReady
                    ? "Variables de entorno detectadas y activas."
                    : "Modo demostración activo (credenciales placeholder en .env.local)."}
                </p>
              </div>
            </div>
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                supabaseReady
                  ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
                  : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
              }`}
            >
              {supabaseReady ? "Conectado" : "Demo Mode"}
            </span>
          </div>
        </section>

        {/* Auth & Security Checklist */}
        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FiShield className="h-5 w-5" />
            </div>
            <h3 className="mt-3 font-semibold">Middleware Seguro</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Protección de rutas con validación de sesión de Supabase y redirección inteligente con query param <code className="text-primary font-mono">?next=</code>.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FiDatabase className="h-5 w-5" />
            </div>
            <h3 className="mt-3 font-semibold">Supabase SSR Ready</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Soporte completo para App Router con <code className="text-primary font-mono">@supabase/ssr</code> y cookies asíncronas de Next.js 15.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FiLock className="h-5 w-5" />
            </div>
            <h3 className="mt-3 font-semibold">UI Modular y Google Auth</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Componentes reutilizables con accesibilidad, alternador de visibilidad de contraseña e inicio de sesión con Google.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
