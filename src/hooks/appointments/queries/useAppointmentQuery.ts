"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getAppointmentDetailData } from "@/app/actions/data";
import type { Appointment } from "@/types";
import type { QueryError } from "@/hooks/types";

interface UseAppointmentQueryProps {
  appointmentId: string | null;
  isReady?: boolean;
}

/**
 * Queries a single appointment by id.
 */
export function useAppointmentQuery(
  props: UseAppointmentQueryProps
): UseQueryResult<Appointment | null, QueryError> {
  const { appointmentId, isReady = true } = props;

  return useQuery({
    queryKey: ["appointment", appointmentId],
    queryFn: () =>
      appointmentId ? getAppointmentDetailData(appointmentId) : Promise.resolve(null),
    staleTime: 1000 * 60,
    enabled: Boolean(appointmentId) && isReady,
  });
}
