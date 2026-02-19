import { getAppointmentById } from "@/lib/supabase/data";
import AppointmentDetail from "@/containers/Appointments/AppointmentDetail";

export default async function AppointmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const appointment = await getAppointmentById(id);
  return <AppointmentDetail appointment={appointment} />;
}
