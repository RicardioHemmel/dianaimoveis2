import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface ResetPasswordEmailProps {
  userFirstname?: string;
  resetPasswordLink?: string;
}

export default function ResetPasswordEmail({
  userFirstname,
  resetPasswordLink,
}: ResetPasswordEmailProps) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-[#f6f9fc] py-2.5">
          <Preview>Diana Imóveis - Redefina sua senha</Preview>
          <Container className="bg-white border border-solid border-[#f0f0f0] p-[45px]">
            {/* <Img
              src={`${baseUrl}/static/dropbox-logo.png`}
              width="40"
              height="33"
              alt="Dropbox"
            /> */}
            <Section>
              <Text className="text-base text-[#404040] leading-[26px]">
                Olá, {userFirstname}
              </Text>
              <Text className="text-base text-[#404040] leading-[26px]">
                Alguém solicitou recentemente uma alteração de senha para sua
                conta do Diana Imóveis. Se foi você, pode definir uma nova senha
                aqui:
              </Text>
              <Text className="text-base text-[#404040] leading-[26px]">
                Se você não deseja alterar sua senha ou não solicitou isso,
                simplesmente ignore e exclua esta mensagem.
              </Text>
              <Text className="text-base text-[#404040] leading-[26px]">
                Para manter sua conta segura, por favor, não encaminhe este
                e-mail para ninguém
              </Text>
              <Text className="text-base text-[#404040] leading-[26px]">
                Com carinho, Ricardo Hemmel!
              </Text>

              <Button
                className="bg-[#007ee6] rounded text-white text-[15px] no-underline text-center -sans block w-full py-3.5 px-[7px]"
                href={resetPasswordLink}
              >
                Redefinir senha
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

ResetPasswordEmail.PreviewProps = {
  userFirstname: "Alan",
  resetPasswordLink: "https://www.dropbox.com",
} as ResetPasswordEmailProps;
