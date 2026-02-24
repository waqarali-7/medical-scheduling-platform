"use client";

import React from "react";
import { Typography as MuiTypography, TypographyProps as MuiTypographyProps } from "@mui/material";

export type TypographyProps = Omit<MuiTypographyProps, "component"> & {
  component?: React.ElementType;
  href?: string;
};

const Typography = React.forwardRef<HTMLElement, TypographyProps>((props, ref) => {
  return <MuiTypography ref={ref as React.Ref<HTMLParagraphElement>} {...props} />;
});

Typography.displayName = "Typography";

export default Typography;
