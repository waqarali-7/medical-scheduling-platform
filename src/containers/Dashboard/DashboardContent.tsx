"use client";

import { Box, Grid, Stack } from "@mui/material";
import { useCurrentUser } from "@/context/CurrentUserContext";
import Header from "@/components/dashboard/Header";
import Overview from "@/components/dashboard/Overview";
import UpcomingAppointments from "@/components/appointments/UpcomingAppointments";
import AvailableDoctors from "@/components/doctors/AvailableDoctors";
import DoctorsRecentActivity from "@/components/doctors/DoctorsRecentActivity";
import type { Appointment, Doctor, Clinic, DashboardStats } from "@/types";

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
    <Box sx={{ py: 3 }}>
      <Header currentUser={currentUser} stats={stats} />

      <Overview stats={stats} />

      <Grid container spacing={3}>
        <UpcomingAppointments appointments={upcomingAppointments} />

        <Grid size={{ xs: 12, xl: 4 }}>
          <Stack spacing={3}>
            <AvailableDoctors doctors={availableDoctors} clinics={clinics} />

            {currentUser?.role === "DOCTOR" && <DoctorsRecentActivity recentActivity={recentActivity} />}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
