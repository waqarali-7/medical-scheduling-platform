"use client";

import { Box, Stack } from "@/lib/mui/components";
import { ClinicCard, ClinicsListHeader } from "./components";
import { useCurrentUser } from "@/context/CurrentUserContext";
import { useClinicsQuery } from "@/hooks/clinics";
import { default as ClinicsLoading } from "./Loading";

export default function ClinicsList() {
  const currentUser = useCurrentUser();
  const { data, isLoading, isError, error } = useClinicsQuery();

  if (isLoading) return <ClinicsLoading />;
  if (isError) return <div>Error: {error?.message}</div>;
  if (!data) return null;

  const { clinics, doctors } = data;

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
