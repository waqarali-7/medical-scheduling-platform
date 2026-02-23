"use client";

import Link from "next/link";
import { useReducer, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Input,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Stack,
  Button,
  Card,
} from "@/lib/mui";
import { Email, Lock, Visibility, VisibilityOff, ArrowForward } from "@mui/icons-material";
import { createClient } from "@/lib/supabase/client";
import { useThemeMode } from "@/context/ThemeContext";
import { ThemeToggle, AuthHero, AuthDivider, AuthFooterNotice, SignUpPrompt } from "@/components/auth";
import type { LoginFormValues } from "./types";
import { loginUIReducer, INITIAL_LOGIN_UI_STATE } from "./reducers";

const DEFAULT_VALUES: LoginFormValues = {
  email: "",
  password: "",
};

export default function LoginContent() {
  const [{ showPassword, errorMsg, loading }, dispatch] = useReducer(loginUIReducer, INITIAL_LOGIN_UI_STATE);
  const [adornmentsMounted, setAdornmentsMounted] = useState(false);
  const router = useRouter();
  const { mode, toggleMode } = useThemeMode();

  useEffect(() => setAdornmentsMounted(true), []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginFormValues) => {
    dispatch({ type: "CLEAR_ERROR" });
    dispatch({ type: "SET_LOADING", payload: true });
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email: data.email, password: data.password });
    dispatch({ type: "SET_LOADING", payload: false });
    if (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
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
      <ThemeToggle mode={mode} onToggle={toggleMode} />

      <Box sx={{ maxWidth: 480, width: "100%" }}>
        <AuthHero title="Welcome to MedBook" subtitle="Sign in to manage your appointments" />

        <Card>
          <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
            Sign In
          </Typography>

          {errorMsg && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => dispatch({ type: "SET_ERROR", payload: "" })}>
              {errorMsg}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2.5}>
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    onBlur={field.onBlur}
                    required
                    autoComplete="email"
                    error={!!errors.email}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email color="action" />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    fullWidth
                    label="Password"
                    type={adornmentsMounted && showPassword ? "text" : "password"}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    onBlur={field.onBlur}
                    required
                    autoComplete="current-password"
                    error={!!errors.password}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock color="action" />
                          </InputAdornment>
                        ),
                        ...(adornmentsMounted && {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => dispatch({ type: "TOGGLE_SHOW_PASSWORD" })}
                                edge="end"
                                size="small"
                                type="button"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }),
                      },
                    }}
                  />
                )}
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

          <AuthDivider />
          <SignUpPrompt />
        </Card>

        <AuthFooterNotice text="Protected by GDPR compliance · Secure medical data handling" />
      </Box>
    </Box>
  );
}
