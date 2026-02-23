"use client";

import Link from "next/link";
import { formatTimeBerlin, formatDuration, formatRelativeDate } from "@/lib/utils";
import { StatusBadge, TypeBadge } from "@/lib/mui/Badge";
import Avatar from "@/lib/mui/Avatar";
import { Card } from "@/lib/mui";
import { Stack, Box, Typography } from "@/lib/mui";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PersonIcon from "@mui/icons-material/Person";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { AppointmentCardProps } from "../types";

export function AppointmentCard({ appointment, view = "patient", compact = false }: AppointmentCardProps) {
  const { patient, doctor, clinic } = appointment;

  return (
    <Link href={`/appointments/${appointment.id}`} style={{ textDecoration: "none" }}>
      <Card sx={{ p: 2, mb: 2, cursor: "pointer" }}>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Box sx={{ width: 56, textAlign: "center", flexShrink: 0 }}>
            <Box sx={{ bgcolor: "primary.lighter", borderRadius: 2, p: 1 }}>
              <Typography variant="caption" fontWeight={500} color="primary.main">
                {new Date(appointment.scheduledAt).toLocaleDateString("de-DE", { month: "short" })}
              </Typography>
              <Typography variant="h5" fontWeight={700} color="primary.main" lineHeight={1}>
                {new Date(appointment.scheduledAt).getDate()}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack direction="row" spacing={1} mb={1}>
              <StatusBadge status={appointment.status} />
              <TypeBadge type={appointment.type} />
            </Stack>

            {view === "patient" && doctor && (
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <Avatar src={doctor.avatarUrl} firstName={doctor.firstName} lastName={doctor.lastName} size="xs" />
                <Typography variant="body2" fontWeight={600}>
                  {doctor.firstName} {doctor.lastName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  · {doctor.specialization}
                </Typography>
              </Stack>
            )}

            {view === "doctor" && patient && (
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <PersonIcon fontSize="small" />
                <Typography variant="body2" fontWeight={600}>
                  {patient.firstName} {patient.lastName}
                </Typography>
              </Stack>
            )}

            {view === "admin" && (
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                {doctor && (
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <LocalHospitalIcon fontSize="small" />
                    <Typography variant="body2">
                      {doctor.firstName} {doctor.lastName}
                    </Typography>
                  </Stack>
                )}
                {patient && (
                  <>
                    <Typography variant="body2" color="text.secondary">
                      →
                    </Typography>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <PersonIcon fontSize="small" />
                      <Typography variant="body2">
                        {patient.firstName} {patient.lastName}
                      </Typography>
                    </Stack>
                  </>
                )}
              </Stack>
            )}

            <Typography variant="body2" color="text.secondary" noWrap mb={1}>
              {appointment.reason}
            </Typography>

            {!compact && (
              <Stack direction="row" spacing={2} flexWrap="wrap" color="text.secondary" fontSize={12}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <AccessTimeIcon fontSize="small" />
                  {formatTimeBerlin(appointment.scheduledAt)} · {formatDuration(appointment.durationMinutes)}
                </Stack>
                {clinic && (
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <PlaceIcon fontSize="small" />
                    {clinic.name}
                  </Stack>
                )}
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <CalendarTodayIcon fontSize="small" />
                  {formatRelativeDate(appointment.scheduledAt)}
                </Stack>
              </Stack>
            )}
          </Box>

          <Box sx={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
            <ChevronRightIcon fontSize="small" />
          </Box>
        </Stack>
      </Card>
    </Link>
  );
}
