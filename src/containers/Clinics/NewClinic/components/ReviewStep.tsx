"use client";

import { Check, LocationOn, Schedule, LocalHospital, Business } from "@mui/icons-material";
import { Stack, Typography, Paper, Grid, Box, Chip, Alert } from "@/lib/mui";
import { DAY_LABELS } from "../constants";
import type { ReviewStepProps } from "../types";

export default function ReviewStep({ formData }: ReviewStepProps) {
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Check color="primary" />
        <Typography variant="h6" fontWeight={600}>
          Review & Confirm
        </Typography>
      </Stack>

      <Alert severity="info">
        Please review all the information below before submitting. You can go back to edit any section if needed.
      </Alert>

      {/* Basic Info */}
      <Paper sx={{ p: 3 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <Business color="primary" fontSize="small" />
          <Typography variant="subtitle1" fontWeight={600}>
            Basic Information
          </Typography>
        </Stack>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="caption" color="text.secondary">
              Clinic Name
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {formData.name}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="caption" color="text.secondary">
              Phone
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {formData.phone}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="caption" color="text.secondary">
              Email
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {formData.email}
            </Typography>
          </Grid>
          {formData.website && (
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="caption" color="text.secondary">
                Website
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {formData.website}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Paper>

      {/* Location */}
      <Paper sx={{ p: 3 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <LocationOn color="primary" fontSize="small" />
          <Typography variant="subtitle1" fontWeight={600}>
            Location
          </Typography>
        </Stack>
        <Box>
          <Typography variant="body2">{formData.street}</Typography>
          <Typography variant="body2">
            {formData.postalCode} {formData.city}
          </Typography>
          <Typography variant="body2">{formData.state}</Typography>
        </Box>
      </Paper>

      {/* Opening Hours */}
      <Paper sx={{ p: 3 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <Schedule color="primary" fontSize="small" />
          <Typography variant="subtitle1" fontWeight={600}>
            Opening Hours
          </Typography>
        </Stack>
        <Stack spacing={0.5}>
          {Object.entries(formData.openingHours).map(([day, hours]) => (
            <Stack key={day} direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                {DAY_LABELS[day as keyof typeof DAY_LABELS]}
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {hours.isOpen ? `${hours.from} – ${hours.to}` : "Closed"}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Paper>

      {/* Specializations */}
      <Paper sx={{ p: 3 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <LocalHospital color="primary" fontSize="small" />
          <Typography variant="subtitle1" fontWeight={600}>
            Specializations ({formData.specializations.length})
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {formData.specializations.map((spec) => (
            <Chip key={spec} label={spec} color="primary" size="small" />
          ))}
        </Stack>
      </Paper>
    </Stack>
  );
}
