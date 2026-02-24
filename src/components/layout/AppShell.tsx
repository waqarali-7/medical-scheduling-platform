"use client";

import { useSidebarState } from "@/hooks/sideBarState/useSidebarState";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Box } from "@/lib/mui/components";

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
}

export default function AppShell({ children, title }: AppShellProps) {
  const { sidebarOpen, toggleSidebar, closeSidebar, mounted, isMobile } = useSidebarState();

  if (!mounted) return null;

  return (
    <Box sx={{ display: "flex", height: { xs: "100%", lg: "100vh" }, bgcolor: "background.default" }}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} mobile={isMobile} onLinkClick={closeSidebar} />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          transition: "margin-left 0.3s",
        }}
      >
        <Header onMenuClick={toggleSidebar} title={title} />
        <Box
          component="main"
          sx={{
            flex: 1,
            p: { xs: 2, lg: 3 },
            overflowY: "auto",
            maxWidth: "1920px",
            mx: "auto",
            width: "100%",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
