"use client";

import { Paper, Typography, Box, SxProps, Theme } from "@/lib/mui/components";
import { ReactNode } from "react";

interface EmptyStateProps {
  element: ReactNode;
  primary: string;
  secondary?: string;
  cta?: ReactNode;
  sx?: SxProps<Theme>;
}

export function EmptyState({ element, primary, secondary, cta, sx }: EmptyStateProps) {
  return (
    <Paper sx={{ textAlign: "center", py: 8, ...sx }}>
      {element && (
        <Box
          sx={{
            fontSize: 48,
            color: "text.secondary",
            mx: "auto",
            display: "block",
            mb: 2,
          }}
        >
          {element}
        </Box>
      )}
      <Typography color="text.secondary" fontWeight={500}>
        {primary}
      </Typography>
      {secondary && (
        <Typography color="text.disabled" fontSize="0.875rem" mt={0.5}>
          {secondary}
        </Typography>
      )}
      {cta}
    </Paper>
  );
}
