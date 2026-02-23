"use client";

import { LocationOn, Phone, Email } from "@mui/icons-material";
import { Box, Stack, Typography, Button } from "@/lib/mui";
import type { Clinic } from "@/types";

interface LocationCardProps {
  clinic: Clinic;
}

export default function LocationCard({ clinic }: LocationCardProps) {
  return (
    <>
      <Typography variant="subtitle2" fontWeight={700} sx={{ textTransform: "uppercase", color: "text.secondary", mb: 2 }}>
        Location
      </Typography>
      <Stack direction="row" spacing={2}>
        <Box sx={{ p: 1.5, bgcolor: "error.lighter", borderRadius: 2 }}>
          <LocationOn color="error" fontSize="small" />
        </Box>
        <Box>
          <Typography variant="body2" fontWeight={600}>
            {clinic.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {clinic.address?.street}, {clinic.address?.postalCode} {clinic.address?.city}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {clinic.address?.state}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 1.5 }}>
            <Button component="a" href={`tel:${clinic.phone}`} variant="ghost" startIcon={<Phone fontSize="small" />} size="small">
              {clinic.phone}
            </Button>
            <Button component="a" href={`mailto:${clinic.email}`} variant="ghost" startIcon={<Email fontSize="small" />} size="small">
              {clinic.email}
            </Button>
          </Stack>
        </Box>
      </Stack>
    </>
  );
}
