import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthCard } from "@/components/ui/AuthCard";
import { RegisterForm } from "@/components/ui/RegisterForm";
import { FiLoader } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Crear Cuenta | Hackathon Starter Pack",
  description: "Crea una cuenta gratuita para comenzar a construir tu SaaS.",
};

export default function RegisterPage() {
  return (
    <AuthCard
      title="Crea tu cuenta"
      subtitle="Regístrate en segundos y comienza a prototipar"
    >
      <Suspense
        fallback={
          <div className="flex h-40 items-center justify-center text-muted-foreground">
            <FiLoader className="h-6 w-6 animate-spin" />
          </div>
        }
      >
        <RegisterForm />
      </Suspense>
    </AuthCard>
  );
}

