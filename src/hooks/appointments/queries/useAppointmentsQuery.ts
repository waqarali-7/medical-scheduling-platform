"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getAppointmentsPageData } from "@/app/actions/data";
import type { Appointment } from "@/types";
import type { QueryError } from "@/hooks/types";

export interface AppointmentsQueryData {
  initialAppointments: Appointment[];
}

interface UseAppointmentsQueryProps {
  isReady?: boolean;
}

/**
 * Queries appointments list page data.
 */
export function useAppointmentsQuery(
  props: UseAppointmentsQueryProps = {}
): UseQueryResult<AppointmentsQueryData, QueryError> {
  const { isReady = true } = props;

  return useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointmentsPageData,
    staleTime: 1000 * 60,
    enabled: isReady,
  });
}
