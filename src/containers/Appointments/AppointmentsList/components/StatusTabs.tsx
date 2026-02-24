"use client";

import { Box, Stack, Chip } from "@/lib/mui/components";
import { STATUS_TABS } from "../constants";
import { StatusTabsProps } from "../types";

export function StatusTabs({ activeStatus, onStatusChange, counts }: StatusTabsProps) {
  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
      {STATUS_TABS.map((tab) => {
        const isActive = activeStatus === tab.value;
        return (
          <Chip
            key={tab.value}
            label={
              <Stack direction="row" spacing={0.5} alignItems="center">
                <span>{tab.label}</span>
                <Box
                  component="span"
                  sx={{
                    px: 0.75,
                    py: 0.25,
                    borderRadius: 2,
                    fontSize: "0.65rem",
                    fontWeight: 700,
                  }}
                >
                  {counts[tab.value] || 0}
                </Box>
              </Stack>
            }
            onClick={() => onStatusChange(tab.value)}
            color={isActive ? "primary" : "default"}
            variant={isActive ? "filled" : "outlined"}
            sx={{
              fontWeight: 600,
              borderRadius: 2,
              ...(isActive && {
                boxShadow: 1,
              }),
            }}
          />
        );
      })}
    </Stack>
  );
}
