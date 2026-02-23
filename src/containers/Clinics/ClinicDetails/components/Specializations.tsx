import { Stack, Typography, Chip } from "@/lib/mui";
import { SpecializationsProps } from "../types";

export function Specializations({ specializations }: SpecializationsProps) {
  return (
    <Stack spacing={1}>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
        Specializations
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {specializations.map((spec) => (
          <Chip key={spec} label={spec} sx={{ bgcolor: "primary.lighter", color: "primary.dark", fontWeight: 600 }} />
        ))}
      </Stack>
    </Stack>
  );
}
