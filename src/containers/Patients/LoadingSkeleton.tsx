import { Box, Grid, Stack } from "@/lib/mui/components";
import { Skeleton } from "@mui/material";

/** Skeleton matching Patients: header, then grid of patient cards. */
export default function PatientsLoadingSkeleton() {
  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Stack spacing={4}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Skeleton variant="text" width={140} height={36} />
          <Skeleton variant="rounded" width={80} height={32} sx={{ borderRadius: 2 }} />
        </Stack>

        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Grid size={{ xs: 12, sm: 6, xl: 4 }} key={i}>
              <Skeleton variant="rounded" height={160} sx={{ borderRadius: 2 }} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}
