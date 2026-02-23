"use client";

import React from "react";
import {
  Switch as MuiSwitch,
  SwitchProps as MuiSwitchProps,
  FormControlLabel,
} from "@mui/material";

export interface SwitchProps extends MuiSwitchProps {
  label?: string;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ label, ...props }, ref) => {
    if (label) {
      return (
        <FormControlLabel
          control={<MuiSwitch ref={ref} {...props} />}
          label={label}
        />
      );
    }

    return <MuiSwitch ref={ref} {...props} />;
  }
);

Switch.displayName = "Switch";

export default Switch;
