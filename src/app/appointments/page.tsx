import { getCurrentUser, getHydratedAppointments } from "@/lib/supabase/data";
import AppointmentsList from "@/containers/Appointments/AppointmentsList";
import { CurrentUserProvider } from "@/context/CurrentUserContext";
import AppShell from "@/components/layout/AppShell";

export default async function AppointmentsPage() {
  const initialAppointments = await getHydratedAppointments();
  const currentUser = await getCurrentUser();

  return (
    <CurrentUserProvider user={currentUser}>
      <AppShell title="Appointment">
        <AppointmentsList initialAppointments={initialAppointments} />
      </AppShell>
    </CurrentUserProvider>
  );
}
