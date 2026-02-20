"use client";

import { Box, Typography } from "@mui/material";
import { SentimentDissatisfied } from "@mui/icons-material";
import { Button } from "@/components/ui";
import Link from "next/link";

export default function Custom404() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        px: 4,
        py: 2,
        gap: 2,
      }}
    >
      <SentimentDissatisfied sx={{ fontSize: 64, color: "text.disabled" }} />

      <Typography variant="h1" fontWeight={700} color="text.primary">
        404
      </Typography>

      <Typography variant="h6" color="text.secondary">
        Oops! Page not found.
      </Typography>

      <Button component={Link} href="/dashboard" variant="primary">
        Go to Dashboard
      </Button>
    </Box>
  );
}
