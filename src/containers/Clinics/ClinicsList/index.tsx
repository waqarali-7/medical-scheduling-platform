"use client";

import { Box, Stack } from "@/lib/mui/components";
import { ClinicCard, ClinicsListHeader } from "./components";
import { useCurrentUser } from "@/context/CurrentUserContext";
import { ClinicsListProps } from "./types";

export default function ClinicsList({ clinics, doctors }: ClinicsListProps) {
  const currentUser = useCurrentUser();

  return (
    <Box sx={{ py: 4, px: 2 }}>
      <ClinicsListHeader user={currentUser} clinicsCount={clinics?.length ?? 0} />

      <Stack spacing={3}>
        {clinics.map((clinic) => (
          <ClinicCard key={clinic.id} clinic={clinic} doctors={doctors} />
        ))}
      </Stack>
    </Box>
  );
}
