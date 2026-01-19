// COMPONENTS
import FeaturedPropertiesCarousel from "@/components/custom/FeaturedPropertiesCarousel";

// SERVICE
import { getFeaturedProperties } from "@/lib/services/properties/properties-query.service";

export default async function HomePage() {
  const featuredProperties = await getFeaturedProperties();

  return <>{/* <FeaturedPropertiesCarousel featuredProperties={} /> */}</>;
}
