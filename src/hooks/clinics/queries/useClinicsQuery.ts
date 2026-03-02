"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getClinicsPageData } from "@/app/actions/data";
import type { Clinic, Doctor } from "@/types";
import type { QueryError } from "@/hooks/types";

export interface ClinicsQueryData {
  clinics: Clinic[];
  doctors: Doctor[];
}

interface UseClinicsQueryProps {
  isReady?: boolean;
}

/**
 * Queries clinics + doctors for the clinics list page.
 */
export function useClinicsQuery(
  props: UseClinicsQueryProps = {}
): UseQueryResult<ClinicsQueryData, QueryError> {
  const { isReady = true } = props;

  return useQuery({
    queryKey: ["clinics"],
    queryFn: getClinicsPageData,
    staleTime: 1000 * 60,
    enabled: isReady,
  });
}
