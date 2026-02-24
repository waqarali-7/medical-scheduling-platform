"use client";

import Link from "next/link";
import { Add } from "@/lib/mui/icons";
import { Box, Typography, Stack, Button } from "@/lib/mui/components";
import { AppointmentsHeaderProps } from "../types";
import { Role } from "@/lib/enums";

export function AppointmentsHeader({ totalCount, confirmedCount, userRole }: AppointmentsHeaderProps) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems={{ xs: "stretch", sm: "center" }}
      spacing={2}
      sx={{ mb: 3 }}
    >
      <Box>
        <Typography variant="h4" fontWeight={700}>
          Appointments
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {totalCount} total appointments · {confirmedCount} confirmed
        </Typography>
      </Box>
      {userRole === Role.PATIENT && (
        <Button component={Link} href="/appointments/new" variant="primary" startIcon={<Add />}>
          New Appointment
        </Button>
      )}
    </Stack>
  );
}
