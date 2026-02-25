"use client";

import { Description } from "@/lib/mui/icons";
import { Box, Stack, Typography, Grid, Paper, TextField } from "@/lib/mui/components";
import { APPOINTMENT_TYPES } from "../constants";
import type { AppointmentType } from "@/types";

interface DetailsStepProps {
  selectedType: AppointmentType | "";
  reason: string;
  notes: string | undefined;
  onTypeSelect: (type: AppointmentType) => void;
  onReasonChange: (value: string) => void;
  onNotesChange: (value: string) => void;
}

export default function DetailsStep({
  selectedType,
  reason,
  notes,
  onTypeSelect,
  onReasonChange,
  onNotesChange,
}: DetailsStepProps) {
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Description color="primary" />
        <Typography variant="h6" fontWeight={600}>
          Appointment Details
        </Typography>
      </Stack>

      <Box>
        <Typography variant="body2" fontWeight={600} sx={{ mb: 2 }}>
          Appointment Type{" "}
          <Box component="span" color="error.main">
            *
          </Box>
        </Typography>
        <Grid container spacing={1}>
          {APPOINTMENT_TYPES.map((type) => (
            <Grid size={{ xs: 12, sm: 6 }} key={type.value}>
              <Paper
                onClick={() => onTypeSelect(type.value)}
                sx={{
                  p: 2,
                  cursor: "pointer",
                  border: 2,
                  borderColor: selectedType === type.value ? "primary.main" : "divider",
                  transition: "border-color 0.2s, background-color 0.2s",
                  "&:hover": { borderColor: "primary.light" },
                }}
              >
                <Typography variant="body2" fontWeight={600} color="text.primary">
                  {type.label}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {type.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      <TextField
        fullWidth
        label="Reason for Visit *"
        multiline
        rows={3}
        value={reason}
        onChange={(e) => onReasonChange(e.target.value)}
        placeholder="Briefly describe your symptoms or reason for the appointment..."
        helperText={
          <Typography component="span" variant="caption" color={reason.length < 10 ? "error" : "text.secondary"}>
            {reason.length} characters (minimum 10)
          </Typography>
        }
      />

      <TextField
        fullWidth
        label="Additional Notes (optional)"
        multiline
        rows={2}
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        placeholder="Any medications, allergies, or other information for the doctor..."
      />
    </Stack>
  );
}
