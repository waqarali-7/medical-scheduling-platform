"use client";

import { Box, Stack } from "@mui/material";
import type { Doctor, Clinic, Appointment } from "@/types";
import Breadcrumb from "@/components/ui/Breadcrumb";
import DoctorProfileHeader from "@/components/doctors/DoctorProfileHeader";
import AboutDoctor from "@/components/doctors/AboutDoctor";
import Qualification from "@/components/doctors/Qualification";
import RecentAppointments from "@/components/doctors/RecentAppointments";
import PracticeLocation from "@/components/doctors/PracticeLocation";
import Languages from "@/components/doctors/Languages";
import QuickBook from "@/components/doctors/QuickBook";
import DoctorAvailability from "@/components/doctors/DoctorAvailability";

interface DoctorDetailPageProps {
  doctor: Doctor & { clinic?: Clinic };
  appointments: Appointment[];
}

export default function DoctorDetailPage({ doctor, appointments }: DoctorDetailPageProps) {
  const clinic = doctor.clinic;

  return (
    <Box sx={{ maxWidth: 1400, mx: "auto", py: 4, px: 2 }}>
      <Breadcrumb
        items={[{ label: "Doctors", href: "/doctors" }, { label: `${doctor.firstName} ${doctor.lastName}` }]}
      />

      <DoctorProfileHeader doctor={doctor} />

      <Stack direction={{ xs: "column", lg: "row" }} spacing={4}>
        <Stack flex={2} spacing={3}>
          <AboutDoctor doctor={doctor} />

          <Qualification doctor={doctor} />

          <RecentAppointments appointments={appointments} doctor={doctor} />
        </Stack>

        <Stack flex={1} spacing={3}>
          <PracticeLocation clinic={clinic} />

          <Languages languages={doctor.languages || []} />

          <DoctorAvailability doctor={doctor} />

          <QuickBook doctor={doctor} />
        </Stack>
      </Stack>
    </Box>
  );
}
