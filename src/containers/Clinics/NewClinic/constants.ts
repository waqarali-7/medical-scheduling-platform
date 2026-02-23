export const STEP_LABELS = ["Basic Info", "Location", "Opening Hours", "Specializations", "Review"];

export const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const;

export const DAY_LABELS: Record<(typeof DAYS)[number], string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

export const SPECIALIZATION_OPTIONS = [
  "Cardiology",
  "Neurology",
  "Dermatology",
  "Pediatrics",
  "Orthopedics",
  "Psychiatry",
  "General Medicine",
  "Gynecology",
  "Ophthalmology",
  "Dentistry",
  "ENT (Ear, Nose, Throat)",
  "Urology",
];

export const DEFAULT_OPENING_HOURS = {
  monday: { isOpen: true, from: "09:00", to: "17:00" },
  tuesday: { isOpen: true, from: "09:00", to: "17:00" },
  wednesday: { isOpen: true, from: "09:00", to: "17:00" },
  thursday: { isOpen: true, from: "09:00", to: "17:00" },
  friday: { isOpen: true, from: "09:00", to: "17:00" },
  saturday: { isOpen: false, from: "", to: "" },
  sunday: { isOpen: false, from: "", to: "" },
};
