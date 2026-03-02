import type { Appointment, AppointmentStatus, AppointmentType, UserRole } from "@/types";

export interface AppointmentCardProps {
  appointment: Appointment;
  view?: "patient" | "doctor" | "admin";
  compact?: boolean;
}

export interface AppointmentsHeaderProps {
  totalCount: number;
  confirmedCount: number;
  userRole?: UserRole;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export interface FilterDropdownsProps {
  activeType: AppointmentType | "ALL";
  onTypeChange: (type: AppointmentType | "ALL") => void;
  sortBy: "date" | "status";
  onSortChange: (sort: "date" | "status") => void;
}

export interface StatusTabsProps {
  activeStatus: AppointmentStatus | "ALL";
  onStatusChange: (status: AppointmentStatus | "ALL") => void;
  counts: Record<string, number>;
}

export interface FiltersCardProps {
  search: string;
  onSearchChange: (value: string) => void;
  activeType: AppointmentType | "ALL";
  onTypeChange: (type: AppointmentType | "ALL") => void;
  sortBy: "date" | "status";
  onSortChange: (sort: "date" | "status") => void;
  activeStatus: AppointmentStatus | "ALL";
  onStatusChange: (status: AppointmentStatus | "ALL") => void;
  counts: Record<string, number>;
}
