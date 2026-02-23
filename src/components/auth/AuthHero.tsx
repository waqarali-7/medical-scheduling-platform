import { Box, Typography } from "@/lib/mui";
import { MedicalServices } from "@mui/icons-material";

export interface AuthHeroProps {
  title: string;
  subtitle: string;
}

export function AuthHero({ title, subtitle }: AuthHeroProps) {
  return (
    <Box sx={{ textAlign: "center", mb: 4 }}>
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 64,
          height: 64,
          borderRadius: 4,
          bgcolor: "primary.main",
          mb: 2,
        }}
      >
        <MedicalServices sx={{ fontSize: 32, color: "primary.contrastText" }} />
      </Box>
      <Typography variant="h4" fontWeight={700} color="text.primary" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {subtitle}
      </Typography>
    </Box>
  );
}
