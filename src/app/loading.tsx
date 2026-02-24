import Logo from "@/components/common/Logo";
import { Box, Loading as ScreenLoading } from "@/lib/mui/components";

export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: 3,
      }}
    >
      <Logo icon={true} />
      <ScreenLoading />
    </Box>
  );
}
