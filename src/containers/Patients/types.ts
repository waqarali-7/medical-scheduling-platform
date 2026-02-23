/**
 * Patients container types.
 */

import type { Appointment, Patient } from "@/types";

export interface PatientListProps {
  patients: Patient[];
  appointments: Appointment[];
}

export interface PatientCardProps {
  patient: Patient;
  appointmentCount: number;
  lastAppointmentStatus?: Appointment["status"];
}
