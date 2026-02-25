"use client";

import { Schedule } from "@/lib/mui/icons";
import { Stack, Typography, Box, Switch, TextField, Paper } from "@/lib/mui/components";
import { DAYS, DAY_LABELS } from "../constants";
import type { OpeningHoursStepProps } from "../types";

export default function OpeningHoursStep({ openingHours, onChange }: OpeningHoursStepProps) {
  const handleDayToggle = (day: (typeof DAYS)[number]) => {
    onChange({
      ...openingHours,
      [day]: {
        ...openingHours[day],
        isOpen: !openingHours[day].isOpen,
      },
    });
  };

  const handleTimeChange = (day: (typeof DAYS)[number], field: "from" | "to", value: string) => {
    onChange({
      ...openingHours,
      [day]: {
        ...openingHours[day],
        [field]: value,
      },
    });
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Schedule color="primary" />
        <Typography variant="h6" fontWeight={600}>
          Opening Hours
        </Typography>
      </Stack>

      <Typography variant="body2" color="text.secondary">
        Set your clinic&apos;s operating hours for each day of the week.
      </Typography>

      <Stack spacing={1.5}>
        {DAYS.map((day) => {
          const hours = openingHours[day];
          return (
            <Paper key={day} sx={{ p: 2, border: 1, borderColor: "divider" }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ minWidth: 100 }}>
                  <Typography variant="body2" fontWeight={600}>
                    {DAY_LABELS[day]}
                  </Typography>
                </Box>

                <Switch checked={hours.isOpen} onChange={() => handleDayToggle(day)} color="primary" />

                {hours.isOpen ? (
                  <Stack direction="row" spacing={1.5} flex={1} alignItems="center">
                    <TextField
                      type="time"
                      value={hours.from}
                      onChange={(e) => handleTimeChange(day, "from", e.target.value)}
                      size="small"
                      sx={{ width: 140 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      to
                    </Typography>
                    <TextField
                      type="time"
                      value={hours.to}
                      onChange={(e) => handleTimeChange(day, "to", e.target.value)}
                      size="small"
                      sx={{ width: 140 }}
                    />
                  </Stack>
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
                    Closed
                  </Typography>
                )}
              </Stack>
            </Paper>
          );
        })}
      </Stack>
    </Stack>
  );
}
