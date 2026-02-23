"use client";

import { Box, Grid, Stack } from "@/lib/mui";
import type { Appointment, Patient } from "@/types";
import { PatientListHeader, PatientCard, EmptyState } from "./components";
import type { PatientListProps } from "@/containers/Patients/types";

export default function PatientList({ patients, appointments }: PatientListProps) {
  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Stack spacing={4}>
        <PatientListHeader count={patients.length} />

        {patients.length === 0 ? (
          <EmptyState />
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
