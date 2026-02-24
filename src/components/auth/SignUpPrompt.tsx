import Link from "next/link";
import { Box, Typography } from "@/lib/mui/components";

export function SignUpPrompt() {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="body2" color="text.secondary">
        {"Don't have an account? "}
        <Typography
          component={Link}
          href="/signup"
          variant="body2"
          color="primary"
          sx={{ fontWeight: 600, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
        >
          Sign Up
        </Typography>
      </Typography>
    </Box>
  );
}
