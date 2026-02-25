"use client";

import { useState, useTransition } from "react";
import { Stack, Alert } from "@/lib/mui/components";
import { MedicalServices } from "@/lib/mui/icons";
import { DoctorsListProps } from "../types";
import { DoctorCard } from "@/containers/Doctors/components";
import { unlinkDoctor } from "@/app/actions/linkDoctor";
import { EmptyState } from "@/components/common";

export function DoctorsList({ doctors, clinicId, canManage = false }: DoctorsListProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleUnlinkDoctor = (doctorId: string, doctorName: string) => {
    if (!clinicId) return;

    setError(null);
    setSuccess(null);

    startTransition(async () => {
      const result = await unlinkDoctor(doctorId, clinicId);

      if (result.success) {
        setSuccess(`Successfully unlinked ${doctorName}`);
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(result.error || "Failed to unlink doctor");
      }
    });
  };

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      {doctors.length === 0 ? (
        <EmptyState
          element={<MedicalServices sx={{ fontSize: 48 }} />}
          primary="No doctors linked to this clinic yet"
        />
      ) : (
        <Stack spacing={2}>
          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              compact={true}
              showUnlink={canManage}
              onUnlink={canManage ? handleUnlinkDoctor : undefined}
              isUnlinking={isPending}
            />
          ))}
        </Stack>
      )}
    </>
  );
}
