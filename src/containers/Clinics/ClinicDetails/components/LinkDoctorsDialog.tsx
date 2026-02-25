"use client";

import { useState, useTransition } from "react";
import { Button, Typography, Box, Alert, Stack, Chip, Paper, Loading, Dialog } from "@/lib/mui/components";
import { PersonAdd, Star, Public } from "@/lib/mui/icons";
import type { Doctor } from "@/types";
import { linkDoctor } from "@/app/actions/linkDoctor";

interface LinkDoctorsDialogProps {
  open: boolean;
  onClose: () => void;
  clinicId: string;
  unlinkedDoctors: Doctor[];
}

export function LinkDoctorsDialog({ open, onClose, clinicId, unlinkedDoctors }: LinkDoctorsDialogProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleLinkDoctor = (doctorId: string, doctorName: string) => {
    setError(null);
    setSuccess(null);

    startTransition(async () => {
      const result = await linkDoctor(doctorId, clinicId);

      if (result.success) {
        setSuccess(`Successfully linked ${doctorName}`);
        setTimeout(() => {
          setSuccess(null);
          onClose();
        }, 2000);
      } else {
        setError(result.error || "Failed to link doctor");
      }
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Link Doctors to Clinic"
      maxWidth="md"
      fullWidth
      actions={
        <Button onClick={onClose} variant="outline" disabled={isPending}>
          Close
        </Button>
      }
    >
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      {unlinkedDoctors.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="body1" color="text.secondary">
            No unlinked doctors available
          </Typography>
          <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
            All doctors are currently linked to clinics
          </Typography>
        </Box>
      ) : (
        <>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Select a doctor to link to this clinic. Each doctor can only be linked to one clinic.
          </Typography>

          <Stack spacing={2}>
            {unlinkedDoctors.map((doctor) => (
              <Paper
                key={doctor.id}
                sx={{
                  p: 2,
                  border: 1,
                  borderColor: "divider",
                  transition: "all 0.2s",
                  "&:hover": {
                    borderColor: "primary.main",
                  },
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  {/* Doctor Info */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                      <Typography variant="body1" fontWeight={600} noWrap>
                        {doctor.firstName} {doctor.lastName}
                      </Typography>
                      <Chip label={doctor.specialization} size="small" color="primary" />
                    </Stack>

                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Star sx={{ fontSize: 14, color: "warning.main" }} />
                        <Typography variant="caption">
                          {doctor.rating.toFixed(1)} ({doctor.reviewCount})
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Public sx={{ fontSize: 14, color: "text.disabled" }} />
                        <Typography variant="caption" color="text.secondary" noWrap>
                          {doctor.languages.slice(0, 2).join(", ")}
                        </Typography>
                      </Box>
                    </Stack>

                    {doctor.qualifications?.length > 0 && (
                      <Typography variant="caption" color="text.secondary" noWrap sx={{ mt: 0.5, display: "block" }}>
                        {doctor.qualifications.slice(0, 2).join(", ")}
                      </Typography>
                    )}
                  </Box>

                  {/* Link Button */}
                  <Button
                    startIcon={<PersonAdd />}
                    onClick={() => handleLinkDoctor(doctor.id, `${doctor.firstName} ${doctor.lastName}`)}
                    disabled={isPending}
                    variant="primary"
                    size="small"
                  >
                    Link
                  </Button>
                </Stack>
              </Paper>
            ))}
          </Stack>
        </>
      )}

      {isPending && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            borderRadius: "16px",
          }}
        >
          <Loading />
        </Box>
      )}
    </Dialog>
  );
}
