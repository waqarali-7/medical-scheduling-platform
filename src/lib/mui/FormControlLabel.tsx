"use client";

import React from "react";
import { FormControlLabel as MuiFormControlLabel, FormControlLabelProps as MuiFormControlLabelProps } from "@mui/material";

export type FormControlLabelProps = MuiFormControlLabelProps;

const FormControlLabel = React.forwardRef<HTMLLabelElement, FormControlLabelProps>((props, ref) => {
  return <MuiFormControlLabel ref={ref} {...props} />;
});

FormControlLabel.displayName = "FormControlLabel";

export default FormControlLabel;
