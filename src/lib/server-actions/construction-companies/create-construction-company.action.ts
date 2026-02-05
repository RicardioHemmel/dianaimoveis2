"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import ServerActionResponse from "@/lib/types/server-action-response";
import {
  ConstructionCompanyWithLinkedProperties,
  createConstructionCompany,
} from "@/lib/services/properties/property-details/property-construction-company.service";

const constructionCompanySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Digite ao menos 2 caracteres")
    .max(80, "O nome deve ter no máximo 80 caracteres"),
});

interface CreateConstructionCompanyActionResponse extends ServerActionResponse {
  data?: ConstructionCompanyWithLinkedProperties;
}

export async function createConstructionCompanyAction(
  _: unknown,
  formData: FormData,
): Promise<CreateConstructionCompanyActionResponse> {
  const parsed = constructionCompanySchema.safeParse({
    name: formData.get("name")?.toString() ?? "",
  });

  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const company = await createConstructionCompany(parsed.data.name);

    revalidatePath("/construction-companies");

    return {
      success: true,
      data: {
        ...company,
        linkedProperties: [],
      },
    };
  } catch (err) {
    if (
      err instanceof Error &&
      err.message === "CONSTRUCTION_COMPANY_ALREADY_EXISTS"
    ) {
      return {
        success: false,
        message: "Já existe uma construtora com esse nome.",
      };
    }

    if (
      err instanceof Error &&
      err.message === "CONSTRUCTION_COMPANY_NAME_REQUIRED"
    ) {
      return {
        success: false,
        message: "O nome da construtora é obrigatório.",
      };
    }

    throw err;
  }
}
