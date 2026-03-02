"use client";

import { Business } from "@/lib/mui/icons";
import { Stack, Typography, TextField } from "@/lib/mui/components";
import type { BasicInfoStepProps } from "../types";

export default function BasicInfoStep({ formData, onChange }: BasicInfoStepProps) {
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Business color="primary" />
        <Typography variant="h6" fontWeight={600}>
          Basic Information
        </Typography>
      </Stack>

      <TextField
        fullWidth
        label="Clinic Name"
        value={formData.name}
        onChange={(e) => onChange("name", e.target.value)}
        placeholder="e.g., Berlin Medical Center"
        required
      />

      <TextField
        fullWidth
        label="Phone Number"
        type="number"
        value={formData.phone}
        onChange={(e) => onChange("phone", e.target.value)}
        placeholder="e.g., +49 30 1234567"
        required
      />

      <TextField
        fullWidth
        label="Email Address"
        type="email"
        value={formData.email}
        onChange={(e) => onChange("email", e.target.value)}
        placeholder="e.g., contact@clinic.de"
        required
        error={formData.email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)}
        helperText={
          formData.email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
            ? "Please enter a valid email"
            : ""
        }
      />

      <TextField
        fullWidth
        label="Website (optional)"
        value={formData.website}
        onChange={(e) => onChange("website", e.target.value)}
        placeholder="e.g., https://www.clinic.de"
      />
    </Stack>
  );
}
