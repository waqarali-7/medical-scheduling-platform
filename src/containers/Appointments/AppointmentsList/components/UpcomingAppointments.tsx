import { ArrowForward, CalendarMonth, Add } from "@mui/icons-material";
import { Grid, Stack, Typography, Box } from "@/lib/mui";
import Link from "next/link";
import { Button, Card } from "@/lib/mui";
import { Appointment } from "@/types";
import { AppointmentCard } from "./AppointmentCard";

export function UpcomingAppointments({ appointments }: { appointments: Appointment[] }) {
  return (
    <Grid size={{ xs: 12, xl: 8 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h6" fontWeight={600}>
          Upcoming Appointments
        </Typography>
        <Button
          component={Link}
          href="/appointments"
          variant="ghost"
          endIcon={<ArrowForward fontSize="small" />}
          size="small"
        >
          View all
        </Button>
      </Stack>
      {appointments.length > 0 ? (
        <Stack spacing={2}>
          {appointments.map((apt) => (
            <AppointmentCard key={apt.id} appointment={apt} view="patient" />
          ))}
        </Stack>
      ) : (
        <Card>
          <Box sx={{ textAlign: "center", py: 5 }}>
            <CalendarMonth sx={{ fontSize: 48, color: "action.disabled", mb: 2 }} />
            <Typography variant="body2" color="text.secondary">
              No upcoming appointments
            </Typography>
            <Button component={Link} href="/appointments/new" variant="ghost" startIcon={<Add />} sx={{ mt: 2 }}>
              Book your first appointment
            </Button>
          </Box>
        </Card>
      )}
    </Grid>
  );
}
