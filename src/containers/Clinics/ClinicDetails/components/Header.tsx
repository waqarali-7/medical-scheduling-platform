import { Stack, Typography, IconButton, Box } from "@/lib/mui";
import { ArrowBack, Star } from "@mui/icons-material";
import Link from "next/link";
import type { HeaderProps } from "../types";

export function Header({ clinic }: HeaderProps) {
  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
      <Link href="/clinics" style={{ display: "inline-flex" }}>
        <IconButton size="small">
          <ArrowBack />
        </IconButton>
      </Link>
      <Box flex={1}>
        <Typography variant="h4" fontWeight={700}>
          {clinic.name}
        </Typography>
        <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 0.5 }}>
          <Star sx={{ fontSize: 18, color: "warning.main" }} />
          <Typography variant="body2" color="text.secondary">
            {clinic.rating} ({clinic.reviewCount} reviews)
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
}
