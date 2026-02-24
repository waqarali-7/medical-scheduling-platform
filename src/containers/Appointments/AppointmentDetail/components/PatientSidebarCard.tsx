"use client";

import { Phone, Email, Description } from "@/lib/mui/icons";
import { Box, Stack, Typography, Avatar, Chip } from "@/lib/mui/components";
import type { Patient } from "@/types";

interface PatientSidebarCardProps {
  patient: Patient;
}

export default function PatientSidebarCard({ patient }: PatientSidebarCardProps) {
  return (
    <>
      <Typography variant="caption" fontWeight={700} sx={{ textTransform: "uppercase", color: "text.secondary", mb: 2, display: "block" }}>
        Patient
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Avatar src={patient.avatarUrl} firstName={patient.firstName} lastName={patient.lastName} size="lg" />
        <Box>
          <Typography variant="body2" fontWeight={600}>
            {patient.firstName} {patient.lastName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            DOB: {patient.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString("de-DE") : "—"}
          </Typography>
        </Box>
      </Stack>
      <Stack spacing={1} sx={{ mb: patient.medicalHistory?.length ? 2 : 0 }}>
        <Typography variant="caption" color="text.secondary" display="flex" alignItems="center" gap={1}>
          <Phone fontSize="inherit" />
          {patient.phone}
        </Typography>
        <Typography variant="caption" color="text.secondary" display="flex" alignItems="center" gap={1}>
          <Email fontSize="inherit" />
          {patient.email}
        </Typography>
        {patient.insuranceNumber && (
          <Typography variant="caption" color="text.secondary" display="flex" alignItems="center" gap={1}>
            <Description fontSize="inherit" />
            Insurance: {patient.insuranceNumber}
          </Typography>
        )}
      </Stack>
      {patient.medicalHistory && patient.medicalHistory.length > 0 && (
        <Box sx={{ pt: 2, borderTop: 1, borderColor: "divider" }}>
          <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ mb: 1, display: "block" }}>
            Medical History
          </Typography>
          <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
            {patient.medicalHistory.map((item) => (
              <Chip key={item} label={item} size="small" color="warning" sx={{ fontSize: "0.65rem" }} />
            ))}
          </Stack>
        </Box>
      )}
    </>
  );
}
