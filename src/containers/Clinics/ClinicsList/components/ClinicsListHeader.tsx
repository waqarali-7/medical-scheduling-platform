import { Box, Button, Stack, Typography } from "@/lib/mui";
import { User } from "@/types";
import { Add } from "@mui/icons-material";
import Link from "next/link";

export function ClinicsListHeader({ user, clinicsCount }: { user: User | null; clinicsCount: number }) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems={{ xs: "stretch", sm: "center" }}
      spacing={2}
      sx={{ mb: 3 }}
    >
      <Box>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
          Our Clinics
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {clinicsCount} location{clinicsCount !== 1 ? "s" : ""} across Germany
        </Typography>
      </Box>
      {user?.role === "CLINIC_ADMIN" && (
        <Button component={Link} href="/clinics/new" variant="primary" startIcon={<Add />}>
          Add Clinic
        </Button>
      )}
    </Stack>
  );
}
