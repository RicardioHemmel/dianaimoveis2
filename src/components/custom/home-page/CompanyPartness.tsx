import { Building2 } from "lucide-react";

const partners = [
  { name: "Even", logo: "/logos-construtora/logo_even.png" },
  { name: "Cyrela", logo: "/logos-construtora/logo_cyrela.png" },
  { name: "Eztec", logo: "/logos-construtora/logo_eztec.png" },
  { name: "Gafisa", logo: "/logos-construtora/logo_gafisa.png" },
  { name: "Tegra", logo: "/logos-construtora/logo_tegra.png" },
  { name: "Vitacon", logo: "/logos-construtora/logo_vitacon.png" },
  { name: "SKR", logo: "/logos-construtora/logo_skr.png" },
  { name: "Lavvi", logo: "/logos-construtora/logo_lavvi.png" },
  { name: "Gamaro", logo: "/logos-construtora/logo_gamaro.png" },
];

export function CompanyPartners() {
  return (
    <section className="py-16 bg-background border-y border-border/30">
      <div className="container mx-auto px-4">

        {/* TÍTULO */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Building2 className="size-5 text-action-primary" />
            <span className="text-action-primary font-semibold uppercase tracking-wider">
              Construtoras Parceiras
            </span>
          </div>
          <p className="text-muted-foreground">
            Trabalhamos com as melhores construtoras do mercado
          </p>
        </div>

        {/* CARROSSEL */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-background to-transparent z-10" />

          <div className="flex animate-horizontal-infinity-scroll hover:paused">
            {[...partners, ...partners].map((partner, index) => (
              <div key={index} className="mx-8 group">
                <div
                  className="size-26 rounded-2xl bg-muted/50 border border-border/50
                  flex flex-col items-center justify-center gap-2
                  group-hover:border-action-primary/50
                  group-hover:bg-gradient-to-br
                  group-hover:from-action-primary/10
                  group-hover:to-transparent
                  transition-all duration-300"
                >
                  {/* LOGO PROPORCIONAL */}
                  <div className="h-[60px] max-w-[72px] flex items-center justify-center">
                    <img
                      src={partner.logo}
                      alt={`Logo ${partner.name}`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* NOME */}
                  <span className="text-xs text-text-title/80 group-hover:text-action-primary transition-colors">
                    {partner.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
