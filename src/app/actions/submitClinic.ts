"use server";

import { revalidatePath } from "next/cache";
import { createClinic } from "@/lib/supabase/data";
import type { Clinic } from "@/types";

export async function submitClinic(formData: {
  name: string;
  phone: string;
  email: string;
  website?: string;
  street: string;
  postalCode: string;
  city: string;
  state: string;
  openingHours: Clinic["openingHours"];
  specializations: string[];
}) {
  try {
    const clinic = await createClinic(formData);

    revalidatePath("/clinics");
    revalidatePath(`/clinics/${clinic.id}`);

    return {
      success: true,
      data: clinic,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : "Failed to create clinic",
    };
  }
}
