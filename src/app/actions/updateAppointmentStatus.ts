"use server";

import { revalidatePath } from "next/cache";
import { updateAppointmentStatus as updateAppointmentStatusInDB } from "@/lib/supabase/data";
import type { AppointmentStatus } from "@/types";

export async function updateAppointmentStatus(id: string, status: AppointmentStatus) {
  try {
    const appointment = await updateAppointmentStatusInDB(id, status);

    revalidatePath("/appointments");
    revalidatePath(`/appointments/${id}`);

    return {
      success: true,
      data: appointment,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : "Failed to update appointment",
    };
  }
}
