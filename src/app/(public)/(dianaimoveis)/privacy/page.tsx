import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  Lock,
  Eye,
  Database,
  Cookie,
  Heart,
  Share2,
  ShieldCheck,
  UserCheck,
  Mail,
} from "lucide-react";

export default function PrivacyPage() {
  const sections = [
    {
      icon: Eye,
      title: "1. Informações que Coletamos",
      content: `Coletamos informações que você nos fornece diretamente através de:

**Formulários de Contato:**
• Nome completo
• E-mail
• Telefone/WhatsApp
• Mensagem ou interesse específico

**Navegação no Site:**
• Páginas visitadas e imóveis visualizados
• Tempo de permanência
• Dispositivo e navegador utilizados
• Endereço IP (de forma anonimizada)`,
    },
    {
      icon: Heart,
      title: "2. Favoritos e Armazenamento Local",
      content: `Para melhorar sua experiência, utilizamos o armazenamento local do seu navegador (localStorage) para:

• Salvar os imóveis que você marcou como favoritos
• Manter suas preferências de navegação

**Importante:** Esses dados ficam armazenados apenas no seu dispositivo e não são enviados aos nossos servidores. Se você limpar os dados do navegador ou trocar de dispositivo, essas informações serão perdidas.

Não temos acesso aos seus favoritos salvos localmente.`,
    },
    {
      icon: Database,
      title: "3. Como Usamos suas Informações",
      content: `Utilizamos as informações coletadas para:

• Responder às suas solicitações de contato
• Agendar visitas aos imóveis
• Melhorar nosso site e serviços

Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros para fins comerciais.`,
    },
    {
      icon: Share2,
      title: "4. Compartilhamento de Dados",
      content: `Podemos compartilhar suas informações apenas nas seguintes situações:

• Com corretores parceiros para atendimento de suas solicitações
• Com prestadores de serviços que nos auxiliam (hospedagem, e-mail marketing)
• Quando exigido por lei ou ordem judicial
• Para proteger nossos direitos e segurança

Todos os parceiros estão sujeitos a acordos de confidencialidade.`,
    },
    {
      icon: Cookie,
      title: "5. Cookies e Tecnologias Similares",
      content: `Utilizamos cookies para:

• Lembrar suas preferências
• Analisar o tráfego do site
• Personalizar conteúdo

Você pode configurar seu navegador para recusar cookies, mas isso pode afetar algumas funcionalidades do site.

**Cookies de Terceiros:**
Podemos utilizar serviços de análise como Google Analytics, que possuem suas próprias políticas de privacidade.`,
    },
    {
      icon: ShieldCheck,
      title: "6. Segurança dos Dados",
      content: `Implementamos medidas de segurança para proteger suas informações:

• Conexão criptografada (HTTPS)
• Acesso restrito às informações pessoais
• Monitoramento contra acessos não autorizados`,
    },
    {
      icon: UserCheck,
      title: "7. Seus Direitos",
      content: `De acordo com a LGPD (Lei Geral de Proteção de Dados), você tem direito a:

• **Acesso:** Saber quais dados temos sobre você
• **Correção:** Atualizar informações incorretas
• **Exclusão:** Solicitar a remoção de seus dados
• **Portabilidade:** Receber seus dados em formato estruturado
• **Revogação:** Cancelar consentimentos dados anteriormente

Para exercer qualquer desses direitos, entre em contato conosco através da página de contato.`,
    },
    {
      icon: Lock,
      title: "8. Alterações nesta Política",
      content: `Podemos atualizar esta Política de Privacidade periodicamente. Quando fizermos alterações significativas, notificaremos você através do site.

Recomendamos que você revise esta página regularmente para se manter informado sobre como protegemos suas informações.

A data da última atualização está indicada no topo desta página.`,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* HERO SECTION */}
      <section className="relative pt-24 pb-16 bg-linear-to-br from-hero-from via-hero-via to-hero-to overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-action-primary/20 mb-6">
              <Lock className="size-8 text-action-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Política de Privacidade
            </h1>
            <p className="text-lg text-white/70">
              Última atualização:{" "}
              {new Date().toLocaleDateString("pt-BR", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl border shadow-lg p-8 md:p-12">
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                A Diana Imóveis está comprometida com a proteção da sua
                privacidade. Esta política descreve como coletamos, usamos e
                protegemos suas informações pessoais quando você utiliza nosso
                site.
              </p>

              {/* Quick highlights */}
              <div className="grid md:grid-cols-3 gap-4 mb-10">
                <div className="bg-action-primary/5 rounded-xl p-4 text-center">
                  <ShieldCheck className="w-8 h-8 text-action-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">Dados Protegidos</p>
                </div>
                <div className="bg-action-primary/5 rounded-xl p-4 text-center">
                  <Heart className="w-8 h-8 text-action-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">Favoritos Locais</p>
                </div>
                <div className="bg-action-primary/5 rounded-xl p-4 text-center">
                  <UserCheck className="w-8 h-8 text-action-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">LGPD</p>
                </div>
              </div>

              <Separator className="my-8" />

              <div className="space-y-10">
                {sections.map((section, index) => (
                  <div key={index} className="group">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 size-12 rounded-xl bg-action-primary/10 flex items-center justify-center group-hover:bg-action-primary transition-colors">
                        <section.icon className="size-6 text-action-primary group-hover:text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold text-foreground mb-3">
                          {section.title}
                        </h2>
                        <div className="text-muted-foreground leading-relaxed whitespace-pre-line prose prose-sm max-w-none">
                          {section.content.split("**").map((part, i) =>
                            i % 2 === 1 ? (
                              <strong key={i} className="text-foreground">
                                {part}
                              </strong>
                            ) : (
                              part
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                    {index < sections.length - 1 && (
                      <Separator className="mt-10" />
                    )}
                  </div>
                ))}
              </div>

              <Separator className="my-10" />

              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  Dúvidas sobre privacidade ou deseja exercer seus direitos?
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-action-primary hover:text-action-primary/80 font-medium transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Fale conosco
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
