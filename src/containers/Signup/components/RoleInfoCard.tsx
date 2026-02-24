import { Box, Typography } from "@/lib/mui/components";
import type { SignupRole } from "../types";

const ROLE_CONTENT: Record<
  SignupRole,
  { title: string; description: string; color: "primary" | "success" | "warning" }
> = {
  PATIENT: {
    title: "👤 Patient Account",
    description:
      "You'll be able to book appointments, view your medical history, and manage your profile.",
    color: "primary",
  },
  DOCTOR: {
    title: "⚕️ Doctor Account",
    description:
      "You'll be able to manage your schedule, view patient appointments, and update availability.",
    color: "success",
  },
  CLINIC_ADMIN: {
    title: "🏥 Clinic Admin Account",
    description:
      "You'll be able to manage clinic operations, doctors, and system-wide settings.",
    color: "warning",
  },
};

interface RoleInfoCardProps {
  role: SignupRole;
}

export function RoleInfoCard({ role }: RoleInfoCardProps) {
  const { title, description, color } = ROLE_CONTENT[role];

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        border: 1,
        borderColor: `${color}.main`,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          bgcolor: `${color}.main`,
          opacity: 0.08,
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Typography variant="body2" fontWeight={600} color={`${color}.main`} sx={{ mb: 0.5 }}>
          {title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {description}
        </Typography>
      </Box>
    </Box>
  );
}
