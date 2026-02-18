import NextLink from "@/components/ui/Link";
import {
  CalendarMonth,
  People,
  CheckCircle,
  Schedule,
  Warning,
  TrendingUp,
  LocalHospital,
  ArrowForward,
  FavoriteBorder,
  Add,
} from "@mui/icons-material";
import { Box, Typography, Grid, Stack } from "@mui/material";
import { DASHBOARD_STATS, getHydratedAppointments, DOCTORS, CURRENT_USER } from "@/data/dummy";
import { StatCard, Card, Avatar, Button } from "@/components/ui";
import { StatusBadge } from "@/components/ui";
import { formatDateBerlin } from "@/lib/utils";
import AppointmentCard from "@/components/appointments/AppointmentCard";
import DoctorCard from "@/components/doctors/DoctorCard";

export default function DashboardPage() {
  const allAppointments = getHydratedAppointments();
  const upcomingAppointments = allAppointments
    .filter((a) => (a.status === "CONFIRMED" || a.status === "PENDING") && new Date(a.scheduledAt) >= new Date())
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())
    .slice(0, 4);

  const recentActivity = allAppointments
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const availableDoctors = DOCTORS.filter((d) => d.isAvailable).slice(0, 3);

  return (
    <Box sx={{ py: 3 }}>
      {/* Welcome Banner */}
      <Card sx={{ mb: 4 }}>
        <Box sx={{ p: 3 }}>
          <Typography variant="body2" color="text.primary" sx={{ mb: 0.5 }}>
            Good morning,
          </Typography>
          <Typography variant="h4" fontWeight={700} color="text.primary" sx={{ mb: 0.5 }}>
            {CURRENT_USER.firstName} {CURRENT_USER.lastName} 👋
          </Typography>
          <Typography variant="body2" color="text.secondary">
            You have{" "}
            <Box component="span" fontWeight={700}>
              {DASHBOARD_STATS.todayAppointments} appointment
              {DASHBOARD_STATS.todayAppointments !== 1 ? "s" : ""}
            </Box>{" "}
            today.{" "}
            {DASHBOARD_STATS.pendingAppointments > 0 && (
              <span>{DASHBOARD_STATS.pendingAppointments} pending confirmation.</span>
            )}
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

      {/* Stats Grid */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Overview
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6, md: 3 }}>
            <StatCard
              title="Total Appointments"
              value={DASHBOARD_STATS.totalAppointments}
              icon={<CalendarMonth />}
              trend={DASHBOARD_STATS.weeklyGrowth}
              trendLabel="vs last week"
              color="primary"
            />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <StatCard
              title="Confirmed"
              value={DASHBOARD_STATS.confirmedAppointments}
              subtitle="Ready to go"
              icon={<CheckCircle />}
              color="success"
            />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <StatCard
              title="Pending"
              value={DASHBOARD_STATS.pendingAppointments}
              subtitle="Needs confirmation"
              icon={<Schedule />}
              color="warning"
            />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <StatCard
              title="Today"
              value={DASHBOARD_STATS.todayAppointments}
              subtitle="17 Feb 2026"
              icon={<FavoriteBorder />}
              color="secondary"
            />
          </Grid>
        </Grid>

        {/* Secondary stats */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid size={{ xs: 6, md: 3 }}>
            <Card>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    p: 1.5,
                    bgcolor: "primary.lighter",
                    borderRadius: 3,
                    display: "flex",
                  }}
                >
                  <People sx={{ color: "primary.main" }} />
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight={700}>
                    {DASHBOARD_STATS.totalPatients}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Patients
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Card>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    p: 1.5,
                    bgcolor: "success.lighter",
                    borderRadius: 3,
                    display: "flex",
                  }}
                >
                  <LocalHospital sx={{ color: "success.main" }} />
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight={700}>
                    {DASHBOARD_STATS.totalDoctors}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Doctors
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Card>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    p: 1.5,
                    bgcolor: "error.lighter",
                    borderRadius: 3,
                    display: "flex",
                  }}
                >
                  <Warning sx={{ color: "error.main" }} />
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight={700}>
                    {DASHBOARD_STATS.noShowAppointments}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    No-Shows
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Card>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    p: 1.5,
                    bgcolor: "success.lighter",
                    borderRadius: 3,
                    display: "flex",
                  }}
                >
                  <TrendingUp sx={{ color: "success.main" }} />
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight={700}>
                    {DASHBOARD_STATS.completedAppointments}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Completed
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Main content: Appointments + Doctors */}
      <Grid container spacing={3}>
        {/* Upcoming Appointments */}
        <Grid size={{ xs: 12, xl: 8 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6" fontWeight={600}>
              Upcoming Appointments
            </Typography>
            <Button
              component={NextLink}
              href="/appointments"
              variant="ghost"
              endIcon={<ArrowForward fontSize="small" />}
              size="small"
            >
              View all
            </Button>
          </Stack>
          {upcomingAppointments.length > 0 ? (
            <Stack spacing={2}>
              {upcomingAppointments.map((apt) => (
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
                <Button
                  component={NextLink}
                  href="/appointments/new"
                  variant="ghost"
                  startIcon={<Add />}
                  sx={{ mt: 2 }}
                >
                  Book your first appointment
                </Button>
              </Box>
            </Card>
          )}
        </Grid>

        {/* Right column */}
        <Grid size={{ xs: 12, xl: 4 }}>
          <Stack spacing={3}>
            {/* Available Doctors */}
            <Box>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>
                  Available Doctors
                </Typography>
                <Button
                  component={NextLink}
                  href="/doctors"
                  variant="ghost"
                  endIcon={<ArrowForward fontSize="small" />}
                  size="small"
                >
                  All
                </Button>
              </Stack>
              <Stack spacing={2}>
                {availableDoctors.map((doc) => (
                  <DoctorCard key={doc.id} doctor={doc} compact={true} />
                ))}
              </Stack>
            </Box>

            {/* Recent Activity */}
            <Box>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                Recent Activity
              </Typography>
              <Card>
                <Stack divider={<Box sx={{ borderBottom: 1, borderColor: "divider" }} />}>
                  {recentActivity.map((apt) => (
                    <Stack key={apt.id} direction="row" spacing={2} alignItems="center" sx={{ py: 1.5 }}>
                      {apt.patient && (
                        <Avatar
                          firstName={apt.patient.firstName}
                          lastName={apt.patient.lastName}
                          src={apt.patient.avatarUrl}
                          size="sm"
                        />
                      )}
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body2" fontWeight={500} noWrap>
                          {apt.patient?.firstName} {apt.patient?.lastName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" noWrap>
                          {apt.doctor?.firstName} {apt.doctor?.lastName} · {formatDateBerlin(apt.scheduledAt)}
                        </Typography>
                      </Box>
                      <StatusBadge status={apt.status} size="small" />
                    </Stack>
                  ))}
                </Stack>
              </Card>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
