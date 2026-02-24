"use client";

import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

export interface InputProps extends Omit<TextFieldProps, "variant"> {
  variant?: "outlined" | "filled" | "standard";
}

const Input = React.forwardRef<HTMLDivElement, InputProps>(
  ({ variant = "outlined", ...props }, ref) => {
    return (
      <TextField
        ref={ref}
        variant={variant}
        fullWidth
        {...props}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
          },
          ...props.sx,
        }}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
