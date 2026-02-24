"use client";

import { Stack, Typography } from "@/lib/mui/components";
import { formatDateBerlin, formatCurrency } from "@/lib/utils";
import type { Appointment, Doctor } from "@/types";

interface MetadataCardProps {
  appointment: Appointment;
  doctor?: Doctor | null;
}

export default function MetadataCard({ appointment, doctor }: MetadataCardProps) {
  return (
    <>
      <Typography variant="caption" fontWeight={700} sx={{ textTransform: "uppercase", color: "text.secondary", mb: 2, display: "block" }}>
        Metadata
      </Typography>
      <Stack spacing={1.5}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="caption" color="text.secondary">
            Appointment ID
          </Typography>
          <Typography variant="caption" fontFamily="monospace" fontWeight={600} sx={{ wordBreak: "break-all" }}>
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
    </>
  );
}
