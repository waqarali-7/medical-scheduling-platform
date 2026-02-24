"use client";

import { Search } from "@/lib/mui/icons";
import { TextField, InputAdornment } from "@/lib/mui/components";
import { SearchBarProps } from "../types";

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <TextField
      fullWidth
      size="small"
      placeholder="Search by patient, doctor, or reason..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Search fontSize="small" />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
