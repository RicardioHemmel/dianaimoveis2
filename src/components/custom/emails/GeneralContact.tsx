import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface GeneralContactEmailProps {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function GeneralContactEmail({
  name,
  email,
  phone,
  subject,
  message,
}: GeneralContactEmailProps) {
  const userTypeMap: Record<string, string> = {
    comprador: "Comprador",
    vendedor: "Vendedor",
    locatario: "Locatário",
    investidor: "Investidor",
    outro: "Outro",
  };

  const subjectMap: Record<string, string> = {
    comprar: "Quero comprar um imóvel",
    vender: "Quero vender meu imóvel",
    alugar: "Quero alugar um imóvel",
    anunciar: "Quero anunciar meu imóvel",
    duvida: "Dúvida geral",
    outro: "Outro assunto",
  };

  return (
    <Html>
      <Head />
      <Preview>Novo Contato: {subjectMap[subject] || subject}</Preview>
      <Tailwind>
        <Body className="bg-[#f4f7f9] py-8 font-sans">
          <Container className="bg-white border border-[#e0e0e0] rounded-lg p-8 mx-auto max-w-[600px]">
            <Heading className="text-2xl font-bold text-[#111] mb-2">
              📩 Novo Contato do Site
            </Heading>
            <Text className="text-[#555] mb-6">
              Um novo formulário de contato foi preenchido com os seguintes
              detalhes:
            </Text>

            <Section className="mb-6">
              <Text className="text-sm uppercase text-[#999] tracking-widest mb-1">
                Perfil do Lead
              </Text>
              <div className="bg-[#f9f9f9] rounded p-4 border border-[#eee]">
                <Text className="m-0 mb-1">
                  <strong>Nome:</strong> {name}
                </Text>
                <Text className="m-0 mb-1">
                  <strong>E-mail:</strong> {email}
                </Text>
                <Text className="m-0 mb-1">
                  <strong>Telefone:</strong> {phone}
                </Text>
              </div>
            </Section>

            <Section className="mb-6">
              <Text className="text-sm uppercase text-[#999] tracking-widest mb-1">
                Solicitação
              </Text>
              <Text className="text-lg font-semibold text-[#D4AF37] m-0 mb-2">
                {subjectMap[subject] || subject}
              </Text>
              <div className="bg-[#fffdf5] rounded p-4 border-l-4 border-[#D4AF37]">
                <Text className="m-0 text-[#333] leading-relaxed italic">
                  "{message}"
                </Text>
              </div>
            </Section>

            <Hr className="border-[#eee] my-6" />

            <Text className="text-[12px] text-[#aaa] text-center leading-tight">
              Este e-mail foi enviado via formulário de contato do site Diana
              Imóveis.
              <br />O cliente concordou com os termos da LGPD no momento do
              envio.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

GeneralContactEmail.PreviewProps = {
  name: "Ricardo Hemmel",
  email: "ricardo.hemmel@hotmail.com",
  message: "Gostaria de saber mais informações sobre o Nurban Carnaubeiras",
  phone: "(11) 94488-0786",
  subject: "Quero comprar um imóvel",
} as GeneralContactEmailProps;
