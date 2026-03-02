"use client";

import { Box, Grid, Stack } from "@/lib/mui/components";
import { useCurrentUser } from "@/context/CurrentUserContext";
import { Header, Overview } from "./components";
import { AvailableDoctors, DoctorsRecentActivity } from "@/containers/Doctors/components";
import { UpcomingAppointments } from "../Appointments/AppointmentsList/components/UpcomingAppointments";
import { Role } from "@/lib/enums";
import { useDashboardQuery } from "@/hooks/dashboard";
import { default as DashboardLoading } from "./Loading";

export default function DashboardContent() {
  const currentUser = useCurrentUser();
  const { data, isLoading, isError, error } = useDashboardQuery();

  if (isLoading) return <DashboardLoading />;
  if (isError) return <div>Error: {error?.message}</div>;
  if (!data) return null;

  const { allAppointments, stats, doctors, clinics } = data;

  const upcomingAppointments = allAppointments
    .filter((a) => (a.status === "CONFIRMED" || a.status === "PENDING") && new Date(a.scheduledAt) >= new Date())
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())
    .slice(0, 4);

  const recentActivity = allAppointments
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const availableDoctors = doctors.filter((d) => d.isAvailable).slice(0, 3);

  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Header currentUser={currentUser} stats={stats} />

      <Overview stats={stats} />

      <Grid container spacing={3}>
        <UpcomingAppointments appointments={upcomingAppointments} />

        <Grid size={{ xs: 12, xl: 4 }}>
          <Stack spacing={3}>
            <AvailableDoctors doctors={availableDoctors} clinics={clinics} />

            {currentUser?.role === Role.DOCTOR && <DoctorsRecentActivity recentActivity={recentActivity} />}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
