"use client";

import React from "react";
import { Alert as MuiAlert, AlertProps as MuiAlertProps } from "@mui/material";

export interface AlertProps extends MuiAlertProps {
  children: React.ReactNode;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(({ children, ...props }, ref) => {
  return (
    <MuiAlert
      ref={ref}
      {...props}
      sx={{
        ...props.sx,
      }}
    >
      {children}
    </MuiAlert>
  );
});

Alert.displayName = "Alert";

export default Alert;
