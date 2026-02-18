"use client";

import React from "react";
import {
  Divider as MuiDivider,
  DividerProps as MuiDividerProps,
} from "@mui/material";

export interface DividerProps extends MuiDividerProps {
  label?: string;
}

const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ label, ...props }, ref) => {
    return (
      <MuiDivider
        ref={ref}
        {...props}
        sx={{
          my: 2,
          ...props.sx,
        }}
      >
        {label}
      </MuiDivider>
    );
  }
);

Divider.displayName = "Divider";

export default Divider;
