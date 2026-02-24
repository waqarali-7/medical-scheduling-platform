import { ChevronRightRounded, Search } from "@/lib/mui/icons";
import { Paper, Stack, TextField, InputAdornment, Select, MenuItem, Chip, FormControlLabel, Switch } from "@/lib/mui/components";

const SPECIALIZATIONS = ["All", "Cardiology", "Neurology", "General Practice", "Dermatology", "Orthopedics"];

export default function DoctorFilters({
  search,
  setSearch,
  selectedSpec,
  setSelectedSpec,
  onlyAvailable,
  setOnlyAvailable,
  sortBy,
  setSortBy,
}: {
  search: string;
  setSearch: (s: string) => void;
  selectedSpec: string;
  setSelectedSpec: (s: string) => void;
  onlyAvailable: boolean;
  setOnlyAvailable: (b: boolean) => void;
  sortBy: "rating" | "name" | "fee";
  setSortBy: (s: "rating" | "name" | "fee") => void;
}) {
  return (
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
                  <Search fontSize="small" color="action" />
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
  );
}
