"use client";

import { useMemo } from "react";
import { Box, Grid, Card, Stack } from "@/lib/mui/components";
import { DAYS } from "./constants";
import { ClinicDetailProps } from "./types";
import { Header, StatusBanner, ContactInfo, DoctorsList, Specializations, OpeningHours } from "./components";

export default function ClinicDetail({ clinic, doctors }: ClinicDetailProps) {
  const clinicDoctors = useMemo(() => doctors.filter((d) => d.clinicId === clinic.id), [doctors, clinic.id]);

  const today = useMemo(() => {
    return new Date().toLocaleDateString("en", { weekday: "long" }).toLowerCase() as (typeof DAYS)[number];
  }, []);

  const todayHours = clinic.openingHours[today];

  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Header clinic={clinic} />
      <StatusBanner todayHours={todayHours} />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              <ContactInfo clinic={clinic} />
            </Card>
            <DoctorsList doctors={clinicDoctors} />
            <Specializations specializations={clinic.specializations} />
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <OpeningHours openingHours={clinic.openingHours} today={today} />
        </Grid>
      </Grid>
    </Box>
  );
}
