import { getDoctorById } from "@/lib/supabase/data";
import { notFound } from "next/navigation";
import DoctorDetail from "@/containers/Doctors/DoctorDetail";

export default async function DoctorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doctor = await getDoctorById(id);
  if (!doctor) notFound();
  return <DoctorDetail doctor={doctor} />;
}
