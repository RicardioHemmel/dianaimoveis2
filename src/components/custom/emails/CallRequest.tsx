import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
  Hr,
} from "@react-email/components";

interface CallRequestProps {
  name: string;
  phone: string;
  bestTime: string;
}

export default function CallRequestEmail({
  name,
  phone,
  bestTime,
}: CallRequestProps) {
  const timeLabels: Record<string, string> = {
    manha: "Manhã (9h - 12h)",
    tarde: "Tarde (12h - 18h)",
    noite: "Noite (18h - 21h)",
  };

  return (
    <Html>
      <Head />
      <Preview>Solicitação de Contato - {name}</Preview>
      <Tailwind>
        <Body className="bg-[#f6f9fc] py-10 font-sans">
          <Container className="bg-white border border-[#f0f0f0] rounded-lg p-10 mx-auto">
            <Heading className="text-xl font-bold text-[#1a1a1a] mb-4">
              📞 Solicitação de Contato
            </Heading>
            <Text className="text-base text-[#404040]">
              Diana, um cliente solicitou que você ligue para ele:
            </Text>
            <Section className="bg-[#fff4e6] rounded-md p-6 my-6 border-l-4 border-[#f59e0b]">
              <Text className="m-0 mb-2">
                <strong>Nome:</strong> {name}
              </Text>
              <Text className="m-0 mb-2">
                <strong>Telefone:</strong> {phone}
              </Text>
              <Text className="m-0 font-bold text-[#b45309]">
                🕒 Preferência: {timeLabels[bestTime] || bestTime}
              </Text>
            </Section>
            <Hr className="border-[#e6ebf1] my-8" />
            <Text className="text-xs text-[#8898aa] text-center">
              Diana Imóveis - Sistema de Leads
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

CallRequestEmail.PreviewProps = {
  name: "João Silva",
  bestTime: "Tarde (12h - 18h)",
  phone: "(11) 94488-0786",
} as CallRequestProps;
