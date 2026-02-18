"use client";

import React from "react";
import {
  Tooltip as MuiTooltip,
  TooltipProps as MuiTooltipProps,
} from "@mui/material";

export interface TooltipProps extends MuiTooltipProps {
  children: React.ReactElement;
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ children, ...props }, ref) => {
    return (
      <MuiTooltip
        ref={ref}
        arrow
        {...props}
        slotProps={{
          tooltip: {
            sx: {
              bgcolor: "grey.800",
              fontSize: "0.75rem",
              borderRadius: "8px",
              py: 1,
              px: 1.5,
            },
          },
        }}
      >
        {children}
      </MuiTooltip>
    );
  }
);

Tooltip.displayName = "Tooltip";

export default Tooltip;
