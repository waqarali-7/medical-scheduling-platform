import { getDoctors, getClinics, getCurrentUser } from "@/lib/supabase/data";
import DoctorsListPage from "@/containers/Doctors/DoctorsList";
import { CurrentUserProvider } from "@/context/CurrentUserContext";
import AppShell from "@/components/layout/AppShell";

export default async function DoctorsPage() {
  const [doctors, clinics] = await Promise.all([getDoctors(), getClinics()]);
  const currentUser = await getCurrentUser();
  return (
    <CurrentUserProvider user={currentUser}>
      <AppShell title="Doctors">
        <DoctorsListPage doctors={doctors} clinics={clinics} />
      </AppShell>
    </CurrentUserProvider>
  );
}
