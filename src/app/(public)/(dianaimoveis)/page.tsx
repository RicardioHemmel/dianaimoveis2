// COMPONENTS
import FeaturedPropertiesCarousel from "@/components/custom/home-page/FeaturedPropertiesCarousel";
import PropertyListing from "@/components/custom/home-page/PropertyCardListing";
import PropertyQuickSearchBar from "@/components/custom/home-page/PropertyQuickSearchBar";
import { CompanyPartners } from "@/components/custom/home-page/CompanyPartness";

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
      <CompanyPartners />
    </>
  );
}
