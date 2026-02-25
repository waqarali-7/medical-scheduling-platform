import { ArrowForward, CalendarMonth, Add } from "@/lib/mui/icons";
import { Grid, Stack, Typography, Box, Button } from "@/lib/mui/components";
import { AppointmentCard } from "./AppointmentCard";
import { EmptyState } from "@/components/common";
import { Appointment } from "@/types";
import Link from "next/link";

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
        <EmptyState
          element={<CalendarMonth sx={{ fontSize: 48 }} />}
          primary="No upcoming appointments"
          cta={
            <Box sx={{ justifyContent: "center", display: "flex" }}>
              <Button component={Link} href="/appointments/new" variant="secondary" startIcon={<Add />} sx={{ mt: 2 }}>
                Book your first appointment
              </Button>
            </Box>
          }
        />
      )}
    </Grid>
  );
}
