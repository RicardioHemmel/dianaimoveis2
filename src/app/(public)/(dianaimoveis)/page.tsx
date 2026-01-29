// COMPONENTS
import { FeaturedPropertiesCarousel } from "@/components/custom/home-page/FeaturedPropertiesCarousel";
import { PropertyListingStudiosCarousel } from "@/components/custom/home-page/PropertyListingStudiosCarousel";
import { PropertyListingHighEndCarousel } from "@/components/custom/home-page/PropertyListingHighEndCarousel";
import { PropertyListingGrid } from "@/components/custom/home-page/PropertyListingGrid";
import { PropertyQuickSearchBar } from "@/components/custom/home-page/PropertyQuickSearchBar";
import { HomeCallToAction } from "@/components/custom/home-page/CallToAction";
import { CompanyPartners } from "@/components/custom/home-page/CompanyPartness";
import { NeighborhoodsSection } from "@/components/custom/home-page/NeighborhoodsFilter";

// QUERIES
import {
  getStudios,
  getHighEnd,
  getFeaturedProperties,
  getAllProperties,
} from "@/lib/services/properties/queries/homePage/query.service";

export default async function HomePage() {
  const featuredProperties = await getFeaturedProperties();
  const studioProperties = await getStudios();
  const highEndProperties = await getHighEnd();
  const allProperties = await getAllProperties(1, 12);

  return (
    <>
      <FeaturedPropertiesCarousel properties={featuredProperties} />
      <PropertyQuickSearchBar />
      <PropertyListingHighEndCarousel properties={highEndProperties} />
      <NeighborhoodsSection />
      <PropertyListingStudiosCarousel properties={studioProperties} />
      <CompanyPartners />
      <HomeCallToAction />
      <PropertyListingGrid properties={allProperties} />
    </>
  );
}
