import { Divider, Typography } from "@/lib/mui";

export interface AuthDividerProps {
  label?: string;
}

export function AuthDivider({ label = "OR" }: AuthDividerProps) {
  return (
    <Divider sx={{ my: 3 }}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
    </Divider>
  );
}
