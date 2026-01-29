"use server";

// MONGODB
import connectMongoDB from "@/lib/db/mongodbConnection";

//SC
import ServerActionResponse from "@/lib/types/server-action-response";

// EMAIL TSX
import PropertyContactEmail from "@/components/custom/emails/PropertyContact";

// EMAIL SERVICE
import { Resend } from "resend";

// EMAIL PROVIDER
const resend = new Resend(process.env.RESEND_API_KEY);

export async function propertyContactEmailAction(
  _: unknown,
  formData: FormData,
): Promise<ServerActionResponse> {
  const propertyTitle = formData.get("propertyTitle")?.toString();
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString().toLowerCase();
  const phone = formData.get("phone")?.toString();
  const message = formData.get("message")?.toString();

  if (!name || !email || !message || !phone || !propertyTitle) {
    return { success: false, message: "Campos obrigatórios faltando." };
  }

  const phoneRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/;

  if (!phoneRegex.test(phone)) {
    return {
      success: false,
      message: "Telefone inválido. Use o formato (DD) 99999-9999.",
    };
  }

  // SENDS EMAIL
  try {
    await connectMongoDB();
    const { error } = await resend.emails.send({
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`,
      to: [process.env.DIANA_EMAIL!],
      replyTo: email,
      subject: `Novo Contato através do Diana Imóveis - ${name}`,
      react: PropertyContactEmail({
        propertyTitle: propertyTitle,
        name: name,
        phone: phone,
        email: email,
        message: message,
      }),
    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, message: "Erro ao enviar o e-mail." };
    }

    return {
      success: true,
      message: "Sua mensagem foi enviada com sucesso!",
    };
  } catch (error) {
    console.error("Server Action Error:", error);
    return {
      success: false,
      message: "Ocorreu um erro interno no servidor.",
    };
  }
}
