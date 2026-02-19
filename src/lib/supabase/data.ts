/**
 * Supabase data layer: fetch and map DB rows to app types (camelCase).
 * Use from Server Components or server context only (createClient from server).
 */
import { createClient } from "@/lib/supabase/server";
import type {
  Appointment,
  Clinic,
  Doctor,
  Patient,
  User,
  DashboardStats,
  AppointmentStatus,
} from "@/types";

// ─── Raw row types (snake_case from DB) ──────────────────────────────────────
type ClinicRow = {
  id: string;
  name: string;
  address: Record<string, unknown>;
  phone: string;
  email: string;
  website: string | null;
  opening_hours: Record<string, unknown>;
  specializations: string[];
  rating: number;
  review_count: number;
  image_url: string | null;
  created_at: string;
  updated_at: string;
};

type ProfileRow = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
  date_of_birth: string | null;
  insurance_number: string | null;
  address: Record<string, unknown> | null;
  medical_history: string[] | null;
  specialization: string | null;
  qualifications: string[] | null;
  clinic_id: string | null;
  rating: number | null;
  review_count: number | null;
  bio: string | null;
  languages: string[] | null;
  consultation_fee: number | null;
  is_available: boolean | null;
  next_available_slot: string | null;
};

type AppointmentRow = {
  id: string;
  patient_id: string;
  doctor_id: string;
  clinic_id: string;
  status: string;
  type: string;
  scheduled_at: string;
  duration_minutes: number;
  reason: string;
  notes: string | null;
  cancel_reason: string | null;
  created_at: string;
  updated_at: string;
  patient?: ProfileRow;
  doctor?: ProfileRow;
  clinic?: ClinicRow;
};

// ─── Mappers: DB row → app type ──────────────────────────────────────────────
function mapClinicRow(r: ClinicRow): Clinic {
  return {
    id: r.id,
    name: r.name,
    address: (r.address || {}) as unknown as Clinic["address"],
    phone: r.phone,
    email: r.email,
    website: r.website ?? undefined,
    openingHours: (r.opening_hours || {}) as unknown as Clinic["openingHours"],
    specializations: r.specializations || [],
    rating: Number(r.rating) || 0,
    reviewCount: r.review_count ?? 0,
    imageUrl: r.image_url ?? undefined,
  };
}

function mapProfileRowToUser(r: ProfileRow): User {
  const base: User = {
    id: r.id,
    firstName: r.first_name,
    lastName: r.last_name,
    email: r.email,
    phone: r.phone ?? "",
    role: r.role as User["role"],
    avatarUrl: r.avatar_url ?? undefined,
    createdAt: r.created_at,
  };
  if (r.role === "PATIENT") {
    return {
      ...base,
      role: "PATIENT",
      dateOfBirth: r.date_of_birth ?? "",
      insuranceNumber: r.insurance_number ?? undefined,
      address: (r.address || {}) as unknown as Patient["address"],
      medicalHistory: r.medical_history ?? undefined,
    } as Patient;
  }
  if (r.role === "DOCTOR") {
    return {
      ...base,
      role: "DOCTOR",
      specialization: r.specialization ?? "",
      qualifications: r.qualifications ?? [],
      clinicId: r.clinic_id ?? "",
      rating: Number(r.rating) ?? 0,
      reviewCount: r.review_count ?? 0,
      bio: r.bio ?? "",
      languages: r.languages ?? [],
      consultationFee: Number(r.consultation_fee) ?? 0,
      isAvailable: r.is_available ?? true,
      nextAvailableSlot: r.next_available_slot ?? undefined,
    } as Doctor;
  }
  return {
    ...base,
    role: "CLINIC_ADMIN",
    clinicId: r.clinic_id ?? "",
  } as import("@/types").ClinicAdmin;
}

function mapAppointmentRow(row: AppointmentRow): Appointment {
  const apt: Appointment = {
    id: row.id,
    patientId: row.patient_id,
    doctorId: row.doctor_id,
    clinicId: row.clinic_id,
    status: row.status as AppointmentStatus,
    type: row.type as Appointment["type"],
    scheduledAt: row.scheduled_at,
    durationMinutes: row.duration_minutes,
    reason: row.reason,
    notes: row.notes ?? undefined,
    cancelReason: row.cancel_reason ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
  if (row.patient) apt.patient = mapProfileRowToUser(row.patient) as Patient;
  if (row.doctor) apt.doctor = mapProfileRowToUser(row.doctor) as Doctor;
  if (row.clinic) apt.clinic = mapClinicRow(row.clinic);
  return apt;
}

// ─── Public API (server-only) ────────────────────────────────────────────────

export async function getClinics(): Promise<Clinic[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from("clinics").select("*").order("name");
  if (error) throw new Error(error.message);
  return (data || []).map(mapClinicRow);
}

export async function getDoctors(): Promise<Doctor[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "DOCTOR")
    .order("last_name");
  if (error) throw new Error(error.message);
  return (data || []).map((r) => mapProfileRowToUser(r as ProfileRow) as Doctor);
}

export async function getDoctorById(id: string): Promise<(Doctor & { clinic?: Clinic }) | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*, clinic:clinics!clinic_id(*)")
    .eq("id", id)
    .eq("role", "DOCTOR")
    .single();
  if (error || !data) return null;
  const row = data as ProfileRow & { clinic?: ClinicRow };
  const doctor = mapProfileRowToUser(row) as Doctor;
  if (row.clinic) {
    (doctor as Doctor & { clinic?: Clinic }).clinic = mapClinicRow(row.clinic);
  }
  return doctor as Doctor & { clinic?: Clinic };
}

export async function getHydratedAppointments(): Promise<Appointment[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("appointments")
    .select(
      "*, patient:profiles!patient_id(*), doctor:profiles!doctor_id(*), clinic:clinics(*)"
    )
    .order("scheduled_at", { ascending: true });
  if (error) throw new Error(error.message);
  return (data || []).map((r) => mapAppointmentRow(r as AppointmentRow));
}

export async function getAppointmentById(id: string): Promise<Appointment | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("appointments")
    .select(
      "*, patient:profiles!patient_id(*), doctor:profiles!doctor_id(*), clinic:clinics(*)"
    )
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return mapAppointmentRow(data as AppointmentRow);
}

/** Demo: first patient in DB. Replace with auth user when you add Supabase Auth. */
export async function getCurrentUser(): Promise<User | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "PATIENT")
    .limit(1)
    .single();
  if (error || !data) return null;
  return mapProfileRowToUser(data as ProfileRow);
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = createClient();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date(todayStart);
  todayEnd.setDate(todayEnd.getDate() + 1);

  const [appointmentsRes, profilesRes] = await Promise.all([
    supabase.from("appointments").select("id, status, scheduled_at"),
    supabase.from("profiles").select("id, role"),
  ]);

  const appointments = appointmentsRes.data || [];
  const profiles = profilesRes.data || [];

  const totalAppointments = appointments.length;
  const byStatus = appointments.reduce(
    (acc, a) => {
      acc[a.status as AppointmentStatus] = (acc[a.status as AppointmentStatus] || 0) + 1;
      return acc;
    },
    {} as Record<AppointmentStatus, number>
  );
  const todayAppointments = appointments.filter((a) => {
    const t = new Date(a.scheduled_at).getTime();
    return t >= todayStart.getTime() && t < todayEnd.getTime();
  }).length;

  const totalPatients = profiles.filter((p) => p.role === "PATIENT").length;
  const totalDoctors = profiles.filter((p) => p.role === "DOCTOR").length;

  return {
    totalAppointments,
    pendingAppointments: byStatus.PENDING ?? 0,
    confirmedAppointments: byStatus.CONFIRMED ?? 0,
    completedAppointments: byStatus.COMPLETED ?? 0,
    cancelledAppointments: byStatus.CANCELLED ?? 0,
    noShowAppointments: byStatus.NO_SHOW ?? 0,
    totalPatients,
    totalDoctors,
    todayAppointments,
    weeklyGrowth: 0,
  };
}
