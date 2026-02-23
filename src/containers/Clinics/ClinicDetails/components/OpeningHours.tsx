import { Stack, Card, Typography } from "@/lib/mui";
import type { Day, OpeningHoursProps } from "../types";
import { DAY_LABELS } from "../constants";

export function OpeningHours({ openingHours, today }: OpeningHoursProps) {
  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
        Opening Hours
      </Typography>
      <Stack spacing={1}>
        {(Object.keys(DAY_LABELS) as Day[]).map((day) => {
          const hours = openingHours[day];
          const isToday = today === day;

          return (
            <Stack
              key={day}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                px: 1.5,
                py: 1,
                borderRadius: 2,
                bgcolor: isToday ? "primary.lighter" : "transparent",
              }}
            >
              <Typography
                variant="body2"
                fontWeight={isToday ? 600 : 400}
                color={isToday ? "primary.dark" : "text.secondary"}
              >
                {DAY_LABELS[day]}
              </Typography>
              <Typography
                variant="body2"
                fontWeight={isToday ? 600 : 400}
                color={isToday ? "primary.dark" : "text.primary"}
              >
                {hours?.isOpen ? `${hours.from} – ${hours.to}` : "Closed"}
              </Typography>
            </Stack>
          );
        })}
      </Stack>
    </Card>
  );
}
