import { Box, Card, Grid, Stack } from "@/lib/mui/components";
import { Skeleton } from "@mui/material";

/** Skeleton matching Clinic detail: header, status banner, grid (contact + list | opening hours). */
export default function Loading() {
  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 3 }}>
        <Skeleton variant="text" width={240} height={40} />
        <Skeleton variant="rounded" width={100} height={40} />
      </Stack>

      <Skeleton variant="rounded" height={48} sx={{ mb: 3, borderRadius: 2 }} />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              <Skeleton variant="text" width={100} height={24} sx={{ mb: 2 }} />
              <Skeleton variant="text" width="80%" height={20} />
              <Skeleton variant="text" width="60%" height={20} />
              <Skeleton variant="text" width={180} height={20} />
            </Card>
            <Skeleton variant="rounded" height={200} sx={{ borderRadius: 2 }} />
            <Stack direction="row" spacing={1}>
              <Skeleton variant="rounded" width={80} height={28} sx={{ borderRadius: 2 }} />
              <Skeleton variant="rounded" width={80} height={28} sx={{ borderRadius: 2 }} />
            </Stack>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Skeleton variant="rounded" height={320} sx={{ borderRadius: 2 }} />
        </Grid>
      </Grid>
    </Box>
  );
}
