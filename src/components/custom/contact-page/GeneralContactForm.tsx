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
import { Textarea } from "@/components/ui/textarea";

import { propertyContactEmailAction } from "@/lib/server-actions/emails/general-contact-email.action";
import { toast } from "sonner";
import { PatternFormat } from "react-number-format";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Send, User } from "lucide-react";
import { useActionState, useEffect } from "react";

export function GeneralContactForm() {
  const [state, formAction, pending] = useActionState(
    propertyContactEmailAction,
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
    <form action={formAction} className="space-y-6">
      <div>
        <Label className="text-sm font-semibold mb-3 block">Seus dados:</Label>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              name="name"
              variant={"gray"}
              placeholder="Nome"
              className="pl-10"
              required
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <PatternFormat
              name="phone"
              format="(##) #####-####"
              mask="_"
              customInput={Input}
              placeholder="(00) 00000-0000"
              className="pl-12 bg-slate-50"
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
      </div>

      <div className="grid sm:grid-cols-1 gap-4">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            name="email"
            variant={"gray"}
            type="email"
            placeholder="Email"
            className="pl-10"
            required
          />
        </div>
      </div>

      <Label className="text-sm font-semibold mb-3 block">Assunto:</Label>

      <Select name="subject" required>
        <SelectTrigger variant={"gray"} className="w-full">
          <SelectValue placeholder="Selecione o assunto" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="comprar">Quero comprar um imóvel</SelectItem>
          <SelectItem value="vender">Quero vender meu imóvel</SelectItem>
          <SelectItem value="alugar">Quero alugar um imóvel</SelectItem>
          <SelectItem value="anunciar">Quero anunciar meu imóvel</SelectItem>
          <SelectItem value="duvida">Tenho uma dúvida</SelectItem>
          <SelectItem value="outro">Outro assunto</SelectItem>
        </SelectContent>
      </Select>

      <Label className="text-sm font-semibold mb-3 block">Mensagem:</Label>
      <Textarea
        name="message"
        variant={"gray"}
        placeholder="Descreva como podemos ajudá-lo..."
        className="min-h-[120px] resize-none"
        required
      />

      <div className="flex items-start gap-3">
        <Checkbox name="lgpdAgreement" required id="lgpdAgreement" />
        <Label
          className="text-sm text-muted-foreground cursor-pointer"
          htmlFor="lgpdAgreement"
        >
          Concordo com a LGPD (Lei Geral de Proteção de Dados)
        </Label>
      </div>

      <Button
        type="submit"
        variant="gold"
        size="lg"
        className="w-full text-white"
      >
        <Send className="mr-2 size-4" />
        Enviar Mensagem
      </Button>
    </form>
  );
}
