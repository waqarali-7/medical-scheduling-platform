"use client";

import Link from "next/link";
import { Phone, Email, ChevronRight } from "@mui/icons-material";
import { Box, Stack, Typography, Avatar, Button } from "@/lib/mui";
import type { Doctor } from "@/types";

interface DoctorSidebarCardProps {
  doctor: Doctor;
}

export default function DoctorSidebarCard({ doctor }: DoctorSidebarCardProps) {
  return (
    <>
      <Typography variant="caption" fontWeight={700} sx={{ textTransform: "uppercase", color: "text.secondary", mb: 2, display: "block" }}>
        Doctor
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Avatar src={doctor.avatarUrl} firstName={doctor.firstName} lastName={doctor.lastName} size="lg" />
        <Box>
          <Typography variant="body2" fontWeight={600}>
            {doctor.firstName} {doctor.lastName}
          </Typography>
          <Typography variant="caption" color="primary" fontWeight={500}>
            {doctor.specialization}
          </Typography>
        </Box>
      </Stack>
      <Stack spacing={1} sx={{ mb: 2 }}>
        <Typography variant="caption" color="text.secondary" display="flex" alignItems="center" gap={1}>
          <Phone fontSize="inherit" />
          {doctor.phone}
        </Typography>
        <Typography variant="caption" color="text.secondary" display="flex" alignItems="center" gap={1}>
          <Email fontSize="inherit" />
          {doctor.email}
        </Typography>
      </Stack>
      <Button
        component={Link}
        href={`/doctors/${doctor.id}`}
        variant="ghost"
        fullWidth
        endIcon={<ChevronRight fontSize="small" />}
        size="small"
        sx={{ bgcolor: "primary.lighter", color: "primary.main" }}
      >
        View doctor profile
      </Button>
    </>
  );
}
