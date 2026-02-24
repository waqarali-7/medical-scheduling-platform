import Link from "next/link";
import { Box, Stack, Typography, Divider, Avatar, Button, Chip, StatusBadge, Card } from "@/lib/mui/components";
import { Phone, Email, LocationOn, CalendarToday, ChevronRight } from "@/lib/mui/icons";
import type { PatientCardProps } from "../types";

export function PatientCard({ patient, appointmentCount, lastAppointmentStatus }: PatientCardProps) {
  const addressLine =
    patient.address && patient.address.city != null && patient.address.state != null
      ? `${patient.address.city}, ${patient.address.state}`
      : null;

  return (
    <Card sx={{ p: 3 }}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Avatar size="xl" src={patient.avatarUrl} firstName={patient.firstName} lastName={patient.lastName}></Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="subtitle1" fontWeight={600} noWrap color="text.primary">
            {patient.firstName} {patient.lastName}
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            DOB: {patient.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString("de-DE") : "N/A"}
          </Typography>
          {patient.insuranceNumber ? (
            <Typography variant="caption" color="text.secondary" display="block">
              Ins: {patient.insuranceNumber}
            </Typography>
          ) : (
            <Typography sx={{ minHeight: 20 }} />
          )}
        </Box>
      </Stack>

      <Stack spacing={1} sx={{ mb: 2 }}>
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
        {addressLine && (
          <Stack direction="row" spacing={1} alignItems="center">
            <LocationOn sx={{ fontSize: 16 }} color="action" />
            <Typography variant="caption" color="text.secondary">
              {addressLine}
            </Typography>
          </Stack>
        )}
      </Stack>

      {patient.medicalHistory && patient.medicalHistory.length > 0 ? (
        <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ minHeight: 25 }}>
          {patient.medicalHistory.map((item, index) => (
            <Chip key={index} label={item} size="small" color="warning" variant="outlined" />
          ))}
        </Stack>
      ) : (
        <Stack sx={{ minHeight: 25 }}></Stack>
      )}

      <Divider sx={{ mb: 2 }} />

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={1} alignItems="center">
          <CalendarToday sx={{ fontSize: 16 }} color="action" />
          <Typography variant="caption" color="text.secondary">
            {appointmentCount} appointment{appointmentCount !== 1 ? "s" : ""}
          </Typography>
          {lastAppointmentStatus && <StatusBadge status={lastAppointmentStatus} />}
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
    </Card>
  );
}
