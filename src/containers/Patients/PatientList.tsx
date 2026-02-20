"use client";
import { Appointment, Patient } from "@/types";
import Link from "next/link";
import { Box, Grid, Stack, Typography, Chip, Divider, Avatar } from "@mui/material";
import { Phone, Email, LocationOn, CalendarToday, ChevronRight } from "@mui/icons-material";
import { Button, StatusBadge } from "@/components/ui";

export default function PatientList({ patients, appointments }: { patients: Patient[]; appointments: Appointment[] }) {
  return (
    <Stack spacing={4}>
      {/* Header */}
      <Box>
        <Typography variant="h4" component="h1" color="text.primary">
          Patients
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          {patients.length} registered patients
        </Typography>
      </Box>

      {patients.length === 0 ? (
        <Box textAlign="center" py={4}>
          <Typography variant="body1" color="text.secondary">
            No patients found.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {patients.map((patient) => {
            const patientAppointments = appointments.filter((a) => a.patientId === patient.id);
            const lastAppt = [...patientAppointments].sort(
              (a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime(),
            )[0];

            return (
              <Grid size={{ xs: 12, sm: 6, xl: 4 }} key={patient.id}>
                <Box
                  sx={{
                    p: 3,
                    height: "100%",
                    borderRadius: 3,
                    border: 1,
                    borderColor: "divider",
                    bgcolor: "background.paper",
                    transition: "box-shadow 0.2s, border-color 0.2s",
                    "&:hover": {
                      boxShadow: 3,
                      borderColor: "primary.light",
                    },
                  }}
                >
                  {/* Avatar + Name */}
                  <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                    <Avatar
                      sx={{
                        width: 56,
                        height: 56,
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                        fontSize: "1.25rem",
                        fontWeight: 700,
                      }}
                    >
                      {patient.firstName.charAt(0)}
                      {patient.lastName.charAt(0)}
                    </Avatar>

                    <Box flex={1} minWidth={0}>
                      <Typography variant="subtitle1" fontWeight={600} noWrap color="text.primary">
                        {patient.firstName} {patient.lastName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        DOB: {patient.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString("de-DE") : "N/A"}
                      </Typography>
                      {patient.insuranceNumber && (
                        <Typography variant="caption" color="text.secondary" display="block">
                          Ins: {patient.insuranceNumber}
                        </Typography>
                      )}
                    </Box>
                  </Stack>

                  {/* Contact Info */}
                  <Stack spacing={1} mb={2}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Phone sx={{ fontSize: 16 }} color="action" />
                      <Typography variant="caption" color="text.secondary">
                        {patient.phone}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Email sx={{ fontSize: 16 }} color="action" />
                      <Typography variant="caption" color="text.secondary">
                        {patient.email}
                      </Typography>
                    </Stack>
                    {patient.address && (
                      <Stack direction="row" spacing={1} alignItems="center">
                        <LocationOn sx={{ fontSize: 16 }} color="action" />
                        <Typography variant="caption" color="text.secondary">
                          {patient.address.city}, {patient.address.state}
                        </Typography>
                      </Stack>
                    )}
                  </Stack>

                  {/* Medical History Tags */}
                  {patient.medicalHistory && patient.medicalHistory.length > 0 && (
                    <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap mb={2}>
                      {patient?.medicalHistory?.map((item, index) => (
                        <Chip key={index} label={item} size="small" color="warning" variant="outlined" />
                      ))}
                    </Stack>
                  )}

                  <Divider sx={{ mb: 2 }} />

                  {/* Footer: appointments + action */}
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CalendarToday sx={{ fontSize: 16 }} color="action" />
                      <Typography variant="caption" color="text.secondary">
                        {patientAppointments.length} appointment
                        {patientAppointments.length !== 1 ? "s" : ""}
                      </Typography>
                      {lastAppt && <StatusBadge status={lastAppt.status} />}
                    </Stack>

                    <Button
                      component={Link}
                      href={`/appointments?patient=${patient.id}`}
                      variant="outline"
                      size="small"
                      endIcon={<ChevronRight />}
                    >
                      View history
                    </Button>
                  </Stack>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Stack>
  );
}
