// COMPONENTS
import FeaturedPropertiesCarousel from "@/components/custom/homePage/FeaturedPropertiesCarousel";
import PropertyListing from "@/components/custom/homePage/PropertyListing";
import PropertyQuickSearchBar from "@/components/custom/homePage/PropertyQuickSearchBar";

// QUERIES
import { getFeaturedProperties } from "@/lib/services/properties/queries/properties-query.service";
import { getStudios } from "@/lib/services/properties/queries/home/get-studios.service";

export default async function HomePage() {
  const featuredProperties = await getFeaturedProperties();
  const studioProperties = await getStudios();

  return (
    <>
      <FeaturedPropertiesCarousel properties={featuredProperties} />
      <PropertyQuickSearchBar />
      <PropertyListing properties={studioProperties} />
    </>
  );
}
