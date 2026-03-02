import { Box, Paper, Stack } from "@/lib/mui/components";
import { Skeleton } from "@mui/material";

/** Skeleton matching Appointments list: header, filters card (search + tabs), list of appointment cards. */
export default function Loading() {
  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Skeleton variant="text" width={180} height={36} />
          <Skeleton variant="text" width={260} height={20} sx={{ mt: 0.5 }} />
        </Box>
        <Skeleton variant="rounded" width={180} height={40} />
      </Stack>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack spacing={2}>
          <Skeleton variant="rounded" height={56} sx={{ maxWidth: 400, borderRadius: 2 }} />
          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Skeleton variant="rounded" width={72} height={36} sx={{ borderRadius: 2 }} />
            <Skeleton variant="rounded" width={72} height={36} sx={{ borderRadius: 2 }} />
            <Skeleton variant="rounded" width={72} height={36} sx={{ borderRadius: 2 }} />
            <Skeleton variant="rounded" width={72} height={36} sx={{ borderRadius: 2 }} />
          </Stack>
        </Stack>
      </Paper>

      <Stack spacing={2}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} variant="rounded" height={100} sx={{ borderRadius: 2 }} />
        ))}
      </Stack>
    </Box>
  );
}
