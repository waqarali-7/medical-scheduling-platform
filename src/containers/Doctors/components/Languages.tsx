import { Paper, Typography, Stack, Chip } from "@/lib/mui";

export default function Languages({ languages }: { languages: string[] }) {
  if (languages.length === 0) return null;

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="caption" color="text.secondary" fontWeight={700} mb={1}>
        Languages
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {languages.map((lang) => (
          <Chip key={lang} label={lang} size="small" color="primary" variant="outlined" />
        ))}
      </Stack>
    </Paper>
  );
}
