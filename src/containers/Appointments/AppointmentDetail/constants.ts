import { AppointmentStatus } from "@/types";
import { CheckCircle, Cancel, Warning } from "@/lib/mui/icons";

export const STATE_ORDER: AppointmentStatus[] = ["PENDING", "CONFIRMED", "COMPLETED"];

export const TRANSITION_LABELS: Record<AppointmentStatus, string> = {
  CONFIRMED: "Confirm Appointment",
  CANCELLED: "Cancel Appointment",
  COMPLETED: "Mark as Completed",
  NO_SHOW: "Mark as No-Show",
  PENDING: "Reset to Pending",
};

export const TRANSITION_ICONS: Partial<Record<AppointmentStatus, React.ComponentType>> = {
  CONFIRMED: CheckCircle,
  CANCELLED: Cancel,
  COMPLETED: CheckCircle,
  NO_SHOW: Warning,
};

export const TRANSITION_COLORS: Partial<Record<AppointmentStatus, "success" | "error" | "primary" | "default">> = {
  CONFIRMED: "success",
  CANCELLED: "error",
  COMPLETED: "primary",
  NO_SHOW: "default",
};
