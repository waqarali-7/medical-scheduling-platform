"use client";

import Link from "next/link";
import { Box, Typography, Chip, Divider as MuiDivider } from "@mui/material";
import {
  Star as StarIcon,
  LocationOn as LocationOnIcon,
  Public as PublicIcon,
  AccessTime as AccessTimeIcon,
  ChevronRight as ChevronRightIcon,
  FiberManualRecord as DotIcon,
} from "@mui/icons-material";
import Avatar from "@/components/ui/Avatar";
import Card from "@/components/ui/Card";
import IconButton from "@/components/ui/IconButton";
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
                <StarIcon sx={{ fontSize: 16, color: "warning.main" }} />
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
                  <LocationOnIcon sx={{ fontSize: 16, color: "text.disabled" }} />
                  <Typography variant="caption" color="text.secondary" noWrap>
                    {clinic?.name}, {clinic?.address.city}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                  <PublicIcon sx={{ fontSize: 16, color: "text.disabled" }} />
                  <Typography variant="caption" color="text.secondary">
                    {doctor.languages.join(", ")}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                  <AccessTimeIcon sx={{ fontSize: 16, color: "text.disabled" }} />
                  <Typography variant="caption" color="text.secondary">
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
            <MuiDivider sx={{ my: 2 }} />
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
                    <DotIcon
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
                  <ChevronRightIcon sx={{ fontSize: 16, color: "text.disabled" }} />
                </IconButton>
              </Box>
            </Box>
          </>
        )}
      </Card>
    </Link>
  );
}
