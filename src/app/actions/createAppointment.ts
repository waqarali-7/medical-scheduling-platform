"use server";

import { revalidatePath } from "next/cache";
import { createAppointment as createAppointmentInDB } from "@/lib/supabase/data";
import type { Appointment } from "@/types";

export async function createAppointment(formData: Partial<Appointment>) {
  try {
    const appointment = await createAppointmentInDB(formData as Appointment);

    revalidatePath("/appointments");
    revalidatePath(`/appointments/${appointment.id}`);

    return {
      success: true,
      data: appointment,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : "Failed to create appointment",
    };
  }
}
