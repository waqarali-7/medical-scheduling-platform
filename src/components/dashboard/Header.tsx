import { Button } from "@/components/ui";
import NextLink from "@/components/ui/Link";
import { DashboardStats, User } from "@/types";
import { Add, ArrowForward } from "@mui/icons-material";
import { Card, Box, Typography, Stack } from "@mui/material";

interface HeaderProps {
  currentUser: User | null;
  stats: DashboardStats;
}

export default function Header({ currentUser, stats }: HeaderProps) {
  return (
    <Card sx={{ mb: 4 }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="body2" color="text.primary" sx={{ mb: 0.5 }}>
          Good morning,
        </Typography>
        <Typography variant="h4" fontWeight={700} color="text.primary" sx={{ mb: 0.5 }}>
          {currentUser?.firstName ?? "Guest"} {currentUser?.lastName ?? ""} 👋
        </Typography>
        <Typography variant="body2" color="text.secondary">
          You have{" "}
          <Box component="span" fontWeight={700}>
            {stats.todayAppointments} appointment
            {stats.todayAppointments !== 1 ? "s" : ""}
          </Box>{" "}
          today. {stats.pendingAppointments > 0 && <span>{stats.pendingAppointments} pending confirmation.</span>}
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button component={NextLink} href="/appointments/new" variant="primary" startIcon={<Add />}>
            Book Appointment
          </Button>
          <Button
            component={NextLink}
            href="/appointments"
            variant="outline"
            startIcon={<ArrowForward fontSize="small" />}
          >
            View Schedule
          </Button>
        </Stack>
      </Box>
    </Card>
  );
}
