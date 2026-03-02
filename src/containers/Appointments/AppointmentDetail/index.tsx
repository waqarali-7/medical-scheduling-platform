"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { canTransition } from "@/lib/utils";
import type { AppointmentStatus } from "@/types";
import { Box, Grid, Card, Stack } from "@/lib/mui/components";
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
import { updateAppointmentStatus } from "@/app/actions/updateAppointmentStatus";
import { useAppointmentQuery } from "@/hooks/appointments";
import { default as AppointmentDetailLoading } from "./Loading";

export default function AppointmentDetail() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : null;
  const { data, isLoading, isError, error, isFetched } = useAppointmentQuery({ appointmentId: id });

  const [currentStatus, setCurrentStatus] = useState<AppointmentStatus>("PENDING");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  useEffect(() => {
    if (isFetched && !isLoading && (data === null || isError)) notFound();
  }, [isFetched, isLoading, data, isError]);

  useEffect(() => {
    if (data?.status) setCurrentStatus(data.status);
  }, [data?.status]);

  if (isLoading) return <AppointmentDetailLoading />;
  if (isError) return <div>Error: {error?.message}</div>;
  if (!data) return null;

  const appointment = data;
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
