import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { AppointmentStatus, AppointmentType } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── State Machine ────────────────────────────────────────────────────────────
const TRANSITIONS: Record<AppointmentStatus, AppointmentStatus[]> = {
  PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["COMPLETED", "CANCELLED", "NO_SHOW"],
  CANCELLED: [],
  COMPLETED: [],
  NO_SHOW: [],
};

export function canTransition(from: AppointmentStatus, to: AppointmentStatus): boolean {
  return TRANSITIONS[from]?.includes(to) ?? false;
}

export function getAvailableTransitions(status: AppointmentStatus): AppointmentStatus[] {
  return TRANSITIONS[status] ?? [];
}

// ─── Status Styling ───────────────────────────────────────────────────────────
export const STATUS_CONFIG: Record<
  AppointmentStatus,
  {
    label: string;
    color: string;
    bgColor: string;
    textColor: string;
    dotColor: string;
    description: string;
  }
> = {
  PENDING: {
    label: "Pending",
    color: "amber",
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
    dotColor: "bg-amber-500",
    description: "Awaiting confirmation from the provider",
  },
  CONFIRMED: {
    label: "Confirmed",
    color: "emerald",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-700",
    dotColor: "bg-emerald-500",
    description: "Appointment is confirmed",
  },
  CANCELLED: {
    label: "Cancelled",
    color: "red",
    bgColor: "bg-red-50",
    textColor: "text-red-700",
    dotColor: "bg-red-500",
    description: "Appointment has been cancelled",
  },
  COMPLETED: {
    label: "Completed",
    color: "blue",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    dotColor: "bg-blue-500",
    description: "Appointment was completed successfully",
  },
  NO_SHOW: {
    label: "No Show",
    color: "gray",
    bgColor: "bg-gray-100",
    textColor: "text-gray-600",
    dotColor: "bg-gray-400",
    description: "Patient did not attend the appointment",
  },
};

export const TYPE_CONFIG: Record<AppointmentType, { label: string; icon: string; color: string }> = {
  CONSULTATION: {
    label: "Consultation",
    icon: "Stethoscope",
    color: "text-blue-600",
  },
  FOLLOW_UP: {
    label: "Follow-up",
    icon: "RefreshCw",
    color: "text-purple-600",
  },
  EMERGENCY: {
    label: "Emergency",
    icon: "AlertTriangle",
    color: "text-red-600",
  },
  CHECKUP: {
    label: "Check-up",
    icon: "ClipboardCheck",
    color: "text-green-600",
  },
  SPECIALIST: {
    label: "Specialist",
    icon: "UserCheck",
    color: "text-teal-600",
  },
};

// ─── Date & Time (Europe/Berlin) ─────────────────────────────────────────────
export function formatDateBerlin(isoString: string): string {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Europe/Berlin",
  }).format(new Date(isoString));
}

export function formatTimeBerlin(isoString: string): string {
  return new Intl.DateTimeFormat("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Berlin",
    hour12: false,
  }).format(new Date(isoString));
}

export function formatDateTimeBerlin(isoString: string): string {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Berlin",
    hour12: false,
  }).format(new Date(isoString));
}

export function formatRelativeDate(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays === -1) return "Yesterday";
  if (diffDays > 0 && diffDays <= 7) return `In ${diffDays} days`;
  if (diffDays < 0 && diffDays >= -7) return `${Math.abs(diffDays)} days ago`;
  return formatDateBerlin(isoString);
}

export function isToday(isoString: string): boolean {
  const date = new Date(isoString);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function isFuture(isoString: string): boolean {
  return new Date(isoString) > new Date();
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

// ─── String Helpers ───────────────────────────────────────────────────────────
export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export function formatFullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}

export function formatCurrency(amount: number, currency = "EUR"): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency,
  }).format(amount);
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}
