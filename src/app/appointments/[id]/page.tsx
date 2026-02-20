import { getAppointmentById, getCurrentUser } from "@/lib/supabase/data";
import AppointmentDetail from "@/containers/Appointments/AppointmentDetail";
import { CurrentUserProvider } from "@/context/CurrentUserContext";
import AppShell from "@/components/layout/AppShell";

export default async function AppointmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const appointment = await getAppointmentById(id);
  const currentUser = await getCurrentUser();

  return (
    <CurrentUserProvider user={currentUser}>
      <AppShell title="Appointment">
        <AppointmentDetail appointment={appointment} />
      </AppShell>
    </CurrentUserProvider>
  );
}
