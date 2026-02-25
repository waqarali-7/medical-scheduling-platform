import { getClinicById, getDoctors, getUnlinkedDoctors, getCurrentUser } from "@/lib/supabase/data";
import { notFound } from "next/navigation";
import { CurrentUserProvider } from "@/context/CurrentUserContext";
import AppShell from "@/components/layout/AppShell";
import ClinicDetail from "@/containers/Clinics/ClinicDetails";
import { Role } from "@/lib/enums";

interface ClinicDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ClinicDetailPage({ params }: ClinicDetailPageProps) {
  const { id } = await params;

  try {
    const [clinic, doctors, currentUser] = await Promise.all([getClinicById(id), getDoctors(), getCurrentUser()]);

    if (!clinic) {
      notFound();
    }

    const unlinkedDoctors = currentUser?.role === Role.CLINIC_ADMIN ? await getUnlinkedDoctors().catch(() => []) : [];

    const canManage = currentUser?.role === Role.CLINIC_ADMIN;

    return (
      <CurrentUserProvider user={currentUser}>
        <AppShell title={clinic.name}>
          <ClinicDetail clinic={clinic} doctors={doctors} unlinkedDoctors={unlinkedDoctors} canManage={canManage} />
        </AppShell>
      </CurrentUserProvider>
    );
  } catch (error) {
    console.error("Error loading clinic:", error);
    notFound();
  }
}
