"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { useActionState, useEffect } from "react";
import { callRequestEmailAction } from "@/lib/server-actions/emails/call-request-email";
import { toast } from "sonner";
import { PatternFormat } from "react-number-format";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    callRequestEmailAction,
    null,
  );

  // FOR UI RESPONSE
  useEffect(() => {
    if (state?.success === true) {
      toast("Email enviado com sucesso!");
    } else if (state?.success === false) {
      toast.error(state.message || "Ocorreu um erro ao enviar.");
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-4">
      <Input
        variant={"gray"}
        type="text"
        placeholder="Seu nome"
        name="name"
        required
      />
      <PatternFormat
        name="phone"
        format="(##) #####-####"
        mask="_"
        customInput={Input}
        placeholder="Seu tefelone com DDD"
        variant={"gray"}
        minLength={2}
        required
        allowEmptyFormatting={false}
        isAllowed={(values) => {
          return values.value.length <= 11;
        }}
        onBlur={(e: any) => {
          if (e.target.value.includes("_")) {
            e.target.value = "";
          }
        }}
      />
      <Select name="bestTime" required>
        <SelectTrigger variant={"gray"} className="w-full">
          <SelectValue placeholder="Melhor horário" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="manha">Manhã (9h - 12h)</SelectItem>
          <SelectItem value="tarde">Tarde (12h - 18h)</SelectItem>
          <SelectItem value="noite">Noite (18h - 21h)</SelectItem>
        </SelectContent>
      </Select>
      <Button
        className="w-full h-12 rounded-xl text-base font-semibold bg-hero-bg"
        type="submit"
        disabled={pending}
      >
        Solicitar contato
      </Button>
    </form>
  );
}
