import { Box, Card, Stack } from "@/lib/mui/components";
import { Skeleton } from "@mui/material";

/** Skeleton matching Appointment detail: header card + details. */
export default function Loading() {
  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Stack spacing={3}>
        <Card sx={{ p: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
            <Skeleton variant="text" width={200} height={28} />
            <Skeleton variant="rounded" width={100} height={28} sx={{ borderRadius: 2 }} />
          </Stack>
          <Skeleton variant="text" width="60%" height={20} />
          <Skeleton variant="text" width={180} height={20} sx={{ mt: 1 }} />
        </Card>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
          <Skeleton variant="rounded" width="100%" height={140} sx={{ flex: 1, borderRadius: 2 }} />
          <Skeleton variant="rounded" width="100%" height={140} sx={{ flex: 1, borderRadius: 2 }} />
        </Stack>
      </Stack>
    </Box>
  );
}
