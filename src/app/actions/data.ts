"use server";

import {
  getDoctors as getDoctorsData,
  getClinics as getClinicsData,
  getClinicById,
  getUnlinkedDoctors,
  getCurrentUser,
  getHydratedAppointments,
  getDashboardStats,
  getMyPatients,
  getDoctorById,
  getDoctorAppointments,
  getAppointmentById,
} from "@/lib/supabase/data";
import { Role } from "@/lib/enums";

/** Server action: doctors list page data. Used by useDoctorsQuery. */
export async function getDoctorsPageData() {
  const [doctors, clinics] = await Promise.all([getDoctorsData(), getClinicsData()]);
  return { doctors, clinics };
}

/** Server action: clinics list page data. Used by useClinicsQuery. */
export async function getClinicsPageData() {
  const [clinics, doctors] = await Promise.all([getClinicsData(), getDoctorsData()]);
  return { clinics, doctors };
}

/** Server action: single clinic detail. Used by useClinicQuery. */
export async function getClinicDetailData(id: string) {
  let clinic: Awaited<ReturnType<typeof getClinicById>> | null = null;
  try {
    clinic = await getClinicById(id);
  } catch {
    return null;
  }
  const [doctors, currentUser] = await Promise.all([getDoctorsData(), getCurrentUser()]);
  if (!clinic) return null;
  const unlinkedDoctors =
    currentUser?.role === Role.CLINIC_ADMIN ? await getUnlinkedDoctors().catch(() => []) : [];
  const canManage = currentUser?.role === Role.CLINIC_ADMIN;
  return { clinic, doctors, unlinkedDoctors, canManage };
}

/** Server action: dashboard page data. Used by useDashboardQuery. */
export async function getDashboardPageData() {
  const [allAppointments, stats, doctors, clinics] = await Promise.all([
    getHydratedAppointments(),
    getDashboardStats(),
    getDoctorsData(),
    getClinicsData(),
  ]);
  return { allAppointments, stats, doctors, clinics };
}

/** Server action: appointments list. Used by useAppointmentsQuery. */
export async function getAppointmentsPageData() {
  const initialAppointments = await getHydratedAppointments();
  return { initialAppointments };
}

/** Server action: patients list. Used by usePatientsQuery. */
export async function getPatientsPageData() {
  const [patients, appointments] = await Promise.all([getMyPatients(), getHydratedAppointments()]);
  return { patients, appointments };
}

/** Server action: single doctor detail. Used by useDoctorQuery. */
export async function getDoctorDetailData(id: string) {
  const [doctor, appointments] = await Promise.all([getDoctorById(id), getDoctorAppointments(id)]);
  return doctor ? { doctor, appointments } : null;
}

/** Server action: single appointment detail. Used by useAppointmentQuery. */
export async function getAppointmentDetailData(id: string) {
  const appointment = await getAppointmentById(id);
  return appointment;
}
