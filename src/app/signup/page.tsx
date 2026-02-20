"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Box,
  TextField,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Stack,
  Divider,
  LinearProgress,
  MenuItem,
  Tooltip,
  Grid,
} from "@mui/material";
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  MedicalServices,
  CheckCircle,
  Cancel,
  ArrowForward,
  PersonOutline,
  Brightness4,
  Brightness7,
  Person,
  Phone,
} from "@mui/icons-material";
import { createClient } from "@/lib/supabase/client";
import { useThemeMode } from "@/context/ThemeContext";
import { Button, Card } from "@/components/ui";

const ROLES = [
  { value: "PATIENT", label: "Patient", description: "Book and manage appointments" },
  { value: "DOCTOR", label: "Doctor", description: "Manage your schedule and patients" },
  { value: "CLINIC_ADMIN", label: "Clinic Admin", description: "Manage clinic operations" },
];

const getPasswordStrength = (p: string): number => {
  let s = 0;
  if (p.length >= 8) s += 25;
  if (p.length >= 12) s += 25;
  if (/[a-z]/.test(p) && /[A-Z]/.test(p)) s += 25;
  if (/[0-9]/.test(p)) s += 15;
  if (/[^a-zA-Z0-9]/.test(p)) s += 10;
  return Math.min(s, 100);
};
const getStrengthColor = (s: number): "error" | "warning" | "success" =>
  s < 40 ? "error" : s < 70 ? "warning" : "success";
const getStrengthLabel = (s: number) => (s < 40 ? "Weak" : s < 70 ? "Medium" : "Strong");

const ROLE_COLOR: Record<string, "primary" | "success" | "warning"> = {
  PATIENT: "primary",
  DOCTOR: "success",
  CLINIC_ADMIN: "warning",
};

export default function SignupPage() {
  const [role, setRole] = useState<"PATIENT" | "DOCTOR" | "CLINIC_ADMIN">("PATIENT");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { mode, toggleMode } = useThemeMode();

  const strength = getPasswordStrength(password);
  const passwordsMatch = password === confirmPassword && confirmPassword !== "";
  const roleColor = ROLE_COLOR[role];

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setErrorMsg("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    // Step 1: Create the auth user
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { role } },
    });

    if (signUpError || !data.user) {
      setErrorMsg(signUpError?.message ?? "Signup failed. Please try again.");
      setLoading(false);
      return;
    }

    // Step 2: Insert a profile row using the same ID as the auth user.
    // This is the foreign key link — profiles.id === auth.users.id.
    const now = new Date().toISOString();
    const { error: profileError } = await supabase.from("profiles").insert({
      id: data.user.id, // FK to auth.users.id
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim() || null,
      role,
      avatar_url: null,
      created_at: now,
      updated_at: now,
      // Role-specific nullable fields — left null and filled in by the user later
      date_of_birth: null,
      insurance_number: null,
      address: null,
      medical_history: null,
      specialization: null,
      qualifications: null,
      clinic_id: null,
      rating: null,
      review_count: null,
      bio: null,
      languages: null,
      consultation_fee: null,
      is_available: null,
      next_available_slot: null,
    });

    setLoading(false);

    if (profileError) {
      // Auth user was created but profile insert failed — surface the error
      // so the user can contact support. Don't redirect.
      setErrorMsg(`Account created but profile setup failed: ${profileError.message}`);
      return;
    }

    setSuccessMsg("Account created! Please check your email to verify your account.");
    setTimeout(() => router.push("/login"), 3000);
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
            Join MedBook
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create your account to start booking appointments
          </Typography>
        </Box>

        <Card>
          <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
            Create Account
          </Typography>

          {errorMsg && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setErrorMsg("")}>
              {errorMsg}
            </Alert>
          )}
          {successMsg && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {successMsg}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSignup}>
            <Stack spacing={2.5}>
              {/* Role */}
              <TextField
                select
                fullWidth
                label="I am a"
                value={role}
                onChange={(e) => setRole(e.target.value as typeof role)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutline color="action" />
                    </InputAdornment>
                  ),
                }}
              >
                {ROLES.map((r) => (
                  <MenuItem key={r.value} value={r.value}>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {r.label}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {r.description}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </TextField>

              {/* First + Last name side by side */}
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    autoComplete="given-name"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    autoComplete="family-name"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              {/* Phone */}
              <TextField
                fullWidth
                label="Phone Number"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Email */}
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

              {/* Password */}
              <Box>
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
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
                {password && (
                  <Box sx={{ mt: 1.5 }}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">
                        Password strength:
                      </Typography>
                      <Typography variant="caption" fontWeight={600} color={`${getStrengthColor(strength)}.main`}>
                        {getStrengthLabel(strength)}
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={strength}
                      color={getStrengthColor(strength)}
                      sx={{ height: 6, borderRadius: 1 }}
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
                      Use 8+ characters with uppercase, lowercase, numbers & symbols
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* Confirm Password */}
              <TextField
                fullWidth
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
                error={confirmPassword !== "" && !passwordsMatch}
                helperText={confirmPassword !== "" && !passwordsMatch ? "Passwords do not match" : ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        {confirmPassword !== "" &&
                          (passwordsMatch ? (
                            <CheckCircle sx={{ fontSize: 20 }} color="success" />
                          ) : (
                            <Cancel sx={{ fontSize: 20 }} color="error" />
                          ))}
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                          size="small"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </Stack>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Role info box */}
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: 1,
                  borderColor: `${roleColor}.main`,
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    borderRadius: "inherit",
                    bgcolor: `${roleColor}.main`,
                    opacity: 0.08,
                  },
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <Typography variant="body2" fontWeight={600} color={`${roleColor}.main`} sx={{ mb: 0.5 }}>
                    {role === "PATIENT" && "👤 Patient Account"}
                    {role === "DOCTOR" && "⚕️ Doctor Account"}
                    {role === "CLINIC_ADMIN" && "🏥 Clinic Admin Account"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {role === "PATIENT" &&
                      "You'll be able to book appointments, view your medical history, and manage your profile."}
                    {role === "DOCTOR" &&
                      "You'll be able to manage your schedule, view patient appointments, and update availability."}
                    {role === "CLINIC_ADMIN" &&
                      "You'll be able to manage clinic operations, doctors, and system-wide settings."}
                  </Typography>
                </Box>
              </Box>

              {/* Terms */}
              <Box sx={{ p: 2, borderRadius: 2, border: 1, borderColor: "divider", bgcolor: "action.hover" }}>
                <Typography variant="caption" color="text.secondary">
                  By creating an account, you agree to our{" "}
                  <Typography
                    component={Link}
                    href="/terms"
                    variant="caption"
                    color="primary"
                    sx={{ textDecoration: "none", fontWeight: 600 }}
                  >
                    Terms of Service
                  </Typography>{" "}
                  and{" "}
                  <Typography
                    component={Link}
                    href="/privacy"
                    variant="caption"
                    color="primary"
                    sx={{ textDecoration: "none", fontWeight: 600 }}
                  >
                    Privacy Policy
                  </Typography>
                  . Your data is protected under GDPR regulations.
                </Typography>
              </Box>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                disabled={loading || !passwordsMatch || !firstName || !lastName}
                endIcon={loading ? null : <ArrowForward />}
              >
                {loading ? "Creating account..." : "Create Account"}
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
              Already have an account?{" "}
              <Typography
                component={Link}
                href="/login"
                variant="body2"
                color="primary"
                sx={{ fontWeight: 600, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
              >
                Sign In
              </Typography>
            </Typography>
          </Box>
        </Card>

        <Typography variant="caption" color="text.disabled" sx={{ display: "block", textAlign: "center", mt: 3 }}>
          Secure registration · Email verification required · GDPR compliant
        </Typography>
      </Box>
    </Box>
  );
}
