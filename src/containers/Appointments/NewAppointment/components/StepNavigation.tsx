"use client";

import { ArrowBack, ArrowForward, Check } from "@mui/icons-material";
import { Stack, Button } from "@/lib/mui";

interface StepNavigationProps {
  step: number;
  canProceedStep1: boolean;
  canProceedStep2: boolean;
  canProceedStep3: boolean;
  isSubmitting: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export default function StepNavigation({
  step,
  canProceedStep1,
  canProceedStep2,
  canProceedStep3,
  isSubmitting,
  onBack,
  onNext,
  onSubmit,
}: StepNavigationProps) {
  const canProceed =
    (step === 0 && canProceedStep1) || (step === 1 && canProceedStep2) || (step === 2 && canProceedStep3);

  return (
    <Stack direction="row" justifyContent="space-between">
      <Button onClick={onBack} disabled={step === 0} variant="outline" startIcon={<ArrowBack />}>
        Back
      </Button>

      {step < 3 ? (
        <Button onClick={onNext} disabled={!canProceed} variant="primary" endIcon={<ArrowForward />}>
          Continue
        </Button>
      ) : (
        <Button
          onClick={onSubmit}
          disabled={isSubmitting}
          variant="primary"
          color="success"
          startIcon={isSubmitting ? null : <Check />}
        >
          {isSubmitting ? "Booking..." : "Confirm Booking"}
        </Button>
      )}
    </Stack>
  );
}
