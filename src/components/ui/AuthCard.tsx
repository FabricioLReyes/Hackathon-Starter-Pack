import * as React from "react";
import Link from "next/link";
import { FiArrowLeft, FiZap } from "./Icons";
import { ThemeToggle } from "./ThemeToggle";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Top Bar with Back Link and Theme Toggle */}
      <div className="mb-6 flex w-full max-w-md items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <FiArrowLeft className="h-3.5 w-3.5" /> Volver al inicio
        </Link>
        <ThemeToggle />
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="mb-6 space-y-2 text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <FiZap className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-card-foreground">{title}</h2>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>

        {children}
      </div>
    </div>
  );
}

