"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getDoctorsPageData } from "@/app/actions/data";
import type { Doctor, Clinic } from "@/types";
import type { QueryError } from "@/hooks/types";

export interface DoctorsQueryData {
  doctors: Doctor[];
  clinics: Clinic[];
}

interface UseDoctorsQueryProps {
  isReady?: boolean;
}

/**
 * Queries doctors + clinics for the doctors list page.
 * Cached by React Query so back-and-forth navigation shows data immediately (no skeleton flash).
 */
export function useDoctorsQuery(
  props: UseDoctorsQueryProps = {}
): UseQueryResult<DoctorsQueryData, QueryError> {
  const { isReady = true } = props;

  return useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctorsPageData,
    staleTime: 1000 * 60, // 1 minute
    enabled: isReady,
  });
}
