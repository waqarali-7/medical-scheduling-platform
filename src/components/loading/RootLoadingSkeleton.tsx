import { Box, Stack } from "@/lib/mui/components";
import { Skeleton } from "@mui/material";

/** Fallback skeleton for segments that don't define their own loading (e.g. root redirect). */
export default function RootLoadingSkeleton() {
  return (
    <Box sx={{ py: 4, px: 2, width: "100%", maxWidth: 1920, mx: "auto" }}>
      <Stack spacing={3}>
        <Skeleton variant="text" width={200} height={36} />
        <Skeleton variant="rounded" width="100%" height={120} sx={{ borderRadius: 2 }} />
        <Skeleton variant="rounded" width="100%" height={200} sx={{ borderRadius: 2 }} />
      </Stack>
    </Box>
  );
}
