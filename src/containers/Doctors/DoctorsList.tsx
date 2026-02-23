"use client";

import {useState, useMemo} from "react";
import { Box, Stack, Typography, Paper } from "@/lib/mui";
import type {Doctor, Clinic} from "@/types";
import {DoctorCard, DoctorDetailHeader, DoctorFilters} from "./components";

interface DoctorsListPageProps {
  doctors: Doctor[];
  clinics: Clinic[];
}

export default function DoctorsListPage({doctors, clinics}: DoctorsListPageProps) {
  const [search, setSearch] = useState("");
  const [selectedSpec, setSelectedSpec] = useState("All");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState<"rating" | "name" | "fee">("rating");

  const filtered = useMemo(() => {
    return doctors
      .filter((d) => {
        if (onlyAvailable && !d.isAvailable) return false;
        if (selectedSpec !== "All" && d.specialization !== selectedSpec) return false;
        if (search) {
          const q = search.toLowerCase();
          return d.firstName.toLowerCase().includes(q) || d.lastName.toLowerCase().includes(q) || d.specialization.toLowerCase().includes(q) || d.bio?.toLowerCase().includes(q);
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "name") return a.lastName.localeCompare(b.lastName);
        if (sortBy === "fee") return a.consultationFee - b.consultationFee;
        return 0;
      });
  }, [doctors, search, selectedSpec, onlyAvailable, sortBy]);

  return (
    <Box sx={{py: 4, px: 2}}>
      <DoctorDetailHeader doctors={doctors} clinics={clinics} />

      <DoctorFilters
        search={search}
        setSearch={setSearch}
        selectedSpec={selectedSpec}
        setSelectedSpec={setSelectedSpec}
        onlyAvailable={onlyAvailable}
        setOnlyAvailable={setOnlyAvailable}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <Typography variant="body2" color="text.secondary" sx={{mb: 2}}>
        Showing <strong>{filtered.length}</strong> doctor{filtered.length !== 1 ? "s" : ""}
      </Typography>

      {filtered.length > 0 ? (
        <Stack spacing={2}>
          {filtered.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} clinics={clinics} />
          ))}
        </Stack>
      ) : (
        <Paper sx={{textAlign: "center", py: 8}}>
          <Typography variant="body1" color="text.secondary">
            No doctors found.
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            Try adjusting your search or filters
          </Typography>
        </Paper>
      )}
    </Box>
  );
}
