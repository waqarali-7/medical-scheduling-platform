"use client";

import React from "react";
import {
  Card as MuiCard,
  CardProps as MuiCardProps,
  CardContent,
  CardActions,
} from "@mui/material";

export interface CardProps extends MuiCardProps {
  children: React.ReactNode;
  hover?: boolean;
  actions?: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, hover, actions, ...props }, ref) => {
    return (
      <MuiCard
        ref={ref}
        {...props}
        sx={{
          borderRadius: "16px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          border: "1px solid",
          borderColor: "divider",
          ...(hover && {
            transition: "all 0.2s",
            "&:hover": {
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transform: "translateY(-2px)",
            },
          }),
          ...props.sx,
        }}
      >
        <CardContent>{children}</CardContent>
        {actions && <CardActions>{actions}</CardActions>}
      </MuiCard>
    );
  }
);

Card.displayName = "Card";

export default Card;
