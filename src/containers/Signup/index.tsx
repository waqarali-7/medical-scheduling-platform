"use client";

import {useReducer} from "react";
import {useRouter} from "next/navigation";
import {useForm, Controller} from "react-hook-form";
import {Box, Input, Typography, Alert, InputAdornment, IconButton, Stack, Button, Card, Grid, MenuItem} from "@/lib/mui/components";
import {Email, Lock, Visibility, VisibilityOff, CheckCircle, Cancel, ArrowForward, PersonOutline, Person, Phone} from "@/lib/mui/icons";
import {createClient} from "@/lib/supabase/client";
import {useThemeMode} from "@/context/ThemeContext";
import {ThemeToggle, AuthHero, AuthDivider, AuthFooterNotice, SignInPrompt} from "@/components/auth";
import {PasswordStrengthMeter, RoleInfoCard, TermsNotice} from "./components";
import {PasswordStrength} from "./utils";
import type {SignupRole, SignupFormValues} from "./types";
import {signupUIReducer, INITIAL_SIGNUP_UI_STATE} from "./reducers";

const ROLES = [
  {value: "PATIENT", label: "Patient", description: "Book and manage appointments"},
  {value: "DOCTOR", label: "Doctor", description: "Manage your schedule and patients"},
  {value: "CLINIC_ADMIN", label: "Clinic Admin", description: "Manage clinic operations"},
];

const DEFAULT_VALUES: SignupFormValues = {
  role: "PATIENT",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignupContent() {
  const [{showPassword, showConfirmPassword, errorMsg, successMsg, loading}, dispatch] = useReducer(signupUIReducer, INITIAL_SIGNUP_UI_STATE);
  const router = useRouter();
  const {mode, toggleMode} = useThemeMode();

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<SignupFormValues>({
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const role = watch("role");
  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const strength = PasswordStrength.score(password ?? "");
  const passwordsMatch = Boolean(password && confirmPassword && password === confirmPassword);
  const canSubmit = Boolean(firstName?.trim() && lastName?.trim() && passwordsMatch);

  const onSubmit = async (data: SignupFormValues) => {
    dispatch({type: "CLEAR_MESSAGES"});
    if ((data.confirmPassword?.length ?? 0) > 0 && data.password !== data.confirmPassword) {
      dispatch({type: "SET_ERROR", payload: "Passwords do not match"});
      return;
    }
    if ((data.password?.length ?? 0) < 8) {
      dispatch({type: "SET_ERROR", payload: "Password must be at least 8 characters long"});
      return;
    }

    dispatch({type: "SET_LOADING", payload: true});
    const supabase = createClient();

    const {data: signUpData, error: signUpError} = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {data: {role: data.role}},
    });

    if (signUpError || !signUpData.user) {
      dispatch({type: "SET_ERROR", payload: signUpError?.message ?? "Signup failed. Please try again."});
      dispatch({type: "SET_LOADING", payload: false});
      return;
    }

    const now = new Date().toISOString();
    const {error: profileError} = await supabase.from("profiles").insert({
      id: signUpData.user.id,
      first_name: data.firstName.trim(),
      last_name: data.lastName.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim() || null,
      role: data.role,
      avatar_url: null,
      created_at: now,
      updated_at: now,
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

    dispatch({type: "SET_LOADING", payload: false});

    if (profileError) {
      dispatch({type: "SET_ERROR", payload: `Account created but profile setup failed: ${profileError.message}`});
      return;
    }

    dispatch({type: "SET_SUCCESS", payload: "Account created! Please check your email to verify your account."});
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
      <ThemeToggle mode={mode} onToggle={toggleMode} />

      <Box sx={{maxWidth: 480, width: "100%"}}>
        <AuthHero title="Join MedBook" subtitle="Create your account to start booking appointments" />

        <Card>
          <Typography variant="h5" fontWeight={600} sx={{mb: 3}}>
            Create Account
          </Typography>

          {errorMsg && (
            <Alert severity="error" sx={{mb: 3}} onClose={() => dispatch({type: "SET_ERROR", payload: ""})}>
              {errorMsg}
            </Alert>
          )}
          {successMsg && (
            <Alert severity="success" sx={{mb: 3}}>
              {successMsg}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2.5}>
              <Controller
                name="role"
                control={control}
                rules={{required: true}}
                render={({field}) => (
                  <Input
                    select
                    fullWidth
                    label="I am a"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value as SignupRole)}
                    onBlur={field.onBlur}
                    required
                    error={!!errors.role}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonOutline color="action" />
                          </InputAdornment>
                        ),
                      },
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
                  </Input>
                )}
              />

              <Grid container spacing={2}>
                <Grid size={{xs: 12, sm: 6}}>
                  <Controller
                    name="firstName"
                    control={control}
                    rules={{required: true}}
                    render={({field}) => (
                      <Input
                        fullWidth
                        label="First Name"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        onBlur={field.onBlur}
                        required
                        autoComplete="given-name"
                        error={!!errors.firstName}
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <Person color="action" />
                              </InputAdornment>
                            ),
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{xs: 12, sm: 6}}>
                  <Controller
                    name="lastName"
                    control={control}
                    rules={{required: true}}
                    render={({field}) => (
                      <Input
                        fullWidth
                        label="Last Name"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        onBlur={field.onBlur}
                        required
                        autoComplete="family-name"
                        error={!!errors.lastName}
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <Person color="action" />
                              </InputAdornment>
                            ),
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Controller
                name="phone"
                control={control}
                render={({field}) => (
                  <Input
                    fullWidth
                    label="Phone Number"
                    type="tel"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    onBlur={field.onBlur}
                    autoComplete="tel"
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <Phone color="action" />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                rules={{required: true}}
                render={({field}) => (
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

              <Box>
                <Controller
                  name="password"
                  control={control}
                  rules={{required: true, minLength: 8}}
                  render={({field}) => (
                    <Input
                      fullWidth
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      onBlur={field.onBlur}
                      required
                      autoComplete="new-password"
                      error={!!errors.password}
                      helperText={errors.password?.type === "minLength" ? "At least 8 characters" : undefined}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock color="action" />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => dispatch({type: "TOGGLE_SHOW_PASSWORD"})} edge="end" size="small" type="button">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  )}
                />
                {password && <PasswordStrengthMeter score={strength} />}
              </Box>

              <Controller
                name="confirmPassword"
                control={control}
                rules={{required: true}}
                render={({field}) => (
                  <Input
                    fullWidth
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    onBlur={field.onBlur}
                    required
                    autoComplete="new-password"
                    error={(confirmPassword?.length ?? 0) > 0 && !passwordsMatch}
                    helperText={(confirmPassword?.length ?? 0) > 0 && !passwordsMatch ? "Passwords do not match" : ""}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Stack direction="row" spacing={0.5} alignItems="center">
                              {(confirmPassword?.length ?? 0) > 0 && (passwordsMatch ? <CheckCircle sx={{fontSize: 20}} color="success" /> : <Cancel sx={{fontSize: 20}} color="error" />)}
                              <IconButton onClick={() => dispatch({type: "TOGGLE_SHOW_CONFIRM_PASSWORD"})} edge="end" size="small" type="button">
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </Stack>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                )}
              />

              <RoleInfoCard role={role} />
              <TermsNotice />

              <Button type="submit" variant="primary" fullWidth disabled={loading || !canSubmit} endIcon={loading ? null : <ArrowForward />}>
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </Stack>
          </Box>

          <AuthDivider />
          <SignInPrompt />
        </Card>

        <AuthFooterNotice text="Secure registration · Email verification required · GDPR compliant" />
      </Box>
    </Box>
  );
}
