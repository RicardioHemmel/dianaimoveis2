export default function PropertyDescription() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title text-center mb-8">Descrição</h2>

          <div className="glass-card p-8 md:p-12">
            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
              Um lugar privilegiado, com espaços diferenciados, em uma das
              regiões mais desejadas da cidade. O{" "}
              <span className="text-foreground font-medium">
                Very Faria Lima
              </span>{" "}
              é um empreendimento pensado para quem valoriza qualidade de vida,
              praticidade e sofisticação.
            </p>

            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
              Com localização estratégica na Vila Olímpia, você terá acesso
              fácil às principais vias da cidade, além de estar cercado por
              opções de gastronomia, cultura e entretenimento. O projeto
              arquitetônico contemporâneo foi desenvolvido para maximizar a
              entrada de luz natural e proporcionar vistas privilegiadas da
              cidade.
            </p>

            <p className="text-muted-foreground leading-relaxed text-lg">
              O empreendimento conta com uma infraestrutura completa de lazer e
              serviços, incluindo concierge, delivery room, coworking e muito
              mais. Tudo pensado para facilitar sua rotina e proporcionar
              momentos de relaxamento sem sair de casa.
            </p>

            <div className="mt-8 pt-8 border-t border-border">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="font-display text-3xl font-bold text-gradient-gold">
                    28
                  </p>
                  <p className="text-muted-foreground text-sm">Andares</p>
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-gradient-gold">
                    196
                  </p>
                  <p className="text-muted-foreground text-sm">Unidades</p>
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-gradient-gold">
                    4
                  </p>
                  <p className="text-muted-foreground text-sm">Torres</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
