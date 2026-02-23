import { Clinic, Doctor } from "@/types";

export interface OpeningHour {
  isOpen: boolean;
  from?: string;
  to?: string;
}

export type Day = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

export interface HeaderProps {
  clinic: Clinic;
}

export interface StatusBannerProps {
  todayHours: OpeningHour;
}

export interface DoctorsListProps {
  doctors: Doctor[];
}

export interface SpecializationsProps {
  specializations: string[];
}

export interface OpeningHoursProps {
  openingHours: Record<Day, OpeningHour>;
  today: Day;
}

export interface ClinicDetailProps {
  clinic: Clinic;
  doctors: Doctor[];
}
