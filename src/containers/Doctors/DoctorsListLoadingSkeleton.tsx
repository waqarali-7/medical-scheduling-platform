import { Box, Stack } from "@/lib/mui/components";
import { Skeleton } from "@mui/material";

/** Skeleton matching Doctors list: header, filters, "Showing X" line, list of doctor cards. */
export default function DoctorsListLoadingSkeleton() {
  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" spacing={2} sx={{ mb: 3 }}>
        <Skeleton variant="text" width={180} height={40} />
        <Skeleton variant="rounded" width={140} height={40} />
      </Stack>

      <Stack spacing={2} sx={{ mb: 3 }}>
        <Skeleton variant="rounded" height={56} sx={{ maxWidth: 400, borderRadius: 2 }} />
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Skeleton variant="rounded" width={80} height={32} sx={{ borderRadius: 4 }} />
          <Skeleton variant="rounded" width={100} height={32} sx={{ borderRadius: 4 }} />
          <Skeleton variant="rounded" width={120} height={32} sx={{ borderRadius: 4 }} />
        </Stack>
      </Stack>

      <Skeleton variant="text" width={160} height={20} sx={{ mb: 2 }} />

      <Stack spacing={2}>
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} variant="rounded" height={140} sx={{ borderRadius: 2 }} />
        ))}
      </Stack>
    </Box>
  );
}
