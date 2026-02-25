"use client";

import { useReducer } from "react";
import { useRouter } from "next/navigation";
import { Box, Stepper, Step, StepLabel, Card, Alert } from "@/lib/mui/components";
import type { NewClinicFormData } from "./types";
import { STEP_LABELS } from "./constants";
import { validateStep1, validateStep2, validateStep3, validateStep4 } from "./validation";
import {
  PageHeader,
  BasicInfoStep,
  LocationStep,
  OpeningHoursStep,
  SpecializationsStep,
  ReviewStep,
  StepNavigation,
} from "./components";
import { clinicReducer, initialState } from "./reducer";
import { submitClinic } from "@/app/actions/submitClinic";

export default function NewClinic() {
  const router = useRouter();
  const [state, dispatch] = useReducer(clinicReducer, initialState);

  const handleFieldChange = <K extends keyof NewClinicFormData>(field: K, value: NewClinicFormData[K]) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  const canProceedStep1 = validateStep1(state.formData);
  const canProceedStep2 = validateStep2(state.formData);
  const canProceedStep3 = validateStep3(state.formData);
  const canProceedStep4 = validateStep4(state.formData);

  const handleSubmit = async () => {
    dispatch({ type: "SET_SUBMITTING", isSubmitting: true });
    dispatch({ type: "SET_ERROR", error: null });

    try {
      const result = await submitClinic({
        name: state.formData.name,
        phone: state.formData.phone,
        email: state.formData.email,
        website: state.formData.website || undefined,
        street: state.formData.street,
        postalCode: state.formData.postalCode,
        city: state.formData.city,
        state: state.formData.state,
        openingHours: state.formData.openingHours,
        specializations: state.formData.specializations,
      });

      if (result.success && result.data) {
        dispatch({ type: "SET_SUBMITTING", isSubmitting: false });
        router.push(`/clinics/${result.data.id}?created=true`);
      } else {
        dispatch({ type: "SET_ERROR", error: result.error || "Failed to create clinic" });
        dispatch({ type: "SET_SUBMITTING", isSubmitting: false });
      }
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        error: error instanceof Error ? error.message : "An unexpected error occurred",
      });
      dispatch({ type: "SET_SUBMITTING", isSubmitting: false });
    }
  };

  const handleNext = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  const handleBack = () => {
    dispatch({ type: "PREV_STEP" });
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
        {state.step === 0 && <BasicInfoStep formData={state.formData} onChange={handleFieldChange} />}

        {state.step === 1 && <LocationStep formData={state.formData} onChange={handleFieldChange} />}

        {state.step === 2 && (
          <OpeningHoursStep
            openingHours={state.formData.openingHours}
            onChange={(hours) => handleFieldChange("openingHours", hours)}
          />
        )}

        {state.step === 3 && (
          <SpecializationsStep
            specializations={state.formData.specializations}
            onChange={(specs) => handleFieldChange("specializations", specs)}
          />
        )}

        {state.step === 4 && <ReviewStep formData={state.formData} />}
      </Card>

      <StepNavigation
        step={state.step}
        canProceedStep1={canProceedStep1}
        canProceedStep2={canProceedStep2}
        canProceedStep3={canProceedStep3}
        canProceedStep4={canProceedStep4}
        isSubmitting={state.isSubmitting}
        onBack={handleBack}
        onNext={handleNext}
        onSubmit={handleSubmit}
      />
    </Box>
  );
}
