"use client";

import { useMemo, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { Box, Grid, Card, Stack, Button } from "@/lib/mui/components";
import { DAYS } from "./constants";
import {
  Header,
  StatusBanner,
  ContactInfo,
  DoctorsList,
  Specializations,
  OpeningHours,
  LinkDoctorsDialog,
} from "./components";
import { PersonAdd } from "@/lib/mui/icons";
import { useClinicQuery } from "@/hooks/clinics";
import { SetPageTitle } from "@/context/PageTitleContext";
import { default as ClinicDetailLoading } from "./Loading";

export default function ClinicDetail() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : null;
  const { data, isLoading, isError, error, isFetched } = useClinicQuery({ clinicId: id });
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);

  const doctors = data?.doctors ?? [];
  const clinic = data?.clinic;
  const clinicDoctors = useMemo(
    () => (clinic ? doctors.filter((d) => d.clinicId === clinic.id) : []),
    [doctors, clinic]
  );
  const today = useMemo(
    () => new Date().toLocaleDateString("en", { weekday: "long" }).toLowerCase() as (typeof DAYS)[number],
    []
  );

  useEffect(() => {
    if (isFetched && !isLoading && (data === null || isError)) notFound();
  }, [isFetched, isLoading, data, isError]);

  if (isLoading) return <ClinicDetailLoading />;
  if (isError) return <div>Error: {error?.message}</div>;
  if (!data) return null;

  const { clinic: clinicData, unlinkedDoctors, canManage: canManageProp } = data;
  const canManage = canManageProp ?? false;
  const todayHours = clinicData.openingHours[today];

  return (
    <>
      <SetPageTitle title={clinicData.name} />
      <Box sx={{ py: 4, px: 2 }}>
        <Header clinic={clinicData} />
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
              <ContactInfo clinic={clinicData} />
            </Card>
            <DoctorsList doctors={clinicDoctors} clinicId={clinicData.id} canManage={canManage} />
            <Specializations specializations={clinicData.specializations} />
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <OpeningHours openingHours={clinicData.openingHours} today={today} />
        </Grid>
      </Grid>

      <LinkDoctorsDialog
        open={linkDialogOpen}
        onClose={() => setLinkDialogOpen(false)}
        clinicId={clinicData.id}
        unlinkedDoctors={unlinkedDoctors}
      />
      </Box>
    </>
  );
}
