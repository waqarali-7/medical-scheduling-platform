import type { Clinic } from "@/types";

export interface NewClinicFormData {
  // Basic Info
  name: string;
  phone: string;
  email: string;
  website: string;

  // Location
  street: string;
  postalCode: string;
  city: string;
  state: string;

  // Opening Hours
  openingHours: Clinic["openingHours"];

  // Specializations
  specializations: string[];
}

export interface BasicInfoStepProps {
  formData: Pick<NewClinicFormData, "name" | "phone" | "email" | "website">;
  onChange: (field: keyof NewClinicFormData, value: string) => void;
}

export interface LocationStepProps {
  formData: Pick<NewClinicFormData, "street" | "postalCode" | "city" | "state">;
  onChange: (field: keyof NewClinicFormData, value: string) => void;
}

export interface OpeningHoursStepProps {
  openingHours: Clinic["openingHours"];
  onChange: (hours: Clinic["openingHours"]) => void;
}

export interface SpecializationsStepProps {
  specializations: string[];
  onChange: (specs: string[]) => void;
}

export interface ReviewStepProps {
  formData: NewClinicFormData;
}
