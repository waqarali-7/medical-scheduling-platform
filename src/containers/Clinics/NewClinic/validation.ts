import type { NewClinicFormData } from "./types";

export function validateStep1(formData: NewClinicFormData): boolean {
  return (
    formData.name.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.email.trim() !== "" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
  );
}

export function validateStep2(formData: NewClinicFormData): boolean {
  return (
    formData.street.trim() !== "" &&
    formData.postalCode.trim() !== "" &&
    formData.city.trim() !== "" &&
    formData.state.trim() !== ""
  );
}

export function validateStep3(formData: NewClinicFormData): boolean {
  return Object.values(formData.openingHours).some((hours) => hours.isOpen);
}

export function validateStep4(formData: NewClinicFormData): boolean {
  return formData.specializations.length > 0;
}
