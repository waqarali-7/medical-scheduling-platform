"use client";

import { CalendarMonth, Schedule } from "@mui/icons-material";
import { Box, Stack, Typography, Grid, Paper, Button, Avatar, Alert } from "@/lib/mui";
import type { Doctor, TimeSlot } from "@/types";

interface DateTimeStepProps {
  selectedDoctor: Doctor | null;
  availableDates: string[];
  slots: TimeSlot[];
  selectedDate: string;
  selectedSlot: TimeSlot | null;
  onDateSelect: (date: string) => void;
  onSlotSelect: (slot: TimeSlot) => void;
}

export default function DateTimeStep({
  selectedDoctor,
  availableDates,
  slots,
  selectedDate,
  selectedSlot,
  onDateSelect,
  onSlotSelect,
}: DateTimeStepProps) {
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={1} alignItems="center">
        <CalendarMonth color="primary" />
        <Typography variant="h6" fontWeight={600}>
          Select Date & Time
        </Typography>
      </Stack>

      {selectedDoctor && (
        <Paper sx={{ p: 2, bgcolor: "primary.lighter", border: 1, borderColor: "primary.light" }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              src={selectedDoctor.avatarUrl}
              firstName={selectedDoctor.firstName}
              lastName={selectedDoctor.lastName}
              size="sm"
            />
            <Box>
              <Typography variant="body2" fontWeight={700} color="primary.dark">
                {selectedDoctor.firstName} {selectedDoctor.lastName}
              </Typography>
              <Typography variant="caption" color="primary.main">
                {selectedDoctor.specialization}
              </Typography>
            </Box>
          </Stack>
        </Paper>
      )}

      <Box>
        <Typography variant="body2" fontWeight={600} sx={{ mb: 2 }}>
          Available Dates
        </Typography>
        <Grid container spacing={1}>
          {availableDates.map((date) => {
            const d = new Date(date);
            const isSelected = selectedDate === date;
            return (
              <Grid size={{ xs: 3, sm: 12 / 7 }} key={date}>
                <Paper
                  onClick={() => onDateSelect(date)}
                  sx={{
                    p: 1.5,
                    textAlign: "center",
                    cursor: "pointer",
                    border: 2,
                    borderColor: isSelected ? "primary.main" : "divider",
                    bgcolor: isSelected ? "primary.main" : "background.paper",
                    transition: "border-color 0.2s, background-color 0.2s",
                    "&:hover": {
                      borderColor: "primary.light",
                      bgcolor: isSelected ? "primary.main" : "action.hover",
                    },
                  }}
                >
                  <Typography variant="caption" color={isSelected ? "primary.contrastText" : "text.secondary"}>
                    {d.toLocaleDateString("de-DE", { weekday: "short" })}
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    color={isSelected ? "primary.contrastText" : "text.primary"}
                    sx={{ lineHeight: 1, my: 0.5 }}
                  >
                    {d.getDate()}
                  </Typography>
                  <Typography variant="caption" color={isSelected ? "primary.contrastText" : "text.secondary"}>
                    {d.toLocaleDateString("de-DE", { month: "short" })}
                  </Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {selectedDate && (
        <Box>
          <Typography variant="body2" fontWeight={600} sx={{ mb: 2 }}>
            Available Time Slots
          </Typography>
          <Grid container spacing={1}>
            {slots.map((slot) => (
              <Grid size={{ xs: 4, sm: 2.4 }} key={slot.id}>
                <Button
                  fullWidth
                  onClick={() => slot.isAvailable && onSlotSelect(slot)}
                  disabled={!slot.isAvailable}
                  variant={selectedSlot?.id === slot.id ? "primary" : "outline"}
                  size="small"
                  sx={{ py: 1 }}
                >
                  {slot.startTime}
                </Button>
              </Grid>
            ))}
          </Grid>

          {selectedSlot && (
            <Alert severity="success" sx={{ mt: 2 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Schedule fontSize="small" />
                <Typography variant="body2">Selected: {selectedSlot.startTime} · 30 min appointment</Typography>
              </Stack>
            </Alert>
          )}
        </Box>
      )}
    </Stack>
  );
}
