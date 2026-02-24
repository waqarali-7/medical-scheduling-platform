"use client";

import { useState, useMemo } from "react";
import { Box, Stack } from "@/lib/mui/components";
import { AppointmentsHeader, FiltersCard, AppointmentCard } from "./components";
import { useCurrentUser } from "@/context/CurrentUserContext";
import type { AppointmentStatus, AppointmentType } from "@/types";
import type { AppointmentsListProps } from "./types";
import { CalendarMonth } from "@/lib/mui/icons";
import { EmptyState } from "@/components/common";

export default function AppointmentsList({ initialAppointments }: AppointmentsListProps) {
  const currentUser = useCurrentUser();
  const [activeStatus, setActiveStatus] = useState<AppointmentStatus | "ALL">("ALL");
  const [activeType, setActiveType] = useState<AppointmentType | "ALL">("ALL");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "status">("date");

  const counts = useMemo(() => {
    const c: Record<string, number> = { ALL: initialAppointments.length };
    initialAppointments.forEach((a) => {
      c[a.status] = (c[a.status] || 0) + 1;
    });
    return c;
  }, [initialAppointments]);

  const filtered = useMemo(() => {
    return initialAppointments
      .filter((a) => {
        if (activeStatus !== "ALL" && a.status !== activeStatus) return false;
        if (activeType !== "ALL" && a.type !== activeType) return false;
        if (search) {
          const q = search.toLowerCase();
          return (
            a.patient?.firstName.toLowerCase().includes(q) ||
            a.patient?.lastName.toLowerCase().includes(q) ||
            a.doctor?.firstName.toLowerCase().includes(q) ||
            a.doctor?.lastName.toLowerCase().includes(q) ||
            a.reason.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "date") {
          return new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime();
        }
        return a.status.localeCompare(b.status);
      });
  }, [initialAppointments, activeStatus, activeType, search, sortBy]);

  return (
    <Box sx={{ py: 4, px: 2 }}>
      <AppointmentsHeader
        totalCount={initialAppointments.length}
        confirmedCount={counts.CONFIRMED || 0}
        userRole={currentUser?.role}
      />
      <FiltersCard
        search={search}
        onSearchChange={setSearch}
        activeType={activeType}
        onTypeChange={setActiveType}
        sortBy={sortBy}
        onSortChange={setSortBy}
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
        counts={counts}
      />
      {filtered.length > 0 ? (
        <Stack spacing={2}>
          {filtered.map((apt) => (
            <AppointmentCard key={apt.id} appointment={apt} view="admin" />
          ))}
        </Stack>
      ) : (
        <EmptyState
          element={<CalendarMonth sx={{ fontSize: 48 }} />}
          primary="No appointments found"
          secondary="Try adjusting your filters or search terms."
        />
      )}
    </Box>
  );
}
