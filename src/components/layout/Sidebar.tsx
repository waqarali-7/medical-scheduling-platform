"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Stack,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Drawer,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import {
  Dashboard,
  CalendarMonth,
  People,
  Settings,
  Logout,
  ChevronRight,
  MedicalServices,
  Menu,
  Warning,
  Apartment,
} from "@mui/icons-material";
import { usePathname } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import { useCurrentUser } from "@/context/CurrentUserContext";
import { Button } from "@/lib/mui";
import { UserRole } from "@/types";
import { ROLE_ROUTE_MAP } from "@/proxy";

const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const ALL_NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: <Dashboard /> },
  { label: "Appointments", href: "/appointments", icon: <CalendarMonth /> },
  { label: "Doctors", href: "/doctors", icon: <MedicalServices /> },
  { label: "Patients", href: "/patients", icon: <People /> },
  { label: "Clinics", href: "/clinics", icon: <Apartment /> },
] as const;

export const NAV_ITEMS = (role: UserRole | undefined) => {
  if (!role) return [];
  const allowed = ROLE_ROUTE_MAP[role];
  return ALL_NAV_ITEMS.filter((item) => allowed.includes(item.href));
};

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  mobile?: boolean;
  onLinkClick?: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar, mobile = false, onLinkClick }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const currentUser = useCurrentUser();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true);

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        alert("Failed to logout. Please try again.");
        return;
      }

      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("Logout exception:", err);
      alert("An error occurred during logout.");
    } finally {
      setIsLoggingOut(false);
      setShowLogoutDialog(false);
    }
  };

  const handleLogoutCancel = () => {
    setShowLogoutDialog(false);
  };

  const sidebarContent = (
    <Box
      sx={{
        width: mobile ? 260 : isOpen ? 260 : 64,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        borderRight: mobile ? 0 : 1,
        borderColor: "divider",
        transition: "width 0.3s",
      }}
    >
      {/* Logo + toggle */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: isOpen ? "space-between" : "center",
          px: 2,
          height: 64,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        {isOpen && (
          <Link href="/dashboard" style={{ textDecoration: "none" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: 2,
                  background: "linear-gradient(135deg, #38bdf8 0%, #14b8a6 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <MedicalServices sx={{ fontSize: 18 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: "text.primary" }}>
                Med<span style={{ color: "#38bdf8" }}>Book</span>
              </Typography>
            </Box>
          </Link>
        )}
        <IconButton onClick={toggleSidebar}>
          <Menu sx={{ fontSize: 20 }} />
        </IconButton>
      </Box>

      {/* User Info */}
      <Box sx={{ px: 1, py: 1, borderBottom: 1, borderColor: "divider" }}>
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          sx={{ px: 1, py: 1, borderRadius: 2, bgcolor: "primary" }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: 1,
              background: "linear-gradient(135deg, #38bdf8 0%, #14b8a6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 600,
              fontSize: 12,
            }}
          >
            {currentUser?.firstName?.charAt(0) ?? "?"}
            {currentUser?.lastName?.charAt(0) ?? ""}
          </Box>
          {isOpen && (
            <>
              <Box sx={{ flex: 1, minWidth: 0, height: 32 }}>
                <Typography variant="caption" color="text.primary" sx={{ textTransform: "capitalize" }}>
                  {currentUser?.role?.replace("_", " ").toLowerCase() ?? "user"}
                </Typography>
              </Box>
              <ChevronRight fontSize="small" />
            </>
          )}
        </Stack>
      </Box>

      {/* Navigation */}
      <Box sx={{ flex: 1, overflowY: "auto", py: 2 }}>
        <List>
          {NAV_ITEMS(currentUser?.role).map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Tooltip key={item.href} title={!isOpen ? item.label : ""} placement="right">
                <ListItemButton
                  component={Link}
                  href={item.href}
                  selected={isActive}
                  onClick={onLinkClick}
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    px: 2,
                    height: 48,
                    justifyContent: "initial",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 36,
                      color: isActive ? "primary.main" : "text.secondary",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {isOpen && <ListItemText primary={item.label} />}
                </ListItemButton>
              </Tooltip>
            );
          })}
        </List>
      </Box>

      {/* Bottom Links */}

      <Box sx={{ py: 2, borderTop: 1, borderColor: "divider" }}>
        <List>
          <ListItemButton component={Link} href="/settings" sx={{ borderRadius: 2, paddingStart: 3, height: 48 }}>
            <ListItemIcon>
              <Settings sx={{ fontSize: 22 }} />
            </ListItemIcon>
            {isOpen && <ListItemText primary="Settings" />}
          </ListItemButton>
          <ListItemButton
            onClick={handleLogoutClick}
            sx={{ borderRadius: 2, paddingStart: 3, height: 48, color: "error.main" }}
          >
            <ListItemIcon>
              <Logout sx={{ fontSize: 22, color: "error.main" }} />
            </ListItemIcon>
            {isOpen && <ListItemText primary="Sign Out" />}
          </ListItemButton>
        </List>
      </Box>

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutDialog} onClose={handleLogoutCancel}>
        <DialogTitle>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: "error.lighter",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Warning sx={{ color: "error.main", fontSize: 28 }} />
            </Box>
            <Typography variant="h6" fontWeight={600}>
              Sign Out
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Are you sure you want to sign out? You&apos;ll need to log in again to access your account.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleLogoutCancel} variant="outline" disabled={isLoggingOut}>
            Cancel
          </Button>
          <Button
            onClick={handleLogoutConfirm}
            variant="primary"
            disabled={isLoggingOut}
            startIcon={isLoggingOut ? <CircularProgress size={16} color="inherit" /> : <Logout />}
            sx={{
              bgcolor: "error.main",
              "&:hover": { bgcolor: "error.dark" },
            }}
          >
            {isLoggingOut ? "Signing out..." : "Sign Out"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );

  // Mobile drawer
  if (mobile) {
    return (
      <Drawer open={isOpen} onClose={toggleSidebar} variant="temporary" ModalProps={{ keepMounted: true }}>
        {sidebarContent}
      </Drawer>
    );
  }

  return sidebarContent;
}
