import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { FileText, Shield, Users, Database, Mail, Scale } from "lucide-react";

export default function TermsPage() {
  const sections = [
    {
      icon: FileText,
      title: "1. Aceitação dos Termos",
      content: `Ao acessar e utilizar este site, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso. Se você não concordar com qualquer parte destes termos, não deverá utilizar nossos serviços.

O uso continuado do site após quaisquer alterações nos termos constitui sua aceitação dessas mudanças.`,
    },
    {
      icon: Users,
      title: "2. Uso do Site",
      content: `Este site destina-se exclusivamente à apresentação de imóveis para venda e locação, bem como serviços de consultoria imobiliária. Você concorda em:

• Utilizar o site apenas para fins legais e de acordo com estes termos
• Não reproduzir, duplicar ou explorar comercialmente qualquer conteúdo sem autorização
• Fornecer informações verdadeiras e precisas nos formulários de contato
• Não utilizar o site de forma que possa danificar, desabilitar ou sobrecarregar nossos servidores`,
    },
    {
      icon: Database,
      title: "3. Conteúdo e Propriedade Intelectual",
      content: `Todo o conteúdo presente neste site, incluindo textos, imagens, logotipos, fotografias de imóveis e design, são protegidos por direitos autorais e pertencem à Diana Imóveis ou seus respectivos proprietários.

As fotografias dos imóveis são meramente ilustrativas e podem não representar o estado atual do imóvel. Recomendamos sempre uma visita presencial antes de qualquer decisão.`,
    },
    {
      icon: Shield,
      title: "4. Limitação de Responsabilidade",
      content: `A Diana Imóveis não garante que:

• As informações sobre os imóveis estejam sempre atualizadas ou livres de erros
• O site estará disponível de forma ininterrupta ou livre de vírus
• Os resultados obtidos pelo uso do site serão precisos ou confiáveis

Não nos responsabilizamos por decisões tomadas com base nas informações do site sem verificação prévia junto à nossa equipe.`,
    },
    {
      icon: Mail,
      title: "5. Comunicações",
      content: `Ao enviar seus dados através dos formulários de contato, você autoriza a Diana Imóveis a entrar em contato por telefone, e-mail ou WhatsApp para:

• Responder às suas solicitações
• Enviar informações sobre imóveis compatíveis com seu interesse
• Comunicar novidades e lançamentos

Você pode cancelar o recebimento de comunicações a qualquer momento entrando em contato conosco.`,
    },
    {
      icon: Scale,
      title: "6. Legislação Aplicável",
      content: `Estes termos são regidos pelas leis da República Federativa do Brasil. Qualquer disputa relacionada a estes termos será submetida ao foro da comarca de São Paulo/SP, com exclusão de qualquer outro, por mais privilegiado que seja.

Para dúvidas sobre estes termos, entre em contato através da nossa página de contato.`,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-linear-to-br from-hero-from via-hero-via to-hero-to overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-action-primary/20 mb-6">
              <FileText className="w-8 h-8 text-action-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Termos de Uso
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

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl border shadow-lg p-8 md:p-12">
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Bem-vindo ao site da Diana Imóveis. Estes Termos de Uso regulam
                o acesso e a utilização deste site e dos serviços oferecidos.
                Por favor, leia atentamente antes de continuar navegando.
              </p>

              <Separator className="my-8" />

              <div className="space-y-10">
                {sections.map((section, index) => (
                  <div key={index} className="group">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 size-12 rounded-xl bg-action-primary/10 flex items-center justify-center group-hover:bg-action-primary/20 transition-colors">
                        <section.icon className="w-6 h-6 text-action-primary" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold text-foreground mb-3">
                          {section.title}
                        </h2>
                        <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                          {section.content}
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
                  Tem dúvidas sobre nossos termos?
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-action-primary hover:text-action-primary/80 font-medium transition-colors"
                >
                  <Mail className="size-4" />
                  Entre em contato conosco
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
