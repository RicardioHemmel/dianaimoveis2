// COMPONENTS
import FeaturedPropertiesCarousel from "@/components/custom/homePage/FeaturedPropertiesCarousel";
import PropertyListing from "@/components/custom/homePage/PropertyListing";
import PropertyQuickSearchBar from "@/components/custom/homePage/PropertyQuickSearchBar";

// SERVICE
import {
  getFeaturedProperties,
  getAllPropertiesToView,
} from "@/lib/services/properties/properties-query.service";

export default async function HomePage() {
  const featuredProperties = await getFeaturedProperties();
  const properties = await getAllPropertiesToView();

  return (
    <>
      <FeaturedPropertiesCarousel featuredProperties={featuredProperties} />
      <PropertyQuickSearchBar />
      <PropertyListing properties={properties} />
    </>
  );
}
