"use client";

import React from "react";
import { Paper as MuiPaper, PaperProps as MuiPaperProps } from "@mui/material";

export type PaperProps = MuiPaperProps;

const Paper = React.forwardRef<HTMLDivElement, PaperProps>((props, ref) => {
  return <MuiPaper ref={ref} {...props} />;
});

Paper.displayName = "Paper";

export default Paper;
