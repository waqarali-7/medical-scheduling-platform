import Link from "next/link";
import { Box, Typography } from "@/lib/mui/components";

const linkSx = { textDecoration: "none", fontWeight: 600, "&:hover": { textDecoration: "underline" } as const };

export function TermsNotice() {
  return (
    <Box sx={{ p: 2, borderRadius: 2, border: 1, borderColor: "divider", bgcolor: "action.hover" }}>
      <Typography variant="caption" color="text.secondary">
        By creating an account, you agree to our{" "}
        <Typography component={Link} href="/terms" variant="caption" color="primary" sx={linkSx}>
          Terms of Service
        </Typography>{" "}
        and{" "}
        <Typography component={Link} href="/privacy" variant="caption" color="primary" sx={linkSx}>
          Privacy Policy
        </Typography>
        . Your data is protected under GDPR regulations.
      </Typography>
    </Box>
  );
}
