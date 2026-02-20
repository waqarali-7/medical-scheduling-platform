"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Box, TextField, Typography, Alert, InputAdornment, IconButton, Stack, Divider, Tooltip } from "@mui/material";
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  MedicalServices,
  ArrowForward,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { createClient } from "@/lib/supabase/client";
import { useThemeMode } from "@/context/ThemeContext";
import { Button, Card } from "@/components/ui";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { mode, toggleMode } = useThemeMode();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setErrorMsg(error.message);
      return;
    }
    router.refresh();
    router.push("/dashboard");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      {/* Theme toggle */}
      <Tooltip title={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}>
        <IconButton onClick={toggleMode} sx={{ position: "fixed", top: 16, right: 16 }}>
          {mode === "light" ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
      </Tooltip>

      <Box sx={{ maxWidth: 480, width: "100%" }}>
        {/* Logo */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 4,
              bgcolor: "primary.main",
              mb: 2,
            }}
          >
            <MedicalServices sx={{ fontSize: 32, color: "primary.contrastText" }} />
          </Box>
          <Typography variant="h4" fontWeight={700} color="text.primary" sx={{ mb: 1 }}>
            Welcome to MedBook
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to manage your appointments
          </Typography>
        </Box>

        <Card>
          <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
            Sign In
          </Typography>

          {errorMsg && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setErrorMsg("")}>
              {errorMsg}
            </Alert>
          )}

          <Box component="form" onSubmit={handleLogin}>
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ textAlign: "right" }}>
                <Typography
                  component={Link}
                  href="/auth/forgot-password"
                  variant="body2"
                  color="primary"
                  sx={{ textDecoration: "none", fontWeight: 500, "&:hover": { textDecoration: "underline" } }}
                >
                  Forgot password?
                </Typography>
              </Box>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                disabled={loading}
                endIcon={loading ? null : <ArrowForward />}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </Stack>
          </Box>

          <Divider sx={{ my: 3 }}>
            <Typography variant="caption" color="text.secondary">
              OR
            </Typography>
          </Divider>

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              {"Don't have an account? "}
              <Typography
                component={Link}
                href="/signup"
                variant="body2"
                color="primary"
                sx={{ fontWeight: 600, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
              >
                Sign Up
              </Typography>
            </Typography>
          </Box>
        </Card>

        <Typography variant="caption" color="text.disabled" sx={{ display: "block", textAlign: "center", mt: 3 }}>
          Protected by GDPR compliance · Secure medical data handling
        </Typography>
      </Box>
    </Box>
  );
}
