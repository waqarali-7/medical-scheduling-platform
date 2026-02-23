"use client";

import { CalendarMonth, Schedule, Description, Cancel } from "@mui/icons-material";
import { Box, Stack, Typography, Paper, TypeBadge } from "@/lib/mui";
import { formatDateBerlin, formatTimeBerlin, formatDuration } from "@/lib/utils";
import type { Appointment } from "@/types";

interface DetailsCardProps {
  appointment: Appointment;
  cancelReason?: string;
}

export default function DetailsCard({ appointment, cancelReason }: DetailsCardProps) {
  return (
    <>
      <Typography variant="subtitle2" fontWeight={700} sx={{ textTransform: "uppercase", color: "text.secondary", mb: 2 }}>
        Appointment Details
      </Typography>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <Box sx={{ p: 1.5, bgcolor: "primary.lighter", borderRadius: 2 }}>
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
          <Box sx={{ p: 1.5, bgcolor: "secondary.lighter", borderRadius: 2 }}>
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
          <Box sx={{ p: 1.5, bgcolor: "info.lighter", borderRadius: 2 }}>
            <Description color="info" fontSize="small" />
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Type
            </Typography>
            <Box sx={{ mt: 0.5 }}>
              <TypeBadge type={appointment.type} />
            </Box>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Box sx={{ p: 1.5, bgcolor: "warning.lighter", borderRadius: 2 }}>
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
            <Box sx={{ p: 1.5, bgcolor: "primary.lighter", borderRadius: 2 }}>
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

        {(appointment.cancelReason || cancelReason) && (
          <Paper sx={{ p: 2, bgcolor: "error.lighter" }}>
            <Stack direction="row" spacing={1.5}>
              <Cancel color="error" fontSize="small" sx={{ mt: 0.25 }} />
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
    </>
  );
}
