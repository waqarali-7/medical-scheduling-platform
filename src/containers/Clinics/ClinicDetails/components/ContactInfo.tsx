import { Stack, Typography, Box } from "@/lib/mui/components";
import { LocationOn, Phone, Email, Language } from "@/lib/mui/icons";
import Link from "next/link";
import type { HeaderProps } from "../types";

export function ContactInfo({ clinic }: HeaderProps) {
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <LocationOn sx={{ fontSize: 20, color: "text.secondary" }} />
        <Box>
          <Typography variant="body2" color="text.primary">
            {clinic.address.street}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {clinic.address.postalCode} {clinic.address.city}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {clinic.address.state}
          </Typography>
        </Box>
      </Stack>

      <Stack direction="row" spacing={2} alignItems="center">
        <Phone sx={{ fontSize: 20, color: "text.secondary" }} />
        <Typography
          component="a"
          href={`tel:${clinic.phone}`}
          variant="body2"
          color="primary.main"
          sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
        >
          {clinic.phone}
        </Typography>
      </Stack>

      <Stack direction="row" spacing={2} alignItems="center">
        <Email sx={{ fontSize: 20, color: "text.secondary" }} />
        <Typography
          component="a"
          href={`mailto:${clinic.email}`}
          variant="body2"
          color="primary.main"
          sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
        >
          {clinic.email}
        </Typography>
      </Stack>

      {clinic.website && (
        <Stack direction="row" spacing={2} alignItems="center">
          <Language sx={{ fontSize: 20, color: "text.secondary" }} />
          <Link href={clinic.website} target="_blank" rel="noopener noreferrer">
            <Typography variant="body2" color="primary.main">
              {clinic.website.replace("https://", "").replace("http://", "")}
            </Typography>
          </Link>
        </Stack>
      )}
    </Stack>
  );
}
