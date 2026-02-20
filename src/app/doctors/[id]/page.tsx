import { getCurrentUser, getDoctorAppointments, getDoctorById } from "@/lib/supabase/data";
import { notFound } from "next/navigation";
import DoctorDetail from "@/containers/Doctors/DoctorDetail";
import { CurrentUserProvider } from "@/context/CurrentUserContext";
import AppShell from "@/components/layout/AppShell";

export default async function DoctorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [doctor, appointments] = await Promise.all([getDoctorById(id), getDoctorAppointments(id)]);
  const currentUser = await getCurrentUser();

  if (!doctor) notFound();
  return (
    <CurrentUserProvider user={currentUser}>
      <AppShell title="Doctors">
        <DoctorDetail doctor={doctor} appointments={appointments} />
      </AppShell>
    </CurrentUserProvider>
  );
}
