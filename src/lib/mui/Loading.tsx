"use client";

import React from "react";
import { CircularProgress, Box, BoxProps } from "@mui/material";

export interface LoadingProps extends BoxProps {
  size?: number;
  fullscreen?: boolean;
}

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  ({ size = 40, fullscreen = false, ...props }, ref) => {
    if (fullscreen) {
      return (
        <Box
          ref={ref}
          display="flex"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          {...props}
        >
          <CircularProgress size={size} />
        </Box>
      );
    }

    return (
      <Box
        ref={ref}
        display="flex"
        alignItems="center"
        justifyContent="center"
        {...props}
      >
        <CircularProgress size={size} />
      </Box>
    );
  }
);

Loading.displayName = "Loading";

export default Loading;
