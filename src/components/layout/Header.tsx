"use client";

import {Menu, Add, Brightness4, Brightness7, Search} from "@/lib/mui/icons";
import {useCurrentUser} from "@/context/CurrentUserContext";
import Link from "next/link";
import {Button, IconButton, InputAdornment} from "@/lib/mui/components";
import {Box, TextField, Typography} from "@mui/material";
import {useThemeMode} from "@/context/ThemeContext";
import {Role} from "@/lib/enums";

interface HeaderProps {
  onMenuClick: () => void;
  title?: string;
}

export default function Header({onMenuClick, title}: HeaderProps) {
  const {mode, toggleMode} = useThemeMode();
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
        px: {xs: 2, lg: 3},
        gap: 2,
        position: "sticky",
        top: 0,
        zIndex: 20,
        bgcolor: "background.paper",
      }}
    >
      {/* Mobile menu toggle */}
      <IconButton onClick={onMenuClick} sx={{display: {lg: "none"}}}>
        <Menu />
      </IconButton>

      {/* Title */}
      {title && (
        <Typography variant="h6" sx={{display: {lg: "none"}, fontWeight: 600}}>
          {title}
        </Typography>
      )}

      {/* Quick Book Button */}
      {currentUser?.role === Role.PATIENT && (
        <Button
          component={Link}
          href="/appointments/new"
          variant="primary"
          startIcon={<Add />}
          sx={{
            display: {xs: "none", sm: "flex"},
          }}
        >
          New Appointment
        </Button>
      )}

      {/* Search */}
      <Box
        sx={{
          display: "flex",
          flex: {xs: "1", lg: "4"},
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
    </Box>
  );
}
