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

interface AnnoucePropertyEmailProps {
  name: string;
  phone: string;
  email: string;
  userRole: string;
  purpose: string;
  address: string;
  type: string;
  price: string;
  sqm: string;
  bedrooms: string;
  bathrooms: string;
  parking: string;
  description: string;
}

export default function AnnoucePropertyEmail({
  name,
  phone,
  email,
  userRole,
  purpose,
  address,
  type,
  price,
  sqm,
  bedrooms,
  bathrooms,
  parking,
  description,
}: AnnoucePropertyEmailProps) {
  const labelMap: Record<string, string> = {
    proprietario: "Proprietário",
    corretor: "Corretor",
    imobiliaria: "Imobiliária",
    venda: "Venda",
    aluguel: "Aluguel",
    apto: "Apartamento",
    casa: "Casa",
    cobertura: "Cobertura",
  };

  return (
    <Html>
      <Head />
      <Preview>Novo Pedido para Divulgação de Imóvel por: {name}</Preview>
      <Tailwind>
        <Body className="bg-[#f6f9fc] py-10 font-sans">
          <Container className="bg-white border border-[#f0f0f0] rounded-lg p-8 mx-auto max-w-[600px]">
            <Heading className="text-2xl font-bold text-[#1a1a1a] mb-2">
              🏠 Nova Solicitação de Cadastro
            </Heading>
            <Text className="text-[#444] mb-6">
              Olá Diana, um novo imóvel foi enviado através do site para
              avaliação e cadastro.
            </Text>

            {/* SECTION: CONTACT */}
            <Section className="mb-8">
              <Text className="text-xs uppercase font-bold text-[#999] mb-2 tracking-widest">
                Informações do Remetente
              </Text>
              <div className="bg-[#f9f9f9] p-4 rounded-md border border-[#eee]">
                <Text className="m-0 mb-1">
                  <strong>Nome:</strong> {name} (
                  {labelMap[userRole] || userRole})
                </Text>
                <Text className="m-0 mb-1">
                  <strong>Telefone:</strong> {phone}
                </Text>
                <Text className="m-0">
                  <strong>E-mail:</strong> {email}
                </Text>
              </div>
            </Section>

            {/* SEÇÃO: O IMÓVEL */}
            <Section className="mb-8">
              <Text className="text-xs uppercase font-bold text-[#999] mb-2 tracking-widest">
                Detalhes do Imóvel
              </Text>
              <Text className="m-0 text-lg font-semibold text-[#D4AF37]">
                {labelMap[type] || type} para {labelMap[purpose] || purpose}
              </Text>
              <Text className="m-0 mb-4 text-[#555] italic">{address}</Text>

              <div className="grid grid-cols-2 gap-y-2 text-sm bg-[#fffdf5] p-4 border border-[#f3ebce] rounded-md">
                <Text className="m-0">
                  <strong>Valor:</strong> R$ {price}
                </Text>
                <Text className="m-0">
                  <strong>Área:</strong> {sqm} m²
                </Text>
                <Text className="m-0">
                  <strong>Quartos:</strong> {bedrooms}
                </Text>
                <Text className="m-0">
                  <strong>Banheiros:</strong> {bathrooms}
                </Text>
                <Text className="m-0">
                  <strong>Vagas:</strong> {parking}
                </Text>
              </div>
            </Section>

            {/* SECTION: DESCRIPTION */}
            <Section className="mb-8">
              <Text className="text-xs uppercase font-bold text-[#999] mb-2 tracking-widest">
                Diferenciais e Descrição
              </Text>
              <div className="bg-[#fdfdfd] p-4 border border-[#eee] rounded-md italic text-[#333]">
                "{description}"
              </div>
            </Section>

            <Hr className="border-[#e6ebf1] my-8" />
            <Text className="text-[12px] text-[#8898aa] text-center uppercase tracking-tighter">
              Diana Imóveis • Sistema de Captação Online
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

AnnoucePropertyEmail.PreviewProps = {
  name: "João Silva",
  phone: "(11) 98888-7777",
  email: "joao.silva@exemplo.com.br",
  userRole: "proprietario",
  purpose: "venda",
  address: "Rua das Palmeiras, 450 - Jardins, São Paulo - SP",
  type: "apto",
  price: "1.250.000",
  sqm: "120",
  bedrooms: "3",
  bathrooms: "2",
  parking: "2",
  description:
    "Apartamento reformado com vista livre, varanda gourmet integrada e móveis planejados em todos os cômodos. Próximo ao metrô e com lazer completo no prédio.",
} as AnnoucePropertyEmailProps;
