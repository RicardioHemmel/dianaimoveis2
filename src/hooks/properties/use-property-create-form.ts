// React | Next
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// Form control
import { zodResolver } from "@hookform/resolvers/zod";
import {
  propertySchema,
  PropertyFormData,
} from "@/lib/schemas/property/property.schema";

export default function usePropertyCreateForm() {
  // Form manager
  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
  });

  return {};
}
