import { Box, Stack, Typography, LinearProgress } from "@/lib/mui/components";
import { PasswordStrength } from "../utils";

interface PasswordStrengthMeterProps {
  score: number;
}

const HINT_TEXT = "Use 8+ characters with uppercase, lowercase, numbers & symbols";

export function PasswordStrengthMeter({ score }: PasswordStrengthMeterProps) {
  const color = PasswordStrength.color(score);
  const label = PasswordStrength.label(score);

  return (
    <Box sx={{ mt: 1.5 }}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
        <Typography variant="caption" color="text.secondary">
          Password strength:
        </Typography>
        <Typography variant="caption" fontWeight={600} color={`${color}.main`}>
          {label}
        </Typography>
      </Stack>
      <LinearProgress
        variant="determinate"
        value={score}
        color={color}
        sx={{ height: 6, borderRadius: 1 }}
        aria-label={`Password strength: ${label}`}
      />
      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
        {HINT_TEXT}
      </Typography>
    </Box>
  );
}
