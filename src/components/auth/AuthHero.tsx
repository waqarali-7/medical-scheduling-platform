import { Box, Typography } from "@/lib/mui/components";
import Logo from "@/components/common/Logo";

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
          mb: 2,
        }}
      >
        <Logo icon={true} iconSize={40} text={false} />
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
