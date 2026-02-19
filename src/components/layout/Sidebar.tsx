"use client";

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
} from "@mui/icons-material";
import { usePathname } from "next/navigation";
import NextLink from "../ui/Link";
import Link from "next/link";
import { useCurrentUser } from "@/context/CurrentUserContext";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: <Dashboard /> },
  { label: "Appointments", href: "/appointments", icon: <CalendarMonth /> },
  { label: "Doctors", href: "/doctors", icon: <MedicalServices /> },
  { label: "Patients", href: "/patients", icon: <People /> },
];

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  mobile?: boolean;
  onLinkClick?: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar, mobile = false, onLinkClick }: SidebarProps) {
  const pathname = usePathname();
  const currentUser = useCurrentUser();

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
                <Typography variant="caption" color="text.primary " sx={{ textTransform: "capitalize" }}>
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
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Tooltip key={item.href} title={!isOpen ? item.label : ""} placement="right">
                <ListItemButton
                  component={NextLink}
                  href={item.href}
                  selected={isActive}
                  onClick={onLinkClick}
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    px: 2,
                    height: 48,
                    justifyContent: "initial",
                    color: isActive ? "primary.main" : "text.secondary",
                    "&.Mui-selected": { bgcolor: "primary.lighter" },
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
      {isOpen && (
        <Box sx={{ px: 2, py: 2, borderTop: 1, borderColor: "divider" }}>
          <List>
            <ListItemButton component={NextLink} href="/settings" sx={{ borderRadius: 2 }}>
              <ListItemIcon>
                <Settings sx={{ fontSize: 18 }} />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
            <ListItemButton sx={{ borderRadius: 2, color: "error.main" }}>
              <ListItemIcon>
                <Logout sx={{ fontSize: 18 }} />
              </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItemButton>
          </List>
        </Box>
      )}
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
