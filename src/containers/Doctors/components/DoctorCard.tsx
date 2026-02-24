"use client";

import Link from "next/link";
import { Box, Typography, Chip, Divider, Avatar, Card, IconButton } from "@/lib/mui/components";
import { Star, LocationOn, Public, AccessTime, ChevronRight, FiberManualRecord } from "@/lib/mui/icons";

import type { Doctor, Clinic } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface DoctorCardProps {
  doctor: Doctor;
  clinics?: Clinic[];
  compact?: boolean;
}

export default function DoctorCard({ doctor, clinics = [], compact = false }: DoctorCardProps) {
  const clinic = clinics.find((c) => c.id === doctor.clinicId);

  return (
    <Link href={`/doctors/${doctor.id}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          p: 2,
        }}
      >
        {/* Top row: avatar + info */}
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
          <Avatar
            src={doctor.avatarUrl}
            firstName={doctor.firstName.replace("Dr. ", "")}
            lastName={doctor.lastName}
            size="lg"
          />

          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Name + rating */}
            <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 1 }}>
              <Box>
                <Typography variant="body2" fontWeight={600} color="text.primary">
                  {doctor.firstName} {doctor.lastName}
                </Typography>
                <Typography variant="caption" color="primary.main" fontWeight={500} sx={{ mt: 0.25, display: "block" }}>
                  {doctor.specialization}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, flexShrink: 0 }}>
                <Star sx={{ fontSize: 16, color: "warning.main" }} />
                <Typography variant="body2" fontWeight={600} color="text.primary">
                  {doctor.rating.toFixed(1)}
                </Typography>
                <Typography variant="caption" color="text.disabled">
                  ({doctor.reviewCount})
                </Typography>
              </Box>
            </Box>

            {!compact && (
              <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                  <LocationOn sx={{ fontSize: 16, color: "text.disabled" }} />
                  <Typography variant="caption" noWrap>
                    {clinic?.name}, {clinic?.address.city}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                  <Public sx={{ fontSize: 16, color: "text.disabled" }} />
                  <Typography variant="caption">{doctor.languages.join(", ")}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                  <AccessTime sx={{ fontSize: 16, color: "text.disabled" }} />
                  <Typography variant="caption">
                    Next:{" "}
                    {doctor.nextAvailableSlot
                      ? new Date(doctor.nextAvailableSlot).toLocaleDateString("de-DE", {
                          day: "numeric",
                          month: "short",
                        })
                      : "Not available"}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Box>

        {!compact && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box>
                <Typography variant="caption" color="text.disabled">
                  Consultation fee
                </Typography>
                <Typography variant="body2" fontWeight={600} color="text.primary">
                  {formatCurrency(doctor.consultationFee)}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Chip
                  size="small"
                  icon={
                    <FiberManualRecord
                      sx={{
                        fontSize: "8px !important",
                        color: doctor.isAvailable ? "success.main" : "text.disabled",
                      }}
                    />
                  }
                  label={doctor.isAvailable ? "Available" : "Unavailable"}
                  sx={{
                    bgcolor: doctor.isAvailable ? "success.lighter" : "action.hover",
                    color: doctor.isAvailable ? "success.main" : "text.secondary",
                    fontWeight: 500,
                    "& .MuiChip-icon": { ml: 0.75 },
                  }}
                />
                <IconButton size="small">
                  <ChevronRight sx={{ fontSize: 16, color: "text.disabled" }} />
                </IconButton>
              </Box>
            </Box>
          </>
        )}
      </Card>
    </Link>
  );
}
