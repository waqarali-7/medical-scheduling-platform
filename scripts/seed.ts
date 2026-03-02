/**
 * Seed Supabase with demo data from src/data/dummy.ts
 * Run from project root: npm run seed
 *
 * Requires .env.local:
 *   - NEXT_PUBLIC_SUPABASE_URL
 *   - NEXT_PUBLIC_SUPABASE_ANON_KEY
 *   - SUPABASE_SERVICE_ROLE_KEY (for inserts; RLS blocks anon from inserting)
 *
 * Get the service_role key from: Supabase Dashboard → Project Settings → API → service_role (secret)
 */
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";
import {
  CLINICS,
  DOCTORS,
  PATIENTS,
  ADMINS,
  APPOINTMENTS,
  TIME_SLOTS,
  NOTIFICATIONS,
} from "../src/data/dummy";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL in .env.local");
  process.exit(1);
}
if (!serviceRoleKey) {
  console.error(
    "Missing SUPABASE_SERVICE_ROLE_KEY in .env.local. RLS blocks inserts with the anon key.\n" +
      "Add it from: Supabase Dashboard → Project Settings → API → service_role (secret).\n" +
      "Do not expose this key in the browser or commit it to git."
  );
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey);

type IdMap = Record<string, string>;

async function seed() {
  const clinicIdMap: IdMap = {};
  const profileIdMap: IdMap = {};

  console.log("Seeding clinics...");
  const clinicRows = CLINICS.map((c) => ({
    name: c.name,
    address: c.address,
    phone: c.phone,
    email: c.email,
    website: c.website ?? null,
    opening_hours: c.openingHours,
    specializations: c.specializations,
    rating: c.rating,
    review_count: c.reviewCount,
    image_url: c.imageUrl ?? null,
  }));
  const { data: insertedClinics, error: errClinics } = await supabase
    .from("clinics")
    .insert(clinicRows)
    .select("id");
  if (errClinics) {
    console.error("Clinics insert error:", errClinics);
    process.exit(1);
  }
  insertedClinics!.forEach((row, i) => {
    clinicIdMap[CLINICS[i].id] = row.id;
  });
  console.log(`  Inserted ${insertedClinics!.length} clinics.`);

  console.log("Seeding profiles (patients, doctors, admins)...");
  const allProfiles = [...PATIENTS, ...DOCTORS, ...ADMINS];
  const profileRows = allProfiles.map((p) => {
    const base: Record<string, unknown> = {
      first_name: p.firstName,
      last_name: p.lastName,
      email: p.email,
      phone: p.phone ?? "",
      role: p.role,
      avatar_url: p.avatarUrl ?? null,
    };
    if (p.role === "PATIENT") {
      base.date_of_birth = p.dateOfBirth ?? null;
      base.insurance_number = p.insuranceNumber ?? null;
      base.address = p.address ?? null;
      base.medical_history = p.medicalHistory ?? null;
    }
    if (p.role === "DOCTOR") {
      base.specialization = p.specialization ?? null;
      base.qualifications = p.qualifications ?? null;
      base.clinic_id = p.clinicId ? clinicIdMap[p.clinicId] : null;
      base.rating = p.rating ?? 0;
      base.review_count = p.reviewCount ?? 0;
      base.bio = p.bio ?? null;
      base.languages = p.languages ?? null;
      base.consultation_fee = p.consultationFee ?? null;
      base.is_available = p.isAvailable ?? true;
      base.next_available_slot = p.nextAvailableSlot ?? null;
    }
    if (p.role === "CLINIC_ADMIN" && "clinicId" in p) {
      base.clinic_id = p.clinicId ? clinicIdMap[p.clinicId] : null;
    }
    return base;
  });
  const { data: insertedProfiles, error: errProfiles } = await supabase
    .from("profiles")
    .insert(profileRows)
    .select("id");
  if (errProfiles) {
    console.error("Profiles insert error:", errProfiles);
    process.exit(1);
  }
  insertedProfiles!.forEach((row, i) => {
    profileIdMap[allProfiles[i].id] = row.id;
  });
  console.log(`  Inserted ${insertedProfiles!.length} profiles.`);

  console.log("Seeding appointments...");
  const appointmentRows = APPOINTMENTS.map((a) => ({
    patient_id: profileIdMap[a.patientId],
    doctor_id: profileIdMap[a.doctorId],
    clinic_id: clinicIdMap[a.clinicId],
    status: a.status,
    type: a.type,
    scheduled_at: a.scheduledAt,
    duration_minutes: a.durationMinutes,
    reason: a.reason,
    notes: a.notes ?? null,
    cancel_reason: a.cancelReason ?? null,
  }));
  const { data: insertedAppointments, error: errAppointments } = await supabase
    .from("appointments")
    .insert(appointmentRows)
    .select("id");
  if (errAppointments) {
    console.error("Appointments insert error:", errAppointments);
    process.exit(1);
  }
  const appointmentIdMap: IdMap = {};
  insertedAppointments!.forEach((row, i) => {
    appointmentIdMap[APPOINTMENTS[i].id] = row.id;
  });
  console.log(`  Inserted ${insertedAppointments!.length} appointments.`);

  console.log("Seeding time_slots...");
  const slotRows = TIME_SLOTS.map((s) => ({
    doctor_id: profileIdMap[s.doctorId],
    date: s.date,
    start_time: s.startTime,
    end_time: s.endTime,
    is_available: s.isAvailable,
    duration_minutes: s.durationMinutes,
  }));
  const { error: errSlots } = await supabase.from("time_slots").insert(slotRows);
  if (errSlots) {
    console.error("Time slots insert error:", errSlots);
    process.exit(1);
  }
  console.log(`  Inserted ${slotRows.length} time_slots.`);

  console.log("Seeding notifications...");
  const notifRows = NOTIFICATIONS.map((n) => ({
    user_id: profileIdMap[n.userId],
    type: n.type,
    channel: "IN_APP",
    title: n.title,
    message: n.message,
    is_read: n.isRead,
    appointment_id: n.appointmentId ? appointmentIdMap[n.appointmentId] : null,
    sent_at: null,
  }));
  const { error: errNotif } = await supabase.from("notifications").insert(notifRows);
  if (errNotif) {
    console.error("Notifications insert error:", errNotif);
    process.exit(1);
  }
  console.log(`  Inserted ${notifRows.length} notifications.`);

  console.log("\nSeed completed successfully.");
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
