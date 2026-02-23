"use client";

import { Stack, Grid } from "@/lib/mui";
import { Card } from "@/lib/mui";
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
    <Card sx={{ mb: 3, p: 2 }}>
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
    </Card>
  );
}
