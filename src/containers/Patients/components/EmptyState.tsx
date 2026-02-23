import { Box, Typography } from "@/lib/mui";

interface EmptyStateProps {
  message?: string;
}

export function EmptyState({ message = "No patients found." }: EmptyStateProps) {
  return (
    <Box sx={{ textAlign: "center", py: 4 }}>
      <Typography variant="body1" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
}
