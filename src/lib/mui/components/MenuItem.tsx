"use client";

import React from "react";
import { MenuItem as MuiMenuItem, MenuItemProps as MuiMenuItemProps } from "@mui/material";

export type MenuItemProps = MuiMenuItemProps;

const MenuItem = React.forwardRef<HTMLLIElement, MenuItemProps>((props, ref) => {
  return <MuiMenuItem ref={ref} {...props} />;
});

MenuItem.displayName = "MenuItem";

export default MenuItem;
