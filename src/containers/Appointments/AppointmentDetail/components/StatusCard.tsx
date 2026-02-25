"use client";

import { CheckCircle, FavoriteBorder } from "@/lib/mui/icons";
import { Box, Stack, Typography, Stepper, Step, StepLabel, Button, Paper, StatusBadge } from "@/lib/mui/components";
import { getAvailableTransitions, STATUS_CONFIG } from "@/lib/utils";
import type { AppointmentStatus } from "@/types";
import { STATE_ORDER, TRANSITION_COLORS, TRANSITION_ICONS, TRANSITION_LABELS } from "../constants";
import { useCurrentUser } from "@/context/CurrentUserContext";
import { Role } from "@/lib/enums";

interface StatusCardProps {
  currentStatus: AppointmentStatus;
  onTransition: (newStatus: AppointmentStatus) => void;
}

export default function StatusCard({ currentStatus, onTransition }: StatusCardProps) {
  const user = useCurrentUser();
  const allTransitions = getAvailableTransitions(currentStatus);

  let availableTransitions: AppointmentStatus[] = [];

  if (user?.role === Role.DOCTOR) {
    availableTransitions = allTransitions;
  } else if (user?.role === Role.PATIENT) {
    availableTransitions = allTransitions.includes("CANCELLED") ? ["CANCELLED"] : [];
  } else {
    availableTransitions = [];
  }
  const isFinalState = currentStatus === "CANCELLED" || currentStatus === "COMPLETED" || currentStatus === "NO_SHOW";

  return (
    <>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
        <FavoriteBorder color="primary" fontSize="small" />
        <Typography variant="subtitle2" fontWeight={700} sx={{ textTransform: "uppercase", color: "text.secondary" }}>
          Appointment Status
        </Typography>
      </Stack>

      <Stepper activeStep={STATE_ORDER.indexOf(currentStatus)} alternativeLabel sx={{ mb: 3 }}>
        {STATE_ORDER.map((state) => {
          const config = STATUS_CONFIG[state];
          return (
            <Step key={state} completed={STATE_ORDER.indexOf(currentStatus) > STATE_ORDER.indexOf(state)}>
              <StepLabel>{config.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {(currentStatus === "CANCELLED" || currentStatus === "NO_SHOW") && (
        <Box sx={{ mb: 3, textAlign: "center" }}>
          <StatusBadge status={currentStatus} size="medium" />
        </Box>
      )}

      {!isFinalState && availableTransitions.length > 0 && (
        <Box>
          <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ mb: 1.5, display: "block" }}>
            Available actions:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {availableTransitions.map((nextStatus) => {
              const Icon = TRANSITION_ICONS[nextStatus];
              const color = TRANSITION_COLORS[nextStatus] || "default";
              return (
                <Button
                  key={nextStatus}
                  onClick={() => onTransition(nextStatus)}
                  variant="primary"
                  startIcon={Icon && <Icon />}
                  size="small"
                  sx={{
                    bgcolor: `${color}.main`,
                    "&:hover": { bgcolor: `${color}.dark` },
                  }}
                >
                  {TRANSITION_LABELS[nextStatus]}
                </Button>
              );
            })}
          </Stack>
        </Box>
      )}

      {isFinalState && (
        <Paper sx={{ p: 2, bgcolor: "primary.main" }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <CheckCircle color="disabled" fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              This appointment has reached a final state and cannot be modified.
            </Typography>
          </Stack>
        </Paper>
      )}
    </>
  );
}
