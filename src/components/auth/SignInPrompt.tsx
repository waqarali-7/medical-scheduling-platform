import Link from "next/link";
import { Box, Typography } from "@/lib/mui/components";

export function SignInPrompt() {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="body2" color="text.secondary">
        Already have an account?{" "}
        <Typography
          component={Link}
          href="/login"
          variant="body2"
          color="primary"
          sx={{ fontWeight: 600, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
        >
          Sign In
        </Typography>
      </Typography>
    </Box>
  );
}
