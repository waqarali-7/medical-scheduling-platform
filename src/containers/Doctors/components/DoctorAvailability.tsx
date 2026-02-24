import {Doctor} from "@/types";
import {AccessTime} from "@/lib/mui/icons";
import {Paper, Typography, Stack, Box} from "@/lib/mui/components";

export default function DoctorAvailability({doctor}: {doctor: Doctor}) {
  return (
    <Paper sx={{p: 2}}>
      <Typography variant="caption" color="text.secondary" fontWeight={700} mb={1}>
        Availability
      </Typography>
      <Stack direction="row" spacing={1} alignItems="center" mb={1}>
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            bgcolor: doctor.isAvailable ? "success.main" : "grey.400",
            animation: doctor.isAvailable ? "pulse 1.5s infinite" : "none",
          }}
        />
        <Typography variant="body2">{doctor.isAvailable ? "Currently Accepting Patients" : "Not Accepting New Patients"}</Typography>
      </Stack>
      {doctor.nextAvailableSlot && (
        <Stack direction="row" spacing={0.5} alignItems="center">
          <AccessTime fontSize="small" color="action" />
          <Typography variant="caption" color="text.secondary">
            Next available:{" "}
            {new Date(doctor.nextAvailableSlot).toLocaleDateString("de-DE", {
              day: "numeric",
              month: "long",
            })}
          </Typography>
        </Stack>
      )}
    </Paper>
  );
}
