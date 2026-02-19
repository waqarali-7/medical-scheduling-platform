"use client";

import { Menu as MenuIcon, Add as AddIcon, Search as SearchIcon, Brightness4, Brightness7 } from "@mui/icons-material";

import { useCurrentUser } from "@/context/CurrentUserContext";
import Button from "@/components/ui/Button";
import NextLink from "../ui/Link";
import { IconButton } from "../ui";
import { Box, Typography } from "@mui/material";
import { useThemeMode } from "@/context/ThemeContext";

interface HeaderProps {
  onMenuClick: () => void;
  title?: string;
}

export default function Header({ onMenuClick, title }: HeaderProps) {
  const { mode, toggleMode } = useThemeMode();
  const currentUser = useCurrentUser();

  return (
    <Box
      component="header"
      sx={{
        height: 64,
        borderBottom: "1px solid",
        borderColor: "divider",
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
        px: { xs: 2, lg: 3 },
        gap: 2,
        position: "sticky",
        top: 0,
        zIndex: 20,
        bgcolor: "background.paper",
      }}
    >
      {/* Mobile menu toggle */}
      <IconButton onClick={onMenuClick} sx={{ display: { lg: "none" } }}>
        <MenuIcon />
      </IconButton>

      {/* Title */}
      {title && (
        <Typography variant="h6" sx={{ display: { lg: "none" }, fontWeight: 600 }}>
          {title}
        </Typography>
      )}

      {/* Quick Book Button */}
      <Button
        component={NextLink}
        href="/appointments/new"
        variant="primary"
        startIcon={<AddIcon />}
        sx={{
          display: { xs: "none", sm: "flex" },
        }}
      >
        New Appointment
      </Button>

      {/* Search */}
      <Box
        sx={{
          display: "flex",
          flex: { xs: "1", lg: "4" },
          maxWidth: 400,
        }}
      >
        <Box sx={{ position: "relative", width: "100%" }}>
          <SearchIcon
            sx={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: "text.disabled",
              fontSize: 18,
            }}
          />
          <input
            type="text"
            placeholder="Search patients, doctors, appointments..."
            style={{
              width: "100%",
              padding: "6px 12px 6px 36px",
              borderRadius: 16,
              border: "1px solid #e5e7eb",
              fontSize: 14,
            }}
          />
        </Box>
      </Box>

      <IconButton onClick={toggleMode} color="inherit">
        {mode === "light" ? <Brightness4 /> : <Brightness7 />}
      </IconButton>
      {/* User Avatar */}
      <Box
        sx={{
          ml: 2,
          width: 36,
          height: 36,
          borderRadius: 2,
          background: "linear-gradient(135deg, #0284c7 0%, #14b8a6 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: 600,
          fontSize: 14,
          cursor: "default",
        }}
      >
        {currentUser?.firstName?.charAt(0) ?? "?"}
        {currentUser?.lastName?.charAt(0) ?? ""}
      </Box>
    </Box>
  );
}
