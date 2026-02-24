"use client";

import { Box, Grid, Stack } from "@/lib/mui/components";
import { useCurrentUser } from "@/context/CurrentUserContext";
import { Header, Overview } from "./components";
import { AvailableDoctors, DoctorsRecentActivity } from "@/containers/Doctors/components";
import type { Appointment, Doctor, Clinic, DashboardStats } from "@/types";
import { UpcomingAppointments } from "../Appointments/AppointmentsList/components/UpcomingAppointments";
import { Role } from "@/lib/enums";

interface DashboardContentProps {
  allAppointments: Appointment[];
  stats: DashboardStats;
  doctors: Doctor[];
  clinics: Clinic[];
}

export default function DashboardContent({ allAppointments, stats, doctors, clinics }: DashboardContentProps) {
  const currentUser = useCurrentUser();

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
