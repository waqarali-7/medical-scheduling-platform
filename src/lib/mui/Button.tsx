"use client";

import React from "react";
import { Button as MuiButton, ButtonProps as MuiButtonProps } from "@mui/material";

export interface ButtonProps extends Omit<MuiButtonProps, "variant"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", isLoading, children, disabled, ...props }, ref) => {
    const muiVariant = variant === "outline" || variant === "ghost" ? "outlined" : "contained";
    
    const colorMap = {
      primary: "primary",
      secondary: "secondary",
      outline: "primary",
      ghost: "inherit",
      danger: "error",
    } as const;

    return (
      <MuiButton
        ref={ref}
        variant={muiVariant}
        color={colorMap[variant]}
        disabled={disabled || isLoading}
        {...props}
        sx={{
          textTransform: "none",
          borderRadius: "12px",
          fontWeight: 600,
          px: 3,
          py: 1.5,
          ...(variant === "ghost" && {
            backgroundColor: "transparent",
            color: "text.secondary",
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }),
          ...props.sx,
        }}
      >
        {isLoading ? "Loading..." : children}
      </MuiButton>
    );
  }
);

Button.displayName = "Button";

export default Button;
