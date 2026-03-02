"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getDashboardPageData } from "@/app/actions/data";
import type { Appointment, DashboardStats, Doctor, Clinic } from "@/types";
import type { QueryError } from "@/hooks/types";

export interface DashboardQueryData {
  allAppointments: Appointment[];
  stats: DashboardStats;
  doctors: Doctor[];
  clinics: Clinic[];
}

interface UseDashboardQueryProps {
  isReady?: boolean;
}

/**
 * Queries dashboard page data.
 */
export function useDashboardQuery(
  props: UseDashboardQueryProps = {}
): UseQueryResult<DashboardQueryData, QueryError> {
  const { isReady = true } = props;

  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardPageData,
    staleTime: 1000 * 60,
    enabled: isReady,
  });
}
