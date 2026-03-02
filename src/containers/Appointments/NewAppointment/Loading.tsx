import { Box, Paper, Stack } from "@/lib/mui/components";
import { Skeleton } from "@mui/material";

/** Skeleton matching New Appointment form: stepper + form fields. */
export default function Loading() {
  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Skeleton variant="text" width={200} height={32} sx={{ mb: 3 }} />
      <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
        <Skeleton variant="rounded" width={80} height={8} sx={{ flex: 1, borderRadius: 1 }} />
        <Skeleton variant="rounded" width={80} height={8} sx={{ flex: 1, borderRadius: 1 }} />
        <Skeleton variant="rounded" width={80} height={8} sx={{ flex: 1, borderRadius: 1 }} />
      </Stack>
      <Paper sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Skeleton variant="rounded" height={56} sx={{ borderRadius: 2 }} />
          <Skeleton variant="rounded" height={56} sx={{ borderRadius: 2 }} />
          <Skeleton variant="rounded" height={56} sx={{ borderRadius: 2 }} />
          <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ mt: 2 }}>
            <Skeleton variant="rounded" width={100} height={40} />
            <Skeleton variant="rounded" width={100} height={40} />
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
