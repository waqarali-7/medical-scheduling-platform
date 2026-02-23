import { getClinics, getDoctors, getCurrentUser } from "@/lib/supabase/data";
import { CurrentUserProvider } from "@/context/CurrentUserContext";
import AppShell from "@/components/layout/AppShell";
import ClinicsList from "@/containers/Clinics/ClinicsList";

export default async function ClinicsPage() {
  const [clinics, doctors] = await Promise.all([getClinics(), getDoctors()]);
  const currentUser = await getCurrentUser();

  return (
    <CurrentUserProvider user={currentUser}>
      <AppShell title="Clinics">
        <ClinicsList clinics={clinics} doctors={doctors} />
      </AppShell>
    </CurrentUserProvider>
  );
}
