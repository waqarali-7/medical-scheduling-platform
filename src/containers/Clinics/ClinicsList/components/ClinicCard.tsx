"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Box, Typography, Stack, Chip, Card } from "@/lib/mui/components";
import { LocationOn, Star, FiberManualRecord, ArrowForward } from "@/lib/mui/icons";
import { ClinicCardProps } from "../types";

export function ClinicCard({ clinic, doctors }: ClinicCardProps) {
  const clinicDoctors = useMemo(() => doctors.filter((d) => d.clinicId === clinic.id), [doctors, clinic.id]);

  const today = useMemo(() => {
    return new Date().toLocaleDateString("en", { weekday: "long" }).toLowerCase() as
      | "monday"
      | "tuesday"
      | "wednesday"
      | "thursday"
      | "friday"
      | "saturday"
      | "sunday";
  }, []);

  const todayHours = clinic.openingHours[today];
  const availableDoctors = clinicDoctors.filter((d) => d.isAvailable).length;

  return (
    <Link href={`/clinics/${clinic.id}`} style={{ textDecoration: "none" }}>
      <Card>
        {/* Compact Header */}
        <Box
          sx={{
            px: 2.5,
            py: 2,
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Box flex={1}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
                {clinic.name}
              </Typography>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Star sx={{ fontSize: 14, color: "warning.light" }} />
                <Typography variant="caption">
                  {clinic.rating} · {clinic.reviewCount} reviews
                </Typography>
              </Stack>
            </Box>
            <Chip
              label={todayHours.isOpen ? "Open" : "Closed"}
              color={todayHours.isOpen ? "success" : "error"}
              size="small"
            />
          </Stack>
        </Box>

        {/* Compact Content */}
        <Box sx={{ p: 2.5 }}>
          {/* Location */}
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
            <LocationOn sx={{ fontSize: 16, color: "text.secondary" }} />
            <Typography variant="body2" color="text.primary">
              {clinic.address.city}, {clinic.address.street}
            </Typography>
          </Stack>

          {/* Doctors & Specializations */}
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1.5 }}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <FiberManualRecord sx={{ fontSize: 10, color: "success.main" }} />
              <Typography variant="caption" color="text.secondary">
                {availableDoctors} of {clinicDoctors.length} doctors available
              </Typography>
            </Stack>
          </Stack>

          {/* Specializations Chips - Limited to 3 */}
          <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
            {clinic.specializations.slice(0, 3).map((spec) => (
              <Chip
                key={spec}
                label={spec}
                color="primary"
                size="small"
                sx={{
                  fontSize: "0.65rem",
                  height: 22,
                }}
              />
            ))}
            {clinic.specializations.length > 3 && (
              <Chip
                label={`+${clinic.specializations.length - 3} more`}
                color="secondary"
                size="small"
                sx={{
                  bgcolor: "grey.100",
                  color: "text.secondary",
                  fontSize: "0.65rem",
                  height: 22,
                }}
              />
            )}
          </Stack>

          {/* View Details Link */}
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            sx={{
              color: "primary.main",
              "&:hover": { color: "primary.dark" },
            }}
          >
            <Typography variant="body2" fontWeight={600}>
              View Details
            </Typography>
            <ArrowForward sx={{ fontSize: 16 }} />
          </Stack>
        </Box>
      </Card>
    </Link>
  );
}
