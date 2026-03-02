"use client";

import Link from "next/link";
import {
  Box,
  Typography,
  Chip,
  Divider,
  Avatar,
  Card,
  IconButton,
  Dialog,
  Button,
  Loading,
} from "@/lib/mui/components";
import { Star, LocationOn, Public, AccessTime, ChevronRight, FiberManualRecord, LinkOff } from "@/lib/mui/icons";
import type { Doctor, Clinic } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { useState, useTransition } from "react";
import { Stack } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

interface DoctorCardProps {
  doctor: Doctor;
  clinics?: Clinic[];
  compact?: boolean;
  showUnlink?: boolean;
  onUnlink?: (doctorId: string, doctorName: string) => void;
  isUnlinking?: boolean;
}

export default function DoctorCard({
  doctor,
  clinics = [],
  compact = false,
  showUnlink = false,
  onUnlink,
  isUnlinking = false,
}: DoctorCardProps) {
  const queryClient = useQueryClient();
  const clinic = clinics.find((c) => c.id === doctor.clinicId);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleUnlinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenConfirm(true);
  };

  const handleConfirmUnlink = () => {
    startTransition(async () => {
      if (onUnlink) {
        await onUnlink(doctor.id, `${doctor.firstName} ${doctor.lastName}`);
        queryClient.invalidateQueries({ queryKey: ["clinic"] });
      }

      setOpenConfirm(false);
    });
  };

  return (
    <Box sx={{ position: "relative" }}>
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
                  <Typography
                    variant="caption"
                    color="primary.main"
                    fontWeight={500}
                    sx={{ mt: 0.25, display: "block" }}
                  >
                    {doctor.specialization}
                  </Typography>
                </Box>

                <Box>
                  <Stack sx={{ gap: 2, display: "flex", alignItems: "end" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, flexShrink: 0 }}>
                      <Star sx={{ fontSize: 16, color: "warning.main" }} />
                      <Typography variant="body2" fontWeight={600} color="text.primary">
                        {doctor.rating.toFixed(1)}
                      </Typography>
                      <Typography variant="caption" color="text.disabled">
                        ({doctor.reviewCount})
                      </Typography>
                    </Box>
                    {showUnlink && onUnlink && (
                      <IconButton
                        onClick={handleUnlinkClick}
                        disabled={isPending}
                        size="small"
                        color="error"
                        sx={{
                          width: 30,
                          "&:hover": {
                            bgcolor: "error.dark",
                            color: "error.lighter",
                          },
                        }}
                      >
                        <LinkOff fontSize="small" />
                      </IconButton>
                    )}
                  </Stack>
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

      <Dialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        title="Confirm Unlink"
        maxWidth="xs"
        fullWidth
        actions={
          <>
            <Button onClick={() => setOpenConfirm(false)} variant="ghost">
              Cancel
            </Button>
            <Button onClick={handleConfirmUnlink} color="error" disabled={isUnlinking}>
              {isPending ? "Unlinking..." : "Unlink"}{" "}
            </Button>
          </>
        }
      >
        Are you sure you want to unlink{" "}
        <strong>
          {doctor.firstName} {doctor.lastName}
        </strong>
        ? This action cannot be undone.
      </Dialog>
      {isPending && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 20,
            borderRadius: 2,
          }}
        >
          <Loading />
        </Box>
      )}
    </Box>
  );
}
