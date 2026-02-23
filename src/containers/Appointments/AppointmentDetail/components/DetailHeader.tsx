"use client";

import Link from "next/link";
import { ArrowBack } from "@mui/icons-material";
import { Box, Stack, Typography, IconButton, StatusBadge } from "@/lib/mui";
import { formatDateBerlin, formatTimeBerlin, formatDuration } from "@/lib/utils";
import type { AppointmentStatus } from "@/types";

interface DetailHeaderProps {
  displayId: string;
  status: AppointmentStatus;
  scheduledAt: string;
  durationMinutes: number;
}

export default function DetailHeader({ displayId, status, scheduledAt, durationMinutes }: DetailHeaderProps) {
  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
      <Link href="/appointments" style={{ display: "inline-flex" }}>
        <IconButton component="span" disableRipple size="small">
          <ArrowBack />
        </IconButton>
      </Link>
      <Box flex={1}>
        <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
          <Typography variant="h5" fontWeight={700}>
            Appointment #{displayId}
          </Typography>
          <StatusBadge status={status} />
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {formatDateBerlin(scheduledAt)} at {formatTimeBerlin(scheduledAt)} · {formatDuration(durationMinutes)}
        </Typography>
      </Box>
    </Stack>
  );
}
