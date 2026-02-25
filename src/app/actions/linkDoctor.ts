"use server";

import { revalidatePath } from "next/cache";
import { linkDoctorToClinic, unlinkDoctorFromClinic } from "@/lib/supabase/data";

export async function linkDoctor(doctorId: string, clinicId: string) {
  try {
    await linkDoctorToClinic(doctorId, clinicId);

    revalidatePath("/clinics");
    revalidatePath(`/clinics/${clinicId}`);
    revalidatePath("/doctors");
    revalidatePath(`/doctors/${doctorId}`);

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to link doctor",
    };
  }
}

export async function unlinkDoctor(doctorId: string, clinicId: string) {
  try {
    await unlinkDoctorFromClinic(doctorId);

    // Revalidate relevant pages
    revalidatePath("/clinics");
    revalidatePath(`/clinics/${clinicId}`);
    revalidatePath("/doctors");
    revalidatePath(`/doctors/${doctorId}`);

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to unlink doctor",
    };
  }
}
