import {getCurrentUser, getHydratedAppointments, getMyPatients} from "@/lib/supabase/data";
import PatientList from "@/containers/Patients";
import {CurrentUserProvider} from "@/context/CurrentUserContext";
import AppShell from "@/components/layout/AppShell";

export default async function PatientsPage() {
  const [patients, appointments] = await Promise.all([getMyPatients(), getHydratedAppointments()]);
  const currentUser = await getCurrentUser();
  return (
    <CurrentUserProvider user={currentUser}>
      <AppShell title="Patients">
        <PatientList patients={patients} appointments={appointments} />
      </AppShell>
    </CurrentUserProvider>
  );
}
