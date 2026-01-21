import { Building2 } from "lucide-react";

const partners = [
  { name: "Cyrela", logo: "C" },
  { name: "Eztec", logo: "E" },
  { name: "Gafisa", logo: "G" },
  { name: "Even", logo: "E" },
  { name: "Tegra", logo: "T" },
  { name: "Vitacon", logo: "V" },
  { name: "SKR", logo: "S" },
  { name: "Lavvi", logo: "L" },
  { name: "Gamaro", logo: "G" },
];

export function CompanyPartners() {
  return (
    <section className="py-16 bg-background border-y border-border/30">
      <div className="container mx-auto px-4">
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

        <div className="relative overflow-hidden">
          {/* GRADIENT MASKS */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-background to-transparent z-10" />

          {/* INFINITE SCROLL ANIMATION */}
          <div className="flex animate-horizontal-infinity-scroll hover:paused">
            {/* DOUBLE THE ITEMS FOR SEAMLESS LOOP */}
            {[...partners, ...partners].map((partner, index) => (
              <div key={index} className="mx-8 group">
                <div className="size-26 rounded-2xl bg-muted/50 border border-border/50 flex flex-col items-center justify-center gap-2 group-hover:border-action-primary/50 group-hover:bg-gradient-to-br group-hover:from-action-primary/10 group-hover:to-transparent transition-all duration-300">
                  <span className="text-3xl font-display font-bold text-text-title/80 group-hover:text-action-primary transition-colors">
                    {partner.logo}
                  </span>
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
