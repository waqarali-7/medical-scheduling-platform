"use client";

import { useState, useEffect } from "react";
import { Box, CssBaseline, useMediaQuery, useTheme } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
}

export default function AppShell({ children, title }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  // Fix hydration warning by using useEffect asynchronously
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted) return null;

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    if (isMobile) setSidebarOpen(false);
  };

  return (
    <Box sx={{ display: "flex", height: { xs: "100%", lg: "100vh" }, bgcolor: "background.default" }}>
      <CssBaseline />

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={handleSidebarToggle}
        mobile={isMobile}
        onLinkClick={handleSidebarClose}
      />

      {/* Main content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          transition: "margin-left 0.3s",
        }}
      >
        <Header onMenuClick={handleSidebarToggle} title={title} />
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
