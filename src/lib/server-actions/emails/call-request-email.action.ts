"use server";

//SC
import ServerActionResponse from "@/lib/types/server-action-response";

// EMAIL TSX
import CallRequestEmail from "@/components/custom/emails/CallRequest";

// EMAIL SERVICE
import { Resend } from "resend";

// EMAIL PROVIDER
const resend = new Resend(process.env.RESEND_API_KEY);

export async function callRequestEmailAction(
  _: unknown,
  formData: FormData,
): Promise<ServerActionResponse> {
  const name = formData.get("name")?.toString();
  const phone = formData.get("phone")?.toString();
  const bestTime = formData.get("bestTime")?.toString();

  if (!name || !phone || !bestTime) {
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
    const { error } = await resend.emails.send({
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`,
      to: [process.env.DIANA_EMAIL!],
      subject: `Solicitação de Contato - ${name}`,
      react: CallRequestEmail({
        name: name,
        bestTime: bestTime,
        phone: phone,
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
