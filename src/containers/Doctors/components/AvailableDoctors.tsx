import {Clinic, Doctor} from "@/types";
import {ArrowForward} from "@/lib/mui/icons";
import Link from "next/link";
import { Button, Box, Stack, Typography } from "@/lib/mui/components";
import DoctorCard from "./DoctorCard";

export default function AvailableDoctors({doctors, clinics}: {doctors: Doctor[]; clinics: Clinic[]}) {
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{mb: 2}}>
        <Typography variant="h6" fontWeight={600}>
          Available Doctors
        </Typography>
        <Button component={Link} href="/doctors" variant="ghost" endIcon={<ArrowForward fontSize="small" />} size="small">
          All
        </Button>
      </Stack>
      <Stack spacing={2}>
        {doctors.map((doc) => (
          <DoctorCard key={doc.id} doctor={doc} clinics={clinics} compact={true} />
        ))}
      </Stack>
    </Box>
  );
}
