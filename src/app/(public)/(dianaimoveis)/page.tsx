// COMPONENTS
import { FeaturedPropertiesCarousel } from "@/components/custom/home-page/FeaturedPropertiesCarousel";
import { PropertyListingStudiosCarousel } from "@/components/custom/home-page/PropertyListingStudiosCarousel";
import { PropertyListingGrid } from "@/components/custom/home-page/PropertyListingGrid";
import { PropertyQuickSearchBar } from "@/components/custom/home-page/PropertyQuickSearchBar";
import { HomeCallToAction } from "@/components/custom/home-page/CallToAction";
import { CompanyPartners } from "@/components/custom/home-page/CompanyPartness";
import { NeighborhoodsSection } from "@/components/custom/home-page/NeighborhoodsFilter";

// QUERIES
import {
  getStudios,
  getFeaturedProperties,
  getAllProperties,
} from "@/lib/services/properties/queries/homePage/query.service";

export default async function HomePage() {
  const featuredProperties = await getFeaturedProperties();
  const studioProperties = await getStudios();
  const allProperties = await getAllProperties(1, 12);

  return (
    <>
      <FeaturedPropertiesCarousel properties={featuredProperties} />
      <PropertyQuickSearchBar />
      <PropertyListingStudiosCarousel properties={studioProperties} />
      <NeighborhoodsSection />
      <CompanyPartners />
      <HomeCallToAction />
      <PropertyListingGrid properties={allProperties} />
    </>
  );
}
