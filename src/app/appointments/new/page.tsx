import { getDoctors, getClinics } from "@/lib/supabase/data";
import NewAppointment from "@/containers/Appointments/NewAppointment";

export default async function NewAppointmentPage() {
  const [doctors, clinics] = await Promise.all([getDoctors(), getClinics()]);
  return <NewAppointment doctors={doctors} clinics={clinics} />;
}
