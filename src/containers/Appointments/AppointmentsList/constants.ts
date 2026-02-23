import { AppointmentStatus, AppointmentType } from "@/types";

export const TYPE_FILTERS: { label: string; value: AppointmentType | "ALL" }[] = [
  { label: "All Types", value: "ALL" },
  { label: "Consultation", value: "CONSULTATION" },
  { label: "Follow-up", value: "FOLLOW_UP" },
  { label: "Check-up", value: "CHECKUP" },
  { label: "Specialist", value: "SPECIALIST" },
  { label: "Emergency", value: "EMERGENCY" },
];

export const STATUS_TABS: { label: string; value: AppointmentStatus | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" },
  { label: "No Show", value: "NO_SHOW" },
];
