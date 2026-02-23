import { Clinic } from "@/types";
import { LocationOn, Phone, Email } from "@mui/icons-material";
import { Paper, Typography, Stack } from "@/lib/mui";

export default function PracticeLocation({ clinic }: { clinic: Clinic | undefined }) {
  if (!clinic) return null;

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="caption" color="text.secondary" fontWeight={700} mb={1}>
        Practice Location
      </Typography>
      <Typography variant="body2" fontWeight={600}>
        {clinic.name}
      </Typography>
      <Stack spacing={0.5} mt={1}>
        <Stack direction="row" spacing={1} alignItems="center">
          <LocationOn fontSize="small" color="action" />
          <Typography variant="body2">
            {clinic.address.street}, {clinic.address.postalCode} {clinic.address.city}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Phone fontSize="small" color="action" />
          <Typography variant="body2">{clinic.phone}</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Email fontSize="small" color="action" />
          <Typography variant="body2">{clinic.email}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
