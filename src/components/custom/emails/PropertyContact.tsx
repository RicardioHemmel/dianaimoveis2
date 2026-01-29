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

interface ContactEmailProps {
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyTitle: string;
}

export default function PropertyContactEmail({
  name,
  email,
  phone,
  message,
  propertyTitle,
}: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Interesse no imóvel: {propertyTitle}</Preview>
      <Tailwind>
        <Body className="bg-[#f6f9fc] py-10 font-sans">
          <Container className="bg-white border border-[#f0f0f0] rounded-lg p-10 mx-auto">
            <Heading className="text-2xl font-bold text-[#1a1a1a] mb-6">
              🏠 Novo Interesse em Imóvel
            </Heading>

            {/* Destaque do Imóvel */}
            <Section className="mb-6 p-4 border-l-4 border-gold bg-slate-50">
              <Text className="text-sm text-[#777] uppercase tracking-wider mb-1">
                Imóvel de Interesse:
              </Text>
              <Text className="text-lg font-semibold text-[#1a1a1a] my-0">
                {propertyTitle}
              </Text>
            </Section>

            <Section className="bg-[#f9f9f9] rounded-md p-6 mb-6">
              <Text className="text-sm text-[#777] uppercase tracking-wider mb-1">
                Dados do Interessado
              </Text>
              <Text className="text-base text-[#1a1a1a] my-1">
                <strong>Nome:</strong> {name}
              </Text>
              <Text className="text-base text-[#1a1a1a] my-1">
                <strong>E-mail:</strong> {email}
              </Text>
              <Text className="text-base text-[#1a1a1a] my-1">
                <strong>Telefone:</strong> {phone}
              </Text>
            </Section>

            <Section>
              <Text className="text-sm text-[#777] uppercase tracking-wider mb-1">
                Mensagem:
              </Text>
              <Text className="text-base italic text-[#404040] leading-relaxed bg-blue-50 p-4 rounded-md border-l-4 border-blue-500">
                "{message}"
              </Text>
            </Section>

            <Hr className="border-[#e6ebf1] my-8" />

            <Text className="text-xs text-[#8898aa] leading-relaxed text-center">
              Este e-mail foi gerado automaticamente referente ao imóvel{" "}
              <strong>{propertyTitle}</strong>.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

PropertyContactEmail.PreviewProps = {
  name: "João Silva",
  email: "joao.silva@exemplo.com",
  phone: "(11) 99999-9999",
  message:
    "Gostaria de agendar uma visita para o imóvel no centro. Aceita financiamento?",
  propertyTitle: "Nurban Carnaubeiras",
} as ContactEmailProps;
