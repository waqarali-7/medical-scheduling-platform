"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Doctor, AppointmentType, TimeSlot } from "@/types";
import { Box, Stepper, Step, StepLabel, Card } from "@/lib/mui";
import type { NewAppointmentProps } from "./types";
import { STEP_LABELS, getAvailableDates } from "./constants";
import {
  PageHeader,
  DoctorSelectStep,
  DateTimeStep,
  DetailsStep,
  ReviewStep,
  StepNavigation,
} from "./components";

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
  const clinic = selectedDoctor ? clinics.find((c) => c.id === selectedDoctor.clinicId) ?? null : null;

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
    doctorId: selectedDoctor?.id ?? "",
    date: selectedDate,
    startTime: t,
    endTime: "",
    isAvailable: i !== 2 && i !== 5 && i !== 8,
    durationMinutes: 30,
  }));

  const canProceedStep1 = !!selectedDoctor;
  const canProceedStep2 = !!selectedDate && !!selectedSlot;
  const canProceedStep3 = !!selectedType && reason.trim().length > 10;

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => router.push("/appointments?booked=true"), 1500);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  return (
    <Box sx={{ maxWidth: 1400, mx: "auto", py: 3 }}>
      <PageHeader />

      <Card sx={{ mb: 3 }}>
        <Stepper activeStep={step} alternativeLabel>
          {STEP_LABELS.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Card>

      <Card sx={{ mb: 3 }}>
        {step === 0 && (
          <DoctorSelectStep
            doctors={doctors}
            clinics={clinics}
            searchSpec={searchSpec}
            onSearchChange={setSearchSpec}
            selectedDoctor={selectedDoctor}
            onSelectDoctor={setSelectedDoctor}
          />
        )}

        {step === 1 && (
          <DateTimeStep
            selectedDoctor={selectedDoctor}
            availableDates={availableDates}
            slots={dummySlots}
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            onDateSelect={handleDateSelect}
            onSlotSelect={setSelectedSlot}
          />
        )}

        {step === 2 && (
          <DetailsStep
            selectedType={selectedType}
            reason={reason}
            notes={notes}
            onTypeSelect={setSelectedType}
            onReasonChange={setReason}
            onNotesChange={setNotes}
          />
        )}

        {step === 3 && selectedDoctor && (
          <ReviewStep
            selectedDoctor={selectedDoctor}
            clinic={clinic}
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            selectedType={selectedType}
            reason={reason}
          />
        )}
      </Card>

      <StepNavigation
        step={step}
        canProceedStep1={canProceedStep1}
        canProceedStep2={canProceedStep2}
        canProceedStep3={canProceedStep3}
        isSubmitting={isSubmitting}
        onBack={() => setStep((s) => Math.max(0, s - 1))}
        onNext={() => setStep((s) => Math.min(3, s + 1))}
        onSubmit={handleSubmit}
      />
    </Box>
  );
}
