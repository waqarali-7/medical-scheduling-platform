"use client";

import React from "react";
import { Chip as MuiChip, ChipProps as MuiChipProps } from "@mui/material";

export type ChipProps = MuiChipProps;

const Chip = React.forwardRef<HTMLDivElement, ChipProps>((props, ref) => {
  return <MuiChip ref={ref} {...props} />;
});

Chip.displayName = "Chip";

export default Chip;
