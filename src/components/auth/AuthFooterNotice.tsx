import { Typography } from "@/lib/mui/components";

export interface AuthFooterNoticeProps {
  text: string;
}

export function AuthFooterNotice({ text }: AuthFooterNoticeProps) {
  return (
    <Typography
      variant="caption"
      color="text.disabled"
      sx={{ display: "block", textAlign: "center", mt: 3 }}
    >
      {text}
    </Typography>
  );
}
