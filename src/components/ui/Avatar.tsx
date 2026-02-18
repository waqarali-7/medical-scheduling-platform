"use client";

import React from "react";
import { Avatar as MuiAvatar, AvatarProps as MuiAvatarProps } from "@mui/material";
import { getInitials } from "@/lib/utils";

export interface AvatarProps extends Omit<MuiAvatarProps, "src"> {
  src?: string;
  firstName: string;
  lastName: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const SIZE_MAP = {
  xs: { width: 24, height: 24, fontSize: "0.625rem" },
  sm: { width: 32, height: 32, fontSize: "0.75rem" },
  md: { width: 40, height: 40, fontSize: "0.875rem" },
  lg: { width: 48, height: 48, fontSize: "1rem" },
  xl: { width: 64, height: 64, fontSize: "1.125rem" },
};

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, firstName, lastName, size = "md", ...props }, ref) => {
    const initials = getInitials(firstName, lastName);
    const sizeProps = SIZE_MAP[size];

    return (
      <MuiAvatar
        ref={ref}
        src={src}
        alt={`${firstName} ${lastName}`}
        {...props}
        sx={{
          ...sizeProps,
          bgcolor: "primary.main",
          fontWeight: 700,
          borderRadius: "12px",
          ...props.sx,
        }}
      >
        {initials}
      </MuiAvatar>
    );
  }
);

Avatar.displayName = "Avatar";

export default Avatar;
