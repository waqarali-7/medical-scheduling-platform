"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getPatientsPageData } from "@/app/actions/data";
import type { Patient, Appointment } from "@/types";
import type { QueryError } from "@/hooks/types";

export interface PatientsQueryData {
  patients: Patient[];
  appointments: Appointment[];
}

interface UsePatientsQueryProps {
  isReady?: boolean;
}

/**
 * Queries patients list page data.
 */
export function usePatientsQuery(
  props: UsePatientsQueryProps = {}
): UseQueryResult<PatientsQueryData, QueryError> {
  const { isReady = true } = props;

  return useQuery({
    queryKey: ["patients"],
    queryFn: getPatientsPageData,
    staleTime: 1000 * 60,
    enabled: isReady,
  });
}
