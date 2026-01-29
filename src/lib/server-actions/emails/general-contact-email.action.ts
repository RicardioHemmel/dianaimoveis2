"use server";

//SC
import ServerActionResponse from "@/lib/types/server-action-response";

// EMAIL TSX
import GeneralContactEmail from "@/components/custom/emails/GeneralContact";

// EMAIL SERVICE
import { Resend } from "resend";

// EMAIL PROVIDER
const resend = new Resend(process.env.RESEND_API_KEY);

// TO PREVENT MULTI EMAILS SEND
import { getClientIp, checkRateLimit } from "@/lib/security/ip-rate-limit";

export async function propertyContactEmailAction(
  _: unknown,
  formData: FormData,
): Promise<ServerActionResponse> {
  const ip = await getClientIp();
  const { success: limitOk } = await checkRateLimit(
    `ratelimit_generalContact_${ip}`,
  );

  if (!limitOk) {
    return {
      success: false,
      message:
        "Muitas tentativas em pouco tempo. Por favor, aguarde alguns minutos.",
    };
  }

  // HONEYPOT TO PREVENT BOTS ACTIONS
  const honeypot = formData.get("company")?.toString();

  if (honeypot) {
    return {
      success: true,
      message: "Envio processado com sucesso!",
    };
  }

  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString().toLowerCase();
  const phone = formData.get("phone")?.toString();
  const message = formData.get("message")?.toString();
  const subject = formData.get("subject")?.toString();
  const lgpdAgreement = formData.get("lgpdAgreement");

  if (!name || !email || !message || !phone || !subject || !lgpdAgreement) {
    return {
      success: false,
      message: "Todos os campos são obrigatórios, incluindo o aceite da LGPD.",
    };
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
      replyTo: email,
      subject: `Novo Contato através do Diana Imóveis - ${name}`,
      react: GeneralContactEmail({
        name: name,
        email: email,
        phone: phone,
        subject: subject,
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
