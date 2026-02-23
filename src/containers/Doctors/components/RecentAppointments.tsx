import {Appointment, Doctor} from "@/types";
import {ChevronRight} from "@mui/icons-material";
import { Paper, Stack, Typography, Button, Divider, Box, StatusBadge } from "@/lib/mui";
import Link from "next/link";

export default function RecentAppointments({appointments, doctor}: {appointments: Appointment[]; doctor: Doctor}) {
  return (
    appointments?.length > 0 && (
      <Paper sx={{p: 3}}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="subtitle2" color="text.secondary" fontWeight={700}>
            Recent Appointments
          </Typography>
          <Link href={`/appointments?doctor=${doctor.id}`} passHref>
            <Button size="small" color="primary" endIcon={<ChevronRight />}>
              View All
            </Button>
          </Link>
        </Stack>
        <Stack divider={<Divider />} spacing={1}>
          {appointments?.map((apt) => (
            <Link key={apt.id} href={`/appointments/${apt.id}`} passHref>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  px: 1,
                  py: 1.5,
                  borderRadius: 1,
                  "&:hover": {bgcolor: "grey.50", cursor: "pointer"},
                }}
              >
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    {apt.patient?.firstName} {apt.patient?.lastName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(apt.scheduledAt).toLocaleDateString("de-DE")} ·{" "}
                    {new Date(apt.scheduledAt).toLocaleTimeString("de-DE", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                </Box>
                <StatusBadge status={apt.status} />
              </Stack>
            </Link>
          ))}
        </Stack>
      </Paper>
    )
  );
}
