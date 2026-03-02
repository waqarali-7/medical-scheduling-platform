"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getDoctorDetailData } from "@/app/actions/data";
import type { Doctor, Clinic, Appointment } from "@/types";
import type { QueryError } from "@/hooks/types";

export interface DoctorDetailQueryData {
  doctor: Doctor & { clinic?: Clinic };
  appointments: Appointment[];
}

interface UseDoctorQueryProps {
  doctorId: string | null;
  isReady?: boolean;
}

/**
 * Queries a single doctor by id + their appointments.
 */
export function useDoctorQuery(
  props: UseDoctorQueryProps
): UseQueryResult<DoctorDetailQueryData | null, QueryError> {
  const { doctorId, isReady = true } = props;

  return useQuery({
    queryKey: ["doctor", doctorId],
    queryFn: () => (doctorId ? getDoctorDetailData(doctorId) : Promise.resolve(null)),
    staleTime: 1000 * 60,
    enabled: Boolean(doctorId) && isReady,
  });
}
