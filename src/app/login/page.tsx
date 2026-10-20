import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthCard } from "@/components/ui/AuthCard";
import { LoginForm } from "@/components/ui/LoginForm";
import { FiLoader } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Iniciar Sesión | Hackathon Starter Pack",
  description: "Inicia sesión en tu cuenta con email o Google Auth.",
};

export default function LoginPage() {
  return (
    <AuthCard
      title="Bienvenido de nuevo"
      subtitle="Ingresa tus credenciales para acceder a tu dashboard"
    >
      <Suspense
        fallback={
          <div className="flex h-40 items-center justify-center text-muted-foreground">
            <FiLoader className="h-6 w-6 animate-spin" />
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </AuthCard>
  );
}

