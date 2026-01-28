"use client";

import { FloatingWhatsApp } from "react-floating-whatsapp";

export function FloatingWhatsAppBtn() {
  return (
    <FloatingWhatsApp
      phoneNumber="5511966536993"
      accountName="Diana Imóveis"
      avatar="/dianaPhoto.png"
      allowEsc
      chatMessage="Olá, como posso te ajudar?"
      statusMessage="Respostas em até 1 hora"
      placeholder="Digite uma mensagem"
      messageDelay={1.5}
    />
  );
}
