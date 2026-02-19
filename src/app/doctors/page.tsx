import { getDoctors, getClinics } from "@/lib/supabase/data";
import DoctorsList from "@/containers/Doctors/DoctorsList";

export default async function DoctorsPage() {
  const [doctors, clinics] = await Promise.all([getDoctors(), getClinics()]);
  return <DoctorsList doctors={doctors} clinics={clinics} />;
}
