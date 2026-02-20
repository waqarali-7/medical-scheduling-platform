import { getDoctors, getClinics, getCurrentUser } from "@/lib/supabase/data";
import NewAppointment from "@/containers/Appointments/NewAppointment";
import { CurrentUserProvider } from "@/context/CurrentUserContext";
import AppShell from "@/components/layout/AppShell";

export default async function NewAppointmentPage() {
  const [doctors, clinics] = await Promise.all([getDoctors(), getClinics()]);
  const currentUser = await getCurrentUser();

  return (
    <CurrentUserProvider user={currentUser}>
      <AppShell title="Appointment">
        <NewAppointment doctors={doctors} clinics={clinics} />
      </AppShell>
    </CurrentUserProvider>
  );
}
