"use client";

import { useMemo, useState } from "react";
import { Box, Grid, Card, Stack, Button } from "@/lib/mui/components";
import { DAYS } from "./constants";
import { ClinicDetailProps } from "./types";
import {
  Header,
  StatusBanner,
  ContactInfo,
  DoctorsList,
  Specializations,
  OpeningHours,
  LinkDoctorsDialog,
} from "./components";
import type { Doctor } from "@/types";
import { PersonAdd } from "@/lib/mui/icons";

interface ClinicDetailExtendedProps extends ClinicDetailProps {
  unlinkedDoctors: Doctor[];
  canManage?: boolean;
}

export default function ClinicDetail({
  clinic,
  doctors,
  unlinkedDoctors,
  canManage = false,
}: ClinicDetailExtendedProps) {
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);

  const clinicDoctors = useMemo(() => doctors.filter((d) => d.clinicId === clinic.id), [doctors, clinic.id]);

  const today = useMemo(() => {
    return new Date().toLocaleDateString("en", { weekday: "long" }).toLowerCase() as (typeof DAYS)[number];
  }, []);

  const todayHours = clinic.openingHours[today];

  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Header clinic={clinic} />
      {canManage && (
        <Box sx={{ mb: 3 }}>
          <Button
            variant="primary"
            startIcon={<PersonAdd />}
            onClick={() => setLinkDialogOpen(true)}
            disabled={unlinkedDoctors.length === 0}
          >
            Link Doctors ({unlinkedDoctors.length} available)
          </Button>
        </Box>
      )}
      <StatusBanner todayHours={todayHours} />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              <ContactInfo clinic={clinic} />
            </Card>
            <DoctorsList doctors={clinicDoctors} clinicId={clinic.id} canManage={canManage} />
            <Specializations specializations={clinic.specializations} />
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <OpeningHours openingHours={clinic.openingHours} today={today} />
        </Grid>
      </Grid>

      <LinkDoctorsDialog
        open={linkDialogOpen}
        onClose={() => setLinkDialogOpen(false)}
        clinicId={clinic.id}
        unlinkedDoctors={unlinkedDoctors}
      />
    </Box>
  );
}
