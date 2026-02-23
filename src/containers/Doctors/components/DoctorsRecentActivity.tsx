import { formatDateBerlin } from "@/lib/utils";
import { Appointment } from "@/types";
import { Box, Typography, Stack, Avatar, Card, StatusBadge } from "@/lib/mui";

export default function DoctorsRecentActivity({ recentActivity }: { recentActivity: Appointment[] }) {
  return (
    <Box>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
        Recent Activity
      </Typography>
      <Card>
        <Stack divider={<Box sx={{ borderBottom: 1, borderColor: "divider" }} />}>
          {recentActivity?.map((apt) => (
            <Stack key={apt.id} direction="row" spacing={2} alignItems="center" sx={{ py: 1.5 }}>
              {apt.patient && (
                <Avatar
                  firstName={apt.patient.firstName}
                  lastName={apt.patient.lastName}
                  src={apt.patient.avatarUrl}
                  size="sm"
                />
              )}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="body2" fontWeight={500} noWrap>
                  {apt.patient?.firstName} {apt.patient?.lastName}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {apt.doctor?.firstName} {apt.doctor?.lastName} · {formatDateBerlin(apt.scheduledAt)}
                </Typography>
              </Box>
              <StatusBadge status={apt.status} size="small" />
            </Stack>
          ))}
        </Stack>
      </Card>
    </Box>
  );
}
