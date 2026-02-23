import { CurrentUserProvider } from "@/context/CurrentUserContext";
import AppShell from "@/components/layout/AppShell";
import NewClinic from "@/containers/Clinics/NewClinic";
import { getCurrentUser } from "@/lib/supabase/data";

export default async function NewClinicPage() {
  const currentUser = await getCurrentUser();

  return (
    <CurrentUserProvider user={currentUser}>
      <AppShell title="Clinic">
        <NewClinic />
      </AppShell>
    </CurrentUserProvider>
  );
}
