"use client";

import { Menu as MenuIcon, Add as AddIcon, Brightness4, Brightness7, Search } from "@mui/icons-material";

import { useCurrentUser } from "@/context/CurrentUserContext";
import Link from "next/link";
import { Button, IconButton, InputAdornment } from "@/lib/mui";
import { Box, TextField, Typography } from "@mui/material";
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
      {currentUser?.role === "PATIENT" && (
        <Button
          component={Link}
          href="/appointments/new"
          variant="primary"
          startIcon={<AddIcon />}
          sx={{
            display: { xs: "none", sm: "flex" },
          }}
        >
          New Appointment
        </Button>
      )}

      {/* Search */}
      <Box
        sx={{
          display: "flex",
          flex: { xs: "1", lg: "4" },
          maxWidth: 400,
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Search patients, doctors, appointments..."
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
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
