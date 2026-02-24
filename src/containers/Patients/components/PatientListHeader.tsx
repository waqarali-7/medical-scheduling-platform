import { Box, Typography } from "@/lib/mui/components";

interface PatientListHeaderProps {
  count: number;
}

export function PatientListHeader({ count }: PatientListHeaderProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h4" fontWeight={700}>
        Patients
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {count} registered patients
      </Typography>
    </Box>
  );
}
