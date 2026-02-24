import { Box, Typography } from "@/lib/mui/components";
import { MedicalServices } from "@/lib/mui/icons";

interface LogoProps {
  icon?: boolean;
  iconSize?: number;
  text?: boolean;
}

export default function Logo({ icon = false, iconSize = 22, text = true }: LogoProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {icon && (
        <Box
          sx={{
            width: iconSize + iconSize * 0.75,
            height: iconSize + iconSize * 0.75,
            borderRadius: 6,
            background: "linear-gradient(135deg, #38bdf8 0%, #14b8a6 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          <MedicalServices sx={{ fontSize: iconSize }} />
        </Box>
      )}

      {text && (
        <Typography variant="h6" sx={{ fontWeight: 700, color: "text.primary" }}>
          Med
          <Box component="span" sx={{ color: "#38bdf8" }}>
            Book
          </Box>
        </Typography>
      )}
    </Box>
  );
}
