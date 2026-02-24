"use client";

import { Check, LocationOn } from "@/lib/mui/icons";
import { Box, Stack, Typography, Paper, Grid, Avatar, Alert } from "@/lib/mui/components";
import { formatCurrency } from "@/lib/utils";
import { APPOINTMENT_TYPES } from "../constants";
import type { Doctor, Clinic } from "@/types";
import type { AppointmentType } from "@/types";
import type { TimeSlot } from "@/types";

interface ReviewStepProps {
  selectedDoctor: Doctor;
  clinic: Clinic | null;
  selectedDate: string;
  selectedSlot: TimeSlot | null;
  selectedType: AppointmentType | "";
  reason: string;
}

export default function ReviewStep({
  selectedDoctor,
  clinic,
  selectedDate,
  selectedSlot,
  selectedType,
  reason,
}: ReviewStepProps) {
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Check color="primary" />
        <Typography variant="h6" fontWeight={600}>
          Review & Confirm
        </Typography>
      </Stack>

      <Paper
        sx={{
          p: 3,
          border: 1,
          borderColor: "primary.light",
          bgcolor: "primary.lighter",
        }}
      >
        <Typography
          variant="caption"
          fontWeight={700}
          color="primary.dark"
          sx={{ textTransform: "uppercase", mb: 2, display: "block" }}
        >
          Appointment Summary
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <Avatar
            src={selectedDoctor.avatarUrl}
            firstName={selectedDoctor.firstName}
            lastName={selectedDoctor.lastName}
            size="lg"
          />
          <Box flex={1}>
            <Typography variant="body1" fontWeight={700} color="text.primary">
              {selectedDoctor.firstName} {selectedDoctor.lastName}
            </Typography>
            <Typography variant="body2" color="primary.main">
              {selectedDoctor.specialization}
            </Typography>
            {clinic && (
              <Stack direction="row" spacing={0.5} alignItems="center">
                <LocationOn sx={{ fontSize: 12, color: "text.disabled" }} />
                <Typography variant="caption" color="text.secondary">
                  {clinic.name}, {clinic.address.city}
                </Typography>
              </Stack>
            )}
          </Box>
        </Stack>

        <Grid container spacing={1.5} sx={{ mb: 2 }}>
          {[
            {
              label: "Date",
              value: selectedDate
                ? new Date(selectedDate).toLocaleDateString("de-DE", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "-",
            },
            { label: "Time", value: selectedSlot?.startTime ? `${selectedSlot.startTime} (30 min)` : "-" },
            { label: "Type", value: APPOINTMENT_TYPES.find((t) => t.value === selectedType)?.label || "-" },
            { label: "Fee", value: formatCurrency(selectedDoctor.consultationFee) },
          ].map((item) => (
            <Grid size={{ xs: 6 }} key={item.label}>
              <Paper sx={{ p: 1.5, bgcolor: "background.paper" }}>
                <Typography variant="caption" color="text.secondary">
                  {item.label}
                </Typography>
                <Typography variant="body2" fontWeight={600} color="text.primary">
                  {item.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Paper sx={{ p: 1.5, bgcolor: "background.paper" }}>
          <Typography variant="caption" color="text.secondary">
            Reason
          </Typography>
          <Typography variant="body2" color="text.primary">
            {reason}
          </Typography>
        </Paper>
      </Paper>

      <Alert severity="warning">
        You will receive an email confirmation at your registered address. Your appointment will be in PENDING status
        until confirmed by the practice.
      </Alert>
    </Stack>
  );
}
