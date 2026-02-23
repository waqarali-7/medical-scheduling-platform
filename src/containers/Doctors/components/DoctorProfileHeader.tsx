import { formatCurrency } from "@/lib/utils";
import { Doctor } from "@/types";
import { CalendarMonth } from "@mui/icons-material";
import { Paper, Box, Stack, Typography, Chip, Button } from "@/lib/mui";
import Link from "next/link";
import { renderStars } from "@/lib/mui/Stars";
import { useCurrentUser } from "@/context/CurrentUserContext";

export default function DoctorProfileHeader({ doctor }: { doctor: Doctor }) {
  const currentUser = useCurrentUser();
  return (
    <Paper sx={{ position: "relative", pb: 3, mb: 4 }}>
      <Box sx={{ height: 120 }} />
      <Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{ px: 3, mt: -6 }}>
        {/* Avatar */}
        <Box
          sx={{
            width: 120,
            height: 120,
            borderRadius: 3,
            border: "4px solid white",
            overflow: "hidden",
            bgcolor: "grey.300",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2.5rem",
            fontWeight: 700,
            color: "primary.main",
          }}
        >
          {doctor.firstName.charAt(0)}
          {doctor.lastName.charAt(0)}
        </Box>

        {/* Doctor Info */}
        <Stack flex={1} spacing={1}>
          <Typography variant="h4" fontWeight={700}>
            {doctor.firstName} {doctor.lastName}
          </Typography>
          <Typography variant="body1" color="primary" fontWeight={600}>
            {doctor.specialization}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            {renderStars(doctor.rating)}
            <Typography variant="body2" fontWeight={600}>
              {doctor.rating.toFixed(1)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ({doctor.reviewCount} reviews)
            </Typography>
            <Chip
              label={doctor.isAvailable ? "Available" : "Unavailable"}
              color={doctor.isAvailable ? "success" : "default"}
              size="small"
              sx={{ ml: 1 }}
            />
          </Stack>
        </Stack>

        {/* Fee & Book Button */}
        <Stack spacing={1} alignItems="flex-end">
          <Typography variant="caption" color="text.secondary">
            Consultation Fee
          </Typography>
          <Typography variant="h6" fontWeight={700}>
            {formatCurrency(doctor.consultationFee)}
          </Typography>
          {currentUser?.role === "PATIENT" && (
            <Link href={`/appointments/new?doctor=${doctor.id}`} passHref>
              <Button variant="primary" startIcon={<CalendarMonth />} color="primary" size="medium">
                Book Appointment
              </Button>
            </Link>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
}
