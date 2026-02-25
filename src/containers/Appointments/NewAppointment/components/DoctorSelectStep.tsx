"use client";

import { LocalHospital, Check, LocationOn, Star, Language } from "@/lib/mui/icons";
import { Box, Stack, Typography, TextField, Grid, Paper, Chip, Avatar } from "@/lib/mui/components";
import { formatCurrency } from "@/lib/utils";
import type { Doctor, Clinic } from "@/types";

interface DoctorSelectStepProps {
  doctors: Doctor[];
  clinics: Clinic[];
  searchSpec: string;
  onSearchChange: (value: string) => void;
  selectedDoctor: Doctor | null;
  onSelectDoctor: (doctor: Doctor) => void;
}

export default function DoctorSelectStep({
  doctors,
  clinics,
  searchSpec,
  onSearchChange,
  selectedDoctor,
  onSelectDoctor,
}: DoctorSelectStepProps) {
  const filteredDoctors = doctors.filter(
    (d) =>
      !searchSpec ||
      d.specialization.toLowerCase().includes(searchSpec.toLowerCase()) ||
      d.firstName.toLowerCase().includes(searchSpec.toLowerCase()) ||
      d.lastName.toLowerCase().includes(searchSpec.toLowerCase()),
  );

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={1} alignItems="center">
        <LocalHospital color="primary" />
        <Typography variant="h6" fontWeight={600}>
          Choose a Doctor
        </Typography>
      </Stack>

      <TextField
        fullWidth
        placeholder="Search by specialization or name..."
        value={searchSpec}
        onChange={(e) => onSearchChange(e.target.value)}
        size="small"
      />

      <Box sx={{ maxHeight: 500, overflow: "auto" }}>
        <Grid container spacing={2} sx={{ pb: 1 }}>
          {filteredDoctors.map((doc) => {
            const isSelected = selectedDoctor?.id === doc.id;
            const docClinic = clinics.find((c) => c.id === doc.clinicId);
            return (
              <Grid
                sx={{
                  cursor: doc.isAvailable && docClinic?.id ? "pointer" : "not-allowed",
                  opacity: doc.isAvailable && docClinic?.id ? 1 : 0.7,
                  pointerEvents: doc.isAvailable && docClinic?.id ? "auto" : "none",
                }}
                size={{ xs: 12, sm: 6 }}
                key={doc.id}
              >
                <Paper
                  onClick={() => onSelectDoctor(doc)}
                  sx={{
                    p: 2,
                    cursor: "pointer",
                    border: 2,
                    borderColor: isSelected ? "primary.main" : "divider",
                    transition: "border-color 0.2s, background-color 0.2s",
                    "&:hover": {
                      borderColor: "primary.light",
                    },
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1.5 }}>
                    <Avatar src={doc.avatarUrl} firstName={doc.firstName} lastName={doc.lastName} size="md" />
                    <Box flex={1} minWidth={0}>
                      <Typography variant="body2" fontWeight={600} noWrap color="text.primary">
                        {doc.firstName} {doc.lastName}
                      </Typography>
                      <Typography variant="caption" color="primary.main" fontWeight={500}>
                        {doc.specialization}
                      </Typography>
                    </Box>
                    {!doc.isAvailable && (
                      <Chip
                        label="Not accepting new patients"
                        size="small"
                        color="secondary"
                        sx={{ mt: 1, fontSize: "0.65rem" }}
                      />
                    )}
                    {doc.isAvailable && !docClinic && (
                      <Chip
                        label="Not linked with clinic"
                        size="small"
                        color="secondary"
                        sx={{ mt: 1, fontSize: "0.65rem" }}
                      />
                    )}
                    {isSelected && (
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          bgcolor: "secondary.main",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Check sx={{ fontSize: 16, color: "primary.contrastText" }} />
                      </Box>
                    )}
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Star sx={{ fontSize: 14, color: "warning.main" }} />
                      <Typography variant="caption" color="text.secondary">
                        {doc.rating} ({doc.reviewCount})
                      </Typography>
                    </Stack>
                    <Typography variant="caption" fontWeight={600} color="text.primary">
                      {formatCurrency(doc.consultationFee)}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={0.5} height={25} alignItems="center">
                    <LocationOn sx={{ fontSize: 12, color: "text.disabled" }} />
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {docClinic?.name}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <Language sx={{ fontSize: 12, color: "text.disabled" }} />
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {doc.languages.join(", ")}
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Stack>
  );
}
