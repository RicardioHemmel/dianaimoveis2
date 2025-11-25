import { z } from "zod";

export const propertySchema = z.object({
  // Informações Básicas
  tipo: z.enum(["apartamento", "casa", "comercial", "terreno"]),
  titulo: z.string().min(5, "Título deve ter no mínimo 5 caracteres"),
  descricao: z.string().min(20, "Descrição deve ter no mínimo 20 caracteres"),

  // Localização
  endereco: z.string().min(5, "Endereço é obrigatório"),
  bairro: z.string().min(3, "Bairro é obrigatório"),
  cidade: z.string().min(3, "Cidade é obrigatória"),
  estado: z.string().min(2, "Estado é obrigatório"),
  cep: z.string().min(8, "CEP é obrigatório"),

  // Valores
  preco: z.string().min(1, "Preço é obrigatório"),
  iptu: z.string().optional(),
  condominio: z.string().optional(),

  // Características Gerais
  area: z.string().min(1, "Área é obrigatória"),
  quartos: z.string().optional(),
  banheiros: z.string().optional(),
  vagas: z.string().optional(),

  // Específico para Apartamento
  andarInicial: z.string().optional(),
  andarFinal: z.string().optional(),
  totalAndares: z.string().optional(),
  unidadesAndar: z.string().optional(),

  // Específico para Casa
  terreno: z.string().optional(),
  quintal: z.string().optional(),

  // Status e Opções
  status: z.enum(["disponivel", "reservado", "vendido"]),
  mobiliado: z.boolean().optional(),
  aceitaPet: z.boolean().optional(),
});

export type PropertyFormData = z.infer<typeof propertySchema>;
