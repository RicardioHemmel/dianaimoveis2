"use client";

// NEXT / REACT
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

// ICONS
import { Building2, ExternalLink } from "lucide-react";

// COMPONENTS
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";

// ANIMATION INSIDE DE CAROUSEL
import { motion } from "framer-motion";

// SCHEMA
import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";

// FORMATTERS
import { showCoverImage } from "@/lib/formatters/ui-formatters/show-cover-image";
import { formattedPrice } from "@/lib/formatters/ui-formatters/price-BRL";

export function FeaturedPropertiesCarousel({
  properties,
}: {
  properties: PropertyViewSchema[];
}) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>(); // GIVES CAROUSEL ITS MECHANICS
  const [currentSlide, setCurrentSlide] = useState(0);
  const [count, setCount] = useState(0);
  const autoplay = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  useEffect(() => {
    if (!carouselApi) return;

    setCount(carouselApi.scrollSnapList().length);
    setCurrentSlide(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrentSlide(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  return (
    <div className="relative w-full">
      {properties.length > 0 ? (
        <>
          <Carousel
            setApi={setCarouselApi}
            className="w-full"
            opts={{ loop: true }}
            plugins={[autoplay.current]}
          >
            <CarouselContent>
              {properties.map((property, index) => (
                <CarouselItem key={index} className="w-full">
                  <Card className="h-[510px] sm:h-[720px] lg:h-[635px] 2xl:h-[750px] w-full p-0 border-none">
                    <CardContent className="h-full w-full flex items-center justify-center p-0 m-0">
                      <Link
                        className="relative w-full h-full"
                        key={property._id}
                        href={`/property/${property._id}`}
                      >
                        {property.gallery.length > 0 ? (
                          <Image
                            alt="Foto capa do imóvel destaque"
                            fill
                            className="object-cover"
                            src={showCoverImage(property.gallery)}
                            priority
                            sizes="100vw"
                            quality={75}
                          />
                        ) : (
                          <div className="h-[510px] sm:h-[720px] lg:h-[635px] 2xl:h-[750px] w-full flex justify-center items-center bg-black/90">
                            <div className="flex flex-col justify-center gap-4 text-white">
                              <Building2
                                size={64}
                                className="opacity-70 mx-auto"
                              />
                              <p className="text-lg opacity-80">Sem imagem</p>
                            </div>
                          </div>
                        )}
                        <div className="w-full h-full flex items-end justify-center 2xl:justify-start">
                          <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="
                          flex justify-center
                      bg-black/80 text-white rounded-2xl z-10
                      w-fit h-fit py-4 px-6  ml-0 mb-8                
                      min-w-[310px] min-h-[80px] 
                      sm:min-w-[280px] sm:min-h-[110px] sm:py-3 
                      md:min-w-[370px] md:min-h-[115px] 
                      lg:mb-16 lg:py-3 lg:px-4
                      2xl:min-w-[380px] 2xl:min-h-[150px] 2xl:mb-24 2xl:ml-20"
                          >
                            <div className="min-w-fit min-h-fit w-5/6 flex flex-col items-start justify-center md:gap-1">
                              <div className="w-full flex justify-between relative">
                                <p className="text-[13px] sm:text-[16px] 2xl:text-[20px] font-light">
                                  {property?.address?.city}
                                </p>
                                <ExternalLink className="absolute right-0 w-5 sm:w-14" />
                              </div>
                              <h2 className="text-[16px] sm:text-[21px] 2xl:text-3xl font-semibold">
                                {property.title}
                              </h2>
                              <p className="text-[13px] sm:text-[18px] 2xl:text-[19px] font-normal mt-1 md:mt-0">
                                A partir de {formattedPrice(property.price)}
                              </p>
                            </div>
                          </motion.div>
                        </div>
                        <div className="absolute inset-0 bg-linear-to-t from-hero-bg/80 via-hero-bg/20 to-transparent" />
                      </Link>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* CAROUSEL NAVIGATION BUTTONS */}
            <CarouselPrevious className="hidden sm:flex absolute left-0 md:left-4 top-1/2 -translate-y-1/2 h-full w-24" />
            <CarouselNext className="hidden sm:flex absolute right-0 md:right-4 top-1/2 -translate-y-1/2 h-full w-24" />
          </Carousel>
        </>
      ) : (
        <div className="h-[510px] sm:h-[720px] lg:h-[635px] 2xl:h-[750px] w-full flex justify-center items-center bg-black/90">
          <div className="flex flex-col justify-center gap-4 text-white">
            <Building2 size={64} className="opacity-70 mx-auto" />
            <p className="text-lg opacity-80">Nenhuma imóvel destacado</p>
          </div>
        </div>
      )}
    </div>
  );
}
