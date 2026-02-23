import { getClinicById, getDoctors, getCurrentUser } from "@/lib/supabase/data";
import { notFound } from "next/navigation";
import { CurrentUserProvider } from "@/context/CurrentUserContext";
import AppShell from "@/components/layout/AppShell";
import ClinicDetail from "@/containers/Clinics/ClinicDetails";

interface ClinicDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ClinicDetailPage({ params }: ClinicDetailPageProps) {
  const { id } = await params;
  const [clinic, doctors, currentUser] = await Promise.all([getClinicById(id), getDoctors(), getCurrentUser()]);

  if (!clinic) {
    notFound();
  }

  return (
    <CurrentUserProvider user={currentUser}>
      <AppShell title={clinic?.name}>
        <ClinicDetail clinic={clinic} doctors={doctors} />
      </AppShell>
    </CurrentUserProvider>
  );
}
