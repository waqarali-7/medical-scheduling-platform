"use client";

import { useReducer } from "react";
import { useRouter } from "next/navigation";
import { Box, Stepper, Step, StepLabel, Card } from "@/lib/mui/components";
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

    // TODO: Implement actual submission to Supabase
    console.log("Submitting clinic:", state.formData);

    setTimeout(() => {
      dispatch({ type: "SET_SUBMITTING", isSubmitting: false });
      router.push("/clinics?created=true");
    }, 1500);
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
