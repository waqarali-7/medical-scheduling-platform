import { Clinic, Doctor } from "@/types";
import { Box, Typography } from "@/lib/mui";

export default function DoctorDetailHeader({ doctors, clinics }: { doctors: Doctor[]; clinics: Clinic[] }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h4" fontWeight={700}>
        Our Doctors
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {doctors.length} specialist{doctors.length !== 1 ? "s" : ""} available across {clinics.length} clinics
      </Typography>
    </Box>
  );
}
