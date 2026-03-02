"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { Box, Stack } from "@/lib/mui/components";
import Breadcrumb from "@/lib/mui/components/Breadcrumb";
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
import { Role } from "@/lib/enums";
import { useDoctorQuery } from "@/hooks/doctors";
import { default as DoctorDetailLoading } from "./DoctorDetailLoadingSkeleton";

export default function DoctorDetail() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : null;
  const { data, isLoading, isError, error, isFetched } = useDoctorQuery({ doctorId: id });
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (isFetched && !isLoading && (data === null || isError)) notFound();
  }, [isFetched, isLoading, data, isError]);

  if (isLoading) return <DoctorDetailLoading />;
  if (isError) return <div>Error: {error?.message}</div>;
  if (!data) return null;

  const { doctor, appointments } = data;
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

          {currentUser?.role === Role.PATIENT && <QuickBook doctor={doctor} />}
        </Stack>
      </Stack>
    </Box>
  );
}
