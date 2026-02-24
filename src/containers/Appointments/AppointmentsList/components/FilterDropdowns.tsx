"use client";

import { TextField, MenuItem, Grid } from "@/lib/mui/components";
import type { AppointmentType } from "@/types";
import { FilterDropdownsProps } from "../types";
import { TYPE_FILTERS } from "../constants";

export function FilterDropdowns({ activeType, onTypeChange, sortBy, onSortChange }: FilterDropdownsProps) {
  return (
    <>
      <Grid size={{ xs: 6, md: 3 }}>
        <TextField
          select
          fullWidth
          size="small"
          value={activeType}
          onChange={(e) => onTypeChange(e.target.value as AppointmentType | "ALL")}
        >
          {TYPE_FILTERS.map((f) => (
            <MenuItem key={f.value} value={f.value}>
              {f.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid size={{ xs: 6, md: 3 }}>
        <TextField
          select
          fullWidth
          size="small"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as "date" | "status")}
        >
          <MenuItem value="date">Sort by Date</MenuItem>
          <MenuItem value="status">Sort by Status</MenuItem>
        </TextField>
      </Grid>
    </>
  );
}
