"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "diana_privacy_consent";

type ConsentValue = "accepted" | "declined";

export function PrivacyConsentPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(
      STORAGE_KEY,
    ) as ConsentValue | null;
    if (!stored) setIsVisible(true);
  }, []);

  const handleConsent = (value: ConsentValue) => {
    window.localStorage.setItem(STORAGE_KEY, value);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative w-full max-w-2xl rounded-2xl border border-neutral-200 bg-white p-5 shadow-2xl">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">
            Sua privacidade importa
          </h2>
          <p className="text-sm text-muted-foreground">
            Utilizamos cookies e armazenamento local para melhorar sua
            experiência, salvar suas preferências (como imóveis favoritos) e
            analisar o uso do site. Ao continuar navegando, você concorda com
            nossa Política de Privacidade.
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">
            <Link href="/privacy" className="underline underline-offset-4">
              Política de Privacidade
            </Link>
            {" · "}
            <Link href="/terms" className="underline underline-offset-4">
              Termos de Uso
            </Link>
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant={"ghost"}
              className="bg-gray-50"
              onClick={() => handleConsent("declined")}
            >
              Recusar
            </Button>
            <Button
              type="button"
              variant={"gold"}
              onClick={() => handleConsent("accepted")}
            >
              Aceitar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
