"use client";

import { Box, Stack } from "@/lib/mui";
import type { Doctor, Clinic, Appointment } from "@/types";
import Breadcrumb from "@/lib/mui/Breadcrumb";
import {
  DoctorProfileHeader,
  AboutDoctor,
  Qualification,
  RecentAppointments,
  PracticeLocation,
  Languages,
  QuickBook,
  DoctorAvailability,
} from "./components";
import { useCurrentUser } from "@/context/CurrentUserContext";

interface DoctorDetailPageProps {
  doctor: Doctor & { clinic?: Clinic };
  appointments: Appointment[];
}

export default function DoctorDetailPage({ doctor, appointments }: DoctorDetailPageProps) {
  const clinic = doctor.clinic;
  const currentUser = useCurrentUser();

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

          {currentUser?.role === "PATIENT" && <QuickBook doctor={doctor} />}
        </Stack>
      </Stack>
    </Box>
  );
}
