"use server";

// SC
import ServerActionResponse from "@/lib/types/server-action-response";

// EMAIL TSX
import AnnouncePropertyEmail from "@/components/custom/emails/AnnounceProperty";

// EMAIL SERVICE
import { Resend } from "resend";

// EMAIL PROVIDER
const resend = new Resend(process.env.RESEND_API_KEY);

export async function announcePropertyEmailAction(
  _: unknown,
  formData: FormData,
): Promise<ServerActionResponse> {
  // Coleta de dados baseada nos 'name' dos seus inputs
  const name = formData.get("name")?.toString();
  const phone = formData.get("phone")?.toString();
  const email = formData.get("email")?.toString().toLowerCase();
  const userType = formData.get("userType")?.toString();
  const propertyPurpose = formData.get("purpose")?.toString();
  const address = formData.get("address")?.toString();
  const propertyType = formData.get("propertyType")?.toString();
  const price = formData.get("price")?.toString();
  const area = formData.get("area")?.toString();
  const bedrooms = formData.get("bedrooms")?.toString();
  const bathrooms = formData.get("bathrooms")?.toString();
  const parkingSpaces = formData.get("parkingSpaces")?.toString();
  const message = formData.get("message")?.toString();

  // Checkboxes
  const lgpdAgreement = formData.get("lgpdAgreement");
  const dataStorageAgreement = formData.get("dataStorageAgreement");

  // VALIDATION OF ESSENTIAL MANDATORY FIELDS
  if (
    !name ||
    !email ||
    !phone ||
    !propertyPurpose ||
    !address ||
    !lgpdAgreement ||
    !dataStorageAgreement
  ) {
    return {
      success: false,
      message:
        "Campos obrigatórios faltando (Nome, E-mail, Telefone, Tipo de Anúncio, Endereço e LGPD).",
    };
  }

  // PHONE VALIDATION (REGEX THAT ACCEPTS (99) 99999-9999 OU (99)99999-9999)
  const phoneRegex = /^\(\d{2}\)\s?\d{5}-\d{4}$/;
  if (!phoneRegex.test(phone)) {
    return {
      success: false,
      message: "Formato de telefone inválido. Use (DD) 99999-9999.",
    };
  }

  try {
    // SENDS EMAIL
    const { error } = await resend.emails.send({
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`,
      to: [process.env.DIANA_EMAIL!],
      replyTo: email,
      subject: `🏠 Novo Imóvel: ${propertyPurpose.toUpperCase()} - ${name}`,
      react: AnnouncePropertyEmail({
        name,
        phone,
        email,
        userRole: userType || "Não informado",
        purpose: propertyPurpose,
        address,
        type: propertyType || "Outro",
        price: price || "Sob consulta",
        sqm: area || "--",
        bedrooms: bedrooms || "0",
        bathrooms: bathrooms || "0",
        parking: parkingSpaces || "0",
        description: message || "Sem descrição adicional.",
      }),
    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, message: "Erro ao enviar o e-mail de anúncio." };
    }

    return {
      success: true,
      message: "Os dados do seu imóvel foram enviados para análise da Diana!",
    };
  } catch (error) {
    console.error("Server Action Error:", error);
    return {
      success: false,
      message: "Erro interno ao processar o anúncio.",
    };
  }
}
