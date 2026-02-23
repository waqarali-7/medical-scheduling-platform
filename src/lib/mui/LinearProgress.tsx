"use client";

import React from "react";
import {
  LinearProgress as MuiLinearProgress,
  LinearProgressProps as MuiLinearProgressProps,
} from "@mui/material";

export type LinearProgressProps = MuiLinearProgressProps;

const LinearProgress = React.forwardRef<HTMLSpanElement, LinearProgressProps>((props, ref) => {
  return <MuiLinearProgress ref={ref} {...props} />;
});

LinearProgress.displayName = "LinearProgress";

export default LinearProgress;
