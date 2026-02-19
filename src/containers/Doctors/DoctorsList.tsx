"use client";

import { useState, useMemo } from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  Chip,
  Switch,
  FormControlLabel,
  Paper,
} from "@mui/material";
import { ChevronRightRounded, Search as SearchIcon } from "@mui/icons-material";
import DoctorCard from "@/components/doctors/DoctorCard";
import type { Doctor, Clinic } from "@/types";

const SPECIALIZATIONS = ["All", "Cardiology", "Neurology", "General Practice", "Dermatology", "Orthopedics"];

interface DoctorsListPageProps {
  doctors: Doctor[];
  clinics: Clinic[];
}

export default function DoctorsListPage({ doctors, clinics }: DoctorsListPageProps) {
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
          return (
            d.firstName.toLowerCase().includes(q) ||
            d.lastName.toLowerCase().includes(q) ||
            d.specialization.toLowerCase().includes(q) ||
            d.bio?.toLowerCase().includes(q)
          );
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
    <Box sx={{ py: 4, px: 2 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>
          Our Doctors
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {doctors.length} specialist{doctors.length !== 1 ? "s" : ""} available across {clinics.length} clinics
        </Typography>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            {/* Search */}
            <TextField
              fullWidth
              size="small"
              placeholder="Search by name, specialization, or expertise..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" color="action" />
                  </InputAdornment>
                ),
              }}
            />

            {/* Sort */}
            <Select
              value={sortBy}
              size="small"
              onChange={(e) => setSortBy(e.target.value as "rating" | "name" | "fee")}
              displayEmpty
              sx={{ minWidth: 160 }}
              IconComponent={ChevronRightRounded}
            >
              <MenuItem value="rating">Sort: Top Rated</MenuItem>
              <MenuItem value="name">Sort: Name</MenuItem>
              <MenuItem value="fee">Sort: Lowest Fee</MenuItem>
            </Select>
          </Stack>

          {/* Specializations & Availability */}
          <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center">
            {SPECIALIZATIONS.map((spec) => (
              <Chip
                key={spec}
                label={spec}
                size="small"
                clickable
                color={selectedSpec === spec ? "primary" : "default"}
                variant={selectedSpec === spec ? "filled" : "outlined"}
                onClick={() => setSelectedSpec(spec)}
              />
            ))}

            <FormControlLabel
              sx={{ ml: "auto" }}
              control={
                <Switch checked={onlyAvailable} onChange={() => setOnlyAvailable(!onlyAvailable)} color="primary" />
              }
              label="Available only"
              labelPlacement="start"
            />
          </Stack>
        </Stack>
      </Paper>

      {/* Results count */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Showing <strong>{filtered.length}</strong> doctor{filtered.length !== 1 ? "s" : ""}
      </Typography>

      {/* Doctor Grid */}
      {filtered.length > 0 ? (
        <Stack spacing={2}>
          {filtered.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} clinics={clinics} />
          ))}
        </Stack>
      ) : (
        <Paper sx={{ textAlign: "center", py: 8 }}>
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
