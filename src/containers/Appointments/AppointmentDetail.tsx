"use client";

import {useState} from "react";
import Link from "next/link";
import {ArrowBack, CalendarMonth, Schedule, LocationOn, Description, Phone, Email, Warning, CheckCircle, Cancel, FavoriteBorder, ChevronRight} from "@mui/icons-material";
import {Box, Typography, Paper, Stack, IconButton, Chip, Grid, Stepper, Step, StepLabel, TextField} from "@mui/material";
import {canTransition, getAvailableTransitions, STATUS_CONFIG, formatDateBerlin, formatTimeBerlin, formatDuration, formatCurrency} from "@/lib/utils";
import type {Appointment, AppointmentStatus} from "@/types";
import {StatusBadge, TypeBadge} from "@/components/ui/Badge";
import {Avatar, Button, Card, Dialog} from "@/components/ui";

const TRANSITION_LABELS: Record<AppointmentStatus, string> = {
  CONFIRMED: "Confirm Appointment",
  CANCELLED: "Cancel Appointment",
  COMPLETED: "Mark as Completed",
  NO_SHOW: "Mark as No-Show",
  PENDING: "Reset to Pending",
};

const TRANSITION_ICONS: Partial<Record<AppointmentStatus, React.ComponentType>> = {
  CONFIRMED: CheckCircle,
  CANCELLED: Cancel,
  COMPLETED: CheckCircle,
  NO_SHOW: Warning,
};

const TRANSITION_COLORS: Partial<Record<AppointmentStatus, "success" | "error" | "primary" | "default">> = {
  CONFIRMED: "success",
  CANCELLED: "error",
  COMPLETED: "primary",
  NO_SHOW: "default",
};

const STATE_ORDER: AppointmentStatus[] = ["PENDING", "CONFIRMED", "COMPLETED"];

interface AppointmentDetailProps {
  appointment: Appointment | null;
}

export default function AppointmentDetail({appointment}: AppointmentDetailProps) {
  const [currentStatus, setCurrentStatus] = useState<AppointmentStatus>(appointment?.status ?? "PENDING");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  // If the appointment is not found, show a message
  if (!appointment) {
    return (
      <Box sx={{textAlign: "center", py: 12}}>
        <Typography variant="h6" color="text.secondary">
          Appointment not found
        </Typography>
        <Button component={Link} href="/appointments" variant="ghost" startIcon={<ArrowBack />} sx={{mt: 2}}>
          Back to appointments
        </Button>
      </Box>
    );
  }

  const {doctor, patient, clinic} = appointment;
  const availableTransitions = getAvailableTransitions(currentStatus);
  const displayId = appointment.id.length > 12 ? appointment.id.slice(0, 8) : appointment.id;

  const handleTransition = (newStatus: AppointmentStatus) => {
    if (newStatus === "CANCELLED") {
      setShowCancelModal(true);
      return;
    }
    if (canTransition(currentStatus, newStatus)) {
      setCurrentStatus(newStatus);
    }
  };

  const handleCancel = () => {
    setCurrentStatus("CANCELLED");
    setShowCancelModal(false);
  };

  const isFinalState = currentStatus === "CANCELLED" || currentStatus === "COMPLETED" || currentStatus === "NO_SHOW";

  return (
    <Box sx={{maxWidth: 1400, mx: "auto", py: 3}}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{mb: 3}}>
        <IconButton component={Link} href="/appointments">
          <ArrowBack />
        </IconButton>
        <Box flex={1}>
          <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
            <Typography variant="h5" fontWeight={700}>
              Appointment #{displayId}
            </Typography>
            <StatusBadge status={currentStatus} />
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{mt: 0.5}}>
            {formatDateBerlin(appointment.scheduledAt)} at {formatTimeBerlin(appointment.scheduledAt)} · {formatDuration(appointment.durationMinutes)}
          </Typography>
        </Box>
      </Stack>

      <Grid container spacing={3}>
        <Grid size={{xs: 12, lg: 8}}>
          <Stack spacing={2}>
            <Card>
              <Stack direction="row" spacing={1} alignItems="center" sx={{mb: 3}}>
                <FavoriteBorder color="primary" fontSize="small" />
                <Typography variant="subtitle2" fontWeight={700} sx={{textTransform: "uppercase", color: "text.secondary"}}>
                  Appointment Status
                </Typography>
              </Stack>

              <Stepper activeStep={STATE_ORDER.indexOf(currentStatus)} alternativeLabel sx={{mb: 3}}>
                {STATE_ORDER.map((state) => {
                  const config = STATUS_CONFIG[state];
                  return (
                    <Step key={state} completed={STATE_ORDER.indexOf(currentStatus) > STATE_ORDER.indexOf(state)}>
                      <StepLabel>{config.label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>

              {(currentStatus === "CANCELLED" || currentStatus === "NO_SHOW") && (
                <Box sx={{mb: 3, textAlign: "center"}}>
                  <StatusBadge status={currentStatus} size="medium" />
                </Box>
              )}

              {!isFinalState && availableTransitions.length > 0 && (
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{mb: 1.5, display: "block"}}>
                    Available actions:
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {availableTransitions.map((nextStatus) => {
                      const Icon = TRANSITION_ICONS[nextStatus];
                      const color = TRANSITION_COLORS[nextStatus] || "default";
                      return (
                        <Button
                          key={nextStatus}
                          onClick={() => handleTransition(nextStatus)}
                          variant="primary"
                          startIcon={Icon && <Icon />}
                          size="small"
                          sx={{
                            bgcolor: `${color}.main`,
                            "&:hover": {bgcolor: `${color}.dark`},
                          }}
                        >
                          {TRANSITION_LABELS[nextStatus]}
                        </Button>
                      );
                    })}
                  </Stack>
                </Box>
              )}

              {isFinalState && (
                <Paper sx={{p: 2, bgcolor: "grey.50"}}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <CheckCircle color="disabled" fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      This appointment has reached a final state and cannot be modified.
                    </Typography>
                  </Stack>
                </Paper>
              )}
            </Card>

            <Card>
              <Typography variant="subtitle2" fontWeight={700} sx={{textTransform: "uppercase", color: "text.secondary", mb: 2}}>
                Appointment Details
              </Typography>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <Box sx={{p: 1.5, bgcolor: "primary.lighter", borderRadius: 2}}>
                    <CalendarMonth color="primary" fontSize="small" />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Date & Time
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {formatDateBerlin(appointment.scheduledAt)} at {formatTimeBerlin(appointment.scheduledAt)} (Europe/Berlin)
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={2}>
                  <Box sx={{p: 1.5, bgcolor: "secondary.lighter", borderRadius: 2}}>
                    <Schedule color="secondary" fontSize="small" />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Duration
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {formatDuration(appointment.durationMinutes)}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={2}>
                  <Box sx={{p: 1.5, bgcolor: "info.lighter", borderRadius: 2}}>
                    <Description color="info" fontSize="small" />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Type
                    </Typography>
                    <Box sx={{mt: 0.5}}>
                      <TypeBadge type={appointment.type} />
                    </Box>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={2}>
                  <Box sx={{p: 1.5, bgcolor: "warning.lighter", borderRadius: 2}}>
                    <Description color="warning" fontSize="small" />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Reason for Visit
                    </Typography>
                    <Typography variant="body2">{appointment.reason}</Typography>
                  </Box>
                </Stack>

                {appointment.notes && (
                  <Stack direction="row" spacing={2}>
                    <Box sx={{p: 1.5, bgcolor: "primary.lighter", borderRadius: 2}}>
                      <Description color="primary" fontSize="small" />
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Clinical Notes
                      </Typography>
                      <Typography variant="body2">{appointment.notes}</Typography>
                    </Box>
                  </Stack>
                )}

                {(appointment.cancelReason || (currentStatus === "CANCELLED" && cancelReason)) && (
                  <Paper sx={{p: 2, bgcolor: "error.lighter"}}>
                    <Stack direction="row" spacing={1.5}>
                      <Cancel color="error" fontSize="small" sx={{mt: 0.25}} />
                      <Box>
                        <Typography variant="caption" color="error.dark" fontWeight={600}>
                          Cancellation Reason
                        </Typography>
                        <Typography variant="body2" color="error.dark">
                          {cancelReason || appointment.cancelReason}
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>
                )}
              </Stack>
            </Card>

            {clinic && (
              <Card>
                <Typography variant="subtitle2" fontWeight={700} sx={{textTransform: "uppercase", color: "text.secondary", mb: 2}}>
                  Location
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Box sx={{p: 1.5, bgcolor: "error.lighter", borderRadius: 2}}>
                    <LocationOn color="error" fontSize="small" />
                  </Box>
                  <Box>
                    <Typography variant="body2" fontWeight={600}>
                      {clinic.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{mt: 0.5}}>
                      {clinic.address?.street}, {clinic.address?.postalCode} {clinic.address?.city}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {clinic.address?.state}
                    </Typography>
                    <Stack direction="row" spacing={2} sx={{mt: 1.5}}>
                      <Button component="a" href={`tel:${clinic.phone}`} variant="ghost" startIcon={<Phone fontSize="small" />} size="small">
                        {clinic.phone}
                      </Button>
                      <Button component="a" href={`mailto:${clinic.email}`} variant="ghost" startIcon={<Email fontSize="small" />} size="small">
                        {clinic.email}
                      </Button>
                    </Stack>
                  </Box>
                </Stack>
              </Card>
            )}
          </Stack>
        </Grid>

        <Grid size={{xs: 12, lg: 4}}>
          <Stack spacing={2}>
            {doctor && (
              <Card>
                <Typography variant="caption" fontWeight={700} sx={{textTransform: "uppercase", color: "text.secondary", mb: 2, display: "block"}}>
                  Doctor
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center" sx={{mb: 2}}>
                  <Avatar src={doctor.avatarUrl} firstName={doctor.firstName} lastName={doctor.lastName} size="lg" />
                  <Box>
                    <Typography variant="body2" fontWeight={600}>
                      {doctor.firstName} {doctor.lastName}
                    </Typography>
                    <Typography variant="caption" color="primary" fontWeight={500}>
                      {doctor.specialization}
                    </Typography>
                  </Box>
                </Stack>
                <Stack spacing={1} sx={{mb: 2}}>
                  <Typography variant="caption" color="text.secondary" display="flex" alignItems="center" gap={1}>
                    <Phone fontSize="inherit" />
                    {doctor.phone}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="flex" alignItems="center" gap={1}>
                    <Email fontSize="inherit" />
                    {doctor.email}
                  </Typography>
                </Stack>
                <Button
                  component={Link}
                  href={`/doctors/${doctor.id}`}
                  variant="ghost"
                  fullWidth
                  endIcon={<ChevronRight fontSize="small" />}
                  size="small"
                  sx={{bgcolor: "primary.lighter", color: "primary.main"}}
                >
                  View doctor profile
                </Button>
              </Card>
            )}

            {patient && (
              <Card>
                <Typography variant="caption" fontWeight={700} sx={{textTransform: "uppercase", color: "text.secondary", mb: 2, display: "block"}}>
                  Patient
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center" sx={{mb: 2}}>
                  <Avatar src={patient.avatarUrl} firstName={patient.firstName} lastName={patient.lastName} size="lg" />
                  <Box>
                    <Typography variant="body2" fontWeight={600}>
                      {patient.firstName} {patient.lastName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      DOB: {patient.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString("de-DE") : "—"}
                    </Typography>
                  </Box>
                </Stack>
                <Stack spacing={1} sx={{mb: patient.medicalHistory?.length ? 2 : 0}}>
                  <Typography variant="caption" color="text.secondary" display="flex" alignItems="center" gap={1}>
                    <Phone fontSize="inherit" />
                    {patient.phone}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="flex" alignItems="center" gap={1}>
                    <Email fontSize="inherit" />
                    {patient.email}
                  </Typography>
                  {patient.insuranceNumber && (
                    <Typography variant="caption" color="text.secondary" display="flex" alignItems="center" gap={1}>
                      <Description fontSize="inherit" />
                      Insurance: {patient.insuranceNumber}
                    </Typography>
                  )}
                </Stack>
                {patient.medicalHistory && patient.medicalHistory.length > 0 && (
                  <Box sx={{pt: 2, borderTop: 1, borderColor: "divider"}}>
                    <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{mb: 1, display: "block"}}>
                      Medical History
                    </Typography>
                    <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                      {patient.medicalHistory.map((item) => (
                        <Chip key={item} label={item} size="small" color="warning" sx={{fontSize: "0.65rem"}} />
                      ))}
                    </Stack>
                  </Box>
                )}
              </Card>
            )}

            <Card>
              <Typography variant="caption" fontWeight={700} sx={{textTransform: "uppercase", color: "text.secondary", mb: 2, display: "block"}}>
                Metadata
              </Typography>
              <Stack spacing={1.5}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">
                    Appointment ID
                  </Typography>
                  <Typography variant="caption" fontFamily="monospace" fontWeight={600} sx={{wordBreak: "break-all"}}>
                    {appointment.id}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">
                    Created
                  </Typography>
                  <Typography variant="caption" fontWeight={600}>
                    {formatDateBerlin(appointment.createdAt)}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">
                    Last Updated
                  </Typography>
                  <Typography variant="caption" fontWeight={600}>
                    {formatDateBerlin(appointment.updatedAt)}
                  </Typography>
                </Stack>
                {doctor && "consultationFee" in doctor && (
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption" color="text.secondary">
                      Consultation Fee
                    </Typography>
                    <Typography variant="caption" fontWeight={700}>
                      {formatCurrency(doctor.consultationFee)}
                    </Typography>
                  </Stack>
                )}
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      <Dialog
        open={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        title="Cancel Appointment"
        actions={
          <>
            <Button onClick={() => setShowCancelModal(false)} variant="outline">
              Keep Appointment
            </Button>
            <Button onClick={handleCancel} variant="primary" sx={{bgcolor: "error.main", "&:hover": {bgcolor: "error.dark"}}}>
              Cancel Appointment
            </Button>
          </>
        }
      >
        <Stack spacing={2}>
          <Paper sx={{p: 2, bgcolor: "error.lighter"}}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Cancel color="error" />
              <Box>
                <Typography variant="body2" fontWeight={600} color="error.dark">
                  This action cannot be undone
                </Typography>
                <Typography variant="caption" color="error.dark">
                  Please provide a reason for cancellation
                </Typography>
              </Box>
            </Stack>
          </Paper>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Reason for cancellation"
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            placeholder="Please provide a reason..."
            sx={{"& .MuiOutlinedInput-root": {borderRadius: 3}}}
          />
        </Stack>
      </Dialog>
    </Box>
  );
}
