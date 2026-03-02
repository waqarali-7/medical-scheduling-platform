"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getClinicDetailData } from "@/app/actions/data";
import type { Clinic, Doctor } from "@/types";
import type { QueryError } from "@/hooks/types";

export interface ClinicDetailQueryData {
  clinic: Clinic;
  doctors: Doctor[];
  unlinkedDoctors: Doctor[];
  canManage: boolean;
}

interface UseClinicQueryProps {
  clinicId: string | null;
  isReady?: boolean;
}

/**
 * Queries a single clinic by id with doctors and permissions.
 */
export function useClinicQuery(
  props: UseClinicQueryProps
): UseQueryResult<ClinicDetailQueryData | null, QueryError> {
  const { clinicId, isReady = true } = props;

  return useQuery({
    queryKey: ["clinic", clinicId],
    queryFn: () => (clinicId ? getClinicDetailData(clinicId) : Promise.resolve(null)),
    staleTime: 1000 * 60,
    enabled: Boolean(clinicId) && isReady,
  });
}
