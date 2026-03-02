"use client";

import { Box, Grid, Stack } from "@/lib/mui/components";
import type { Appointment, Patient } from "@/types";
import { PatientListHeader, PatientCard } from "./components";
import { EmptyState } from "@/components/common";
import { People } from "@/lib/mui/icons";
import { usePatientsQuery } from "@/hooks/patients";
import { default as PatientsLoading } from "./LoadingSkeleton";

export default function PatientList() {
  const { data, isLoading, isError, error } = usePatientsQuery();

  if (isLoading) return <PatientsLoading />;
  if (isError) return <div>Error: {error?.message}</div>;
  if (!data) return null;

  const { patients, appointments } = data;

  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Stack spacing={4}>
        <PatientListHeader count={patients.length} />

        {patients.length === 0 ? (
          <EmptyState element={<People sx={{ fontSize: 48 }} />} primary="No patients found." />
        ) : (
          <Grid container spacing={3}>
            {patients.map((patient: Patient) => {
              const patientAppointments = appointments.filter((a: Appointment) => a.patientId === patient.id);
              const lastAppt = [...patientAppointments].sort(
                (a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime(),
              )[0];

              return (
                <Grid size={{ xs: 12, sm: 6, xl: 4 }} key={patient.id}>
                  <PatientCard
                    patient={patient}
                    appointmentCount={patientAppointments.length}
                    lastAppointmentStatus={lastAppt?.status}
                  />
                </Grid>
              );
            })}
          </Grid>
        )}
      </Stack>
    </Box>
  );
}
