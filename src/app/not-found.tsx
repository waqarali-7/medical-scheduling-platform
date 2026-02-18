import { Box, Typography, Button } from "@mui/material";
import NextLink from "@/components/ui/Link";

export default function Custom404() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Oops! Page not found.
      </Typography>
      <Button variant="contained" component={NextLink} href="/">
        Go to Dashboard
      </Button>
    </Box>
  );
}
