import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { FiCheckCircle, FiLayers, FiMoon, FiSun, FiZap } from "react-icons/fi";

export default function Home() {
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
          <ThemeToggle showLabel />
        </header>

        {/* Hero Banner */}
        <section className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <FiCheckCircle className="h-3.5 w-3.5" /> Fase 1: Cimientos y Theming Completados
          </div>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
            Arquitectura modular lista para escalar
          </h2>
          <p className="mt-2 text-base text-muted-foreground">
            Estructura estricta en <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">src/</code>,
            sistema semántico de colores Light/Dark mode sin parpadeo (FOUC), e iconografía basada en <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">react-icons</code>.
          </p>

          {/* Theme Palette Verification Matrix */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <span className="text-xs font-medium text-muted-foreground">Card & Border</span>
              <p className="mt-1 font-semibold text-card-foreground">bg-card</p>
            </div>
            <div className="rounded-xl bg-primary p-4 text-primary-foreground shadow-sm">
              <span className="text-xs font-medium opacity-80">Primary</span>
              <p className="mt-1 font-semibold">bg-primary</p>
            </div>
            <div className="rounded-xl bg-secondary p-4 text-secondary-foreground shadow-sm">
              <span className="text-xs font-medium opacity-80">Secondary</span>
              <p className="mt-1 font-semibold">bg-secondary</p>
            </div>
            <div className="rounded-xl bg-muted p-4 text-muted-foreground shadow-sm">
              <span className="text-xs font-medium">Muted</span>
              <p className="mt-1 font-semibold">bg-muted</p>
            </div>
          </div>
        </section>

        {/* Architecture Checklist */}
        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FiLayers className="h-5 w-5" />
            </div>
            <h3 className="mt-3 font-semibold">Estructura Modular</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Separación clara de <code className="text-primary font-mono">components/ui</code>, <code className="text-primary font-mono">layout</code>, y <code className="text-primary font-mono">sections</code>.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FiSun className="h-5 w-5" />
            </div>
            <h3 className="mt-3 font-semibold">Theming Semántico</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Variables CSS semánticas en <code className="text-primary font-mono">globals.css</code> con soporte completo de opacidad en Tailwind.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FiMoon className="h-5 w-5" />
            </div>
            <h3 className="mt-3 font-semibold">Zero-FOUC</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Script inline síncrono en <code className="text-primary font-mono">layout.tsx</code> para prevenir destellos en la carga inicial.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

