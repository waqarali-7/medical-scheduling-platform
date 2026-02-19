import { getHydratedAppointments, getDashboardStats, getDoctors, getClinics } from "@/lib/supabase/data";
import DashboardContent from "@/containers/Dashboard/DashboardContent";

export default async function DashboardPage() {
  const [allAppointments, stats, doctors, clinics] = await Promise.all([
    getHydratedAppointments(),
    getDashboardStats(),
    getDoctors(),
    getClinics(),
  ]);
  return <DashboardContent allAppointments={allAppointments} stats={stats} doctors={doctors} clinics={clinics} />;
}
