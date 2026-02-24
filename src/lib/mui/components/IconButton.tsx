"use client";

import React from "react";
import {
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
} from "@mui/material";

export interface IconButtonProps extends MuiIconButtonProps {
  children: React.ReactNode;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <MuiIconButton
        ref={ref}
        {...props}
        sx={{
          borderRadius: "12px",
          ...props.sx,
        }}
      >
        {children}
      </MuiIconButton>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
