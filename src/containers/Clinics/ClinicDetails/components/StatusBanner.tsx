import { Paper, Stack, Typography } from "@/lib/mui/components";
import { Schedule } from "@/lib/mui/icons";
import { StatusBannerProps } from "../types";

export function StatusBanner({ todayHours }: StatusBannerProps) {
  return (
    <Paper
      sx={{
        p: 2,
        mb: 3,
        bgcolor: todayHours.isOpen ? "success.lighter" : "error.lighter",
        border: 1,
        borderColor: todayHours.isOpen ? "success.light" : "error.light",
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <Schedule sx={{ color: todayHours.isOpen ? "success.dark" : "error.dark" }} />
        <Typography variant="body1" fontWeight={600} color={todayHours.isOpen ? "success.dark" : "error.dark"}>
          {todayHours.isOpen ? `Open Today: ${todayHours.from} – ${todayHours.to}` : "Closed Today"}
        </Typography>
      </Stack>
    </Paper>
  );
}
