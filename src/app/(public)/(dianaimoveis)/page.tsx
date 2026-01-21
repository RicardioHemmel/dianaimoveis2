// COMPONENTS
import { FeaturedPropertiesCarousel } from "@/components/custom/home-page/FeaturedPropertiesCarousel";
import { PropertyListingStudiosCarousel } from "@/components/custom/home-page/PropertyListingStudiosCarousel";
import { PropertyListingGrid } from "@/components/custom/home-page/PropertyListingGrid";
import { PropertyQuickSearchBar } from "@/components/custom/home-page/PropertyQuickSearchBar";
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
      <PropertyListingStudiosCarousel properties={studioProperties} />
      <CompanyPartners />
      <PropertyListingGrid properties={studioProperties} />
    </>
  );
}
