"use client";

import { useState } from "react";
import { LocalHospital, Add } from "@/lib/mui/icons";
import { Stack, Typography, Paper, Chip, Box, TextField, InputAdornment } from "@/lib/mui/components";
import { SPECIALIZATION_OPTIONS } from "../constants";
import type { SpecializationsStepProps } from "../types";

export default function SpecializationsStep({ specializations, onChange }: SpecializationsStepProps) {
  const [customInput, setCustomInput] = useState("");

  const handleToggle = (spec: string) => {
    if (specializations.includes(spec)) {
      onChange(specializations.filter((s) => s !== spec));
    } else {
      onChange([...specializations, spec]);
    }
  };

  const handleAddCustom = () => {
    const trimmed = customInput.trim();
    if (trimmed && !specializations.includes(trimmed)) {
      onChange([...specializations, trimmed]);
      setCustomInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCustom();
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
        Select all medical specializations available at your clinic. You can select multiple options or add custom ones.
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

      <Box>
        <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
          Add Custom Specialization
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="Type a specialization and press Enter..."
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Add sx={{ color: "text.secondary", fontSize: 20 }} />
              </InputAdornment>
            ),
          }}
          helperText="Press Enter to add custom specialization"
        />
      </Box>

      {specializations.length > 0 && (
        <Paper sx={{ p: 2, bgcolor: "primary.lighter", border: 1, borderColor: "primary.light" }}>
          <Typography variant="caption" fontWeight={600} color="primary.dark" sx={{ display: "block", mb: 1 }}>
            Your Selected Specializations:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {specializations.map((spec) => (
              <Chip key={spec} label={spec} size="small" color="primary" onDelete={() => handleToggle(spec)} />
            ))}
          </Stack>
        </Paper>
      )}
    </Stack>
  );
}
