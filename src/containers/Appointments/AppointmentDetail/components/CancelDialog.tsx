"use client";

import { Cancel } from "@mui/icons-material";
import { Box, Stack, Typography, Paper, TextField, Button, Dialog } from "@/lib/mui";

interface CancelDialogProps {
  open: boolean;
  onClose: () => void;
  cancelReason: string;
  onCancelReasonChange: (value: string) => void;
  onConfirm: () => void;
}

export default function CancelDialog({
  open,
  onClose,
  cancelReason,
  onCancelReasonChange,
  onConfirm,
}: CancelDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Cancel Appointment"
      actions={
        <>
          <Button onClick={onClose} variant="outline">
            Keep Appointment
          </Button>
          <Button onClick={onConfirm} variant="primary" sx={{ bgcolor: "error.main", "&:hover": { bgcolor: "error.dark" } }}>
            Cancel Appointment
          </Button>
        </>
      }
    >
      <Stack spacing={2}>
        <Paper sx={{ p: 2, bgcolor: "error.lighter" }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Cancel color="error" />
            <Box>
              <Typography variant="body2" fontWeight={600} color="error.dark">
                This action cannot be undone
              </Typography>
              <Typography variant="caption" color="error.dark">
                Please provide a reason for cancellation
              </Typography>
            </Box>
          </Stack>
        </Paper>
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Reason for cancellation"
          value={cancelReason}
          onChange={(e) => onCancelReasonChange(e.target.value)}
          placeholder="Please provide a reason..."
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
        />
      </Stack>
    </Dialog>
  );
}
