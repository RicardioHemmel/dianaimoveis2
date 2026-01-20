"use client";

// NEXT / REACT
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// ICONS
import { ExternalLink } from "lucide-react";

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

// ANIMATION INSIDE DE CAROUSEL
import { motion } from "framer-motion";
import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";
import { showCoverImage } from "@/lib/formatters/ui-formatters/showCoverImage";
import { formattedPrice } from "@/lib/formatters/ui-formatters/price-BRL";

export default function FeaturedPropertiesCarousel({
  properties,
}: {
  properties: PropertyViewSchema[];
}) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>(); // Gives carousel its mechanics
  const [currentSlide, setCurrentSlide] = useState(0);
  const [count, setCount] = useState(0);

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
      <Carousel
        setApi={setCarouselApi}
        className="w-full"
        opts={{ loop: true }}
      >
        <CarouselContent>
          {properties.length > 0 ? (
            properties.map((property, index) => (
              <CarouselItem key={index} className="w-full">
                <Card className="h-[310px] sm:h-[470px] lg:h-[635px] 2xl:h-[750px] w-full p-0 border-none">
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
                        />
                      ) : (
                        <Image
                          alt="Message Banner"
                          fill
                          src="/templates/default/bannerMessage2.jpg"
                        />
                      )}
                      <div className="w-full h-full flex items-end justify-center lg:justify-start">
                        <motion.div
                          key={currentSlide}
                          initial={{ opacity: 0, y: 100 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="
                          flex justify-center
                      bg-black/80 text-white rounded-2xl 
                      w-fit h-fit py-2 px-6 sm:py-3 lg:px-10 lg:py-5 z-10 ml-0 mb-4 lg:mb-8 lg:ml-10 2xl:mb-14 2xl:ml-20               
                      min-w-[210px] min-h-20 sm:min-w-[280px] sm:min-h-[110px] md:min-w-[340px] md:min-h-[110px] lg:min-w-[380px] lg:min-h-[150px]"
                        >
                          <div className="min-w-fit min-h-fit w-4/5 flex flex-col items-start justify-center md:gap-1">
                            <div className="w-full flex justify-between relative">
                              <p className="text-[13px] sm:text-[15px] md:text-[20px] font-light">
                                {property?.address?.city}
                              </p>
                              <ExternalLink className="absolute right-0 w-5 sm:w-15" />
                            </div>
                            <h2 className="text-[16px] sm:text-[21px] lg:text-3xl font-semibold">
                              {property.title}
                            </h2>
                            <p className="text-[13px] sm:text-[18px] lg:text-[19px] font-normal mt-1 md:mt-0">
                              A partir de {formattedPrice(property.price)}
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))
          ) : (
            <CarouselItem>
              <Card className="h-[310px] sm:h-[470px] lg:h-[635px] 2xl:h-[750px] w-full p-0 border-none">
                <CardContent className="h-full w-full flex items-center justify-center p-0 m-0">
                  <Image
                    alt="Message Banner"
                    fill
                    src="/templates/default/bannerMessage.jpg"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          )}
        </CarouselContent>

        {/* navigation buttons inside carousel */}
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
      </Carousel>
    </div>
  );
}
