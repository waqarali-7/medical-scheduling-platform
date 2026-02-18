"use client";

import React from "react";
import {
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<MuiSelectProps, "onChange"> {
  options: SelectOption[];
  label?: string;
  onChange?: (value: string) => void;
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ options, label, onChange, ...props }, ref) => {
    const handleChange = (event: any) => {
      onChange?.(event.target.value as string);
    };

    return (
      <FormControl fullWidth>
        {label && <InputLabel>{label}</InputLabel>}
        <MuiSelect
          ref={ref}
          onChange={handleChange}
          {...props}
          sx={{
            borderRadius: "12px",
            ...props.sx,
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </MuiSelect>
      </FormControl>
    );
  }
);

Select.displayName = "Select";

export default Select;
