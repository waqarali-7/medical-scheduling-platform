"use client";

import { Chip } from "@mui/material";
import type { AppointmentStatus, AppointmentType } from "@/types";

// Status Badge
export interface StatusBadgeProps {
  status: AppointmentStatus;
  size?: "small" | "medium";
}

const STATUS_CONFIG: Record<
  AppointmentStatus,
  { label: string; color: "default" | "primary" | "secondary" | "error" | "warning" | "info" | "success" }
> = {
  PENDING: { label: "Pending", color: "warning" },
  CONFIRMED: { label: "Confirmed", color: "success" },
  CANCELLED: { label: "Cancelled", color: "error" },
  COMPLETED: { label: "Completed", color: "info" },
  NO_SHOW: { label: "No Show", color: "default" },
};

export function StatusBadge({ status, size = "small" }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <Chip
      label={config.label}
      color={config.color}
      size={size}
      sx={{
        fontWeight: 600,
        borderRadius: "8px",
      }}
    />
  );
}

// Type Badge
export interface TypeBadgeProps {
  type: AppointmentType;
}

export function TypeBadge({ type }: TypeBadgeProps) {
  const labels: Record<AppointmentType, string> = {
    CONSULTATION: "Consultation",
    FOLLOW_UP: "Follow-up",
    EMERGENCY: "Emergency",
    CHECKUP: "Check-up",
    SPECIALIST: "Specialist",
  };

  return (
    <Chip
      label={labels[type]}
      variant="outlined"
      size="small"
      sx={{
        borderRadius: "6px",
        fontSize: "0.75rem",
      }}
    />
  );
}
