import { Doctor } from "@/types";
import { Paper, Typography } from "@mui/material";

export default function AboutDoctor({ doctor }: { doctor: Doctor }) {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="subtitle2" color="text.secondary" fontWeight={700} mb={1}>
        About
      </Typography>
      <Typography variant="body2">{doctor?.bio}</Typography>
    </Paper>
  );
}
