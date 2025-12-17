import PropertyFormShell from "@/components/ui-custom/private/property-form/PropertyFormShell";
import { getPropertyById } from "@/lib/server/properties/get-property-by-id";
import { notFound } from "next/navigation";

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const property = await getPropertyById(id);
  console.log(property)

  if (!property) {
    notFound();
  }

  return <PropertyFormShell mode="edit" initialData={property}/>
}
