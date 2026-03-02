import { Box, Card, Grid, Stack } from "@/lib/mui/components";
import { Skeleton } from "@mui/material";

/** Skeleton matching Dashboard: welcome card, Overview stat cards, then grid (upcoming + sidebar). */
export default function Loading() {
  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Card sx={{ mb: 4, p: 3 }}>
        <Skeleton variant="text" width={120} height={20} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" width={280} height={36} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" width={320} height={20} sx={{ mb: 2 }} />
        <Stack direction="row" spacing={2}>
          <Skeleton variant="rounded" width={160} height={40} />
          <Skeleton variant="rounded" width={140} height={40} />
        </Stack>
      </Card>

      <Skeleton variant="text" width={100} height={28} sx={{ mb: 2 }} />
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Grid size={{ xs: 6, md: 3 }} key={i}>
            <Skeleton variant="rounded" height={120} sx={{ borderRadius: 2 }} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, xl: 8 }}>
          <Skeleton variant="text" width={180} height={24} sx={{ mb: 2 }} />
          <Stack spacing={2}>
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} variant="rounded" height={88} sx={{ borderRadius: 2 }} />
            ))}
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, xl: 4 }}>
          <Stack spacing={3}>
            <Skeleton variant="rounded" height={200} sx={{ borderRadius: 2 }} />
            <Skeleton variant="rounded" height={180} sx={{ borderRadius: 2 }} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
