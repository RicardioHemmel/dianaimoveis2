"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Home, User, DollarSign, Building2, Send } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useActionState, useEffect, useState } from "react";
import { announcePropertyEmailAction } from "@/lib/server-actions/emails/announce-property-email.action";
import { toast } from "sonner";
import { NumericFormat, PatternFormat } from "react-number-format";

export function AnnouncePropertyForm() {
  const [state, formAction, pending] = useActionState(
    announcePropertyEmailAction,
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

  const [propertyPurpose, setPropertyPurpose] = useState<
    "venda" | "aluguel" | undefined
  >(undefined);

  return (
    <form action={formAction} className="space-y-10">
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <div className="size-12 flex items-center justify-center rounded-md bg-action-primary/20">
          <Home className="size-7 text-action-primary" />
        </div>
        <div>
          <h2 className="text-xl font-serif font-bold">Cadastre seu Imóvel</h2>
          <p className="text-sm text-muted-foreground">
            Preencha os dados abaixo
          </p>
        </div>
      </div>

      {/* PERSONAL DATA */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <User className="size-7 text-action-primary" />
          Dados Pessoais
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Input
            name="name"
            placeholder="Seu nome completo"
            variant={"gray"}
            required
          />
          <PatternFormat
            name="phone"
            format="(##) #####-####"
            mask="_"
            customInput={Input}
            placeholder="Telefone com DDD"
            className="bg-slate-50"
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
          />{" "}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Select name="userType" required>
            <SelectTrigger className="w-full" variant={"gray"}>
              <SelectValue placeholder="Você é..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="proprietario">Proprietário</SelectItem>
              <SelectItem value="corretor">Corretor</SelectItem>
              <SelectItem value="imobiliaria">Imobiliária</SelectItem>
            </SelectContent>
          </Select>

          <Input
            name="email"
            variant={"gray"}
            placeholder="Seu melhor e-mail"
            type="email"
            required
          />
        </div>
      </div>

      {/* AD TYPE */}
      <input type="hidden" name="purpose" value={propertyPurpose || ""} />
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <DollarSign className="h-7 w-7 text-action-primary" />
          Tipo de Anúncio
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setPropertyPurpose("venda")}
            className={`rounded-xl border-2 p-4 text-center transition cursor-pointer ${
              propertyPurpose === "venda"
                ? "border-action-primary bg-action-primary text-white"
                : "border-border bg-slate-50"
            }`}
          >
            <p className="font-semibold">Vender</p>
            <p className="text-xs text-muted-foreground">Venda definitiva</p>
          </button>

          <button
            type="button"
            onClick={() => setPropertyPurpose("aluguel")}
            className={`rounded-xl border-2 p-4 text-center transition cursor-pointer ${
              propertyPurpose === "aluguel"
                ? "border-action-primary bg-action-primary text-white"
                : "border-border bg-slate-50"
            }`}
          >
            <p className="font-semibold">Alugar</p>
            <p className="text-xs text-muted-foreground">Locação mensal</p>
          </button>
        </div>
      </div>

      {/* PROPERTY DETAILS */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Building2 className="size-7 text-action-primary" />
          Dados do Imóvel
        </div>

        <Input
          name="address"
          placeholder="Endereço completo"
          variant={"gray"}
        />

        <div className="grid md:grid-cols-2 gap-4">
          <Select name="propertyType" required>
            <SelectTrigger className="w-full" variant={"gray"}>
              <SelectValue placeholder="Tipo do imóvel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apto">Apartamento</SelectItem>
              <SelectItem value="casa">Casa</SelectItem>
              <SelectItem value="cobertura">Cobertura</SelectItem>
            </SelectContent>
          </Select>

          <NumericFormat
            name="price"
            thousandSeparator="."
            decimalSeparator=","
            prefix="R$ "
            customInput={Input}
            variant={"gray"}
            decimalScale={2}
            fixedDecimalScale
            allowNegative={false}
            placeholder="Preço R$"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Input placeholder="m²" name="area" variant={"gray"} />
          <Input placeholder="Quartos" name="bedrooms" variant={"gray"} />
          <Input placeholder="Banheiros" name="bathrooms" variant={"gray"} />
          <Input placeholder="Vagas" name="parkingSpaces" variant={"gray"} />
        </div>

        <Textarea
          name="message"
          variant={"gray"}
          placeholder="Descreva os diferenciais do seu imóvel: acabamentos, localização, facilidades..."
          className="min-h-[120px]"
        />
      </div>

      {/* CONSENT */}
      <div className="space-y-3 border-t pt-6">
        <div className="flex gap-3 items-start">
          <Checkbox name="lgpdAgreement" id="lgpdAgreement" />
          <Label
            className="text-sm text-muted-foreground"
            htmlFor="lgpdAgreement"
          >
            Concordo com a LGPD (Lei Geral de Proteção de Dados)
          </Label>
        </div>

        <div className="flex gap-3 items-start">
          <Checkbox name="dataStorageAgreement" id="dataStorageAgreement" />
          <Label
            className="text-sm text-muted-foreground"
            htmlFor="dataStorageAgreement"
          >
            Autorizo o armazenamento das informações enviadas
          </Label>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        variant="gold"
        className="w-full text-white"
      >
        <Send className="mr-2 h-4 w-4" />
        Enviar Anúncio
      </Button>
    </form>
  );
}
