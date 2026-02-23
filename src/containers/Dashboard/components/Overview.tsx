"use client";

import { StatCard, StatCardProps } from "@/lib/mui";
import { DashboardStats } from "@/types";
import {
  CalendarMonth,
  CheckCircle,
  Schedule,
  FavoriteBorder,
  People,
  LocalHospital,
  Warning,
  TrendingUp,
} from "@mui/icons-material";
import { Box, Typography, Grid } from "@/lib/mui";

interface OverviewProps {
  stats: DashboardStats;
}

export default function Overview({ stats }: OverviewProps) {
  const todayLabel = new Date().toLocaleDateString("de-DE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // Fully typed cards array
  const cards: Omit<StatCardProps, "ref">[] = [
    // ===== Default Variant Cards =====
    {
      title: "Total Appointments",
      value: stats.totalAppointments,
      icon: <CalendarMonth />,
      trend: stats.weeklyGrowth,
      trendLabel: "vs last week",
      color: "primary",
      variant: "default",
    },
    {
      title: "Confirmed",
      value: stats.confirmedAppointments,
      subtitle: "Ready to go",
      icon: <CheckCircle />,
      color: "success",
      variant: "default",
    },
    {
      title: "Pending",
      value: stats.pendingAppointments,
      subtitle: "Needs confirmation",
      icon: <Schedule />,
      color: "warning",
      variant: "default",
    },
    {
      title: "Today",
      value: stats.todayAppointments,
      subtitle: todayLabel,
      icon: <FavoriteBorder />,
      color: "secondary",
      variant: "default",
    },

    // ===== Info Variant Cards =====
    {
      title: "Patients",
      value: stats.totalPatients,
      icon: <People />,
      color: "primary",
      variant: "info",
    },
    {
      title: "Doctors",
      value: stats.totalDoctors,
      icon: <LocalHospital />,
      color: "success",
      variant: "info",
    },
    {
      title: "No-Shows",
      value: stats.noShowAppointments,
      icon: <Warning />,
      color: "error",
      variant: "info",
    },
    {
      title: "Completed",
      value: stats.completedAppointments,
      icon: <TrendingUp />,
      color: "success",
      variant: "info",
    },
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
        Overview
      </Typography>

      <Grid container spacing={2}>
        {cards.map((card, idx) => (
          <Grid size={{ xs: 6, md: 3 }} key={idx}>
            <StatCard {...card} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
