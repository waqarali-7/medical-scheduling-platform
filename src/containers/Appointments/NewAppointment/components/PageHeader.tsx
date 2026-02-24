"use client";

import Link from "next/link";
import { ArrowBack } from "@/lib/mui/icons";
import { Box, Stack, Typography, IconButton } from "@/lib/mui/components";

export default function PageHeader() {
  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
      <Link href="/appointments" style={{ display: "inline-flex" }}>
        <IconButton component="span" disableRipple size="small">
          <ArrowBack />
        </IconButton>
      </Link>
      <Box>
        <Typography variant="h4" fontWeight={700} color="text.primary">
          Book an Appointment
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Schedule a medical appointment in minutes
        </Typography>
      </Box>
    </Stack>
  );
}
