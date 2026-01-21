import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80",
    neighborhood: "São Paulo",
    title: "155 Jerônimo",
    price: "R$ 3.400.000,00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80",
    neighborhood: "Brooklin",
    title: "Villa Madalena",
    price: "R$ 2.850.000,00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
    neighborhood: "Moema",
    title: "Residencial Aurora",
    price: "R$ 4.200.000,00",
  },
];

const HomeHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="absolute bottom-24 left-8 md:left-16 z-10">
        <div className="bg-primary/90 backdrop-blur-sm text-primary-foreground p-6 rounded-lg max-w-sm">
          <p className="text-sm text-secondary mb-1">
            {slides[currentSlide].neighborhood}
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
            {slides[currentSlide].title}
          </h2>
          <p className="text-lg">
            a partir de{" "}
            <span className="font-semibold text-secondary">
              {slides[currentSlide].price}
            </span>
          </p>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/20 hover:bg-background/40 text-primary-foreground h-12 w-12"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/20 hover:bg-background/40 text-primary-foreground h-12 w-12"
        onClick={nextSlide}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide
                ? "bg-secondary w-6"
                : "bg-primary-foreground/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HomeHero;
