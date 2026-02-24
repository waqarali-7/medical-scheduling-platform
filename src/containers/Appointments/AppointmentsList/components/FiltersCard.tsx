"use client";

import { Stack, Grid, Paper } from "@/lib/mui/components";
import { SearchBar } from "./SearchBar";
import { FilterDropdowns } from "./FilterDropdowns";
import { StatusTabs } from "./StatusTabs";
import { FiltersCardProps } from "../types";

export function FiltersCard({
  search,
  onSearchChange,
  activeType,
  onTypeChange,
  sortBy,
  onSortChange,
  activeStatus,
  onStatusChange,
  counts,
}: FiltersCardProps) {
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Stack spacing={2}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <SearchBar value={search} onChange={onSearchChange} />
          </Grid>
          <FilterDropdowns
            activeType={activeType}
            onTypeChange={onTypeChange}
            sortBy={sortBy}
            onSortChange={onSortChange}
          />
        </Grid>

        <StatusTabs activeStatus={activeStatus} onStatusChange={onStatusChange} counts={counts} />
      </Stack>
    </Paper>
  );
}
