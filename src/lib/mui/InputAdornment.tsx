"use client";

import React from "react";
import {
  InputAdornment as MuiInputAdornment,
  InputAdornmentProps as MuiInputAdornmentProps,
} from "@mui/material";

export type InputAdornmentProps = MuiInputAdornmentProps;

const InputAdornment = React.forwardRef<HTMLDivElement, InputAdornmentProps>((props, ref) => {
  return <MuiInputAdornment ref={ref} {...props} />;
});

InputAdornment.displayName = "InputAdornment";

export default InputAdornment;
