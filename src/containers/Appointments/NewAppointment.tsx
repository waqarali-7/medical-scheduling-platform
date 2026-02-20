"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowBack,
  ArrowForward,
  Check,
  CalendarMonth,
  Schedule,
  LocalHospital,
  Description,
  LocationOn,
  Star,
  Language,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Grid,
  Stack,
  Chip,
  IconButton,
  Paper,
} from "@mui/material";
import { formatCurrency } from "@/lib/utils";
import type { Doctor, Clinic, AppointmentType, TimeSlot } from "@/types";
import { Button, Card, Avatar, Alert } from "@/components/ui";

const APPOINTMENT_TYPES: { value: AppointmentType; label: string; desc: string }[] = [
  { value: "CONSULTATION", label: "Consultation", desc: "Initial consultation or new health concern" },
  { value: "FOLLOW_UP", label: "Follow-up", desc: "Follow-up on previous treatment" },
  { value: "CHECKUP", label: "Check-up", desc: "Routine annual health check" },
  { value: "SPECIALIST", label: "Specialist", desc: "Specialist referral appointment" },
  { value: "EMERGENCY", label: "Urgent Care", desc: "Same-day urgent medical care" },
];

const STEP_LABELS = ["Select Doctor", "Choose Date & Time", "Details", "Review & Confirm"];

const getAvailableDates = (): string[] => {
  const dates: string[] = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() !== 0) dates.push(d.toISOString().split("T")[0]);
  }
  return dates.slice(0, 7);
};

interface NewAppointmentProps {
  doctors: Doctor[];
  clinics: Clinic[];
}

export default function NewAppointment({ doctors, clinics }: NewAppointmentProps) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [selectedType, setSelectedType] = useState<AppointmentType | "">("");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [searchSpec, setSearchSpec] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableDates = getAvailableDates();

  const filteredDoctors = doctors.filter((d) =>
    searchSpec
      ? d.specialization.toLowerCase().includes(searchSpec.toLowerCase()) ||
        d.firstName.toLowerCase().includes(searchSpec.toLowerCase()) ||
        d.lastName.toLowerCase().includes(searchSpec.toLowerCase())
      : true,
  );

  const canProceedStep1 = !!selectedDoctor;
  const canProceedStep2 = !!selectedDate && !!selectedSlot;
  const canProceedStep3 = !!selectedType && reason.trim().length > 10;

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => router.push("/appointments?booked=true"), 1500);
  };

  const clinic = selectedDoctor ? clinics.find((c) => c.id === selectedDoctor.clinicId) : null;

  const dummySlots: TimeSlot[] = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
  ].map((t, i) => ({
    id: `gen-${i}`,
    doctorId: selectedDoctor?.id || "",
    date: selectedDate,
    startTime: t,
    endTime: "",
    isAvailable: i !== 2 && i !== 5 && i !== 8,
    durationMinutes: 30,
  }));

  return (
    <Box sx={{ maxWidth: 1400, mx: "auto", py: 3 }}>
      {/* Header */}
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
        <IconButton component={Link} href="/appointments">
          <ArrowBack />
        </IconButton>
        <Box>
          <Typography variant="h4" fontWeight={700} color="text.primary">
            Book an Appointment
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Schedule a medical appointment in minutes
          </Typography>
        </Box>
      </Stack>

      {/* Stepper */}
      <Card sx={{ mb: 3 }}>
        <Stepper activeStep={step} alternativeLabel>
          {STEP_LABELS.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Card>

      {/* Step Content */}
      <Card sx={{ mb: 3 }}>
        {/* ── Step 1: Select Doctor ───────────────────────────────────────── */}
        {step === 0 && (
          <Stack spacing={3}>
            <Stack direction="row" spacing={1} alignItems="center">
              <LocalHospital color="primary" />
              <Typography variant="h6" fontWeight={600}>
                Choose a Doctor
              </Typography>
            </Stack>

            <TextField
              fullWidth
              placeholder="Search by specialization or name..."
              value={searchSpec}
              onChange={(e) => setSearchSpec(e.target.value)}
              size="small"
            />

            <Box sx={{ maxHeight: 500, overflow: "auto" }}>
              <Grid container spacing={2} sx={{ pb: 1 }}>
                {filteredDoctors.map((doc) => {
                  const isSelected = selectedDoctor?.id === doc.id;
                  const docClinic = clinics.find((c) => c.id === doc.clinicId);
                  return (
                    <Grid
                      sx={{
                        cursor: doc.isAvailable ? "pointer" : "not-allowed",
                        opacity: doc.isAvailable ? 1 : 0.7,
                        pointerEvents: doc.isAvailable ? "auto" : "none",
                      }}
                      size={{ xs: 12, sm: 6 }}
                      key={doc.id}
                    >
                      <Paper
                        onClick={() => setSelectedDoctor(doc)}
                        sx={{
                          p: 2,
                          cursor: "pointer",
                          border: 2,
                          borderColor: isSelected ? "primary.main" : "divider",
                          bgcolor: isSelected ? "primary.lighter" : "background.paper",
                          transition: "border-color 0.2s, background-color 0.2s",
                          "&:hover": {
                            borderColor: "primary.light",
                            bgcolor: isSelected ? "primary.lighter" : "action.hover",
                          },
                        }}
                      >
                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1.5 }}>
                          <Avatar src={doc.avatarUrl} firstName={doc.firstName} lastName={doc.lastName} size="md" />
                          <Box flex={1} minWidth={0}>
                            <Typography variant="body2" fontWeight={600} noWrap color="text.primary">
                              {doc.firstName} {doc.lastName}
                            </Typography>
                            <Typography variant="caption" color="primary.main" fontWeight={500}>
                              {doc.specialization}
                            </Typography>
                          </Box>
                          {!doc.isAvailable && (
                            <Chip
                              label="Not accepting new patients"
                              size="small"
                              color="warning"
                              sx={{ mt: 1, fontSize: "0.65rem" }}
                            />
                          )}
                          {isSelected && (
                            <Box
                              sx={{
                                width: 24,
                                height: 24,
                                borderRadius: "50%",
                                bgcolor: "primary.main",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Check sx={{ fontSize: 16, color: "primary.contrastText" }} />
                            </Box>
                          )}
                        </Stack>

                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <Star sx={{ fontSize: 14, color: "warning.main" }} />
                            <Typography variant="caption" color="text.secondary">
                              {doc.rating} ({doc.reviewCount})
                            </Typography>
                          </Stack>
                          <Typography variant="caption" fontWeight={600} color="text.primary">
                            {formatCurrency(doc.consultationFee)}
                          </Typography>
                        </Stack>

                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <LocationOn sx={{ fontSize: 12, color: "text.disabled" }} />
                          <Typography variant="caption" color="text.secondary" noWrap>
                            {docClinic?.name}
                          </Typography>
                        </Stack>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <Language sx={{ fontSize: 12, color: "text.disabled" }} />
                          <Typography variant="caption" color="text.secondary" noWrap>
                            {doc.languages.join(", ")}
                          </Typography>
                        </Stack>
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Stack>
        )}

        {/* ── Step 2: Date & Time ─────────────────────────────────────────── */}
        {step === 1 && (
          <Stack spacing={3}>
            <Stack direction="row" spacing={1} alignItems="center">
              <CalendarMonth color="primary" />
              <Typography variant="h6" fontWeight={600}>
                Select Date & Time
              </Typography>
            </Stack>

            {selectedDoctor && (
              <Paper sx={{ p: 2, bgcolor: "primary.lighter", border: 1, borderColor: "primary.light" }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    src={selectedDoctor.avatarUrl}
                    firstName={selectedDoctor.firstName}
                    lastName={selectedDoctor.lastName}
                    size="sm"
                  />
                  <Box>
                    <Typography variant="body2" fontWeight={700} color="primary.dark">
                      {selectedDoctor.firstName} {selectedDoctor.lastName}
                    </Typography>
                    <Typography variant="caption" color="primary.main">
                      {selectedDoctor.specialization}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            )}

            <Box>
              <Typography variant="body2" fontWeight={600} sx={{ mb: 2 }}>
                Available Dates
              </Typography>
              <Grid container spacing={1}>
                {availableDates.map((date) => {
                  const d = new Date(date);
                  const isSelected = selectedDate === date;
                  return (
                    <Grid size={{ xs: 3, sm: 12 / 7 }} key={date}>
                      <Paper
                        onClick={() => {
                          setSelectedDate(date);
                          setSelectedSlot(null);
                        }}
                        sx={{
                          p: 1.5,
                          textAlign: "center",
                          cursor: "pointer",
                          border: 2,
                          borderColor: isSelected ? "primary.main" : "divider",
                          bgcolor: isSelected ? "primary.main" : "background.paper",
                          transition: "border-color 0.2s, background-color 0.2s",
                          "&:hover": {
                            borderColor: "primary.light",
                            bgcolor: isSelected ? "primary.main" : "action.hover",
                          },
                        }}
                      >
                        <Typography variant="caption" color={isSelected ? "primary.contrastText" : "text.secondary"}>
                          {d.toLocaleDateString("de-DE", { weekday: "short" })}
                        </Typography>
                        <Typography
                          variant="h6"
                          fontWeight={700}
                          color={isSelected ? "primary.contrastText" : "text.primary"}
                          sx={{ lineHeight: 1, my: 0.5 }}
                        >
                          {d.getDate()}
                        </Typography>
                        <Typography variant="caption" color={isSelected ? "primary.contrastText" : "text.secondary"}>
                          {d.toLocaleDateString("de-DE", { month: "short" })}
                        </Typography>
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>

            {selectedDate && (
              <Box>
                <Typography variant="body2" fontWeight={600} sx={{ mb: 2 }}>
                  Available Time Slots
                </Typography>
                <Grid container spacing={1}>
                  {dummySlots.map((slot) => (
                    <Grid size={{ xs: 4, sm: 2.4 }} key={slot.id}>
                      <Button
                        fullWidth
                        onClick={() => slot.isAvailable && setSelectedSlot(slot)}
                        disabled={!slot.isAvailable}
                        variant={selectedSlot?.id === slot.id ? "primary" : "outline"}
                        size="small"
                        sx={{ py: 1 }}
                      >
                        {slot.startTime}
                      </Button>
                    </Grid>
                  ))}
                </Grid>

                {selectedSlot && (
                  <Alert severity="success" sx={{ mt: 2 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Schedule fontSize="small" />
                      <Typography variant="body2">Selected: {selectedSlot.startTime} · 30 min appointment</Typography>
                    </Stack>
                  </Alert>
                )}
              </Box>
            )}
          </Stack>
        )}

        {/* ── Step 3: Details ─────────────────────────────────────────────── */}
        {step === 2 && (
          <Stack spacing={3}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Description color="primary" />
              <Typography variant="h6" fontWeight={600}>
                Appointment Details
              </Typography>
            </Stack>

            <Box>
              <Typography variant="body2" fontWeight={600} sx={{ mb: 2 }}>
                Appointment Type{" "}
                <Box component="span" color="error.main">
                  *
                </Box>
              </Typography>
              <Grid container spacing={1}>
                {APPOINTMENT_TYPES.map((type) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={type.value}>
                    <Paper
                      onClick={() => setSelectedType(type.value)}
                      sx={{
                        p: 2,
                        cursor: "pointer",
                        border: 2,
                        borderColor: selectedType === type.value ? "primary.main" : "divider",
                        bgcolor: selectedType === type.value ? "primary.lighter" : "background.paper",
                        transition: "border-color 0.2s, background-color 0.2s",
                        "&:hover": { borderColor: "primary.light" },
                      }}
                    >
                      <Typography variant="body2" fontWeight={600} color="text.primary">
                        {type.label}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {type.desc}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <TextField
              fullWidth
              label="Reason for Visit *"
              multiline
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Briefly describe your symptoms or reason for the appointment..."
              helperText={
                <Typography component="span" variant="caption" color={reason.length < 10 ? "error" : "text.secondary"}>
                  {reason.length} characters (minimum 10)
                </Typography>
              }
            />

            <TextField
              fullWidth
              label="Additional Notes (optional)"
              multiline
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any medications, allergies, or other information for the doctor..."
            />
          </Stack>
        )}

        {/* ── Step 4: Review ──────────────────────────────────────────────── */}
        {step === 3 && selectedDoctor && (
          <Stack spacing={3}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Check color="primary" />
              <Typography variant="h6" fontWeight={600}>
                Review & Confirm
              </Typography>
            </Stack>

            <Paper
              sx={{
                p: 3,
                border: 1,
                borderColor: "primary.light",
                bgcolor: "primary.lighter",
              }}
            >
              <Typography
                variant="caption"
                fontWeight={700}
                color="primary.dark"
                sx={{ textTransform: "uppercase", mb: 2, display: "block" }}
              >
                Appointment Summary
              </Typography>

              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                <Avatar
                  src={selectedDoctor.avatarUrl}
                  firstName={selectedDoctor.firstName}
                  lastName={selectedDoctor.lastName}
                  size="lg"
                />
                <Box>
                  <Typography variant="body1" fontWeight={700} color="text.primary">
                    {selectedDoctor.firstName} {selectedDoctor.lastName}
                  </Typography>
                  <Typography variant="body2" color="primary.main">
                    {selectedDoctor.specialization}
                  </Typography>
                  {clinic && (
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <LocationOn sx={{ fontSize: 12, color: "text.disabled" }} />
                      <Typography variant="caption" color="text.secondary">
                        {clinic.name}, {clinic.address.city}
                      </Typography>
                    </Stack>
                  )}
                </Box>
              </Stack>

              <Grid container spacing={1.5} sx={{ mb: 2 }}>
                {[
                  {
                    label: "Date",
                    value: selectedDate
                      ? new Date(selectedDate).toLocaleDateString("de-DE", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "-",
                  },
                  { label: "Time", value: selectedSlot?.startTime ? `${selectedSlot.startTime} (30 min)` : "-" },
                  { label: "Type", value: APPOINTMENT_TYPES.find((t) => t.value === selectedType)?.label || "-" },
                  { label: "Fee", value: formatCurrency(selectedDoctor.consultationFee) },
                ].map((item) => (
                  <Grid size={{ xs: 6 }} key={item.label}>
                    <Paper sx={{ p: 1.5, bgcolor: "background.paper" }}>
                      <Typography variant="caption" color="text.secondary">
                        {item.label}
                      </Typography>
                      <Typography variant="body2" fontWeight={600} color="text.primary">
                        {item.value}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              <Paper sx={{ p: 1.5, bgcolor: "background.paper" }}>
                <Typography variant="caption" color="text.secondary">
                  Reason
                </Typography>
                <Typography variant="body2" color="text.primary">
                  {reason}
                </Typography>
              </Paper>
            </Paper>

            <Alert severity="warning">
              You will receive an email confirmation at your registered address. Your appointment will be in PENDING
              status until confirmed by the practice.
            </Alert>
          </Stack>
        )}
      </Card>

      {/* Navigation */}
      <Stack direction="row" justifyContent="space-between">
        <Button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          variant="outline"
          startIcon={<ArrowBack />}
        >
          Back
        </Button>

        {step < 3 ? (
          <Button
            onClick={() => setStep((s) => Math.min(3, s + 1))}
            disabled={
              (step === 0 && !canProceedStep1) || (step === 1 && !canProceedStep2) || (step === 2 && !canProceedStep3)
            }
            variant="primary"
            endIcon={<ArrowForward />}
          >
            Continue
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            variant="primary"
            color="success"
            startIcon={isSubmitting ? null : <Check />}
          >
            {isSubmitting ? "Booking..." : "Confirm Booking"}
          </Button>
        )}
      </Stack>
    </Box>
  );
}
