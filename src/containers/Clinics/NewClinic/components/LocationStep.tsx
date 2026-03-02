"use client";

import { LocationOn } from "@/lib/mui/icons";
import { Stack, Typography, TextField, Grid } from "@/lib/mui/components";
import type { LocationStepProps } from "../types";

export default function LocationStep({ formData, onChange }: LocationStepProps) {
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={1} alignItems="center">
        <LocationOn color="primary" />
        <Typography variant="h6" fontWeight={600}>
          Clinic Location
        </Typography>
      </Stack>

      <TextField
        fullWidth
        label="Street Address"
        value={formData.street}
        onChange={(e) => onChange("street", e.target.value)}
        placeholder="e.g., Friedrichstraße 123"
        required
      />

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            fullWidth
            label="Postal Code"
            value={formData.postalCode}
            onChange={(e) => onChange("postalCode", e.target.value)}
            placeholder="e.g., 10117"
            required
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 8 }}>
          <TextField
            fullWidth
            label="City"
            value={formData.city}
            onChange={(e) => onChange("city", e.target.value)}
            placeholder="e.g., Berlin"
            required
          />
        </Grid>
      </Grid>

      <TextField
        fullWidth
        label="State/Region"
        value={formData.state}
        onChange={(e) => onChange("state", e.target.value)}
        placeholder="e.g., Berlin"
        required
      />
    </Stack>
  );
}
