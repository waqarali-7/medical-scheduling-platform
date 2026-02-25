"use client";

import { useReducer } from "react";
import { useRouter } from "next/navigation";
import type { TimeSlot } from "@/types";
import { Box, Stepper, Step, StepLabel, Card, Alert } from "@/lib/mui/components";
import type { NewAppointmentProps } from "./types";
import { STEP_LABELS, getAvailableDates } from "./constants";
import { PageHeader, DoctorSelectStep, DateTimeStep, DetailsStep, ReviewStep, StepNavigation } from "./components";
import { appointmentReducer, initialState } from "./reducer";
import { createAppointment } from "@/app/actions/createAppointment";
import { useCurrentUser } from "@/context/CurrentUserContext";

export default function NewAppointment({ doctors, clinics }: NewAppointmentProps) {
  const router = useRouter();
  const user = useCurrentUser();
  const [state, dispatch] = useReducer(appointmentReducer, initialState);

  const availableDates = getAvailableDates();
  const clinic = state.formData.selectedDoctor
    ? (clinics.find((c) => c.id === state.formData.selectedDoctor?.clinicId) ?? null)
    : null;

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
    doctorId: state.formData.selectedDoctor?.id ?? "",
    date: state.formData.selectedDate,
    startTime: t,
    endTime: "",
    isAvailable: i !== 2 && i !== 5 && i !== 8,
    durationMinutes: 30,
  }));

  const canProceedStep1 = !!state.formData.selectedDoctor;
  const canProceedStep2 = !!state.formData.selectedDate && !!state.formData.selectedSlot;
  const canProceedStep3 = !!state.formData.selectedType && state.formData.reason.trim().length > 10;

  const handleDateSelect = (date: string) => {
    dispatch({ type: "SET_FIELD", field: "selectedDate", value: date });
    dispatch({ type: "SET_FIELD", field: "selectedSlot", value: null });
  };

  const handleSubmit = async () => {
    if (!state.formData.selectedDoctor || !state.formData.selectedSlot || !state.formData.selectedType) return;

    dispatch({ type: "SET_SUBMITTING", isSubmitting: true });
    dispatch({ type: "SET_ERROR", error: null });

    try {
      const now = new Date().toISOString();

      await createAppointment({
        patientId: user?.id,
        doctorId: state.formData.selectedDoctor.id,
        clinicId: state.formData.selectedDoctor?.clinicId ?? "",
        scheduledAt: `${state.formData.selectedDate}T${state.formData.selectedSlot.startTime}`,
        durationMinutes: state.formData.selectedSlot.durationMinutes,
        type: state.formData.selectedType,
        reason: state.formData.reason,
        notes: state.formData.notes,
        status: "PENDING",
        createdAt: now,
        updatedAt: now,
      });

      router.push("/appointments?booked=true");
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        error: err instanceof Error ? err.message : "Failed to create appointment",
      });
    } finally {
      dispatch({ type: "SET_SUBMITTING", isSubmitting: false });
    }
  };

  return (
    <Box sx={{ maxWidth: 1400, mx: "auto", py: 3 }}>
      <PageHeader />

      {state.error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => dispatch({ type: "SET_ERROR", error: null })}>
          {state.error}
        </Alert>
      )}

      <Card sx={{ mb: 3 }}>
        <Stepper activeStep={state.step} alternativeLabel>
          {STEP_LABELS.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Card>

      <Card sx={{ mb: 3 }}>
        {state.step === 0 && (
          <DoctorSelectStep
            doctors={doctors}
            clinics={clinics}
            searchSpec={state.searchSpec}
            onSearchChange={(v) => dispatch({ type: "SET_SEARCH", searchSpec: v })}
            selectedDoctor={state.formData.selectedDoctor}
            onSelectDoctor={(d) => dispatch({ type: "SET_FIELD", field: "selectedDoctor", value: d })}
          />
        )}

        {state.step === 1 && (
          <DateTimeStep
            selectedDoctor={state.formData.selectedDoctor}
            availableDates={availableDates}
            slots={dummySlots}
            selectedDate={state.formData.selectedDate}
            selectedSlot={state.formData.selectedSlot}
            onDateSelect={handleDateSelect}
            onSlotSelect={(s) => dispatch({ type: "SET_FIELD", field: "selectedSlot", value: s })}
          />
        )}

        {state.step === 2 && (
          <DetailsStep
            selectedType={state.formData.selectedType}
            reason={state.formData.reason}
            notes={state.formData.notes}
            onTypeSelect={(t) => dispatch({ type: "SET_FIELD", field: "selectedType", value: t })}
            onReasonChange={(r) => dispatch({ type: "SET_FIELD", field: "reason", value: r })}
            onNotesChange={(n) => dispatch({ type: "SET_FIELD", field: "notes", value: n })}
          />
        )}

        {state.step === 3 && state.formData.selectedDoctor && (
          <ReviewStep
            selectedDoctor={state.formData.selectedDoctor}
            clinic={clinic}
            selectedDate={state.formData.selectedDate}
            selectedSlot={state.formData.selectedSlot}
            selectedType={state.formData.selectedType}
            reason={state.formData.reason}
          />
        )}
      </Card>

      <StepNavigation
        step={state.step}
        canProceedStep1={canProceedStep1}
        canProceedStep2={canProceedStep2}
        canProceedStep3={canProceedStep3}
        isSubmitting={state.isSubmitting}
        onBack={() => dispatch({ type: "PREV_STEP" })}
        onNext={() => dispatch({ type: "NEXT_STEP" })}
        onSubmit={handleSubmit}
      />
    </Box>
  );
}
