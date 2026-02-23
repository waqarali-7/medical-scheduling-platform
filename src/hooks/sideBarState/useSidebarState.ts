import { useState, useEffect, useRef } from "react";
import { useMediaQuery, useTheme } from "@mui/material";

const SIDEBAR_STORAGE_KEY = "medbook-sidebar-open";

function getStoredSidebarState(): boolean {
  if (typeof window === "undefined") return true;
  const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
  return stored !== null ? stored === "true" : true;
}

export function useSidebarState() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [mounted, setMounted] = useState(false);
  const prevIsMobile = useRef(isMobile);

  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window === "undefined") return true;
    return getStoredSidebarState();
  });

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const mobileStateChanged = prevIsMobile.current !== isMobile;
    prevIsMobile.current = isMobile;

    if (!mobileStateChanged) return;

    if (isMobile) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSidebarOpen(false);
    } else {
      setSidebarOpen(getStoredSidebarState());
    }
  }, [isMobile, mounted]);

  useEffect(() => {
    if (mounted && !isMobile) {
      localStorage.setItem(SIDEBAR_STORAGE_KEY, String(sidebarOpen));
    }
  }, [sidebarOpen, mounted, isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return {
    sidebarOpen,
    toggleSidebar,
    closeSidebar,
    mounted,
    isMobile,
  };
}
