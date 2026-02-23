import type { AppointmentType } from "@/types";

export const STEP_LABELS = ["Select Doctor", "Choose Date & Time", "Details", "Review & Confirm"];

export const APPOINTMENT_TYPES: { value: AppointmentType; label: string; desc: string }[] = [
  { value: "CONSULTATION", label: "Consultation", desc: "Initial consultation or new health concern" },
  { value: "FOLLOW_UP", label: "Follow-up", desc: "Follow-up on previous treatment" },
  { value: "CHECKUP", label: "Check-up", desc: "Routine annual health check" },
  { value: "SPECIALIST", label: "Specialist", desc: "Specialist referral appointment" },
  { value: "EMERGENCY", label: "Urgent Care", desc: "Same-day urgent medical care" },
];

export function getAvailableDates(): string[] {
  const dates: string[] = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() !== 0) dates.push(d.toISOString().split("T")[0]);
  }
  return dates.slice(0, 7);
}
