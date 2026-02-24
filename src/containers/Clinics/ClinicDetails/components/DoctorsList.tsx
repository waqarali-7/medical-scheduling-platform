import { Stack } from "@/lib/mui/components";
import { DoctorsListProps } from "../types";
import { DoctorCard } from "@/containers/Doctors/components";

export function DoctorsList({ doctors }: DoctorsListProps) {
  return (
    <Stack spacing={2}>
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} compact={true} />
      ))}
    </Stack>
  );
}
