"use client";

import React from "react";
import { Stack as MuiStack, StackProps as MuiStackProps } from "@mui/material";

export type StackProps = MuiStackProps;

const Stack = React.forwardRef<HTMLDivElement, StackProps>((props, ref) => {
  return <MuiStack ref={ref} {...props} />;
});

Stack.displayName = "Stack";

export default Stack;
