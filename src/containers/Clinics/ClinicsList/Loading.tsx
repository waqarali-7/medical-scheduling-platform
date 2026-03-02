import { Box, Stack } from "@/lib/mui/components";
import { Skeleton } from "@mui/material";

/** Skeleton matching Clinics list: header, then stack of clinic cards. */
export default function Loading() {
  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Skeleton variant="text" width={120} height={36} />
        <Skeleton variant="rounded" width={120} height={40} />
      </Stack>

      <Stack spacing={3}>
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} variant="rounded" height={160} sx={{ borderRadius: 2 }} />
        ))}
      </Stack>
    </Box>
  );
}
