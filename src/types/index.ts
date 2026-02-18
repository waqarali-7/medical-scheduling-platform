// ─── Appointment State Machine ────────────────────────────────────────────────
export type AppointmentStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED" | "NO_SHOW";

export type AppointmentType = "CONSULTATION" | "FOLLOW_UP" | "EMERGENCY" | "CHECKUP" | "SPECIALIST";

// Valid state transitions (state machine)
export const VALID_TRANSITIONS: Record<AppointmentStatus, AppointmentStatus[]> = {
  PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["COMPLETED", "CANCELLED", "NO_SHOW"],
  CANCELLED: [],
  COMPLETED: [],
  NO_SHOW: [],
};

// ─── User & Role Models ───────────────────────────────────────────────────────
export type UserRole = "PATIENT" | "DOCTOR" | "CLINIC_ADMIN";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
}

export interface Patient extends User {
  role: "PATIENT";
  dateOfBirth: string;
  insuranceNumber?: string;
  address: Address;
  medicalHistory?: string[];
}

export interface Doctor extends User {
  role: "DOCTOR";
  specialization: string;
  qualifications: string[];
  clinicId: string;
  rating: number;
  reviewCount: number;
  bio: string;
  languages: string[];
  consultationFee: number;
  isAvailable: boolean;
  nextAvailableSlot?: string;
}

export interface ClinicAdmin extends User {
  role: "CLINIC_ADMIN";
  clinicId: string;
}

// ─── Clinic ───────────────────────────────────────────────────────────────────
export interface Clinic {
  id: string;
  name: string;
  address: Address;
  phone: string;
  email: string;
  website?: string;
  openingHours: OpeningHours;
  specializations: string[];
  rating: number;
  reviewCount: number;
  imageUrl?: string;
}

export interface Address {
  street: string;
  city: string;
  postalCode: string;
  state: string;
  country: string;
}

export interface OpeningHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

export interface DayHours {
  isOpen: boolean;
  from?: string;
  to?: string;
}

// ─── Appointment ──────────────────────────────────────────────────────────────
export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  clinicId: string;
  status: AppointmentStatus;
  type: AppointmentType;
  scheduledAt: string; // ISO 8601
  durationMinutes: number;
  reason: string;
  notes?: string;
  cancelReason?: string;
  createdAt: string;
  updatedAt: string;
  // Hydrated relations for frontend display
  patient?: Patient;
  doctor?: Doctor;
  clinic?: Clinic;
}

// ─── Availability ─────────────────────────────────────────────────────────────
export interface TimeSlot {
  id: string;
  doctorId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  isAvailable: boolean;
  durationMinutes: number;
}

// ─── Notifications ────────────────────────────────────────────────────────────
export interface Notification {
  id: string;
  userId: string;
  type: "CONFIRMATION" | "CANCELLATION" | "REMINDER" | "STATUS_CHANGE";
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  appointmentId?: string;
}

// ─── Dashboard Stats ──────────────────────────────────────────────────────────
export interface DashboardStats {
  totalAppointments: number;
  pendingAppointments: number;
  confirmedAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  noShowAppointments: number;
  totalPatients: number;
  totalDoctors: number;
  todayAppointments: number;
  weeklyGrowth: number;
}

// ─── Filters & Pagination ─────────────────────────────────────────────────────
export interface AppointmentFilters {
  status?: AppointmentStatus;
  type?: AppointmentType;
  doctorId?: string;
  patientId?: string;
  clinicId?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  total: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationParams;
}

// ─── API Response Wrapper ─────────────────────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// ─── Auth (Simulated) ─────────────────────────────────────────────────────────
export interface AuthSession {
  user: User;
  role: UserRole;
  isAuthenticated: boolean;
}

// ─── Booking Flow ─────────────────────────────────────────────────────────────
export interface BookingStep {
  step: 1 | 2 | 3 | 4;
  label: string;
  completed: boolean;
}

export interface BookingFormData {
  doctorId?: string;
  clinicId?: string;
  date?: string;
  timeSlot?: TimeSlot;
  type?: AppointmentType;
  reason?: string;
  notes?: string;
}
