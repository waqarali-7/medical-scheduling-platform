import { Box, Card, Grid, Stack } from "@/lib/mui/components";
import { Skeleton } from "@mui/material";

/** Skeleton matching Doctor detail: header (avatar + name), then content grid. */
export default function DoctorDetailLoadingSkeleton() {
  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Card sx={{ p: 3, mb: 3 }}>
        <Stack direction="row" spacing={3} alignItems="center">
          <Skeleton variant="circular" width={80} height={80} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width={220} height={32} sx={{ mb: 1 }} />
            <Skeleton variant="text" width={140} height={20} />
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <Skeleton variant="rounded" width={60} height={24} sx={{ borderRadius: 2 }} />
              <Skeleton variant="rounded" width={80} height={24} sx={{ borderRadius: 2 }} />
            </Stack>
          </Box>
        </Stack>
      </Card>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={3}>
            <Skeleton variant="rounded" height={120} sx={{ borderRadius: 2 }} />
            <Skeleton variant="rounded" height={200} sx={{ borderRadius: 2 }} />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={2}>
            <Skeleton variant="rounded" height={100} sx={{ borderRadius: 2 }} />
            <Skeleton variant="rounded" height={180} sx={{ borderRadius: 2 }} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
