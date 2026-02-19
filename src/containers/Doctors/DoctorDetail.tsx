"use client";

import Link from "next/link";
import { Box, Stack, Paper, Typography, Chip, Button, Divider } from "@mui/material";
import {
  ArrowBack,
  Star,
  LocationOn,
  Phone,
  Email,
  AccessTime,
  CalendarMonth,
  MedicalServices,
  ChevronRight,
} from "@mui/icons-material";
import { formatCurrency } from "@/lib/utils";
import type { Doctor, Clinic, Appointment } from "@/types";
import { StatusBadge } from "@/components/ui";

interface DoctorDetailPageProps {
  doctor: Doctor & { clinic?: Clinic };
  appointments: Appointment[];
}

export default function DoctorDetailPage({ doctor, appointments }: DoctorDetailPageProps) {
  const clinic = doctor.clinic;

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        fontSize="small"
        sx={{
          color: i < Math.floor(rating) ? "warning.main" : i < rating ? "warning.light" : "grey.300",
        }}
      />
    ));

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", py: 4, px: 2 }}>
      {/* Back / Breadcrumb */}
      <Stack direction="row" spacing={1.5} alignItems="center" mb={3}>
        <Link href="/doctors">
          <Button variant="text" startIcon={<ArrowBack />} size="small">
            Back
          </Button>
        </Link>
        <Typography color="text.secondary" fontSize={14}>
          / {doctor.firstName} {doctor.lastName}
        </Typography>
      </Stack>

      {/* Profile Header */}
      <Paper sx={{ position: "relative", pb: 3, mb: 4 }}>
        <Box sx={{ height: 120 }} />
        <Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{ px: 3, mt: -6 }}>
          {/* Avatar */}
          <Box
            sx={{
              width: 120,
              height: 120,
              borderRadius: 3,
              border: "4px solid white",
              overflow: "hidden",
              bgcolor: "grey.300",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2.5rem",
              fontWeight: 700,
              color: "primary.main",
            }}
          >
            {doctor.firstName.charAt(0)}
            {doctor.lastName.charAt(0)}
          </Box>

          {/* Doctor Info */}
          <Stack flex={1} spacing={1}>
            <Typography variant="h4" fontWeight={700}>
              {doctor.firstName} {doctor.lastName}
            </Typography>
            <Typography variant="body1" color="primary" fontWeight={600}>
              {doctor.specialization}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              {renderStars(doctor.rating)}
              <Typography variant="body2" fontWeight={600}>
                {doctor.rating.toFixed(1)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ({doctor.reviewCount} reviews)
              </Typography>
              <Chip
                label={doctor.isAvailable ? "Available" : "Unavailable"}
                color={doctor.isAvailable ? "success" : "default"}
                size="small"
                sx={{ ml: 1 }}
              />
            </Stack>
          </Stack>

          {/* Fee & Book Button */}
          <Stack spacing={1} alignItems="flex-end">
            <Typography variant="caption" color="text.secondary">
              Consultation Fee
            </Typography>
            <Typography variant="h6" fontWeight={700}>
              {formatCurrency(doctor.consultationFee)}
            </Typography>
            <Link href={`/appointments/new?doctor=${doctor.id}`} passHref>
              <Button variant="contained" startIcon={<CalendarMonth />} color="primary" size="medium">
                Book Appointment
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Paper>

      <Stack direction={{ xs: "column", lg: "row" }} spacing={4}>
        {/* Main Content */}
        <Stack flex={2} spacing={3}>
          {/* About */}
          {doctor.bio && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" fontWeight={700} mb={1}>
                About
              </Typography>
              <Typography variant="body2">{doctor.bio}</Typography>
            </Paper>
          )}

          {/* Qualifications */}
          {doctor.qualifications?.length > 0 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" fontWeight={700} mb={2}>
                Qualifications & Certifications
              </Typography>
              <Stack spacing={1}>
                {doctor.qualifications.map((q) => (
                  <Stack key={q} direction="row" spacing={1} alignItems="center">
                    <MedicalServices color="primary" fontSize="small" />
                    <Typography variant="body2">{q}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Paper>
          )}

          {/* Recent Appointments */}
          {appointments?.length > 0 && (
            <Paper sx={{ p: 3 }}>
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
                {appointments.map((apt) => (
                  <Link key={apt.id} href={`/appointments/${apt.id}`} passHref>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{
                        px: 1,
                        py: 1.5,
                        borderRadius: 1,
                        "&:hover": { bgcolor: "grey.50", cursor: "pointer" },
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
          )}
        </Stack>

        {/* Sidebar */}
        <Stack flex={1} spacing={3}>
          {/* Clinic Info */}
          {clinic && (
            <Paper sx={{ p: 2 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={700} mb={1}>
                Practice Location
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {clinic.name}
              </Typography>
              <Stack spacing={0.5} mt={1}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <LocationOn fontSize="small" color="action" />
                  <Typography variant="body2">
                    {clinic.address.street}, {clinic.address.postalCode} {clinic.address.city}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Phone fontSize="small" color="action" />
                  <Typography variant="body2">{clinic.phone}</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Email fontSize="small" color="action" />
                  <Typography variant="body2">{clinic.email}</Typography>
                </Stack>
              </Stack>
            </Paper>
          )}

          {/* Languages */}
          {doctor.languages?.length > 0 && (
            <Paper sx={{ p: 2 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={700} mb={1}>
                Languages
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {doctor.languages.map((lang) => (
                  <Chip key={lang} label={lang} size="small" color="primary" variant="outlined" />
                ))}
              </Stack>
            </Paper>
          )}

          {/* Availability */}
          <Paper sx={{ p: 2 }}>
            <Typography variant="caption" color="text.secondary" fontWeight={700} mb={1}>
              Availability
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  bgcolor: doctor.isAvailable ? "success.main" : "grey.400",
                  animation: doctor.isAvailable ? "pulse 1.5s infinite" : "none",
                }}
              />
              <Typography variant="body2">
                {doctor.isAvailable ? "Currently Accepting Patients" : "Not Accepting New Patients"}
              </Typography>
            </Stack>
            {doctor.nextAvailableSlot && (
              <Stack direction="row" spacing={0.5} alignItems="center">
                <AccessTime fontSize="small" color="action" />
                <Typography variant="caption" color="text.secondary">
                  Next available:{" "}
                  {new Date(doctor.nextAvailableSlot).toLocaleDateString("de-DE", {
                    day: "numeric",
                    month: "long",
                  })}
                </Typography>
              </Stack>
            )}
          </Paper>

          {/* Quick Book CTA */}
          <Link href={`/appointments/new?doctor=${doctor.id}`} passHref>
            <Button
              variant="contained"
              color="primary"
              startIcon={<MedicalServices />}
              sx={{ width: "100%", py: 2, textTransform: "none" }}
            >
              Book with {doctor.firstName}
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
}
