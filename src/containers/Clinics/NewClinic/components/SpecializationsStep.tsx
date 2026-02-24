"use client";

import { LocalHospital } from "@/lib/mui/icons";
import { Stack, Typography, Paper, Chip, Box } from "@/lib/mui/components";
import { SPECIALIZATION_OPTIONS } from "../constants";
import type { SpecializationsStepProps } from "../types";

export default function SpecializationsStep({ specializations, onChange }: SpecializationsStepProps) {
  const handleToggle = (spec: string) => {
    if (specializations.includes(spec)) {
      onChange(specializations.filter((s) => s !== spec));
    } else {
      onChange([...specializations, spec]);
    }
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={1} alignItems="center">
        <LocalHospital color="primary" />
        <Typography variant="h6" fontWeight={600}>
          Medical Specializations
        </Typography>
      </Stack>

      <Typography variant="body2" color="text.secondary">
        Select all medical specializations available at your clinic. You can select multiple options.
      </Typography>

      <Box>
        <Typography variant="body2" fontWeight={600} sx={{ mb: 2 }}>
          Selected: {specializations.length} specialization{specializations.length !== 1 ? "s" : ""}
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {SPECIALIZATION_OPTIONS.map((spec) => {
            const isSelected = specializations.includes(spec);
            return (
              <Chip
                key={spec}
                label={spec}
                onClick={() => handleToggle(spec)}
                color={isSelected ? "primary" : "default"}
                variant={isSelected ? "filled" : "outlined"}
                sx={{
                  fontWeight: isSelected ? 600 : 400,
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: isSelected ? "primary.dark" : "action.hover",
                  },
                }}
              />
            );
          })}
        </Stack>
      </Box>

      {specializations.length > 0 && (
        <Paper sx={{ p: 2, bgcolor: "primary.lighter", border: 1, borderColor: "primary.light" }}>
          <Typography variant="caption" fontWeight={600} color="primary.dark" sx={{ display: "block", mb: 1 }}>
            Your Selected Specializations:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {specializations.map((spec) => (
              <Chip
                key={spec}
                label={spec}
                size="small"
                color="primary"
                onDelete={() => handleToggle(spec)}
              />
            ))}
          </Stack>
        </Paper>
      )}
    </Stack>
  );
}
