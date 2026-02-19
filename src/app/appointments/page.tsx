import { getHydratedAppointments } from "@/lib/supabase/data";
import AppointmentsList from "@/containers/Appointments/AppointmentsList";

export default async function AppointmentsPage() {
  const initialAppointments = await getHydratedAppointments();
  return <AppointmentsList initialAppointments={initialAppointments} />;
}
