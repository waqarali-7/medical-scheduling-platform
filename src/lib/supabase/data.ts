/**
 * Supabase data layer: fetch and map DB rows to app types (camelCase).
 * Server-only. Requires async createClient() (Next 15 compatible).
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
  ClinicAdmin,
} from "@/types";
import { Role } from "@/lib/enums";

/* ────────────────────────────────────────────────────────────────────────────
   Raw DB Row Types (snake_case)
──────────────────────────────────────────────────────────────────────────── */

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

/* ────────────────────────────────────────────────────────────────────────────
   MAPPERS
──────────────────────────────────────────────────────────────────────────── */

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

  if (r.role === Role.PATIENT) {
    return {
      ...base,
      role: "PATIENT",
      dateOfBirth: r.date_of_birth ?? "",
      insuranceNumber: r.insurance_number ?? undefined,
      address: (r.address || {}) as unknown as Patient["address"],
      medicalHistory: r.medical_history ?? undefined,
    } as Patient;
  }

  if (r.role === Role.DOCTOR) {
    return {
      ...base,
      role: Role.DOCTOR,
      specialization: r.specialization ?? "",
      qualifications: r.qualifications ?? [],
      clinicId: r.clinic_id ?? "",
      rating: Number(r.rating) || 0,
      reviewCount: r.review_count ?? 0,
      bio: r.bio ?? "",
      languages: r.languages ?? [],
      consultationFee: Number(r.consultation_fee) || 0,
      isAvailable: r.is_available ?? true,
      nextAvailableSlot: r.next_available_slot ?? undefined,
    } as Doctor;
  }

  return {
    ...base,
    role: Role.CLINIC_ADMIN,
    clinicId: r.clinic_id ?? "",
  } as ClinicAdmin;
}

function mapAppointmentRow(row: AppointmentRow): Appointment {
  const appointment: Appointment = {
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

  if (row.patient) appointment.patient = mapProfileRowToUser(row.patient) as Patient;
  if (row.doctor) appointment.doctor = mapProfileRowToUser(row.doctor) as Doctor;
  if (row.clinic) appointment.clinic = mapClinicRow(row.clinic);

  return appointment;
}

/* ────────────────────────────────────────────────────────────────────────────
   HELPER FUNCTIONS
──────────────────────────────────────────────────────────────────────────── */

async function getCurrentUserProfile(supabase: Awaited<ReturnType<typeof createClient>>): Promise<User | null> {
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) return null;

  const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", authUser.id).single();

  if (error || !profile) return null;

  return mapProfileRowToUser(profile as ProfileRow);
}

/* ────────────────────────────────────────────────────────────────────────────
   PUBLIC API (ALL async createClient FIXED)
──────────────────────────────────────────────────────────────────────────── */

export async function getClinics(): Promise<Clinic[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("clinics").select("*").order("name");

  if (error) throw new Error(error.message);

  return (data ?? []).map(mapClinicRow);
}

export async function getClinicById(id: string): Promise<Clinic> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("clinics").select("*").eq("id", id).single();

  if (error) throw new Error(error.message);

  return mapClinicRow(data || {});
}

export async function getDoctors(clinicId?: string): Promise<Doctor[]> {
  const supabase = await createClient();

  let query = supabase.from("profiles").select("*").eq("role", Role.DOCTOR).order("last_name");

  if (clinicId) {
    query = query.eq("clinic_id", clinicId);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  return (data ?? []).map((r) => mapProfileRowToUser(r as ProfileRow) as Doctor);
}

export async function getDoctorById(id: string): Promise<(Doctor & { clinic?: Clinic }) | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*, clinic:clinics!clinic_id(*)")
    .eq("id", id)
    .eq("role", Role.DOCTOR)
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
  const supabase = await createClient();
  const currentUser = await getCurrentUserProfile(supabase);

  if (!currentUser) throw new Error("User not authenticated");

  let query = supabase
    .from("appointments")
    .select("*, patient:profiles!patient_id(*), doctor:profiles!doctor_id(*), clinic:clinics(*)");

  // Role-based filtering
  if (currentUser.role === Role.PATIENT) {
    query = query.eq("patient_id", currentUser.id);
  } else if (currentUser.role === Role.DOCTOR) {
    query = query.eq("doctor_id", currentUser.id);
  }

  const { data, error } = await query.order("scheduled_at", { ascending: true });

  if (error) throw new Error(error.message);

  return (data ?? []).map((r) => mapAppointmentRow(r as AppointmentRow));
}

export async function getAppointmentById(id: string): Promise<Appointment | null> {
  const supabase = await createClient();
  const currentUser = await getCurrentUserProfile(supabase);

  if (!currentUser) throw new Error("User not authenticated");

  let query = supabase
    .from("appointments")
    .select("*, patient:profiles!patient_id(*), doctor:profiles!doctor_id(*), clinic:clinics(*)")
    .eq("id", id);

  // Role-based filtering
  if (currentUser.role === Role.PATIENT) {
    query = query.eq("patient_id", currentUser.id);
  } else if (currentUser.role === Role.DOCTOR) {
    query = query.eq("doctor_id", currentUser.id);
  }

  const { data, error } = await query.single();

  if (error || !data) return null;

  return mapAppointmentRow(data as AppointmentRow);
}

/* ────────────────────────────────────────────────────────────────────────────
   AUTH INTEGRATION
──────────────────────────────────────────────────────────────────────────── */

export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createClient();
  return getCurrentUserProfile(supabase);
}

/* ────────────────────────────────────────────────────────────────────────────
   DASHBOARD STATS (Role-based)
──────────────────────────────────────────────────────────────────────────── */

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createClient();
  const currentUser = await getCurrentUserProfile(supabase);

  if (!currentUser) throw new Error("User not authenticated");

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date(todayStart);
  todayEnd.setDate(todayEnd.getDate() + 1);

  // Base queries
  let appointmentsQuery = supabase.from("appointments").select("id, status, scheduled_at");
  const profilesQuery = supabase.from("profiles").select("id, role");

  // Role-based filtering
  if (currentUser.role === Role.PATIENT) {
    appointmentsQuery = appointmentsQuery.eq("patient_id", currentUser.id);
  } else if (currentUser.role === Role.DOCTOR) {
    appointmentsQuery = appointmentsQuery.eq("doctor_id", currentUser.id);
  } else if (currentUser.role === Role.CLINIC_ADMIN) {
    // Clinic admins can see appointments for their clinic
    const clinicId = (currentUser as ClinicAdmin).clinicId;
    if (clinicId) {
      appointmentsQuery = appointmentsQuery.eq("clinic_id", clinicId);
    }
  }

  const [appointmentsRes, profilesRes] = await Promise.all([appointmentsQuery, profilesQuery]);

  const appointments = appointmentsRes.data ?? [];
  const profiles = profilesRes.data ?? [];

  const byStatus = appointments.reduce(
    (acc, a) => {
      acc[a.status as AppointmentStatus] = (acc[a.status as AppointmentStatus] || 0) + 1;
      return acc;
    },
    {} as Record<AppointmentStatus, number>,
  );

  const todayAppointments = appointments.filter((a) => {
    const t = new Date(a.scheduled_at).getTime();
    return t >= todayStart.getTime() && t < todayEnd.getTime();
  }).length;

  // Role-specific stats
  let totalPatients = 0;
  let totalDoctors = 0;

  if (currentUser.role === Role.CLINIC_ADMIN) {
    // Clinic admins see stats for their clinic only
    const clinicId = (currentUser as ClinicAdmin).clinicId;
    if (clinicId) {
      const clinicPatientsRes = await supabase
        .from("profiles")
        .select("id")
        .eq("role", "PATIENT")
        .eq("clinic_id", clinicId);

      const clinicDoctorsRes = await supabase
        .from("profiles")
        .select("id")
        .eq("role", Role.DOCTOR)
        .eq("clinic_id", clinicId);

      totalPatients = clinicPatientsRes.data?.length || 0;
      totalDoctors = clinicDoctorsRes.data?.length || 0;
    }
  } else {
    // For doctors and patients, use the general counts
    totalPatients = profiles.filter((p) => p.role === Role.PATIENT).length;
    totalDoctors = profiles.filter((p) => p.role === Role.DOCTOR).length;
  }

  return {
    totalAppointments: appointments.length,
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

/* ────────────────────────────────────────────────────────────────────────────
   ROLE-SPECIFIC DATA FETCHING
──────────────────────────────────────────────────────────────────────────── */

export async function getMyPatients(): Promise<Patient[]> {
  const supabase = await createClient();
  const currentUser = await getCurrentUserProfile(supabase);

  if (!currentUser || currentUser.role === Role.PATIENT) {
    return [];
  }

  let query = supabase.from("appointments").select("patient_id");

  if (currentUser.role === Role.DOCTOR) {
    query = query.eq("doctor_id", currentUser.id);
  }

  const { data: appointments, error } = await query;

  if (error) throw new Error(error.message);

  const patientIds = [...new Set(appointments?.map((a) => a.patient_id) || [])];

  if (patientIds.length === 0) return [];

  const { data: patients, error: patientsError } = await supabase
    .from("profiles")
    .select("*")
    .in("id", patientIds)
    .eq("role", Role.PATIENT);

  if (patientsError) throw new Error(patientsError.message);

  return (patients ?? []).map((r) => mapProfileRowToUser(r as ProfileRow) as Patient);
}

export async function getClinicAppointments(clinicId: string): Promise<Appointment[]> {
  const supabase = await createClient();
  const currentUser = await getCurrentUserProfile(supabase);

  if (!currentUser) throw new Error("User not authenticated");

  // Only clinic admins can access clinic-specific appointments
  if (currentUser.role !== Role.CLINIC_ADMIN) {
    throw new Error("Unauthorized access");
  }

  const { data, error } = await supabase
    .from("appointments")
    .select("*, patient:profiles!patient_id(*), doctor:profiles!doctor_id(*), clinic:clinics(*)")
    .eq("clinic_id", clinicId)
    .order("scheduled_at", { ascending: true });

  if (error) throw new Error(error.message);

  return (data ?? []).map((r) => mapAppointmentRow(r as AppointmentRow));
}

export async function getDoctorAppointments(doctorId: string): Promise<Appointment[]> {
  const supabase = await createClient();
  const currentUser = await getCurrentUserProfile(supabase);

  if (!currentUser) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("appointments")
    .select("*, patient:profiles!patient_id(*), doctor:profiles!doctor_id(*), clinic:clinics(*)")
    .eq("doctor_id", doctorId)
    .order("scheduled_at", { ascending: true });

  if (error) throw new Error(error.message);

  return (data ?? []).map((r) => mapAppointmentRow(r as AppointmentRow));
}

export async function getMyClinic(): Promise<Clinic | null> {
  const supabase = await createClient();
  const currentUser = await getCurrentUserProfile(supabase);

  if (!currentUser || currentUser.role !== Role.CLINIC_ADMIN) {
    return null;
  }

  const clinicId = (currentUser as ClinicAdmin).clinicId;
  if (!clinicId) return null;

  const { data, error } = await supabase.from("clinics").select("*").eq("id", clinicId).single();

  if (error) return null;

  return mapClinicRow(data as ClinicRow);
}

export async function getMyUpcomingAppointments(): Promise<Appointment[]> {
  const supabase = await createClient();
  const currentUser = await getCurrentUserProfile(supabase);

  if (!currentUser) throw new Error("User not authenticated");

  const now = new Date().toISOString();

  let query = supabase
    .from("appointments")
    .select("*, patient:profiles!patient_id(*), doctor:profiles!doctor_id(*), clinic:clinics(*)")
    .gte("scheduled_at", now)
    .order("scheduled_at", { ascending: true });

  // Role-based filtering
  if (currentUser.role === Role.PATIENT) {
    query = query.eq("patient_id", currentUser.id);
  } else if (currentUser.role === Role.DOCTOR) {
    query = query.eq("doctor_id", currentUser.id);
  } else if (currentUser.role === Role.CLINIC_ADMIN) {
    // Clinic admins can see appointments for their clinic
    const clinicId = (currentUser as ClinicAdmin).clinicId;
    if (clinicId) {
      query = query.eq("clinic_id", clinicId);
    }
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  return (data ?? []).map((r) => mapAppointmentRow(r as AppointmentRow));
}

export async function getMyPastAppointments(): Promise<Appointment[]> {
  const supabase = await createClient();
  const currentUser = await getCurrentUserProfile(supabase);

  if (!currentUser) throw new Error("User not authenticated");

  const now = new Date().toISOString();

  let query = supabase
    .from("appointments")
    .select("*, patient:profiles!patient_id(*), doctor:profiles!doctor_id(*), clinic:clinics(*)")
    .lt("scheduled_at", now)
    .order("scheduled_at", { ascending: false });

  // Role-based filtering
  if (currentUser.role === Role.PATIENT) {
    query = query.eq("patient_id", currentUser.id);
  } else if (currentUser.role === Role.DOCTOR) {
    query = query.eq("doctor_id", currentUser.id);
  } else if (currentUser.role === Role.CLINIC_ADMIN) {
    // Clinic admins can see appointments for their clinic
    const clinicId = (currentUser as ClinicAdmin).clinicId;
    if (clinicId) {
      query = query.eq("clinic_id", clinicId);
    }
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  return (data ?? []).map((r) => mapAppointmentRow(r as AppointmentRow));
}

/* ────────────────────────────────────────────────────────────────────────────
   UTILITY FUNCTIONS
──────────────────────────────────────────────────────────────────────────── */

export async function getUserRole(): Promise<User["role"] | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase.from("profiles").select("role").eq("id", user.id).single();

  if (error || !data) return null;

  return data.role as User["role"];
}

export async function canAccessResource(
  resource: "appointments" | "patients" | "doctors" | "clinics",
): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  const { data, error } = await supabase.from("profiles").select("role").eq("id", user.id).single();

  if (error || !data) return false;

  const role = data.role as User["role"];

  // Define access rules
  const accessRules: Record<User["role"], Record<string, boolean>> = {
    PATIENT: {
      appointments: true,
      patients: false,
      doctors: true,
      clinics: true,
    },
    DOCTOR: {
      appointments: true,
      patients: true,
      doctors: false,
      clinics: true,
    },
    CLINIC_ADMIN: {
      appointments: true,
      patients: true,
      doctors: true,
      clinics: true,
    },
  };

  return accessRules[role]?.[resource] || false;
}

/* ────────────────────────────────────────────────────────────────────────────
   DATA MUTATION HELPERS (Optional - for reference)
──────────────────────────────────────────────────────────────────────────── */

export async function createAppointment(appointmentData: Omit<Appointment, "id" | "createdAt" | "updatedAt">) {
  const supabase = await createClient();
  const currentUser = await getCurrentUserProfile(supabase);

  if (!currentUser) throw new Error("User not authenticated");

  // Validate user has permission to create appointment
  if (currentUser.role === Role.PATIENT) {
    // Patients can only create appointments for themselves
    if (appointmentData.patientId !== currentUser.id) {
      throw new Error("Unauthorized: Cannot create appointment for another patient");
    }
  } else if (currentUser.role === Role.DOCTOR) {
    // Doctors can only create appointments for themselves
    if (appointmentData.doctorId !== currentUser.id) {
      throw new Error("Unauthorized: Cannot create appointment for another doctor");
    }
  }

  const { data, error } = await supabase
    .from("appointments")
    .insert([
      {
        status: appointmentData.status,
        type: appointmentData.type,
        patient_id: appointmentData.patientId,
        clinic_id: appointmentData.clinicId,
        doctor_id: appointmentData.doctorId,
        scheduled_at: appointmentData.scheduledAt,
        duration_minutes: appointmentData.durationMinutes,
        reason: appointmentData.reason,
        notes: appointmentData.notes,
        cancel_reason: appointmentData.cancelReason,
      },
    ])
    .select();

  if (error) throw new Error(error.message);

  return mapAppointmentRow(data[0] as AppointmentRow);
}

export async function updateAppointmentStatus(id: string, status: AppointmentStatus) {
  const supabase = await createClient();
  const currentUser = await getCurrentUserProfile(supabase);

  if (!currentUser) throw new Error("User not authenticated");

  // First, get the appointment to check permissions
  const { data: appointment, error: fetchError } = await supabase
    .from("appointments")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !appointment) throw new Error("Appointment not found");

  // Check if user has permission to update this appointment
  let canUpdate = false;

  if (currentUser.role === Role.PATIENT) {
    canUpdate = appointment.patient_id === currentUser.id;
  } else if (currentUser.role === Role.DOCTOR) {
    canUpdate = appointment.doctor_id === currentUser.id;
  } else if (currentUser.role === Role.CLINIC_ADMIN) {
    const clinicId = (currentUser as ClinicAdmin).clinicId;
    canUpdate = clinicId ? appointment.clinic_id === clinicId : false;
  }

  if (!canUpdate) {
    throw new Error("Unauthorized: Cannot update this appointment");
  }

  const { data, error } = await supabase.from("appointments").update({ status }).eq("id", id).select();

  if (error) throw new Error(error.message);

  return mapAppointmentRow(data[0] as AppointmentRow);
}

/* ────────────────────────────────────────────────────────────────────────────
   CLINIC MUTATIONS
──────────────────────────────────────────────────────────────────────────── */

export async function createClinic(clinicData: {
  name: string;
  phone: string;
  email: string;
  website?: string;
  street: string;
  postalCode: string;
  city: string;
  state: string;
  openingHours: Clinic["openingHours"];
  specializations: string[];
}): Promise<Clinic> {
  const supabase = await createClient();
  const currentUser = await getCurrentUserProfile(supabase);

  if (!currentUser) throw new Error("User not authenticated");

  // Only clinic admins can create clinics
  if (currentUser.role !== Role.CLINIC_ADMIN) {
    throw new Error("Unauthorized: Only clinic admins can create clinics");
  }

  const { data, error } = await supabase
    .from("clinics")
    .insert([
      {
        name: clinicData.name,
        phone: clinicData.phone,
        email: clinicData.email,
        website: clinicData.website || null,
        address: {
          street: clinicData.street,
          postalCode: clinicData.postalCode,
          city: clinicData.city,
          state: clinicData.state,
        },
        opening_hours: clinicData.openingHours,
        specializations: clinicData.specializations,
        rating: 0,
        review_count: 0,
        image_url: null,
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);

  return mapClinicRow(data as ClinicRow);
}

/* ────────────────────────────────────────────────────────────────────────────
   DOCTOR LINKING
──────────────────────────────────────────────────────────────────────────── */

export async function getUnlinkedDoctors(): Promise<Doctor[]> {
  const supabase = await createClient();
  const currentUser = await getCurrentUserProfile(supabase);

  if (!currentUser) throw new Error("User not authenticated");

  // Only clinic admins can view unlinked doctors
  if (currentUser.role !== Role.CLINIC_ADMIN) {
    throw new Error("Unauthorized: Only clinic admins can view unlinked doctors");
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", Role.DOCTOR)
    .is("clinic_id", null)
    .order("last_name");

  if (error) throw new Error(error.message);

  return (data ?? []).map((r) => mapProfileRowToUser(r as ProfileRow) as Doctor);
}

export async function linkDoctorToClinic(doctorId: string, clinicId: string): Promise<void> {
  const supabase = await createClient();
  const currentUser = await getCurrentUserProfile(supabase);

  if (!currentUser) throw new Error("User not authenticated");

  // Only clinic admins can link doctors
  if (currentUser.role !== Role.CLINIC_ADMIN) {
    throw new Error("Unauthorized: Only clinic admins can link doctors");
  }

  // Check if doctor is already linked to a clinic
  const { data: doctor, error: doctorError } = await supabase
    .from("profiles")
    .select("clinic_id")
    .eq("id", doctorId)
    .eq("role", Role.DOCTOR)
    .single();

  if (doctorError) throw new Error("Doctor not found");

  if (doctor.clinic_id) {
    throw new Error("Doctor is already linked to a clinic");
  }

  // Link doctor to clinic
  const { error } = await supabase.from("profiles").update({ clinic_id: clinicId }).eq("id", doctorId);

  if (error) throw new Error(error.message);
}

export async function unlinkDoctorFromClinic(doctorId: string): Promise<void> {
  const supabase = await createClient();
  const currentUser = await getCurrentUserProfile(supabase);

  if (!currentUser) throw new Error("User not authenticated");

  // Only clinic admins can unlink doctors
  if (currentUser.role !== Role.CLINIC_ADMIN) {
    throw new Error("Unauthorized: Only clinic admins can unlink doctors");
  }

  // Verify the doctor is linked to admin's clinic
  const { error: doctorError } = await supabase
    .from("profiles")
    .select("clinic_id")
    .eq("id", doctorId)
    .eq("role", Role.DOCTOR)
    .single();

  if (doctorError) throw new Error("Doctor not found");

  // Unlink doctor from clinic
  const { error } = await supabase.from("profiles").update({ clinic_id: null }).eq("id", doctorId);

  if (error) throw new Error(error.message);
}
