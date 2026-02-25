"use client";

import { useState } from "react";
import { canTransition } from "@/lib/utils";
import type { AppointmentStatus } from "@/types";
import { Box, Grid, Card, Stack } from "@/lib/mui/components";
import type { AppointmentDetailProps } from "./types";
import {
  DetailHeader,
  StatusCard,
  DetailsCard,
  LocationCard,
  DoctorSidebarCard,
  PatientSidebarCard,
  MetadataCard,
  CancelDialog,
} from "./components";
import { CalendarMonth } from "@/lib/mui/icons";
import { EmptyState } from "@/components/common";
import { updateAppointmentStatus } from "@/app/actions/updateAppointmentStatus";

export default function AppointmentDetail({ appointment }: AppointmentDetailProps) {
  const [currentStatus, setCurrentStatus] = useState<AppointmentStatus>(appointment?.status ?? "PENDING");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  if (!appointment) {
    return <EmptyState element={<CalendarMonth sx={{ fontSize: 48 }} />} primary="No appointments found" />;
  }

  const { doctor, patient, clinic } = appointment;
  const displayId = appointment.id.length > 12 ? appointment.id.slice(0, 8) : appointment.id;

  const handleTransition = async (newStatus: AppointmentStatus) => {
    if (newStatus === "CANCELLED") {
      setShowCancelModal(true);
      return;
    }

    if (!canTransition(currentStatus, newStatus)) return;

    const result = await updateAppointmentStatus(appointment.id, newStatus);

    if (result.success && result.data) {
      setCurrentStatus(result.data.status);
    } else {
      console.error(result.error);
    }
  };

  const handleCancel = async () => {
    const result = await updateAppointmentStatus(appointment.id, "CANCELLED");

    if (result.success && result.data) {
      setCurrentStatus(result.data.status);
    } else {
      console.error(result.error);
    }

    setShowCancelModal(false);
  };

  return (
    <Box sx={{ maxWidth: 1400, mx: "auto", py: 3 }}>
      <DetailHeader
        displayId={displayId}
        status={currentStatus}
        scheduledAt={appointment.scheduledAt}
        durationMinutes={appointment.durationMinutes}
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={2}>
            <Card>
              <StatusCard currentStatus={currentStatus} onTransition={handleTransition} />
            </Card>

            <Card>
              <DetailsCard
                appointment={appointment}
                cancelReason={currentStatus === "CANCELLED" ? cancelReason : undefined}
              />
            </Card>

            {clinic && (
              <Card>
                <LocationCard clinic={clinic} />
              </Card>
            )}
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={2}>
            {doctor && (
              <Card>
                <DoctorSidebarCard doctor={doctor} />
              </Card>
            )}

            {patient && (
              <Card>
                <PatientSidebarCard patient={patient} />
              </Card>
            )}

            <Card>
              <MetadataCard appointment={appointment} doctor={doctor} />
            </Card>
          </Stack>
        </Grid>
      </Grid>

      <CancelDialog
        open={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        cancelReason={cancelReason}
        onCancelReasonChange={setCancelReason}
        onConfirm={handleCancel}
      />
    </Box>
  );
}
