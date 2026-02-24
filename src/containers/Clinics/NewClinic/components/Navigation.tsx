"use client";

import Link from "next/link";
import { ArrowBack, ArrowForward, Check } from "@/lib/mui/icons";
import { Stack, Button, Box, Typography, IconButton } from "@/lib/mui/components";

interface StepNavigationProps {
  step: number;
  canProceedStep1: boolean;
  canProceedStep2: boolean;
  canProceedStep3: boolean;
  canProceedStep4: boolean;
  isSubmitting: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export function StepNavigation({
  step,
  canProceedStep1,
  canProceedStep2,
  canProceedStep3,
  canProceedStep4,
  isSubmitting,
  onBack,
  onNext,
  onSubmit,
}: StepNavigationProps) {
  const canProceed =
    (step === 0 && canProceedStep1) ||
    (step === 1 && canProceedStep2) ||
    (step === 2 && canProceedStep3) ||
    (step === 3 && canProceedStep4);

  return (
    <Stack direction="row" justifyContent="space-between">
      <Button onClick={onBack} disabled={step === 0} variant="outline" startIcon={<ArrowBack />}>
        Back
      </Button>

      {step < 4 ? (
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
          {isSubmitting ? "Creating clinic..." : "Create Clinic"}
        </Button>
      )}
    </Stack>
  );
}

export function PageHeader() {
  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
      <Link href="/clinics" style={{ display: "inline-flex" }}>
        <IconButton size="small">
          <ArrowBack />
        </IconButton>
      </Link>
      <Box>
        <Typography variant="h4" fontWeight={700}>
          Add New Clinic
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Register a new medical facility in the system
        </Typography>
      </Box>
    </Stack>
  );
}
