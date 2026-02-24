"use client";

import React from "react";
import { Box as MuiBox, BoxProps as MuiBoxProps } from "@mui/material";

export type BoxProps = MuiBoxProps;

const Box = React.forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  return <MuiBox ref={ref} {...props} />;
});

Box.displayName = "Box";

export default Box;
