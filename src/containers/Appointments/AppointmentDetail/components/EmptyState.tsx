"use client";

import { Box, Typography } from "@/lib/mui";

export default function EmptyState() {
  return (
    <Box sx={{ textAlign: "center", py: 12 }}>
      <Typography variant="h6" color="text.secondary">
        Appointment not found
      </Typography>
    </Box>
  );
}
