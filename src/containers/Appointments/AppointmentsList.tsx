"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Add, Search as SearchIcon, CalendarMonth } from "@mui/icons-material";
import { Box, Typography, Stack, TextField, InputAdornment, MenuItem, Chip, Grid } from "@mui/material";
import AppointmentCard from "@/components/appointments/AppointmentCard";
import { Button, Card } from "@/components/ui";
import type { Appointment, AppointmentStatus, AppointmentType } from "@/types";

const STATUS_TABS: { label: string; value: AppointmentStatus | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" },
  { label: "No Show", value: "NO_SHOW" },
];

const TYPE_FILTERS: { label: string; value: AppointmentType | "ALL" }[] = [
  { label: "All Types", value: "ALL" },
  { label: "Consultation", value: "CONSULTATION" },
  { label: "Follow-up", value: "FOLLOW_UP" },
  { label: "Check-up", value: "CHECKUP" },
  { label: "Specialist", value: "SPECIALIST" },
  { label: "Emergency", value: "EMERGENCY" },
];

interface AppointmentsListProps {
  initialAppointments: Appointment[];
}

export default function AppointmentsList({ initialAppointments }: AppointmentsListProps) {
  const [activeStatus, setActiveStatus] = useState<AppointmentStatus | "ALL">("ALL");
  const [activeType, setActiveType] = useState<AppointmentType | "ALL">("ALL");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "status">("date");

  const all = initialAppointments;

  const filtered = useMemo(() => {
    return all
      .filter((a) => {
        if (activeStatus !== "ALL" && a.status !== activeStatus) return false;
        if (activeType !== "ALL" && a.type !== activeType) return false;
        if (search) {
          const q = search.toLowerCase();
          return (
            a.patient?.firstName.toLowerCase().includes(q) ||
            a.patient?.lastName.toLowerCase().includes(q) ||
            a.doctor?.firstName.toLowerCase().includes(q) ||
            a.doctor?.lastName.toLowerCase().includes(q) ||
            a.reason.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "date") {
          return new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime();
        }
        return a.status.localeCompare(b.status);
      });
  }, [all, activeStatus, activeType, search, sortBy]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { ALL: all.length };
    all.forEach((a) => {
      c[a.status] = (c[a.status] || 0) + 1;
    });
    return c;
  }, [all]);

  return (
    <Box sx={{ py: 3 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Appointments
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {all.length} total appointments · {counts["CONFIRMED"] || 0} confirmed
          </Typography>
        </Box>
        <Button component={Link} href="/appointments/new" variant="primary" startIcon={<Add />}>
          New Appointment
        </Button>
      </Stack>

      <Card sx={{ mb: 3, p: 2 }}>
        <Stack spacing={2}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search by patient, doctor, or reason..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    bgcolor: "grey.50",
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <TextField
                select
                fullWidth
                size="small"
                value={activeType}
                onChange={(e) => setActiveType(e.target.value as AppointmentType | "ALL")}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    bgcolor: "grey.50",
                  },
                }}
              >
                {TYPE_FILTERS.map((f) => (
                  <MenuItem key={f.value} value={f.value}>
                    {f.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <TextField
                select
                fullWidth
                size="small"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "date" | "status")}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    bgcolor: "grey.50",
                  },
                }}
              >
                <MenuItem value="date">Sort by Date</MenuItem>
                <MenuItem value="status">Sort by Status</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {STATUS_TABS.map((tab) => (
              <Chip
                key={tab.value}
                label={
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <span>{tab.label}</span>
                    <Box
                      component="span"
                      sx={{
                        px: 0.75,
                        py: 0.25,
                        borderRadius: 2,
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        bgcolor: activeStatus === tab.value ? "rgba(255,255,255,0.2)" : "grey.200",
                        color: activeStatus === tab.value ? "white" : "text.secondary",
                      }}
                    >
                      {counts[tab.value] || 0}
                    </Box>
                  </Stack>
                }
                onClick={() => setActiveStatus(tab.value)}
                color={activeStatus === tab.value ? "primary" : "default"}
                variant={activeStatus === tab.value ? "filled" : "outlined"}
                sx={{
                  fontWeight: 600,
                  borderRadius: 2,
                  ...(activeStatus === tab.value && {
                    boxShadow: 1,
                  }),
                }}
              />
            ))}
          </Stack>
        </Stack>
      </Card>

      {filtered.length > 0 ? (
        <Stack spacing={2}>
          {filtered.map((apt) => (
            <AppointmentCard key={apt.id} appointment={apt} view="admin" />
          ))}
        </Stack>
      ) : (
        <Card>
          <Box sx={{ textAlign: "center", py: 6 }}>
            <CalendarMonth sx={{ fontSize: 64, color: "grey.300", mb: 2 }} />
            <Typography variant="body1" fontWeight={500} color="text.secondary">
              No appointments found
            </Typography>
            <Typography variant="body2" color="text.disabled" sx={{ mt: 0.5 }}>
              Try adjusting your filters or search terms.
            </Typography>
          </Box>
        </Card>
      )}
    </Box>
  );
}
