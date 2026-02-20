import {
  getHydratedAppointments,
  getDashboardStats,
  getDoctors,
  getClinics,
  getCurrentUser,
} from "@/lib/supabase/data";
import DashboardContent from "@/containers/Dashboard/DashboardContent";
import { CurrentUserProvider } from "@/context/CurrentUserContext";
import AppShell from "@/components/layout/AppShell";

export default async function DashboardPage() {
  const [allAppointments, stats, doctors, clinics] = await Promise.all([
    getHydratedAppointments(),
    getDashboardStats(),
    getDoctors(),
    getClinics(),
  ]);
  const currentUser = await getCurrentUser();

  return (
    <CurrentUserProvider user={currentUser}>
      <AppShell title="Dashboard">
        <DashboardContent allAppointments={allAppointments} stats={stats} doctors={doctors} clinics={clinics} />
      </AppShell>
    </CurrentUserProvider>
  );
}
