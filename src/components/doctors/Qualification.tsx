import { Doctor } from "@/types";
import { MedicalServices } from "@mui/icons-material";
import { Paper, Typography, Stack } from "@mui/material";

export default function Qualification({ doctor }: { doctor: Doctor }) {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="subtitle2" color="text.secondary" fontWeight={700} mb={2}>
        Qualifications & Certifications
      </Typography>
      <Stack spacing={1}>
        {doctor.qualifications.map((q) => (
          <Stack key={q} direction="row" spacing={1} alignItems="center">
            <MedicalServices color="primary" fontSize="small" />
            <Typography variant="body2">{q}</Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}
