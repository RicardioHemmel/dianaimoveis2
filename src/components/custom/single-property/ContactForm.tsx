"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, MessageSquare } from "lucide-react";
import { PatternFormat } from "react-number-format";
import { HoneypotInput } from "@/components/custom/HoneypotInput";
import { propertyContactEmailAction } from "@/lib/server-actions/emails/property-contact-email.action";
import { toast } from "sonner";
import { useActionState, useEffect } from "react";

export function ContactForm({ propertyTitle }: { propertyTitle: string }) {
  const [state, formAction, pending] = useActionState(
    propertyContactEmailAction,
    null,
  ); // RESEND SERVER ACTION

  // FOR UI RESPONSE
  useEffect(() => {
    if (state?.success === true) {
      toast("Email enviado com sucesso!");
    } else if (state?.success === false) {
      toast.error(state.message || "Ocorreu um erro ao enviar.");
    }
  }, [state]);
  return (
    <form action={formAction} className="space-y-6">
      <div className="relative">
        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          name="name"
          placeholder="Seu nome"
          className="pl-12 h-12"
          variant={"gray"}
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            name="email"
            type="email"
            placeholder="Seu e-mail"
            className="pl-12 h-12"
            variant={"gray"}
            required
          />
        </div>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
          <PatternFormat
            name="phone"
            format="(##) #####-####"
            mask="_"
            customInput={Input}
            placeholder="(00) 00000-0000"
            className="pl-12 h-12 bg-slate-50"
            variant={"gray"}
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
        </div>
      </div>

      <div className="relative">
        <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
        <Textarea
          name="message"
          placeholder="Sua mensagem"
          className="pl-12 min-h-[120px] resize-none"
          variant={"gray"}
          required
        />
      </div>

      <input
        className="hidden"
        defaultValue={propertyTitle}
        name="propertyTitle"
      />

      <HoneypotInput />

      <Button
        type="submit"
        disabled={pending}
        variant="gold"
        size="lg"
        className="w-full"
      >
        Enviar Mensagem
      </Button>

      <p className="text-center text-muted-foreground text-sm">
        Ao enviar, você concorda com nossa política de privacidade.
      </p>
    </form>
  );
}
