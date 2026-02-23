import { Clinic, Doctor } from "@/types";

export interface ClinicCardProps {
  clinic: Clinic;
  doctors: Doctor[];
}

export interface ClinicsListProps {
  clinics: Clinic[];
  doctors: Doctor[];
}
